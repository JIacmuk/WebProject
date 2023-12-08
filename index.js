//подключаем использование конфига
require('dotenv').config()

//подключаем библеотеки 
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
//подключаем корсы 
const cors = require('cors')

const PORT = process.env.PORT || 3333;

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
// работа с файлами
app.use(express.json())
// работа с мидлварами( роутеры )

app.use('/api', router)
app.use('/auth', authRouter)
app.use('/user', userRouter)

async function init() {
    try {
        //Подключаем бд 
        await mongoose
            .connect(process.env.DB_URL, {})
            .then(() => console.log( 'Database Connected' ))
        //подключаем сервер для прослушивания
        app.listen(PORT, () => {
            console.log("Server Starting")
        })
    }
    catch (error) {
        console.log(error)
    }
}
init()