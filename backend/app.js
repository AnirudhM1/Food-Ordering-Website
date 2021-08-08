const express = require('express');
const passport = require('passport');
const restaurantRoutes = require('./api/routes/Restaurant');
const authRoutes = require('./api/routes/Auth');

// Run config files
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./api/config/Database');
require('./api/config/Passport');
const session = require('./api/config/Session');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

// Port on which server will run on
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
