const http = require('http');
const router = require("./app/router");
const tagsRouter = require("./app/tagsRouter");
const userRouter = require("./app/userRouter");
require('dotenv').config();

http
    .createServer((req, res) => {
        router(req, res);
        tagsRouter(req, res);
        userRouter(req, res);
    })
    .listen(3000 || process.env.PORT, () => console.log(`listen on ${process.env.PORT} <- process.env.PORT`));
