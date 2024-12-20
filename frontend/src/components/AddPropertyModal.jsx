import React, {useState} from 'react'
import { Modal } from '@mantine/core'
import { Container, Stepper, Button, Group } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react'
import AddLocation  from './AddLocation'
import UploadImage from './UploadImage';
import Facilities from './Facilities'
import BasicDetails from './BasicDetails';

const AddPropertyModal = ({opened, setOpened}) => {

  const [active, setActive] = useState(1);
  const { user } = useAuth0()
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <>
          <Stepper 
            active={active} 
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Location" description="Address">
              <AddLocation 
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
            
            <Stepper.Step label="Images" description="Upload">
              <UploadImage
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>

            <Stepper.Step label="Basics" description="Details">
              <BasicDetails
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
            
            <Stepper.Step label="Final step" description="Get full access">
              <Facilities 
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
                setOpened={setOpened}  
                setActive={setActive}
              />
            </Stepper.Step>
            
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>

          



        </>
      </Container>
    </Modal>
  )
}

export default AddPropertyModal