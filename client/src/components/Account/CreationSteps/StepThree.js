import { Text, Stepper } from "@mantine/core";
import { Form } from "web3uikit";

// 3rd step in the account creation process
// this step uses the Form component from web3uikit
// to get profile information from the user
export const StepThree = () => {
	return (
		<>
			{" "}
			<Text sx={{ fontWeight: "bold", fontSize: "18px", marginBottom: "20px" }}>
				Complete profile information
			</Text>
			{/* Form  */}
			<Form
				buttonConfig={{
					onClick: function noRefCheck() {},
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
				onSubmit={function noRefCheck() {}}
				title="Your Profile"
			/>
		</>
	);
};

export default StepThree;
