const { photos } = require("./model");
const { addjson, deljson, getalljson, getonejson} = require("./jsonController")
const formidable = require("formidable");
const fs = require('fs');
const path = require('path');


module.exports = {
    addphoto: (req) => {
        
const directoryPath = path.join(__dirname);
const directoriesInDIrectory = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);
        
        const form = formidable({ multiples: true, uploadDir: "upload", keepExtensions: true });

        form.parse(req, (err, fields, files) => {
            console.log(err);
           addjson(fields, files)
        })
    },
    delphoto: (id) => {
        if(id >= photos.length){
            console.log("file doesnt exist!")
            return("file doesnt exist")
        }else{
            let filePath =  photos[id].url; 
            fs.unlinkSync(filePath);
            deljson(id)
        }
        return
    },
    getallphotos: () => {
        let jsonRes = getalljson()
        return(jsonRes)
    },
    getonephoto: (id) =>{
        let jsonRes = getonejson(id)
        return(jsonRes)
    }
}