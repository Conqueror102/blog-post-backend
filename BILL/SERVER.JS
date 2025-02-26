const express = require("express");
const router =  require("./ROUTES/routes.js")
const connectdb = require("../BILL/CONFIG/db")
require("dotenv/config");

const app = express();
app.use(express.json());

const {PORT} = process.env
const port = PORT   

connectdb();

app.use("/api",router)

app.listen(port,()=>{
    console.log(new Date().toLocaleDateString(),port);
})