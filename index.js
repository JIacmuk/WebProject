//подключаем библеотеки 
const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const router = require('./routes/route')


const PORT = process.env.PORT || 3000
const password = "20030126500Ji"
const name = "Floppin"

//работа с либами
const app = express()
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//движок для работы с шаблонизатором
app.engine('hbs', handlebars.engine)
app.set('view engine' , "hbs")
app.set('views', 'views')

// работа с мидлварами( роутеры )
app.use(router)

async function init() {
    try {
        //Подключаем бд 
        await mongoose
            .connect(`mongodb+srv://${name}:${password}@cluster0.ldfd8x4.mongodb.net/test`, {})
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