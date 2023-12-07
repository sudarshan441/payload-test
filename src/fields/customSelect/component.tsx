import * as React from "react";
import { TextInput, useField } from "payload/components/forms";
// import { useParams } from 'react-router-dom'; 

export const CustomSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  // const {id} = useParams()
  // console.log(value);
  const [car, setCar] = React.useState(``);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("handleClick");
  };

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          "https://cms.evfy.in/api/carmodels/653b7d84322f0139c4db89d8"
        );
        const data = await response.json();
        // console.log(data);

       let make = data.brand
       let model = data.modelName
       let colors = data.colors.map(col=>col.name);
       let power = data.power
       let topSpeed= data.topSpeed
       const vehicleSpecs = `
                    Make: ${make}
                    Model: ${model}
                    Year: 2023
                    Colors: ${colors.join(', ')}
                    Engine: Electric
                    power: ${power}
                    top speed: ${topSpeed}
                    Features: Autopilot, Full Self-Driving Capability
                    `;

        setCar(vehicleSpecs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div>
      {/* <TextInput style={{height:"500px",width:"500px"}} path={path} name={path} value={car}></TextInput> */}
     
      <button onClick={handleClick}>send</button>
    </div>
  );
};
