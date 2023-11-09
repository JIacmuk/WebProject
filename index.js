//подключаем библеотеки 
const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const expressHandlebars = require('express-handlebars')
const router = require('./routes/route')


var config = require('./config.json');
const PORT = process.env.PORT || config.port;
// const password = "20030126500Ji"
// const name = "Floppin"


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


// работа с мидлварами

// работа с файлами
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'style')))
// работа с мидлварами( роутеры )
app.use(router)

async function init() {
    try {
        console.log(config);
        //Подключаем бд 
        await mongoose
            .connect(config.dbUri, {})
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