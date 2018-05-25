const express = require('express');
const htsl = require('../index.js');

let app = express();

let page = require('./page.json');

app.get('/', (req,res) => {
  res.set('Content-Type', 'text/html');
  res.send(new Buffer(htsl(page)));
});


app.listen(3000);
