//подключаем использование конфига
require('dotenv').config()
const User = require('../models/user')
const Role = require('../models/role')
//хэширование паролей
const bcrypt = require('bcrypt')
//проверка валидации
const { validationResult } = require('express-validator')
//генерация jwt токена
const jwt = require('jsonwebtoken');


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            //вытаскиваем значения из тела запроса 
            const {email, username, password, birthdayDate} = req.body
            //делаем проверку на наличие пользователя под таким емейлом 
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с такой почтой уже существует'})
            }
            //хэшируем пароль
            const hashPassword = bcrypt.hashSync(password, 7);
            //находим роль
            const userRole = await Role.findOne({value: "USER"})
            //создаем пользователя
            const user =  new User({
                email: email, 
                password: hashPassword, 
                username: username, 
                birthdayDate: birthdayDate,
                roles: [userRole.value]
            })
            //сохраняем пользователя
            await user.save()
            //возвращаем аксес токен
            const token = generateAccessToken(user._id, user.roles)
            return res.json({message: "Пользователь успешно зарегестрирован", token})                       
        } 
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registrarion error'})
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `Пользователь не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    } 
    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } 
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'getUsers error'})
        }
    }
}


module.exports = new authController()