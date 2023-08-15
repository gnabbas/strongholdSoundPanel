const express = require('express');
const path = require('path');
const fs = require('fs');
const {glob} = require("glob")
const requestIP = require("request-ip")

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


let Files  = [];

function ThroughDirectory(Directory) {
    fs.readdirSync(Directory).forEach(File => {
        const Absolute = path.join(Directory, File);
        if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
        else return Files.push(Absolute);
    });
}

ThroughDirectory("../sounds");

console.log(Files)



app.use(express.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/function/sound', (req, res) => {

  const ipAddress = requestIP.getClientIp(req)
  coolLogger("[ + ]  " +ipAddress+"  "+Date())

  var randomItem = Files[Math.floor(Math.random()*Files.length)];
  const contents = fs.readFileSync(randomItem, {encoding: 'base64'});
  res.json({contents})
});


app.listen(3001, () => {
  console.log('Server started on port 3001');
  
});
