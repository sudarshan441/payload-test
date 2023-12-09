import { CollectionConfig } from "payload/types";

const Images: CollectionConfig = {
    slug: "images",
    access:{
    // read:()=>true,
    }, 
    fields:[
    {name:"alt",
    type:"text"}
    ],
    upload:{
        staticURL: '/images',
        staticDir: 'images',
        mimeTypes: ['image/*'],
        adminThumbnail: ({ doc }) => `http://localhost:3000/images/${doc.filename}`,
    }
  }
  
  export default Images