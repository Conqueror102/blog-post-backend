const { connect } = require("mongoose")
require("dotenv/config");
const {MONGODB_URL} =process.env

const connectdb = async()=>{
    try{
        await connect(MONGODB_URL.toString());
        console.log("conneted successfully");
    }catch(err){
        console.log("error connecting to server",err.message);
    }
};

module.exports = connectdb