import { CollectionConfig } from "payload/types";
import { CustomSelectField } from "../fields/customSelect/field";
import { CustomTextField } from "../fields/customField/field";
import { uploadImageHandler } from "../handlers/uploadImageHandler";
import { CustomInputField } from "../fields/customImage/field";
import { CustomImageField } from "../fields/ImageComponent/field";

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
    CustomInputField,
    CustomImageField,
    {
      name: "allImages",
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
