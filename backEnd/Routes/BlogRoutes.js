import express from 'express'
import { addBlog, addComments, DeleteBlogbyID, generateContentbyAI, getAllBlogs, getBlogbyID, getBlogComments, togglePublish} from '../Controller/blogController.js';
import upload from '../Middleware/multer.js';
import auth from '../Middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'),auth,addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogbyID);
blogRouter.post('/delete', auth,DeleteBlogbyID);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment', addComments);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', generateContentbyAI);

export default blogRouter;