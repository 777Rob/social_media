import { Button, Tabs, Text, Box, Group } from "@mantine/core";
import { Outlet, useNavigate, useParams } from "react-router-dom";

//  @Description: This page is used to display community it contains navigation between topics 
//  This element will render either "/", "/categories" or "/feed" is in the URL
//  it will  display the component that matches the URL in outlet
//  For more info about outlet see https://reactrouter.com/docs/en/v6/components/outlet#outlet/

const Community = () => {
  // TODO: ADD LOGIC TO CHECK IF MEMBER

  // Get navigate function from react-router-dom to navigate to other pages
  const navigate = useNavigate();
  const isMember = true;

  // Get address from params
  const { address } = useParams();

  // If not member offer to join
  if (!isMember) {
    return <Button>Join</Button>;
  }

  return (
    <Box>

      <Text align="center" sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {address}
      </Text>

      {/* Navigation */}
      <Group>
        <Button onClick={() => navigate("")}>Latest</Button>
        <Button onClick={() => navigate("categories")}>Categories</Button>
        <Button onClick={() => navigate("feed")}>Feed</Button>
      </Group>


      <Box sx={{ padding: "40px", paddingTop: "0px" }}>
        {/*
          Outlet is the component corresponding to the url.
          Component and url are specified in Routes which are 
          nested the route this component is nested in App.js line 132
        */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Community;
