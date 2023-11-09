const express = require('express')
const router = express.Router()

//подключаем модель 
const TestDB = require('../models/model')


router.get('/', async (req, res) => {
    //получаем все значения 
    const DBvalues = await TestDB.find({}).lean()
    res.render('index', {
        DBvalues
    })
})

router.post('/', async (req, res) => {
    const value = new TestDB({
        title: req.body.value
    })
    await value.save()
    res.redirect('/')
}) 


module.exports = router