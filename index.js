const express = require('express');
var pug = require('pug');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

var fn = pug.compileFile('views/index.pug');

app.set('view engine', 'pug');
app.set('views', './views')
app.use('/scripts', express.static('scripts'))

//pingSMA();

app.get('/', function (req, res) {
  res.render('index', { title: 'Hello', message: '0ms' });
})

app.listen(port, () => {
  console.log(`Litening on ${port}.`);
});


async function getPing() {
  let ping;
  let start = Date.now();
  await fetch("https://halim.se/", { mode: 'no-cors' })
    .then(() => ping = (Date.now() - start));
  return ping;
}
let SMAarray = [];
async function pingSMA() {  
  setInterval(async () => {
    let ping = await getPing();
    if(SMAarray.length == 10) {
      SMAarray.pop();
    }
    SMAarray.unshift(ping);
    let avg = SMAarray.reduce((a,b) => a+b) / SMAarray.length;
    // pug stuff here
    changePing(avg);
  }, 100);
}

async function changePing(ping) {
  console.log(ping)
  app.get('/', function (req, res) {
    res.render('index', { title: 'Hello', message: ping });
  })
}