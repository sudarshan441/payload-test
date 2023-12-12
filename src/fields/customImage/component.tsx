import { Button } from "payload/components/elements";
import {
  TextInput,
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
import { Modal, useModal } from "@faceless-ui/modal";
import { MinimalTemplate } from "payload/components/templates";

type FileWithPreview = {
  file: File;
  preview: string;
  alt: string;
};

const CustomInputComponent = ({imagePath, name}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  // console.log(selectedFiles)
  const [fields, dispatchFields] = useAllFormFields();
  const { addFieldRow } = useForm();
  const myRefname= useRef<HTMLInputElement>(null);
  const { toggleModal } = useModal();

  const modalSlug = name;

  // const formFeilds = reduceFieldsToValues(fields, true);
  // console.log(formFeilds);
  const handleButtonClick = () => {
    // Use current property to access the DOM element and trigger the click event
    myRefname.current.click();
  };

  const handleAltChange=(e,index)=>{
    const arr=selectedFiles.map((file,i)=>{
      if(index == i){
        return { ...file, alt: e.target.value}
      }else{
        return file;
      }
    })
    setSelectedFiles(arr);
  }
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
              alt:name+" "+file.name
            });
          };
        })
    );
    Promise.all(promises).then((filesWithPreview) => {
      setSelectedFiles((prevFiles) =>{
        return [...prevFiles, ...filesWithPreview,]} );
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
      formData.append("alt",file.alt);
    });
    setSelectedFiles([])
    try {
      const response = await fetch("/api/custom/route", {
        method: "PATCH",
        body: formData,
      });
      const res = await response.json();
      const imageArray = res.data.map((e) => ({
        id: new Date().getSeconds().toString(),
        image: e.id,
      }));
      imageArray.forEach((element, i) => {
        addFieldRow({ path: imagePath, rowIndex: i, data: element });
      });
      console.log("Backend response:", res?.data);
    } catch (error) {
      console.error("Error sending images to the backend:", error);
    }
  };

  return (
    <div>
      <Button icon="plus" buttonStyle="secondary" size="small" onClick={() => toggleModal(modalSlug)}>{fields[imagePath].value ?`Add more ${name} Images`:`Add ${name} Images`}</Button>
      <Modal slug={modalSlug} className="delete-document">
      <MinimalTemplate style={{height:"100vh"}}  width="wide" className="delete-document__template">
        <div>
        <h1>Upload { name } Images</h1>
        <div style={{display:"inline-flex",justifyContent:"center"}} onClick={handleButtonClick}>
        <Button  icon="plus" buttonStyle="secondary" size="small">
        <label>{selectedFiles.length > 0 ?"upload more Images":"upload Images"}</label>
        <input
          ref={myRefname}
          id="addimages"
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
      {selectedFiles.length>0 ? <h4 style={{marginTop:"10px"}}>Selected Images</h4> : <h4 style={{marginTop:"10px"}}>No Images Selected</h4>}
      <div style={{ width:"100%",height:"450px",overflow:"auto",padding:"15px 15px 15px 0px"}}>
          {selectedFiles.map((file, index) => (
            <div style={{width:"100%", display:"flex", justifyContent:"space-between",marginBottom:"20px", backgroundColor:index%2?"rgb(60, 60, 60)":"rgb(90, 90, 90)", padding:"10px"}}  key={index}>
              <div style={{width:"200px", height: "100px", overflow:"hidden"}}>
              <img
                src={file.preview}
                alt={`Preview-${index}`}
                style={{
                  display:"block",
                  width: "100%",
                  height: "auto",
                  aspectRatio:"16/9",
                  objectFit:"cover"
                  // marginRight: "10px",
                }}
              />
              </div>
              <div style={{width:"60%"}}>
              <h4>
              {file.file.name} - {file.file.size / 1000} KB
              </h4>
              <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <label htmlFor="alt">Alt Text</label>
              <TextInput name="alt" path="alt" value={file.alt} width="500px" onChange={(e)=>{
                    handleAltChange(e,index);
              }}></TextInput>
              </div>
              </div>
              <div style={{display:"flex",alignItems:"end"}}>
              <Button size="small" onClick={(e) => removeFile(e, index)}>Remove</Button>
              </div>
            </div>
           
          ))}
      </div >
      <div className="delete-document__actions">
      <Button
              buttonStyle="secondary"
              onClick={() => {
                setSelectedFiles([]);
                toggleModal(modalSlug);
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
                toggleModal(modalSlug);
              }}
            >
              Upload
            </Button>
       </div>    
        </div>
      </MinimalTemplate>
      </Modal>
    </div>
  );
};

export default CustomInputComponent