// import multer from "multer"

import payload from "payload/dist"

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// var upload = multer({ storage: storage })

export const uploadImageHandler=async(req,res)=>{

    // upload.array('files', 10)(req, res, function (err) {
    //     if (err) {
    //       return res.status(500).json({ error: err.message });
    //     }

    //     // Access the uploaded files details through req.files
    //     const files = req.files;
        
    //     // Handle each file as needed, e.g., save the file details in the database
    //     files.forEach((file) => {
    //       // Process each file
    //       console.log('Uploaded file:', file.originalname);
    //       // Perform additional processing or save file details to the database
    //     });

    //     return res.status(200).json({ message: 'Files uploaded successfully' });
    //   });







 
   const { id }=req.params
   const {docs} = await payload.find({ 
    collection:"cars",
    where:{
        id:{
         equals:id
        }
    },
   })
   
   const img = await payload.findByID({
    collection:"images",
    id:"656dc69c3182ec1307436861"
   })

   console.log(docs)
   const  allImages : any = docs[0].allImages 
   const uploadedImages={ "image":{
    "id": "656dc69c3182ec1307436861",
    "filename": "nexon-ev-facelift-2023-flame-red.jpg",
    "mimeType": "image/jpeg",
    "filesize": 76066,
    "width": 1254,
    "height": 660,
    "createdAt": "2023-12-04T12:31:24.898Z",
    "updatedAt": "2023-12-04T12:31:24.898Z",
    "url": "/images/nexon-ev-facelift-2023-flame-red.jpg"
},  "id": "sdjgsi"}

    const updated = await payload.update({ 
    collection:"cars",
    where:{
        id:{
         equals:id
        }
    },
    data:{
        allImages:[
             { image:img.id,id:"asdjasd" }
        ]
    }
   })
  
   res.json(updated)
}