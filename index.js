const express = require('express');
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');

const users = require('./data/users.json');

require('./passport-setup');
const lanPinger = require('./core/lanPinger.js');

lanPinger.aliveStatuses();

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
  if (!req.user) {
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
  if (req.session.passport.user === undefined) {
    session = false;
  } else {
    session = true;
  }

  let sites = [];
  let services = [];

  // Checks to see what sites and services this user has access to.
  if (session) {
    sites = users[req.user.email].validSites;
    services = users[req.user.email].validServices;
  }

  res.render('index', {
    title: 'Hello',
    login: session,
    sites: sites,
    services: services,
  });
})

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});

// Google oAuth 2 redirects
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }), (req, res) => {
  // Successful authentication, redirect to status page.
  req.session.failedLogin = false;
  res.redirect('/');
});


app.get('/fail', (req, res) => {
  req.session.failedLogin = true;
  res.redirect('/');
})
/**
 * Logs out from our session
 */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * Endpoint for getting LAN status.
 */
app.get('/lan', (req, res) => {
  if (req.user.email === 'adam.halim@hotmail.com') {
    res.json(lanPinger.lanStatus);
  } else {
    res.send(401);
  }
});