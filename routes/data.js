const jsonStorage = './public/raw/';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkUnmarked(data) {
  if (data.isMarked) {
    return false;
  }
  return true;
}

function readRandomFile(files) {
  const rand = getRandomInt(files.length);
  const data = jsonfile.readFileSync(jsonStorage + files[rand]);
  if (checkUnmarked(data)) {
    return data;
  } else {
    return readRandomFile(files);
  }
}

// get random data item
router.get('/random', function (req, res) {
  fs.readdir(jsonStorage, (err, files) => {
    if (err) throw err;
    res.send(readRandomFile(files));
  });
})
// get data item by hashId
router.get('/:hashId', function (req, res) {
  let file = jsonStorage + req.params.hashId + '.json';
  jsonfile.readFile(file, function(err, obj) {
    if (err) {
      res.send(err);
    }
    res.send(obj);
  })
})


module.exports = router