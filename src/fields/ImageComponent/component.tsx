import { useAllFormFields } from 'payload/components/forms';
import UploadInput from 'payload/dist/admin/components/forms/field-types/Upload';
import { FieldType as FieldType, Options } from 'payload/dist/admin/components/forms/useField/types';
import { UploadField } from 'payload/types';
// import  UploadInput  from 'payload/components/forms';
import React, { useState } from 'react';



const CustomImageComponent = ({ path }) => {
  const fieldTypes = {
    // ... other field types
    // upload: UploadInput as React.FC<UploadField>,
    // ... other field types
  };
  
  // const fieldTypes = {
  //   code: "code",
  //   json: "json",
  //   email: "email",
  //   hidden: "hidden",
  //   text: "text",
  //   date: "date",
  //   password: "password",
  //   confirmPassword:"confirmPassword",
  //   relationship: "rrelationship",
  //   textarea: "textarea",
  //   select: "select",
  //   number: "number",
  //   point: "point",
  //   checkbox: "checkbox",
  //   richText:"richText",
  //   radio: "radio",
  //   blocks: "blocks",
  //   group:"group",
  //   array: "array",
  //   row: "row",
  //   collapsible: "collapsible",
  //   tabs: "tabs",
  //   upload: "upload",
  //   ui: "ui"
  //   // Add other required field types here
  // };
  
  return (
    <div>
      {/* <UploadInput name={path} path={path} relationTo="images" fieldTypes={fieldTypes}></UploadInput> */}
    </div>
  );
};

export  { CustomImageComponent };
