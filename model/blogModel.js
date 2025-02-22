const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, rquired:true, unique:true},
    password:{type:String, required:true},
    blogs:[
        {
        title:{type:String, required:true,},
        content:{type:String, required:true},
        createAt:{type:Date, default:Date.now}
    }
    ]
})

module.exports = blogModel = model("blogs", blogSchema);