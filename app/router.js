const { addphoto, delphoto, getallphotos, getonephoto } = require("./fileController")
const { updatejson } = require("./jsonController")

const fs = require("fs");


const router = async (request, response) => {

    //POST
        if (request.url === "/api/photos" && request.method == "POST") {
           await addphoto(request)
           response.end(JSON.stringify({status: true}))
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
            
            else if(request.url.match(/\/api\/photos\/getphoto\/([a-zA-Z0-9._]+)/) && request.method == "GET"){
            url = request.url.split("/").pop();
            extension = request.url.split(".").pop()
            if(extension == "jpg"){
                response.setHeader("Content-Type", "image/jpg");
            }else if(extension == "mp4"){
                response.setHeader("Content-Type", "video/mp4");
            }
            
            let path = "upload/" + url;
            fs.createReadStream(path).pipe(response);
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