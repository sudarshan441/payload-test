import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination folder where files will be uploaded
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the filename to be the original name of the file
      cb(null, file.originalname);
    },
  });
  
  // Create multer instance with the storage configuration
  const upload = multer({ storage: storage });

export const uploadImageHandler=(req,res)=>{
    console.log("hello")
    upload.array('files', 10)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ error: 'Multer error: ' + err.message });
        } else if (err) {
          return res.status(500).json({ error: 'Unknown error: ' + err.message });
        }
      
        // Access the uploaded files details through req.files
        const files = req.files;
        
        // Handle each file as needed, e.g., save the file details in the database
        files.forEach((file) => {
          // Process each file
          console.log('Uploaded file:', file.originalname);
          // Perform additional processing or save file details to the database
        });

        return res.status(200).json({ message: 'Files uploaded successfully' });
      });
      
    // res.send("Uploaded files successfully")
}