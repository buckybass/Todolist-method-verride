const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const List = require('./models/List')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://Admin:Password@monkey.yasgbdt.mongodb.net/?retryWrites=true&w=majority')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.get('/', async(req, res) => {
    const lists =  await List.find()
    res.render('index', {lists})
})

app.post('/todos', async (req, res) => {
    await List.create(req.body)
    res.redirect('/')
})

app.get('/todos/:id/:done', async(req, res) => {
    const list = await List.findById(req.params.id)
    list.done = req.params.done
    await list.save()
    return res.redirect('/')
})

app.put('/todos/:id', async( req, res) => {
    const list = await List.findById(req.params.id)
    list.text = req.body.text
    console.log(list.text)
    await list.save()
    res.redirect('/')
})

app.delete('/todos/:id', async( req, res) => {
    await List.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("port = " + port)
})