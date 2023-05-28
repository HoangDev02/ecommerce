const mongooes = require('mongoose');

const refreshTokens = mongooes.Schema(
    {
        refreshToken:{
            type:String
        }
    }
)
module.exports = mongooes.model("refreshTokens", refreshTokens)