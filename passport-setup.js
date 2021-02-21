const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

const users = require('./data/users.json');
require('./core/utils')();


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
    callbackURL: `${process.env.CALLBACK_URL}`
}, (accessToken, refreshToken, profile, done) => {
    // Use the profile information (I'm using emails) to check if user is authorized.
    if(validateUser(profile._json)) {
        // Valid user here
        console.log(`User ${profile._json.email} logged in!`);
        done(null, profile._json);
    } else {
      // Invalid user here
      console.log(`Unauthorized user: ${profile._json.email}.`);
      done();
    }
}));