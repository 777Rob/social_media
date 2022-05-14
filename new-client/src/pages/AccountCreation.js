import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  Text,
  BackgroundImage,
  Button,
  Center,
  Grid,
  Checkbox,
  Stepper,
  Group,
} from "@mantine/core";
import { Categories } from "data/Categories/categories";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MultiSelect } from "@mantine/core";
import { PROFILE_CONTRACT_ABI } from "contracts/abis";
import { PROFILE_CONTRACT_ADDRESS } from "contracts/addresses";
import { DatePicker, Input, Form } from "web3uikit";
import { useSnackbar } from 'notistack';

const AccountCreation = () => {
  const { Moralis } = useMoralis();
  // User object
  const user = Moralis.User.current();

  // Current page
  const [active, setActive] = useState(0);

  // Categories from step1
  const [selectedCategories, setSelectedCategories] = useState([]);
  // For making contract calls
  const contractProcessor = useWeb3ExecuteFunction();

  // Notifications
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  // Function for making contract call
  const mintProfile = async () => {
    // Call options
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

    // Call
    await contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        // On successfull call create user and navigate home
        console.log("SUCCESS");
        user.set("profileCompleted", true);
        await user.save();
        navigate("/Welcome");
      },
      onError: (error) => {
        // On error display error
        enqueueSnackbar(`Error occured during minting please try again. Error data:${error.message}`, { variant: "error" });
        console.log(error.message);
      },
    });
  };

  // Go to next step
  const nextStep = async () => {
    console.log(active);
    // If it is the last step mint profile and navigate home
    if (active === 4) {
      console.log("Subbmiting contract interaction");
      mintProfile();
    }
    // Check if user selected atleast 1 category
    if (active === 0 && selectedCategories.length < 0) {
      alert("Please select atleast 1 category");
    } else if (active === 0 && selectedCategories.length > 0) {
      // Save category
      user.set("interestCategories", selectedCategories);
      await user.save();
      setActive(active + 1);
    } else {
      setActive(active + 1);
    }
  };
  // Go Back
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Account Creation
      </Text>

      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        {/* Step 1 */}

        <Stepper.Step
          label="First step"
          description="Select topic you are interested in"
        >
          Select topic you are interested in.
          {/* <Grid>
        {Categories.map((category) => (
          <Grid.item span={3}>
            <BackgroundImage
              src={category.image}
              radius="md"
              alt={category.name}
              placeholder={<Text align="center">{category.name}</Text>}
              withPlaceholder
            >
              <Center p="md">
                <Checkbox label="I agree to sell my privacy" />
                <Text sx={{ width: "400px" }} align="center">
                  {category.name}
                </Text>
              </Center>
            </BackgroundImage>
          </Grid.item>
        ))}
      </Grid> */}
          <MultiSelect
            data={Categories.map((category, i) => ({
              value: i,
              label: (
                <Text>
                  {category.icon}
                  {category.name}
                </Text>
              ),
            }))}
            value={selectedCategories}
            onChange={setSelectedCategories}
            label="Pick categories you would like to follow:"
            placeholder="Pick all that you like"
          />
        </Stepper.Step>

        {/* Step 2 */}

        <Stepper.Step label="Second step" description="Select your user name">
          <Text
            sx={{ fontWeight: "bold", fontSize: "18px", marginBottom: "20px" }}
          >
            Select your user name:
          </Text>
          <Input
            label="User name"
            name="User name"
            prefixIcon="cube"
            width="70%"
          />
        </Stepper.Step>

        {/* Step 3 */}

        <Stepper.Step label="Third step" description="Complete profile">
          <Text
            sx={{ fontWeight: "bold", fontSize: "18px", marginBottom: "20px" }}
          >
            Complete profile information
          </Text>
          {/* <Input label="Website" name="Website" prefixIcon="cube" width="70%" />
          <Input label="Bio" name="Bio" prefixIcon="cube" width="70%" />
          <DatePicker
            id="date-picker"
            onChange={function noRefCheck() {}}
          />{" "} */}
          {/* Form  */}
          <Form
            buttonConfig={{
              onClick: function noRefCheck() { },
              theme: "primary",
            }}
            data={[
              {
                inputWidth: "100%",
                name: "First name",
                type: "text",
                value: "",
              },
              {
                inputWidth: "100%",
                name: "Last name",
                type: "text",
                value: "",
              },
              {
                inputWidth: "100%",
                name: "Email address",
                type: "email",
                validation: {
                  regExp: "^[^@s]+@[^@s]+.[^@s]+$",
                },
                value: "",
              },
              {
                name: "Birthday",
                type: "date",
                value: "Enter your birthday date",
              },
              {
                inputWidth: "100%",
                name: "Your Bio",
                type: "textarea",
                validation: {
                  required: true,
                },
                value: "",
              },
            ]}
            onSubmit={function noRefCheck() { }}
            title="Your Profile"
          />
        </Stepper.Step>

        {/* Step 4 */}

        <Stepper.Step
          label="Fourth step"
          description="Configure reward settings"
        >
          Offer user to opt-in for advertising of a products that user can be
          intersested in and configure earning profile and select how many ads
          user wants to receive if at all
        </Stepper.Step>
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
          {active != 4 ? (
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
