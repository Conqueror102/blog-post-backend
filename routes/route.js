const express = require("express");
const { getAllBlog, register, login, createBlog, updateBlog, deleteBlog, getAUserBlog } = require("../controller/blogcontroller");
const userRouter = express.Router();

userRouter.get("/",getAllBlog);
userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/create-blog/:id",createBlog);
userRouter.patch("/update-blog/:userid/:blogId",updateBlog);
userRouter.delete("/delete-blog/:userId/:blogId",deleteBlog);
userRouter.get("/get-user-blog/:userId",getAUserBlog);

module.exports = userRouter