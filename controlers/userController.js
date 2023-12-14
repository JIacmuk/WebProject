//подключаем использование конфига
require('dotenv').config()
//генерация jwt токена
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class userController {
    async me(req, res) {
        try {
            //находим пользователя по токену и отделяем тип токена bearer <токен>
            const token = req.headers.authorization.split(' ')[1]
            const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            const _id = decodedData.id
            //находим пользователя по id и возвращаем его 
            const user = await User.findOne({_id})
            console.log({_id})
            if (!user) {
                return res.status(400).json({message: `Пользователь не найден`})
            } 
            return res.json({
                username: user.username,
                birthday: user.birthdayDate,
                role: user.roles[0]
            })
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'me error'})
        }
    }
}

module.exports = new userController()
