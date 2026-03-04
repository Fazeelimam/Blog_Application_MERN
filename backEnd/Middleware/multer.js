// import multer, { diskStorage } from "multer";
// const upload = multer({storage: diskStorage({})});
// export default upload;

import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
});

export default upload;