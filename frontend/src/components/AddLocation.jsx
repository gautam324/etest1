import React from 'react'
import { useForm } from '@mantine/form'
import { validateString } from '../utils/common'
import { Select, TextInput, Group, Button } from '@mantine/core'
import useCountries from '../hooks/useCountries'
import Map from './Map'


const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {

  const { getAll } = useCountries()
  //console.log('Datos de países:', getAll());

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value)
    }
  })

  const { country, city, address } = form.values;

  const handleSubmit= () => {
    const { hasErrors } = form.validate()
    if(!hasErrors){
      setPropertyDetails((prev) => ({...prev, country, city, address}))
      nextStep()
      //console.log(propertyDetails);
    }
  
  } 

  return (
    <form 
      className="" 
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}>
      <div className="flexCenter">
        {/* left */}
        <div className="flexCenter flex-1">
          {/* inputs */}
          <div>
            <Select
              w={"100%"}
              withAsterisk
              label="Country"
              clearable
              searchable
              data={getAll()}
              {...form.getInputProps("country", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="City"
              {...form.getInputProps("city", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="Address"
              {...form.getInputProps("address", { type: "input" })}
            />
          </div>
        </div>
        {/* right */}
        <div className="flex-1">
          <Map
            country={country}
            city={city}
            address={address}
          />
        </div>
      </div>

      <Group justify="center" mt="xl">
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  )
}

export default AddLocation