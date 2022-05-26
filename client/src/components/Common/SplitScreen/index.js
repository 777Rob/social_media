import { Box } from "@mantine/core";

export const SplitScreen = ({
	left: Left,
	right: Right,
	padding = 10,
	spacing = 10,
}) => {
	// @params
	// left: Left side component
	// right: Right side component
	// padding: padding
	// spacing: spacing
	// Takes in 2 components and puts them on either right or left side of evenly split screen
	return (
		<Box sx={{ display: "flex" }}>
			<Box sx={{ flex: 1, padding: padding, marginRight: spacing }}>
				<Left />
			</Box>
			<Box sx={{ flex: 1, padding: padding, marginLeft: spacing }}>
				<Right />
			</Box>
		</Box>
	);
};
