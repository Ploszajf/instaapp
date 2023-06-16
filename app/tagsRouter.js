const getRequestData = require("./getRequestData")
const fs = require("fs");
const formidable = require("formidable");
const { addtags, getallrawtags, getalltags, getonetag, getphototags, addtagstophoto } = require('./tagsController')


const tagsRouter = async (request, response) => {

    //POST
        if (request.url === "/api/tags" && request.method == "POST") {
           let  dataFromPost = await getRequestData(request)
           let json = JSON.parse(dataFromPost)
           let y = await addtags(json)
           console.log(y)
           return
        }
        else if(request.url === "/api/tags/add" && request.method == "POST"){
            let  dataFromPost = await getRequestData(request)
            let json = JSON.parse(dataFromPost)
            addtagstophoto(json.photo[0], json.tags)
            return
        }

    //GET
        if (request.url === "/api/tags/raw" && request.method == "GET") {
            getallrawtags()
            response.end()
        } else if(request.url === "/api/tags/" && request.method == "GET"){
            tags = await getalltags()
            response.end(JSON.stringify(tags))
        } else if(request.url.match(/\/api\/tags\/([0-9]+)/)&& request.method == "GET"){
            id = request.url.split("/").pop();
            getonetag(id)
            response.end()
        } else if(request.url.match(/\/api\/photos\/tags\/([0-9]+)/) && request.method == "GET"){
            id = request.url.split("/").pop();
            let tags = await getphototags(id)
            response.end(JSON.stringify(tags))
        }

    //PATCH
        if(request.url === "/api/photos" && request.method == "PATCH"){
            data = getRequestData(request)
            id = request.url.split("/").pop();
            update(id, data)
            response.end()
        }
    }

module.exports = tagsRouter