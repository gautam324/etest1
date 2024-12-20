import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { Group, Button } from '@mantine/core'

const UploadImage = ({ nextStep, prevStep, propertyDetails, setPropertyDetails }) => {
  
  const[imageURL, setImageURL] = useState(propertyDetails.image)
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const handleNext = () => {                                              // Cuando se le da handleNext
    setPropertyDetails((prev) => ({...prev, image: imageURL}))            // Se añade a propertyDetails el valor de la imagen
    nextStep()                                                            // y se pasa al siguiente punto
    //console.log(propertyDetails);
  }

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;                            // Carga el widget de cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "downe22q2",
        uploadPreset: "hjr3nguo",
        maxFile: 1
      },
      (err, result) => {                                                  
        if(result.event === "success"){                                   // Si se carga la imagen
          setImageURL(result.info.secure_url)                             // se establece el estado  
        }
      }
    )
  })

  return (
    <div className="mt-12 flexCenter flex-col">
      {
        !imageURL ? (
          <div 
            onClick={() => widgetRef.current?.open()}
            className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
          >
            <MdOutlineCloudUpload 
              size={44}
              color="grey"
            />
            <span>Upload Image</span>
          </div>
        ) : (
          <div
            onClick={() => widgetRef.current?.open()} 
            className="w-3/4 h-[22rem] rounded-xl cursor-pointer overflow-hidden"
          >
              <img src={imageURL} alt="" className="h-full w-full object-cover"/>
          </div>
        )
      }

      <Group justify="center" mt="xl">
        <Button onClick={prevStep}>Go Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
      </Group>
    </div>
  )
}

export default UploadImage