const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('./middleware');
const restaurantRoutes = require('./api/routes/Restaurant');

// Run config files
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./api/config/Mongoose');
require('./api/config/Passport');
const session = require('./api/config/Session');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/restaurants', restaurantRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

app.get('/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
    res.send('AUTHENTICATED!!');
});

app.get('/auth', isLoggedIn, (req, res) => {
    res.send(req.user.name);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged Out');
});

app.get('/api/callback', passport.authenticate('google'), (req, res) => res.send(req.user));

// Port on which server will run on
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
