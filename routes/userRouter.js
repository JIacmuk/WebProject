//подключаем роутер
const express = require('express')
const userRouter = express.Router()
const userController = require('../controlers/userController')
const authMiddleware = require('../middlewaree/authMiddlewaree')

userRouter.get('/me', authMiddleware, userController.me)

module.exports = userRouter