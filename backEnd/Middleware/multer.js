// import multer, { diskStorage } from "multer";
// const upload = multer({ storage: diskStorage({}) });
// export default upload;

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp');  // Vercel serverless uses /tmp for temporary files
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

export default upload;