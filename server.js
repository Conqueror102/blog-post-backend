require("dotenv/config");
const express = require('express');
const connectdb = require("./config/db");
const userRouter = require("./routes/route");

const app = express();
app.use(express.json());

const {PORT}= process.env
const port = PORT

connectdb()
app.use("/api",userRouter)
app.listen(port,()=>{
    console.log(new Date().toLocaleDateString(),port);
})