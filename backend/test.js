const express = require('express')
const axios = require('axios')
const app = express()
require('dotenv').config()
const Restaurant = require('./api/models/Restaurant')
const routes = require('./api/routes/Restaurant')

const mongoose = require('mongoose');

// Connecting to mongodb database via mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

// Checking if mongoose is connected to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.use(express.urlencoded({ 'extended': true }))
app.use(express.json())
app.use('/restaurant', routes)

app.post('/add', async (req, res) => {
    const restaurants = req.body.restaurants;
    for (let i = 0; i < restaurants.length; i++) {
        const restaurant = restaurants[i];
        const rest = new Restaurant(restaurant)
        await rest.save()
    }
    res.status(201).send('Added all restaurants')
})

app.put('/add', async (req, res) => {
    const menu = req.body.menu
    const restaurants = await axios.get('http://localhost:3000/api/restaurants').then(res => res.data)
    for (let i = 0; i < restaurants.length; i++) {
        const id = restaurants[i]._id
        await axios.put(`http://localhost:3000/api/restaurants/${id}`, { menu })
    }
    res.send('Completed')
})


app.listen(4000, () => console.log('App is listening'))
