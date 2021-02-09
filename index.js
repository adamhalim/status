const express = require('express');
var pug = require('pug');

const app = express();
const port = 3000;

var fn = pug.compileFile('views/index.pug');

app.set('view engine', 'pug');
app.set('views', './views')

 
app.get('/', function (req, res) {
  res.render('index', {title: 'Hello', message: 'Yooo'});
})
 
app.listen(port, () => {
    console.log(`Litening on ${port}.`);
});