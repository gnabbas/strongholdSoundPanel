const path = require('path');
const fs = require('fs');
const {glob} = require("glob")

class SoundFileRepo {

    
    constructor(soundFilesPath) {
      this.soundFilesPath = soundFilesPath;
      this.filePaths = []
      this.files = []
    }




    loadFilePaths(){
        let tempFiles = []
        function ThroughDirectory(Directory) {
            fs.readdirSync(Directory).forEach(File => {
                const Absolute = path.join(Directory, File);
                if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
                else return tempFiles.push(Absolute);
            });
        }
        ThroughDirectory(this.soundFilesPath);
        this.filePaths = tempFiles
    }

    loadFiles(){
        this.filePaths.forEach(e => {
            this.files.push({
                filePath: e,
                name: 'sumname',
                base64: fs.readFileSync(e, {encoding: 'base64'})
            });
          });
    }

  };


  exports.SoundFileRepo = SoundFileRepo;