const express = require('express');
const path = require('path');
const fs = require('fs');
const {glob} = require("glob")
const requestIP = require("request-ip")
const SoundFileRepo = require('./soundFileRepo.js').SoundFileRepo;
const app = express();

//create custom log function to log to console & file
//var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;
function coolLogger(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
//end custom log function

//init soundfile repo
soundFileRepo = new SoundFileRepo("../soundfiles/")
soundFileRepo.loadFilePaths()
soundFileRepo.loadFiles()


//express app
app.use(express.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/function/sound', (req, res) => {

  const ipAddress = requestIP.getClientIp(req)
  coolLogger("[ + ]  " +ipAddress+"  "+Date())

  res.json(soundFileRepo.files[Math.floor(Math.random()*soundFileRepo.files.length)].base64)
});



//stuff to serve all the files  ->> https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
var dir = path.join(__dirname);

app.use(express.static(dir));




app.listen(3001, () => {
  console.log('Server started on port 3001');
  
});
