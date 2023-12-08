//подключаем использование конфига
require('dotenv').config()
//генерация jwt токена
const jwt = require('jsonwebtoken')

class userController {
    async me(req, res) {
        try {
            //находим пользователя по токену
            const token = req.headers.authorization.split(' ')[1]
            const {email: email} = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            console.log(email)
            return res.json({message: "Пользователь успешно зарегестрирован", token})
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'me error'})
        }
    }
}

module.exports = new userController()