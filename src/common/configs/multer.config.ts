import { extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { HttpException, HttpStatus } from "@nestjs/common";

// Multer configuration
export const multerConfig = {
  dest: process.env.MEDIA_UPLOAD_LOCATION,
};

// Multer upload options
export const uploadImageOptions = {
  // Enable file size limits
  limits: {
    fileSize: 2000000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(`Ảnh không đúng định dạng (${extname(file.originalname)})`, HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
