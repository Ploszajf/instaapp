class Photo {
    constructor(id, album, originalName, url, lastChange, history, tags){
        this.id = id
        this.album = album
        this.originalName = originalName
        this.url = url
        this.lastChange = lastChange
        this.history = history
        this.tags = tags
    }
}

class Tag {
    constructor(id, name, popularity){
        this.id = id
        this.name = name
        this.popularity = popularity
    }
}

class User {
    constructor(id, userName, name, lastName, email, confirmed, password){
        this.id = id
        this.userName = userName
        this.name = name
        this.lastName = lastName
        this.email = email
        this.confirmed = confirmed
        this.password = password
    }
    get(){
        return{
        userName: this.userName,
        name: this.name,
        lastName: this.lastName
        }
    }

}

let photos = []
let tags = []
let tagsList = []
let users = []
module.exports = { Photo, photos, tags, Tag, tagsList, User, users }