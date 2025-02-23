const blogModel = require("../model/blogModel");
const argon2 = require("argon2")

//   all blog acount

const getAllBlog = async (req,res) => {
    try{
        const findAll = await blogModel.find();
        return res.status(200).json({status:true, data:findAll});
    }catch(err){
        return res.status(500).json({message:"internal server error", error:err.message});
    }
};

    // create account
const register = async (req,res)=>{
    try{
        const {username, email, password}=req.body
        // used argon cus bcrypt didnt work on my cupboard
       const ifUserExist = await blogModel.findOne({email});    
         if(ifUserExist){
            return res.status(400).json({message:"user already exist"});
        }
        const encryptPass = await argon2.hash(password);

        const createUser = await blogModel.create({username,email,password:encryptPass, task:[]});
       return res.status(201).json({successful:true, data:createUser}); 
    }catch(err){
        return res.status(500).json({message:"internal server error", error:err.message})
    }
}

// get a blog for a specific user
    const getAUserBlog = async (req,res)=>{
        try{
            const {userId} = req.params
            const findUser = await blogModel.findById(userId);
            if(!findUser){
                return res.status(404).json({message:"user not found"});
            }

            return res.status(200).json({status:true, data:findUser.blogs})

        }catch(err){
            return res.status(500).json({message:"internal server error", error:err.message})
        }
    }

    // login 
const login = async (req,res)=>{
    try {
        const {email, password} = req.body
        const ifUserExist = await blogModel.findOne({email});
        if(!ifUserExist){
            return res.status(404).json({message:"invalid email or password"});
        }

        const comparePass = await argon2.verify(ifUserExist.password,password);
        if(!comparePass){
            return res.status(404).json({message:"incorrect password"});
        }
        return res.status(200).json({message:"login successfully",data:[ifUserExist.email, ifUserExist.username]})
    } catch (err) {
        return res.status(500).json({message:"internal server error",error:err.message});
    }
};

    //  create blogs
const createBlog = async (req,res)=>{
    try{
        const {id}  = req.params
        if (!id){
            return res.status(400).json({message:"user id is required"});
        }

        const {title, content} = req.body
        if(!title || !content){
            return res.status(400).json({message:"title and content are required"});
        }

        const user = await blogModel.findById(id);
        if(!user){
            return res.status(404).json({message:"user does not exit"});
        }
         user.blogs.push({title,content})
         await user.save()
        return res.status(201).json({message:"blog posted successfully",blog:user.blogs})


    }catch(err){
        return res.status(500).json({message:"internal server error",error:err.message});
    }
};

    // update blog 

    const updateBlog = async (req,res)=>{
        try{
            const {userid , blogId} = req.params
            const {title,content}=req.body
            if(!userid || !blogId){
                return res.status(400).json({message:"user id and blog id are required"})
            }
            if(!title && !content){
                return res.status(400).json({message:"atleast one field is required"})
            }

            const findUser = await blogModel.findById(userid);
            if(!findUser){
                return res.status(404).json({message:"user not found"});
            }

           const blog = findUser.blogs.id(blogId);
            if(!blog){
                return res.status(404).json({message:"blog not found"});
            }
            if(title){
                blog.title = title
            }   
            if(content){
                blog.content = content
            }
            
            await findUser.save()
            return res.status(200).json({message:"blog updated successefully", blog})
        }catch(err){
            return res.status(500).json({message:"internal server error",error:err.message});
        }
    }

    // delete blog
   const deleteBlog = async (req,res)=>{
        try{
            const {userId, blogId} = req.params
            if(!userId || !blogId){
                return res.status(404).json({message:"blog or id not found"})
            }

            const findUser = await blogModel.findById(userId);
            if(!findUser){
                return res.status(404).json({message:"user is not found"});
            }

            const findBlog = findUser.blogs.id(blogId);
            if (!findBlog){
                return res.status(404).json({message:" blog is nor found"});
            }
            findUser.blogs.pull(blogId);
            await findUser.save();
            return res.status(200).json({message:"blog deleted successfully"});
        }catch(err){
            return res.status(500).json({message:"internal server error",error:err.message});
        }
   };

module.exports = {getAllBlog, register, login, createBlog,updateBlog, deleteBlog,getAUserBlog}