import React from "react"
import CustomInputComponent from "../fields/customImage/component"

type Props = {}

export default function ExteriorImagesCustom({}: Props) {
  return (
    <CustomInputComponent imagePath={"exteriorImages"} name={"Exterior"} key={'ext'}/>
  )
}