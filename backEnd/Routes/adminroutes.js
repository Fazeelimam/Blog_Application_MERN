import express from 'express'
import { adminController, approveCommentByID, deleteCommentsbyID, getAllBlogsAdmin, getAllComments, getDashboard } from '../Controller/admin_controller.js';
import auth from '../Middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminController);
adminRouter.get("/comments", getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentsbyID);
adminRouter.post("/approve-comment", auth, approveCommentByID);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;