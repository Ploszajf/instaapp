const { register, createtoken, verifytoken, confirmtoken, login, newtoken, getuserdata } = require('./userController')


const userRouter = async (request, response) => {

    //POST
        if (request.url === "/api/user/register" && request.method == "POST") {
            let dataFromPost = await getRequestData(request)
            let json = JSON.parse(dataFromPost)
            let userName = json.userName
            let email = json.email
            let tokenData = { userName, email }
            const processToken = async () => {
                let token = await createtoken(tokenData)
                let link = await verifytoken(token)
                response.setHeader("Content-Type", "application/json");
                response.end(link)
            }
            let registerSucces = await register(json) 
            if(registerSucces){
                processToken()
            }
        } else if(request.url === "/api/user/login" && request.method == "POST"){
            let dataFromPost = await getRequestData(request)
            let json = JSON.parse(dataFromPost)
            let loginState = await login(json)
            if(loginState){
                let token = await newtoken(json)
                response.setHeader('Authorization', 'Bearer '+ token);
                response.end(dataFromPost)
            }else{
                response.end(dataFromPost)
            }
        }

    //GET
        if (request.url.match(/\/api\/user\/confirm\/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/) && request.method == "GET") {
            let token = request.url.split("/").pop();
            let confirmstate = await confirmtoken(token)
            if(confirmstate){
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({status: "Confirmed"}))
            }else{
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({status: "Problem with confirmation"}))
            }
        } else if(request.url.match(/\/api\/profile\/([0-9]+)/) && request.method == "GET"){
            let userId = request.url.split("/").pop();
            let data = await getuserdata(userId)
            response.end(JSON.stringify(data, 0 , 5))
        }

    //PATCH
        if(request.url === "/api/user" && request.method == "PATCH"){
        }

        }

module.exports = userRouter