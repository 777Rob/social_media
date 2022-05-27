import { Text, Stepper } from "@mantine/core";
import { Input } from "web3uikit";

// In the second step we ask user to enter his username
const StepTwo = () => {
	return (
		<>
			{" "}
			<Text sx={{ fontWeight: "bold", fontSize: "18px", marginBottom: "20px" }}>
				Select your user name:
			</Text>
			<Input label="User name" name="User name" prefixIcon="cube" width="70%" />
		</>
	);
};

export default StepTwo;
