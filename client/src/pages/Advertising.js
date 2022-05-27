import {
	TextInput,
	Checkbox,
	Button,
	Group,
	Box,
	Paper,
	Tabs,
	NumberInput,
	Text,
	MultiSelect,
	Card,
	Image,
	Badge,
	Progress,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Categories } from "data/Categories/categories";
import { useState } from "react";

const Advertising = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const form = useForm({
		initialValues: {
			name: "",
			termsOfService: false,
		},
	});

	return (
		<Paper shadow="xs" p={20}>
			<Box sx={{ maxWidth: 500 }} mx="auto">
				<Tabs position="center">
					<Tabs.Tab label="Post an Ad">
						<form onSubmit={form.onSubmit(values => console.log(values))}>
							<TextInput
								required
								label="Title"
								placeholder="How would you name your advertisement?"
								{...form.getInputProps("name")}
							/>
							<NumberInput
								required
								label="How many people do you want to reach out?"
								placeholder="420 people"
							/>
							<NumberInput
								required
								description="Write the amount in BAT"
								label="How many tokens are you willing to spend?"
								placeholder="Amount"
							/>
							<MultiSelect
								data={Categories.map((category, i) => ({
									value: i,
									label: (
										<Text>
											{category.icon}
											{" " + category.name}
										</Text>
									),
								}))}
								value={selectedCategories}
								onChange={setSelectedCategories}
								label="Which categories do you want to target? "
								placeholder="Pick few"
							/>
							<Checkbox
								mt="md"
								label="I agree to sell my ass"
								{...form.getInputProps("termsOfService", { type: "checkbox" })}
							/>

							<Group position="center" mt="md">
								<Button type="submit">Submit</Button>
							</Group>
						</form>
					</Tabs.Tab>
					<Tabs.Tab label="View Auction">
						<Card shadow="sm" p="lg">
							<Card.Section
								component="a"
								href="https://mantine.dev"
								target="_blank"
							>
								<Image
									src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
									height={160}
									alt="Norway"
								/>
							</Card.Section>

							<Group position="apart" style={{ margin: 10 }}>
								<Text weight={500}>AD TO GO TO NORWAY</Text>
								<Badge color="pink" variant="light">
									5 days ago
								</Badge>
							</Group>

							<Text size="sm" p={10}>
								beautiful ad that has reached out <b>420/560</b> people as of
								now with the reward of <b>5</b> BAT per ad
							</Text>
							<Progress value={75} label="75%" size="xl" radius="xl" />
						</Card>
						<Card shadow="sm" p="lg">
							<Card.Section
								component="a"
								href="https://mantine.dev"
								target="_blank"
							>
								<Image
									src="https://images.unsplash.com/photo-1638913658179-18c9a9c943f7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
									height={160}
									alt="Norway"
								/>
							</Card.Section>

							<Group position="apart" style={{ margin: 10 }}>
								<Text weight={500}>BUY TEZOS NOW</Text>
								<Badge color="pink" variant="light">
									11 days ago
								</Badge>
							</Group>

							<Text size="sm" p={10}>
								beautiful ad that has reached out <b>420/588</b> people as of
								now with the reward of <b>4</b> BAT per ad
							</Text>
							<Progress value={60} label="60%" size="xl" radius="xl" />
						</Card>
					</Tabs.Tab>
				</Tabs>
			</Box>
		</Paper>
	);
};

export default Advertising;
