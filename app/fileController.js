const { photos } = require("./model");
const { addjson, deljson, getalljson, getonejson} = require("./jsonController")
const formidable = require("formidable");
const fs = require('fs');

module.exports = {
    addphoto: (req) => {
        const form = formidable({ multiples: true, uploadDir: "upload", keepExtensions: true });
        form.parse(req, (err, fields, files) => {
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