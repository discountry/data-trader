var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var data = require('./routes/data');

app.use(express.static('public'));

app.get('/',function(req,res){    
  res.sendFile('./public/index.html');
});

app.use('/data', data);

var upload = require('./routes/upload');

app.use('/upload', upload);

var setting = require('./routes/setting');

app.use('/setting', setting);

app.listen(8080, () => console.log('Example app listening on port 8080!'));