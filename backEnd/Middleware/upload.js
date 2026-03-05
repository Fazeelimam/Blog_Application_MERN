// import multer, { diskStorage } from "multer";
// const upload = multer({ storage: diskStorage({}) });
// export default upload;

import formidable from 'formidable';

export const parseFormData = (req, res, next) => {
    const form = formidable({
        multiples: false,
        uploadDir: '/tmp',
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024 // 10MB
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error parsing form data'
            });
        }

        // Attach fields to req.body
        req.body = {};
        for (let key in fields) {
            req.body[key] = fields[key][0]; // formidable v3 returns arrays
        }

        // Attach files to req.files
        req.files = {};
        for (let key in files) {
            req.files[key] = files[key][0]; // formidable v3 returns arrays
        }

        next();
    });
};