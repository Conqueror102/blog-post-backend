require("dotenv/config");
const express = require('express');
const connectdb = require("./config/db");
const userRouter = require("./routes/route");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  }));

const {PORT}= process.env
const port = PORT

connectdb()
app.use("/api",userRouter)
app.listen(port,()=>{
    console.log(new Date().toLocaleDateString(),port);
})