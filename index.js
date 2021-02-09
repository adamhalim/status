const express = require('express');
var pug = require('pug');
const fetch = require('node-fetch');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views')
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello',
    halim: 'halim.se/: -',
    wsb: 'wsb.halim.se/: -'
  });
})

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});
