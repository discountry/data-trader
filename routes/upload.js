const setStorage = './set/';
const jsonStorage = './public/raw/';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

// get data item by hashId
router.post('/:hashId/:result', function (req, res) {
  let rawFile = jsonStorage + req.params.hashId + '.json';
  const data = jsonfile.readFileSync(rawFile);
  let setFile = setStorage + req.params.hashId + '.json';
  let obj = {
    ...data,
    isMarked: true,
    result: req.params.result,
  }
  jsonfile.writeFileSync(rawFile, {...data, isMarked: true});
  jsonfile.writeFile(setFile, obj, function (err) {
    if (err) throw err;
    jsonfile.readFile(setFile, function(err, obj) {
      if (err) {
        res.send(err);
      }
      res.send(obj);
    })
  })
})

module.exports = router