import {
  useAllFormFields,
  reduceFieldsToValues,
} from "payload/components/forms";
import * as React from "react";
import { useField, useFormFields } from "payload/components/forms";
import { Button } from "payload/components/elements";
import { useState } from "react";
import { Modal, useModal } from "@faceless-ui/modal";
import { MinimalTemplate } from "payload/components/templates";

export const CustomTextFieldComponent: React.FC<{ path: string }> = ({
  path,
}) => {
  // const { value, setValue } = useField({ path });
  const [vehicleSpecs, setVehicleSpecs] = useState<
    { property: string; value: string | number }[]
  >([]);
  const [editedvehicleSpecs, seteditedvehicleSpecs] = useState<
    { property: string; value: string | number }[]
  >([]);
  const [fields, dispatchFields] = useAllFormFields();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [editedProperty, setEditedProperty] = useState<number | null>(null);
  const { toggleModal } = useModal();
  const modalSlug = "modal-1";

  const handleGenerateDecription = () => {
    dispatchFields({ type: "UPDATE", path: "Specification", value: vehicleSpecs });
  };

  const generateData = () => {
    const formData = reduceFieldsToValues(fields, true);
    const colorsName = formData.colors.map((item) => item.color);

    const newVehicleSpecs = [
      { property: "Make", value: formData.make },
      { property: "Model", value: formData.model },
      { property: "Year", value: 2023 },
      { property: "Colors", value: colorsName.join(", ") },
      { property: "Engine", value: "Electric" },
      { property: "Power", value: formData.power },
      { property: "TopSpeed", value: formData.topSpeed },
      { property: "Features", value: "Autopilot, Full Self-Driving Capability" },
    ];

    setVehicleSpecs([...newVehicleSpecs]);
    seteditedvehicleSpecs([...newVehicleSpecs]);
    // setValue(null);
    setIsButtonClicked(true);
  };

  const handleInputChange = (index: number, newValue: string) => {
    seteditedvehicleSpecs((prevSpecs) =>
      prevSpecs.map((spec, i) =>
        i === index ? { ...spec, value: newValue } : spec
      )
    );
  };

  const handleInputChangeProperty = (index: number, newValue: string) => {
    seteditedvehicleSpecs((prevSpecs) =>
      prevSpecs.map((spec, i) =>{
         return i === index ? { ...spec, property: newValue } : spec
      }
      )
    );
  };

  const handleDeleteRow = (index: number) => {
    seteditedvehicleSpecs((prevSpecs) =>
      prevSpecs.map((spec, i) => (i !== index ? spec : null)).filter(Boolean)
    );
  };
  
  const addRow = () => {
    seteditedvehicleSpecs((prevSpecs) => [
      ...prevSpecs,
      { property: "New Property", value: "New Value" },
    ]);
  };

  return (
    <>
      {isButtonClicked && (
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", background: "#f2f2f2" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Property</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {vehicleSpecs.map(({ property, value }, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", borderRight: "1px solid #ddd" }}>
                {editedProperty === index ? (
                    <input
                      type="text"
                      value={property}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    />
                    ) : (
                      property
                    )}
                </td>
                <td style={{ padding: "12px", borderRight: "1px solid #ddd" }}>
                  {editedProperty === index ? (
                    <input
                      type="text"
                      value={value !== undefined ? value.toString() : ''}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    />
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button onClick={generateData}>Generate Form Data</Button>
      <Button onClick={() => toggleModal(modalSlug)}>Add Manual Data</Button>
      <Button onClick={handleGenerateDecription}>Generate Description</Button>
      <Modal slug={modalSlug} className="delete-document">
        <MinimalTemplate className="delete-document__template">
          <h1>Modal</h1>
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd", background: "#f2f2f2" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Property</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Value</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {editedvehicleSpecs.map(({ property, value }, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px", borderRight: "1px solid #ddd" }}>
                        <input
                          type="text"
                          value={property}
                          onChange={(e) => handleInputChangeProperty(index, e.target.value)}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        />
                    </td>
                    <td style={{ padding: "12px", borderRight: "1px solid #ddd" }}>
                      <input
                        type="text"
                        value={value !== undefined ? value.toString() : ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px", borderRight: "1px solid #ddd" }}>
                      <Button onClick={()=>{handleDeleteRow(index)}}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="delete-document__actions">
            <Button
              buttonStyle="secondary"
              onClick={() => {
                toggleModal(modalSlug);
              }}
            >
              Close
            </Button>
            <Button onClick={addRow}>Add Row</Button>
            <Button
              onClick={() => {
                setVehicleSpecs(editedvehicleSpecs)
                toggleModal(modalSlug);
              }}
            >
              Apply
            </Button>
          </div>
        </MinimalTemplate>
      </Modal>
    </>
  );
};
