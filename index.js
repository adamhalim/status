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

const authCheck = (req, res, next) => {
  if(!req.user) {
    // If user is not logged in
    res.redirect('/')
  } else {
    // If user is logged in
    next();
  }
}

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.get('/status', authCheck, function (req, res) {
  res.render('index', {
    title: 'Hello',
    halim: 'halim.se/: -',
    wsb: 'wsb.halim.se/: -',
    user: 'Logged in as ' + req.user.name + '.'
  });
})

app.get('/', (req, res) => {
  res.render('homepage');
});

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});

// Google oAuth 2 redirects
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to status page.
    res.redirect('/status/');
  });


