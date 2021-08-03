const passport = require('passport');
const Strategy = require('passport-google-oauth20');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
});

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/api/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOrCreate({
                name: profile.displayName,
                googleId: profile.id
            });
            done(null, user);
        }
    )
);
