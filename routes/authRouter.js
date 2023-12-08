//подключаем роутер
const express = require('express')
const authRouter = express.Router()
//подключаем контроллер
const authController = require('../controlers/authController')
//подключаем проверку входных данных - валидатор
const {check} = require("express-validator")
//подключаем проверки аутентификации и роли
const authMiddleware = require('../middlewaree/authMiddlewaree')
const roleMiddleware = require('../middlewaree/roleMiddlewaree')


authRouter.post('/registration', 
    check('email', "Неверный тип данных" ).isEmail(),
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check("birthdayDate" , "День рождения не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 20 символов").isLength({min: 4, max: 20}),
    authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', authMiddleware, authController.getUsers)

module.exports = authRouter
