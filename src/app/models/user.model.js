const mongooes = require('mongoose')

const UserModel = new mongooes.Schema({
    username: {
        type: String,
        require: true,
        unique:true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require:true,
        default: "abc.12345"
    },
    image: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/009/397/892/small/woman-face-expression-clipart-design-illustration-free-png.png' // Replace with the path or URL to your default image
    },
    isAdmin: {
        type:Boolean,
        default: false
    }
})
module.exports = mongooes.model("user", UserModel)