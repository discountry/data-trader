const imageStorage = './public/uploads/';
const jsonStorage = './public/raw/';
const setStorage = './set/';
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');
const jsonfile = require('jsonfile');

var configFile = './config.json';
var config = jsonfile.readFileSync(configFile);

function clearHistory(storage) {
  fs.readdir(storage, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(storage, file), err => {
        if (err) throw err;
      });
    }
  });
}
clearHistory(jsonStorage);
clearHistory(setStorage);

function testImage(file) {
  var filetypes = /jpeg|jpg|png/;
  var extname = filetypes.test(path.extname(file).toLowerCase());
  if (extname) {
    return true;
  }
    return false;
}

function initRawData(newFile,hash) {
  var json = jsonStorage + hash + '.json';
  var obj = {
    imageAddress: newFile.substr(8),
    hash: hash,
    ...config,
    isMarked: false,
  }
  jsonfile.writeFile(json, obj, function (err) {
    if (err) throw err;
    fs.stat(json, function (err, stats) {
      if (err) throw err;
      console.log('stats: ' + JSON.stringify(stats) + "\n");
    });
  })
}

fs.readdir(imageStorage, (err, files) => {
  files.forEach(file => {
    if (testImage(file)) {
      console.log(file);
      let hash = uuid();
      console.log(hash);
      let newFile = imageStorage + hash + path.extname(file);
      console.log(newFile);
      fs.rename(imageStorage + file, newFile, function (err) {
        if (err) throw err;
        initRawData(newFile,hash);
      });
    }
  });
})