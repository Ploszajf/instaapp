const { addphoto, delphoto, getallphotos, getonephoto } = require("./fileController")
const { updatejson } = require("./jsonController")

const fs = require("fs");
const formidable = require("formidable");

const router = async (request, response) => {

    //POST
        if (request.url === "/api/photos" && request.method == "POST") {
           await addphoto(request)
           response.end()
        }

    //GET
        if (request.url === "/api/photos" && request.method == "GET") {
            jsonRes = getallphotos()
            response.end(JSON.stringify(jsonRes, null, 5))
        } else if(request.url.match(/\/api\/photos\/([0-9]+)/) && request.method == "GET"){
            id = request.url.split("/").pop();
            jsonRes = getonephoto(id)
            response.end(JSON.stringify(jsonRes, null, 5))
            
        }

    //DELETE
        if(request.url.match(/\/api\/photos\/([0-9]+)/) && request.method == "DELETE"){
            id = request.url.split("/").pop();
            delphoto(id)
            response.end()
        }

    //PATCH
        if(request.url === "/api/photos" && request.method == "PATCH"){
            data = getRequestData(request)
            id = request.url.split("/").pop();
            updatejson(id, data)
            response.end()
        }
    }

module.exports = router