const jwt = require('jsonwebtoken')
const MyUtil = require('../../../utils/error')
const { createError } =   require('../../../utils/error')
const middleware = {

    verifyToken: (req,res,next) => {
        const token =  req.cookies.access_token;
        if(!token) {
            MyUtil.showAlertAndRedirect(res, 'You are not logged in', '/')
        }
        jwt.verify(token,process.env.JWT_ACCESS_KEY, (err, user)=> {
            if(err) {
                MyUtil.showAlertAndRedirect(res, 'token does not exist', '/')

            }

            req.user = user;
            next()  
        }) 
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
              MyUtil.showAlertAndRedirect(res, 'you do not have access', '/')
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                MyUtil.showAlertAndRedirect(res, 'you do not have access', '/')
            }
        })
    },
}
module.exports = middleware