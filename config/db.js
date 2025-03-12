const { connect } = require("mongoose");
require("dotenv/config");

const {MONGODB_URL} = process.env

const connectdb = async ()=>{
    try{
        await
        connect(MONGODB_URL);
        console.log("server connected successfully");
    }catch(err){
        console.log("unable to connect",err.message);
    }
};

module.exports = connectdb