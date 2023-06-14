const { Photo, photos } = require("./model");
const formidable = require("formidable");
const { v4: uuidv4 } = require('uuid');


module.exports = {
    addjson: (fields, files) => {
        let id, album, oryginalName, url, lastChange, history
        id = uuidv4()
        console.log(`id: ${id}`)
        album = fields.album.replace(/(\r\n|\n|\r)/gm, "")
        console.log(`album: ${album}`)
        oryginalName = files.file.name
        console(`oryginalName: ${oryginalName}`)
        url = files.file.path
        console.log(`url: ${url}`)
        lastChange = "original"
        history = [ {
            status: "original",
            lastModifiedDate: files.file.lastModifiedDate
        }]
        tags = []
        const photo = new Photo(id, album, oryginalName, url, lastChange, history, tags);
        photos.push(photo)
        return(photos)
    },
    deljson: (id) => {
        photos.splice(id, 1)
        console.log("deleted photo with id: ", id)
        return
    },
    updatejson: (id) => {
        console.log(photos)
        console.log(id)
        return(photos[id])
    },
    getalljson: () => {
        console.log(photos)
        return photos
    },
    getonejson: (id) =>{
        if(id >= photos.length){
            console.log("file doesnt exist!")
            return("file doesnt exist")
        }else{
            //let keys = Object.keys(photos[id])
            console.log(photos[id])
            return photos[id]            
        }

    }
}