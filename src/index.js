const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(`mongodb+srv://1234:${process.env.PASSWORD}@cluster0.effifom.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})

app.listen('5000',()=>{
    console.log('server is up')
})