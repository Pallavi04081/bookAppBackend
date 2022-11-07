const express = require('express')
const Router = express.Router()
const ScrapperData = require('G:/comapnyAssingement/Scapper/src/ScrapperSchema/ScrapperSchema.js')
const axios = require('axios')
const cheerio = require('cheerio')
const datakeys = ['rank',
    'name',
    'price',
    "1h",
    "24h",
    "7d",
    'marketCap',
    'vaolume',
    'circulatingSupply'
];

const dataArray = [];
let objectid = "";
const getdata = async () => {
    try {
        const data = await axios.get("https://coinmarketcap.com/")
        const finalData = await (data.data)
        const $ = cheerio.load(finalData)
        const elementSelector = "#__next > div > div.main-content > div.sc-4vztjb-0.cLXodu.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr"
        $(elementSelector).each((index, element) => {
            const dataObj = {};
            let keyindex = 0;
            if (index <= 9) {
                $(element).children().each((childindex, childelement) => {
                    const tdValue = ($(childelement).text())
                    if (tdValue) {
                        if (tdValue == 'rank') {
                            dataObj[datakeys[keyindex]] = parseInt(tdValue)
                            keyindex++
                        }
                        else {
                            dataObj[datakeys[keyindex]] = (tdValue)
                            keyindex++
                        }
                    }
                })
                dataArray.push(dataObj)
            }
        })   
        senddatatodb()   
    }
    catch (error) {
        console.log(error.message)
    }
}

 const senddatatodb = async()=>{
     try{
        let Result = ScrapperData.find();
            console.log(Result)
             Result = await ScrapperData.updateOne({_id:Result._id},{
                array:dataArray
            })

        else{
             Result = await ScrapperData.create({
                array:dataArray
            })
        }
     }
     catch(error){
        console.log(error)
     }
 }
 
//    setInterval(() => {
//     getdata();
//       }, 5000)


Router.get('/getdata', async (req, res) => {
    try {
        const Result = await ScrapperData.find().sort({ rank: 1 });
        res.json({
            Result: Result
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = Router