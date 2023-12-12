import { CollectionConfig } from "payload/types";
import { CustomSelectField } from "../fields/customSelect/field";
import { CustomTextField } from "../fields/customField/field";
import { uploadImageHandler } from "../handlers/uploadImageHandler";
import { CustomExteriorImages } from "../fields/customImage/ExteriorField";
import { CustomInteriorImages } from "../fields/customImage/InteriorField";
// import { CustomImageField } from "../fields/ImageComponent/field";

const Cars: CollectionConfig = {
  slug: "cars",
  endpoints:[
      {
        path:"/upload/image/:id",
        method:"patch",
        handler:uploadImageHandler,
      }
  ],
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "images",
    },
    CustomExteriorImages,
    // CustomImageField,
    {
      name: "exteriorImages",
      type: "array",
      fields:[
        {
          name: "image",
          type: "upload",
          relationTo: "images",
        },
      ]
    },
    CustomInteriorImages,
    {
      name: "interiorImages",
      type: "array",
      fields:[
        {
          name: "image",
          type: "upload",
          relationTo: "images",
        },
      ]
    },
    {
      name: "name",
      type: "text",
      // required: true,
    },
    {
      name: "make",
      type: "text",
      // required: true,
    },
    {
      name: "model",
      type: "text",
      // required: true,
    },
    {
      name: "price",
      type: "number",
      // required: true,
    },
    {
      name: "colors",
      type: "array",
      fields: [
        {
          name: "color",
          type: "text",
        },
      ],
    },
    {
      name: "topSpeed",
      type: "text",
      // required: true,
    },
    {
      name: "batteryRange",
      type: "text",
      // required: true,
    },
    {
      name: "type",
      type: "select",
      // required: true,
      options: [
        { label: "Sedan", value: "sedan" },
        { label: "SUV", value: "suv" },
        { label: "Truck", value: "truck" },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "Specification",
      type: "textarea",
    },
    // CustomSelectField,
    CustomTextField,
  ],
};

export default Cars;
