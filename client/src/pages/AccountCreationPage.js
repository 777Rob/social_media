import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  Text,
  Button,
  Stepper,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PROFILE_CONTRACT_ABI, PROFILE_CONTRACT_ADDRESS } from "contracts";
import { useSnackbar } from "notistack";

import StepThree from "components/Account/CreationSteps/StepThree";
import StepFour from "components/Account/CreationSteps/StepFour";
import StepOne from "components/Account/CreationSteps/StepOne";
import StepTwo from "components/Account/CreationSteps/StepTwo";

// @Description: This page is the wizard used for creating an account
const AccountCreation = () => {
  const { Moralis } = useMoralis();

  // Get current user object
  const user = Moralis.User.current();

  // Set state of an active page to 0
  const [active, setActive] = useState(0);

  // Categories from step1
  const [selectedCategories, setSelectedCategories] = useState([]);

  // For making contract calls
  const contractProcessor = useWeb3ExecuteFunction();

  // get enqueSnackbar from notistack to show notifications
  const { enqueueSnackbar } = useSnackbar();

  // Get navigate function from react-router-dom to navigate to other pages
  const navigate = useNavigate();

  // Function for making contract call to create account
  const mintProfile = async () => {
    // Call options for contract call
    let options = {
      contractAddress: PROFILE_CONTRACT_ADDRESS,
      abi: PROFILE_CONTRACT_ABI,
      functionName: "createProfile",
      params: {
        _interestCategories: selectedCategories,
        _lensProfileID: 3,
      },
      msgValue: Moralis.Units.ETH(0),
    };

    // Call contract
    await contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        // On successfull call create user and navigate home
        console.log("SUCCESS");
        user.set("profileCompleted", true);
        await user.save();
        window.location.reload();
        navigate("/Welcome");
      },
      onError: (error) => {
        // On error display error
        enqueueSnackbar(
          `Error occured during minting please try again. Error data:${error.message}`,
          { variant: "error" }
        );
        console.log(error.message);
      },
    });
  };

  // Function for going to the next step
  const nextStep = async () => {

    // If it is the last step mint profile and navigate home
    if (active === 4) {
      console.log("Subbmiting contract interaction");
      mintProfile();
    }

    // Else go to next step
    // Check if user selected atleast 1 category
    if (active === 0 && selectedCategories.length < 0) {

      alert("Please select atleast 1 category");
    } else if (active === 0 && selectedCategories.length > 0) {
      // Set user interest categories to selected categories
      user.set("interestCategories", selectedCategories);

      //Save changes in user in Moralis database and navigate to next step
      await user.save();
      setActive(active + 1);

    } else {
      // Navigate to next setp
      setActive(active + 1);
    }
  };

  // Function for going back to previous step
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Account Creation
      </Text>

      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <StepOne selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        <StepTwo />
        <StepThree />
        <StepFour />
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/* Buttons for navigating steps */}

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>
          {active !== 4 ? (
            <Text>Next step</Text>
          ) : (
            <Text>Complete and mint profile NFT</Text>
          )}
        </Button>
      </Group>
    </div>
  );

};

export default AccountCreation;

