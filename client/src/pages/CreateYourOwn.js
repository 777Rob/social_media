import {
  Stepper,
  Button,
  Group,
} from "@mantine/core";
import { useState, useReducer } from "react";
import { StepOne } from "components/Communities/Create/StepOne";
import { StepTwo } from "components/Communities/Create/StepTwo";
import { StepThree } from "components/Communities/Create/StepThree";

const CreateYourOwn = () => {
  // Set active step
  const [active, setActive] = useState(0);
  // Get state and dispatch function from the reducer

  // Functions to change step
  const nextStep = () => setActive(active + 1);
  const prevStep = () => setActive(active - 1);

  return (
    <>
      {/* Stepper */}
      <Stepper color="indigo" radius="lg" size="xl" active={active}>
        {/* Step */}
        <Stepper.Step label="First step" description="Member requirments">
          <StepOne />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Configuration">
          <StepTwo />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Review and mint">
          <StepThree/>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/* Button to change steps */}
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
