const { tags, photos, Tag, tagsList } = require("./model");

module.exports = {
    addtags: (json) => {
            json.tags.forEach(tag => {
                let name = tag                
                if(!tagsList.includes(name)){
                    let id = tags.length
                    let popularity = 0
                    let newTag = new Tag(id, name, popularity)
                    tags.push(newTag)
                    tagsList.push(name)
                }
            });
            console.log(tags)
            console.log(tagsList)
        return(tags)
    },
    getallrawtags: () => {
        let tagNames = []
        tags.forEach(tag => {
            tagNames.push(tag.name)
        })
        console.log(tagNames)
        return(tagNames)
    },
    getalltags: () => {
        console.log(tags)
        return(tags)
    },
    getonetag: (id) => {
        console.log(tags[id])
        return(tags[id])
    },
    getphototags: (id) => {
        console.log(photos[id]["tags"])
        return(photos[id]["tags"])
    },
    addtagstophoto: (photoid, tagname) =>{
        if(photos.length > photoid){
        tagname.forEach(el => {
            if(!tagsList.includes(el)){
                let id = tags.length
                let popularity = 0
                let newTag = new Tag(id, el, popularity)
                tags.push(newTag)
                tagsList.push(el)
            }
            if(!photos[photoid].tags.includes(el)){
                photos[photoid].tags.push(el)
                let tag = tags.find(item =>item.name == el)
                tags[tag.id].popularity++
        }            
        });            
        }else{
            console.log("photo doesnt exist!")
        }

    }

}