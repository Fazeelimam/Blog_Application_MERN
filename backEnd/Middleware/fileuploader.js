// import multer, { diskStorage } from "multer";
// const upload = multer({ storage: diskStorage({}) });
// export default upload;

import fileUpload from 'express-fileupload';

const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true
});

export default uploadMiddleware;