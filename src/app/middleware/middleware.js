const jwt = require('jsonwebtoken')
const middleware = {
    verifyToken: (req,res,next) => {
        const token = req.headers.token;
        if(token) {
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user)=> {
                if(err) {
                    return  res.status(403).json("Token does exist")
                }
                req.user = user;
                next()  
            }) 
        }   
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
                return  res.status(403).json("you do not have access")
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                return  res.status(403).json("you do not have access")
            }
        })
    },
}
module.exports = middleware