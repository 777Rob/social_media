import {
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

/* 
  Button component to be put into the Navbar
  Takes as parameters its icon, color, name (text on the button) and path (where to redirect on click)
*/
export const NavbarComponentButton = ({ icon, color, name, path }) => {
  const navigate = useNavigate();
  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Button icon and name as a group component */}
      <Group>
        <ThemeIcon color={color} variant="light" radius="md">
          {icon}
        </ThemeIcon>

        <Text size="sm">{name}</Text>
      </Group>
    </UnstyledButton>
  );
};