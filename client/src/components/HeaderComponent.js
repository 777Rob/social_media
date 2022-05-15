import {
    ActionIcon,
    Group,
    Header,
    Text,
    useMantineTheme,
  } from "@mantine/core";
  import { LogoText } from "data/Logo";
  import { Navigation } from "data/Navigation";
  import React from "react";
  import { useLocation } from "react-router-dom";
  import { MoonStars, Sun } from "tabler-icons-react";
  import "../styling/App.css";

export const HeaderComponent = ({ toggleColorScheme, colorScheme }) => {
    const theme = useMantineTheme();
    const locationObject = useLocation();
    const locationName = Navigation.filter(
      (item) => locationObject.pathname == item.path
    );
  
    return (
      <Header height={60} p="xs" fixed={true}>
        <Group sx={{ height: "100%" }} px={10} position="apart">
          <LogoText size="45px" />
          
          {/* Page name */}
          <Text sx={theme.headings.sizes.h1}>
              {locationName[0] ? locationName[0].name : ""}
          </Text>
          
          {/* Button to change the theme */}
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
            radius="md"
          >
            {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
        </Group>
      </Header>
    );
  };