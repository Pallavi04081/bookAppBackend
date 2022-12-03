const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/bookApp').then(()=>{
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})

app.listen('5000',()=>{
    console.log('server is up')
})