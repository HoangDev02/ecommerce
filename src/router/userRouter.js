const express = require('express');
const router = express.Router();
const userController = require('../app/controller/UserController')
const middlewate = require('../app/middleware/middleware')
//get
// router.get('/register', userController.getRegister)
// router.get('/login', userController.getLogin)
router.get('/', middlewate.verifyToken,userController.getUsers)
router.get('/profile', middlewate.verifyUser,userController.getUser)

//post
router.post('/refresh', userController.refreshAccessToken)
router.post('/register' , userController.isRegister);
router.post('/changepassword', userController.changePassword)
router.post('/login', userController.isLogin)
router.post('/logout',userController.logOut)

//delete
router.delete('/delete/:id', middlewate.verifyAdmin,userController.deleteUser)

module.exports = router