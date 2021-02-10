const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

const users = require('./data/users.json');

dotenv.config();

// Since we only user the email as an identifier,
// there is not much to (de)serialize.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

/**
 * Copy-pasted from https://github.com/jaredhanson/passport-google-oauth2
 */
passport.use(new GoogleStrategy({
    clientID: `${process.env.ID}`,
    clientSecret: `${process.env.SECRET}`,
    callbackURL: "http://localhost:3000/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Use the profile information (I'm using emails) to check if user is authorized.
    let validUser = false;
    for (let user of users) {
        if (user.user.email == profile._json.email) {
            // If user is authorized
            validUser = true;
        }
    }
    if (validUser) {
        console.log(`User ${profile._json.email} logged in!`);
        done(null, profile._json);
    } else {
        // Invalid user here
        done();
    }
}));