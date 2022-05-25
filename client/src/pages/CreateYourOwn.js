import { Button, Group, Stepper } from "@mantine/core";
import { StepOne } from "components/Communities/Create/StepOne";
import { StepThree } from "components/Communities/Create/StepThree";
import { StepTwo } from "components/Communities/Create/StepTwo";
import { useState } from "react";

// @Description: This page is the wizard used for creating a community
const CreateYourOwn = () => {

  // Set active step to 0
  const [active, setActive] = useState(0);

  // Function to navigate to next step
  const nextStep = () => setActive(active + 1);

  // Function to navigate to previous step
  const prevStep = () => setActive(active - 1);

  return (
    <>
      {/* Stepper */}
      <Stepper color="indigo" radius="lg" size="xl" active={active}>

        {/* Display each step */}
        <Stepper.Step label="First step" description="Member requirments">
          <StepOne />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Configuration">
          <StepTwo />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Review and mint">
          <StepThree />
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>

      </Stepper>

      {/* Button group to change steps */}
      <Group position="apart" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>

        {active < 2 && <Button onClick={nextStep}>Next step</Button>}
      </Group>

    </>
  );
};

export default CreateYourOwn;
