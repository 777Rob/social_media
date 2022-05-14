import {
  Box,
  Group,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { Navigation } from "data/Navigation";
import React from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import Avatar from "components/Avatar";

const NavbarFooter = () => {
  const theme = useMantineTheme();
  const { user, account } = useMoralis();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
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
        }}
      >
        <Group sx={{display: "flex", justifyContent: "center"}}>
          <Avatar/>
          {theme.dir === "ltr" ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
          <Box sx={{ flex: 1, flexDirection: "row" }}>
            <Text  size="sm" weight={500}>
              {user.attributes.userName ? user.attributes.userName : "anon"}
            <Text color="dimmed" sx={{width: "150px", fontSize: "10px", overflow: "clip"}}>
            {account}
            </Text>
            </Text>
          </Box>

        </Group>
      </UnstyledButton>
    </Box>
  );
};

const NavigationLink = ({ icon, color, name, path }) => {
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
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{name}</Text>
      </Group>
    </UnstyledButton>
  );
};

export const NavbarComponent = () => {
  return (
    <Navbar fixed={true} width={{ base: 220 }}  p="xs">
      <Navbar.Section grow mt="md">
        {Navigation.map((item) => (
          <NavigationLink name={item.name} icon={item.icon} path={item.path} />
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <NavbarFooter />
      </Navbar.Section>{" "}
    </Navbar>
  );
};


