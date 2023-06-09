const mongooes = require('mongoose');

const refreshTokens = mongooes.Schema(
    {
        // refreshToken:{
        //     type:String
        // }
        token: {
            type: String,
            required: true,
            unique: true
          }
    }
)
module.exports = mongooes.model("refreshTokens", refreshTokens)