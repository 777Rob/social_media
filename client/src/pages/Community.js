import { Button, Tabs, Text, Box, Group } from "@mantine/core";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CategoriesPage from "components/Communities/CategoriesPage";
import CommunitiesFeed from "components/Communities/CommunitiesFeed";

const Community = () => {
  // TODO: ADD LOGIC TO CHECK IF MEMBER
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

      <Group>
        <Button onClick={() => navigate("")}>Latest</Button>
        <Button onClick={() => navigate("categories")}>Categories</Button>
        <Button onClick={() => navigate("feed")}>Feed</Button>
      </Group>
      <Box sx={{padding: "40px", paddingTop: "0px"}}>
      <Outlet />
      </Box>
    </Box>
  );
};

export default Community;
