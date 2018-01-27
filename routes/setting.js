const express = require('express');
const router = express.Router();
const fs = require('fs');
const jsonfile = require('jsonfile');

router.post('/', function(req, res) {
  const options = req.body.options.split(',');
  let obj = {
    title: req.body.title,
    description: req.body.description,
    options,
  }
  jsonfile.writeFile('./config.json', obj, function (err) {
    if (err) throw err;
    jsonfile.readFile('./config.json', function(err, obj) {
      if (err) {
        res.send(err);
      }
      console.log(obj);
      res.send(obj);
    })
  })
});

module.exports = router