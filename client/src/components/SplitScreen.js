import { Box } from "@mantine/core";

export const SplitScreen = ({
  left: Left,
  right: Right,
  padding = 10,
  spacing = 10,
}) => {
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
