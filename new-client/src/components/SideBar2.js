import SpaceShip from "../images/spaceship.jpg";
import { Box, Text, TextInput, Icon } from "@mantine/core";
import { Button, Card, Input } from "web3uikit";

// TODO ADD Trending posts and ads and query them from contracts/database
const SideBarTrending = [
  {
    title: "New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
  {
    title: "New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
  {
    title: "New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
  {
    title: "New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
];

const SideBarAds = [
  {
    title: "Buy New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
  {
    title: "Buy New spaceship!",
    text: "This spaceShip is trending WOW !!",
    image: SpaceShip,
    link: "/post/420",
  },
];

const SideBar2 = () => {
  // TODO: MAKE IT LOOK GOOD
  return (
    <Box sx={{ marginTop: "20px", padding: "20px" }}>
      {/* MAKE SEARCH WORK */}
      <Input label="Search" name="Search" prefixIcon="search" width="100%" />
      <Box
        sx={{
          border: "0.5px solid black",
          borderRadius: "30px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
          Trending posts
        </Text>
        {SideBarTrending.map((trending) => (
          <Card
            description={trending.text}
            onClick={function noRefCheck() {}}
            setIsSelected={function noRefCheck() {}}
            title={trending.title}
            tooltipText="You are seeing this post based on your previous views and interest profile"
          >
            <img
              src={SpaceShip}
              style={{
                height: "180px",
              }}
            />
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          border: "0.5px solid black",
          borderRadius: "30px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
          Available advertisments
        </Text>

        {/* MAKE ADDS OPEN MODALS */}
        {SideBarAds.map((trending) => (
          <Card
            description={trending.text}
            onClick={function noRefCheck() {}}
            setIsSelected={function noRefCheck() {}}
            title={trending.title}
            tooltipText="You are seeing this post based on your previous views and interest profile"
          >
            <img
              src={SpaceShip}
              style={{
                height: "180px",
              }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};
export default SideBar2;
