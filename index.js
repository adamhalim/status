const express = require('express');
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./passport-setup');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));

app.use(cors());

// Encrypt our cookie & limit maxAge to 24 hours.
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  name: 'login',
  keys: [process.env.KEY1, process.env.KEY2]
}));

// Not needed for now
const authCheck = (req, res, next) => {
  if(!req.user) {
    // If user is not logged in
    res.redirect('/logout')
  } else {
    // If user is logged in
    next();
  }
}

app.use((req, res, next) => {
  // This way, we can access our session within pug
  // with #{session.passport}
  res.locals.session = req.session;
  next();
});

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

/**
 * Our main endpoind. Gives us a login page if we're not logged in.
 * When logged in, we get the status page.
 * TODO: User personalized content.
 */
app.get('/', function (req, res) {
  // Checks to see if we're logged in
  let session;
  if(req.session.passport.user === undefined) {
    session = false;
  } else {
    session = true;
  }

  res.render('index', {
    title: 'Hello',
    halim: 'halim.se/: -',
    wsb: 'wsb.halim.se/: -',
    login: session
  });
})

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});

// Google oAuth 2 redirects
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/logout' }), (req, res) => {
    // Successful authentication, redirect to status page.
    res.redirect('/');
  });


/**
 * Logs out from our session
 */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
