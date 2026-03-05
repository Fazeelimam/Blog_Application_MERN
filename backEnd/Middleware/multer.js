// import multer, { diskStorage } from "multer";
// const upload = multer({ storage: diskStorage({}) });
// export default upload;

import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
        fields: 10,
        files: 1
    }  // 10MB limit
});

export default upload;