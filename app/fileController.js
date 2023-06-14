const { photos } = require("./model");
const { addjson, deljson, getalljson, getonejson} = require("./jsonController")
const formidable = require("formidable");
const fs = require('fs');

module.exports = {
    addphoto: (req) => {
        console.log("11111")
        
        const form = formidable({ multiples: true, uploadDir: "upload", keepExtensions: true });
        form.parse(req, (err, fields, files) => {

            album = fields.album.replace(/(\r\n|\n|\r)/gm, "")
            console.log(`album: ${album}`)
            oryginalName = files.file.name
            console(`oryginalName: ${oryginalName}`)
            url = files.file.path
            console.log(`url: ${url}`)


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