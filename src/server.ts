import express from 'express'
import payload from 'payload'

require('dotenv').config()
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const app = express()
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.patch("/api/custom/route",upload.array('images'),async(req, res) => {
  try{
    const uploadedFiles = req.files as Express.Multer.File[];
    const imagePromises = uploadedFiles.map( async(image, index) => {
      const img = await payload.create({
        collection: "images",
        data: {
         alt:image.originalname, 
        },
        file: {name:image.originalname,data:image.buffer,size:image.size,mimetype:image.mimetype}
      });
      return img;
    });

    const createdImages = await Promise.all(imagePromises);

    // console.log('Images created:', createdImages);
    return res.json({message:"images uploaded successfully",data: createdImages});
  }
  catch(error){
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })
  app.listen(3000)
}

start()
