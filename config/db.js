const { mongoose } = require("mongoose");

require("dotenv/config");

const {MONGODB_URL} = process.env

const connectdb = async ()=>{
    try{
        await
        mongoose.connect("mongodb+srv://victorConqueror:2293201518@cluster0.ktmou.mongodb.net/BILL");
        console.log("server connected successfully");
    }catch(err){
        console.log("unable to connect",err.message);
    }
};

module.exports = connectdb