const session = require('express-session');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/food-ordering-app',
    secret: process.env.SESSION_SECRET || 'SECRET',
    touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
    console.error('SESSION STORE ERROR', e);
});

const sessionConfig = {
    store,
    name: 'Session',
    secret: process.env.SESSION_SECRET || 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

module.exports = session(sessionConfig);
