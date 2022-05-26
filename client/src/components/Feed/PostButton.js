import { ActionIcon, Group, Text } from "@mantine/core";
import React from "react";

export default function PostButton(props) {
	const amountComponent =
		props.amount === 0 ? (
			<></>
		) : (
			<Text sx={{ fontSize: "12px" }} color={props.color}>
				{" "}
				{props.amount}{" "}
			</Text>
		);

	return (
		<Group spacing="0" sx={{ alignItems: "center" }}>
			<ActionIcon
				variant="light"
				color={props.color}
				radius={10}
				sx={{ marginRight: "3px" }}
			>
				{props.icon}
			</ActionIcon>
			{amountComponent}
		</Group>
	);
}
