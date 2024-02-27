import * as express from "express";
import * as multer from "multer";

export default new class UploadFile {
  upload(fieldName: string) {
      const storage = multer.diskStorage({
        destination: (req, res, cb) => {
          cb(null, "src/upload");
        },
        filename: (req, file, cb) => {
          cb(null, `${file.fieldname}-${Date.now()}.png`);
        },
      });
  
      const UploadImage = multer({ storage });
      return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        
  
        UploadImage.single(fieldName)(req, res, (error: any) => {
          if (error)
            return res
              .status(400)
              .json({ message: "Error while processing upload image !" });
  
              if(req.file) {
                res.locals.filename = req.file.filename;
              }
            next();
        });
      };
    } 
    
};