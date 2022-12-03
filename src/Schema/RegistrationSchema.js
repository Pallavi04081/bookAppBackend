const mongoose = require('mongoose')

const userregistation = new mongoose.Schema({
     
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})

const UserRegistation = mongoose.model("UserRegistation",userregistation)

module.exports = UserRegistation;