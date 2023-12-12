import React from "react"
import CustomInputComponent from "../fields/customImage/component"

type Props = {}

export default function InteriorImagesCustom({}: Props) {
  return (
    <CustomInputComponent imagePath={"interiorImages"} name={"Interior"} key={'int'} />
  )
}