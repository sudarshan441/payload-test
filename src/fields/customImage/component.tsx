import { Button } from "payload/components/elements";
import {
  reduceFieldsToValues,
  useAllFormFields,
  useForm,
} from "payload/components/forms";
import UploadInput from "payload/dist/admin/components/forms/field-types/Upload";
import {
  FieldType as FieldType,
  Options,
} from "payload/dist/admin/components/forms/useField/types";
import React, { useState, useRef } from "react";

type FileWithPreview = {
  file: File;
  preview: string;
};

const CustomInputComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [fields, dispatchFields] = useAllFormFields();
  const { addFieldRow } = useForm();
  const myRefname= useRef<HTMLInputElement>(null);
  // const formFeilds = reduceFieldsToValues(fields, true);
  // console.log(formFeilds);
  const handleButtonClick = () => {
  
    // Use current property to access the DOM element and trigger the click event
    myRefname.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const promises = files.map(
      (file): Promise<FileWithPreview> =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = () => {
            const result = reader.result as string;
            resolve({
              file,
              preview: result,
            });
          };
        })
    );

    Promise.all(promises).then((filesWithPreview) => {
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
    });
  };

  const removeFile = (e, index: number) => {
    e.preventDefault();
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      console.log(formData);
      formData.append("images", file.file);
    });

    try {
      const response = await fetch("/api/custom/route", {
        method: "PATCH",
        body: formData,
      });
      const res = await response.json();
      // console.log(res);
      const imageArray = res.data.map((e) => ({
        id: new Date().getSeconds().toString(),
        image: e.id,
      }));
      // dispatchFields({ type: "UPDATE", path: "allImages", value:imageArray});
      imageArray.forEach((element, i) => {
        // dispatchFields({ type: "ADD_ROW", path: "allImages", rowIndex:i,subFieldState:{:element.image}});
        addFieldRow({ path: "allImages", rowIndex: i, data: element });
      });
      console.log("Backend response:", res?.data);
    } catch (error) {
      console.error("Error sending images to the backend:", error);
    }
  };

  return (
    <div>
      <div onClick={handleButtonClick}>
      <Button  icon="plus" buttonStyle="secondary" size="small">
        <label htmlFor="addimages">{fields.allImages.value ?"Add more Images":"Add Images"}</label>
        <input
          ref={myRefname}
          id="addimages"
          // style={{ display: 'none' }}
          name="addimages"
          type="file"
          accept="image/*"
          multiple
          placeholder="Add Images"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      </div>
      <div>
        <h4>Selected Files:</h4>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <img
                src={file.preview}
                alt={`Preview-${index}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginRight: "10px",
                }}
              />
              {file.file.name} - {file.file.size / 1000} KB
              <button onClick={(e) => removeFile(e, index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <Button buttonStyle="transparent" type="button" onClick={handleSubmit}>
        Upload to Backend
      </Button>
    </div>
  );
};

export { CustomInputComponent };
