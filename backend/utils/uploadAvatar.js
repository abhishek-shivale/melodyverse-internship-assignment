import multer from "multer";

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uplaods/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.avatar}`);
  },
});

export const upload = multer({ Storage });
