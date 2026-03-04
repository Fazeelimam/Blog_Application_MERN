import fs from 'fs'
import imagekit from '../Settings/Imagekit.js'
import Blog from '../models/Blog.js';
import Comments from '../models/Comments.js'
import main from '../Configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are filled ?
        if (!title || !subTitle || !description || !category || isPublished === undefined) {
            return res.json({ success: false, message: "All fields are required!" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to Imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimization through Imagekit URL transformation
        const optimizationURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, // auto compression
                { format: 'webp' }, // convert to modern format
                { width: '1280' } // width resizing
            ]
        });

        const image = optimizationURL;

        await Blog.create({ title, subTitle, description, image, category, isPublished });
        res.json({ success: true, message: "Blog added successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogbyID = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete
export const DeleteBlogbyID = async(req,res)=>{
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        // Delete all comments associated with the blog
        await Comments.deleteMany({blog:id}); 
        res.json({success: true, message: "Blog delete Successfully"});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        blog.isPublished = !blog.isPublished;  // flip current status
        await blog.save();

        res.json({ success: true, message: "Blog status updated", blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const addComments = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    // Map blogId → blog
    await Comments.create({
      blog: blogId,
      name,
      content,
    });

    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} = req.body;
        const comments =  await Comments.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const generateContentbyAI = async(req,res)=>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}