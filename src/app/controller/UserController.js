const userModel = require('../models/user.model')
const refreshTokens = require('../models/refreshTokens')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// let refreshTokens = []
const userController = {

    // //get register
    // getRegister : async (req,res,next) => {
    //     res.status(200).render('account/register', {layout: false})
    // },
    // //get login
    // getLogin: async (req,res,next) => {
    //     res.status(200).render('account/login', {layout: false})
    // },

    getUser: async (req,res,next) => {
        try{
            const user = await userModel.findById(req.params.id)
            res.status(200).json(user)
        }catch (err) {
            next(err)
        }
    },
    //getAll user
    getUsers: async (req,res,next) => {
        try {
            const users = await userModel.find()
            res.status(200).json(users)
        }catch (err) {
            next(err)
        }
    },

    deleteUser: async (req,res,next) => {
        try {
            await userModel.findByIdAndDelete(req.params.id)
            res.status(200).send("delete user success")
        } catch (error) {
            next(error)
        }
    },

    generateRefreshtoken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },process.env.JWT_ACCESS_KEY, {expiresIn:"365d"}
        );
    },

    isRegister: async (req,res,next) => {
        try {
            const users= await userModel.findOne({username:req.body.username})
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
            const newUser = new userModel(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed
                }
            )
            if(!users) {
                const user = await newUser.save()
                return res.status(200).json(user)
            }else {
                return res.status(500).json("user exists")
            }
           
        }catch (err){
            next(err)
        }
    },
    isLogin: async(req,res,next) => {
        try {
            const user = await userModel.findOne({username:req.body.username})
            if(!user) {
                res.status(301).send("user no account")
            }else {
                const isPassWordCorrect = await bcrypt.compare(req.body.password, user.password)
                if(!isPassWordCorrect){
                    res.status(404).send("wrong username or password")
                }
                const payload ={username: user.username,id: user._id, isAdmin: user.isAdmin}
                const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "20s"})
                const refreshToken = userController.generateRefreshtoken(user);
                // refreshToken.push(refreshToken)
                const newRefreshTokenDB = new  refreshTokens({
                    token: refreshToken
                  });
                  await newRefreshTokenDB.save();
                 res.cookie("refreshToken", refreshToken,{
                     httpOnly: true,
                     secure: false,
                     sameSite: "strict"
                 })
                 const { password, ...others } = user._doc;
                 res.status(200).json({ ...others, accessToken,refreshToken});
                
            }
        }catch(err) {
            next(err)
        }
    },
    requestRefreshToken: async(req,res,next) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(404).json("you're not authenticated")
        try {
            const refreshTokenDB = await refreshTokens.findOne({ token: refreshToken });
            if(!refreshTokenDB) {
                return res.status(403).json("refresh token is not valid")
            }
            jwt.verify(refreshToken,process.env.JWT_ACCESS_KEY, (err,user)=> {
                if(err) {
                    console.log(err)
                }
                const newAccessToken = userController.generateRefreshtoken(user);
                const newRefreshToken =  userController.generateRefreshtoken(user);
                refreshTokenDB.token = newRefreshToken;
                refreshTokenDB.save();
                res.cookie("refreshToken", refreshToken,{
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                })
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                })
            })
        } catch (error) {
            next(error)
        }
    },
     //LOG OUT
     logOut: async (req, res) => {
        const token = req.headers.authorization;
        const deletedToken = await refreshTokens.deleteOne({ token });
        if (!deletedToken) {
          return res.status(404).json('Token not found');
        }
        // Clear the refreshToken cookie
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
      },
}
module.exports = userController


