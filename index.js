const express = require('express');
var pug = require('pug');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

var fn = pug.compileFile('views/index.pug');

app.set('view engine', 'pug');
app.set('views', './views')
app.use('/scripts', express.static('scripts'))

app.get('/', function (req, res) {
  res.render('index', { title: 'Hello', message: '0ms' });
})

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});
