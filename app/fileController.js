const { photos } = require("./model");
const { addjson, deljson, getalljson, getonejson} = require("./jsonController")
const formidable = require("formidable");
const fs = require('fs');
const path = require('path');


module.exports = {
    addphoto: async (req) => {        
        const form = formidable({ multiples: true, uploadDir: "upload", keepExtensions: true });
        let jsonStatus;
        form.parse(req, async (err, fields, files) => {
          jsonStatus = await addjson(fields, files)
        })
        return jsonStatus
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
        console.log(jsonRes)
        return(jsonRes)
    },
    getonephoto: (id) => {
        let jsonRes = getonejson(id)
        return(jsonRes)
    }
}