const mongoose = require('mongoose')

const schapperData = new mongoose.Schema ({  
     array:{
        type:Array
     }
})

const ScrapperData = mongoose.model("SchapperData",schapperData)

module.exports = ScrapperData;