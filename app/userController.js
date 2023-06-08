const { User, users } = require("./model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (data) =>{
        let userName = data.userName
        let name = data.name
        let lastName = data.lastName
        let email = data.email
        let confirmed = false
        let password = await bcrypt.hash(data.password, 10)
        if(users.find(el => el.email == email)){
            console.log("User with this email already exist!")
            return(false)
        }else if(users.find(el => el.userName == userName)){
            console.log("This username is unavailable.")
            return(false)
        }else{
            const newUser = new User(users.length, userName, name, lastName, email, confirmed, password);
            console.log(newUser)
            users.push(newUser);
            return(true)           
        }

    },

    createtoken: async (data) =>{

            let token = await jwt.sign(
                data,
                process.env.O,
                {
                    expiresIn: "1hr"
                }
            );
            console.log({ token: token });
            return token
    },

    verifytoken: async (token) => {
            let confirmationLink = `http://localhost:3000/api/user/confirm/${token}`
            return(confirmationLink)
        },

    confirmtoken: async (token) => {
        try {
            let decoded = await jwt.verify(token, process.env.O)
            console.log({ decoded: decoded });
            const user = users.find(el => el.email == decoded.email)
            users[user.id].confirmed = true
            return true
        }
        catch (ex) {
            console.log({ message: ex.message });
        }
    },

    login: async (data) => {
        if(users.find(el => el.email == data.login)){
            let user = users.find(el => el.email == data.login)
            if(await bcrypt.compare(data.password, user.password)){
                console.log("Login successful!")
                return true
            }else{
                console.log("Not valid username or password!")
                return false 
            }
        }else if(users.find(el => el.userName == data.login)){
            let user = users.find(el => el.userName == data.login)
            if(await bcrypt.compare(data.password, user.password)){
                console.log("Login successful!")
                return true
            }else{
                console.log("Not valid username or password!")
                return false 
            }
        }else{
            console.log("Not valid username or password!")
            return false
        }
        
    },

    newtoken: async (data) => {
        let token = await jwt.sign(
            data,
            process.env.O,
            {
                expiresIn: "72hr"
            }
        );
        console.log({ token: token });
        return token
    },

    getuserdata: async (userId) => {
        let user = users.find(el => el.id == userId)
        return user.get()
    }
}