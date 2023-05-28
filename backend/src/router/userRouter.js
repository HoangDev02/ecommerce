const express = require('express');
const router = express.Router();
const userController = require('../app/controller/UserController')

//get
// router.get('/register', userController.getRegister)
// router.get('/login', userController.getLogin)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)

//post
router.post('/register' , userController.isRegister);
router.post('/login', userController.isLogin)
router.post('/refresh', userController.requestRefreshToken)
router.post('/logout', userController.logOut)

//delete
router.delete('/delete/:id', userController.deleteUser)

module.exports = router