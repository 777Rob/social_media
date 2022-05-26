import { Text, Box, Button, Image, TextInput } from "@mantine/core";
import UploadButton from "components/Common/UploadFileButton";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { SET_COMMUNITY_DETAILS } from "redux/Community/createCommunitySlice";

export const StepTwo = () => {
	// Second step of community creation wizzard`
	// Get state and dispatch function

	const state = useSelector(state => state.createCommunity);
	const form = state.communityDetails;
	const dispatch = useDispatch();
	// Track state of the form, set it to state from the reducer as an initial state
	// const [form, setForm] = useState(state.communityDetails);
	// Get wallet address of an user
	const { account } = useMoralis();

	// Perform an action after a file uploaded
	const fileAction = ipfsUrl => {
		// Set image
		dispatch(SET_COMMUNITY_DETAILS({ ...form, image: ipfsUrl }));
	};
	console.log(account);
	return (
		<Box sx={{ spacing: "20px" }}>
			{/* Name */}
			<TextInput
				placeholder="Community name"
				label="Community name"
				name="name"
				value={form.name}
				onChange={e => {
					dispatch(SET_COMMUNITY_DETAILS({ ...form, name: e.target.value }));
				}}
				variant="filled"
				radius="md"
				size="md"
				required
			/>

			{/* Ticker */}
			<TextInput
				placeholder="Ticker"
				label="Ticker"
				name="Ticker"
				value={form.ticker}
				onChange={e => {
					dispatch(SET_COMMUNITY_DETAILS({ ...form, ticker: e.target.value }));
				}}
				variant="filled"
				radius="md"
				size="md"
				required
			/>

			{/* Description */}
			<TextInput
				placeholder="Description"
				label="Description"
				name="Description"
				value={form.description}
				onChange={e => {
					dispatch(
						SET_COMMUNITY_DETAILS({ ...form, description: e.target.value })
					);
				}}
				variant="filled"
				radius="md"
				size="md"
				required
			/>

			{/* Member limit */}
			<TextInput
				placeholder="Member Limit"
				label="Member Limit"
				name="Member Limit"
				value={form.memberLimit}
				onChange={e => {
					dispatch(
						SET_COMMUNITY_DETAILS({ ...form, memberLimit: e.target.value })
					);
				}}
				variant="filled"
				radius="md"
				size="md"
				required
			/>

			{/* Image */}
			<Text>Image</Text>
			<Image width="400px" src={form.image} />

			{/* Upload button */}
			<UploadButton color="indigo" radius="md" fileAction={fileAction} />

			{/* If not free for everyone ask for beneficiary */}
			{state.membershipType !== 3 && (
				<>
					<TextInput
						placeholder="Beneficiary"
						label="Beneficiary"
						name="Beneficiary"
						value={form.beneficiary}
						onChange={e => {
							dispatch(
								SET_COMMUNITY_DETAILS({ ...form, beneficiary: e.target.value })
							);
						}}
						variant="filled"
						radius="md"
						size="md"
						required
					/>
					<Button
						onClick={() => {
							dispatch(
								SET_COMMUNITY_DETAILS({ ...form, beneficiary: account })
							);
						}}
					>
						Set to your address
					</Button>
				</>
			)}

			{/* If one time fee ask for fee*/}
			{state.membershipType === 2 && (
				<TextInput
					placeholder="Membership price MATIC"
					label="Membership price MATIC"
					name="Membership price MATIC"
					value={form.price}
					onChange={e => {
						dispatch(
							SET_COMMUNITY_DETAILS({
								...form,
								period: parseInt(e.target.value),
							})
						);
					}}
					variant="filled"
					radius="md"
					size="md"
					required
				/>
			)}

			{/* If subscription based ask for subscription details*/}
			{state.membershipType === 1 && (
				<TextInput
					placeholder="Minimum subscription period "
					label="Minimum subscribtion period"
					name="Membership price MATIC"
					value={form.period}
					onChange={e => {
						dispatch(
							SET_COMMUNITY_DETAILS({
								...form,
								period: parseInt(e.target.value),
							})
						);
					}}
					variant="filled"
					radius="md"
					size="md"
					required
				/>
			)}
			{state.membershipType === 1 && (
				<TextInput
					placeholder="Price per day"
					label="Price per day"
					name="Price per day"
					value={form.price}
					onChange={e => {
						dispatch(
							SET_COMMUNITY_DETAILS({
								...form,
								price: parseInt(e.target.value),
							})
						);
					}}
					variant="filled"
					radius="md"
					size="md"
					required
				/>
			)}
		</Box>
	);
};
