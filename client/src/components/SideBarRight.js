import { useState } from "react";
import {
  Box,
  Text,
  TextInput,
  Icon,
  Modal,
  Image,
  Button,
  Group,
  Space,
} from "@mantine/core";
import { Card, Input } from "web3uikit";
import { SideBarTrending, SideBarAds, SpaceShip } from "data/mock";
// TODO ADD Trending posts and ads and query them from contracts/database

const Styles = {
  container: {
    border: "1px solid black",
    borderRadius: "30px",
    padding: "20px",
    marginTop: "20px",
  },
};

const SideBar2 = () => {
  // TODO: MAKE IT LOOK GOOD
  const [opened, setOpened] = useState(false);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* MAKE SEARCH WORK */}
      <Input label="Search" name="Search" prefixIcon="search" width="100%" />
      <Box sx={Styles.container}>
        <Text sx={{ fontSize: "24px", fontWeight: "bold", padding: "10px" }}>
          Trending posts
        </Text>
        {SideBarTrending.map((trending) => (
          <Box sx={{ marginTop: "15px", marginBottom: "15px" }}>
            <Card
              description={trending.text}
              onClick={function noRefCheck() {}}
              setIsSelected={function noRefCheck() {}}
              title={trending.title}
              tooltipText="You are seeing this post based on your previous views and interest profile"
            >
              <Image src={SpaceShip} height={90} width={200} />
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={Styles.container}>
        <Text sx={{ fontSize: "24px", fontWeight: "bold", padding: "10px" }}>
          Available advertisments
        </Text>
        {/* MAKE ADDS OPEN MODALS */}
        {SideBarAds.map((trending) => (
          <>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title={trending.title}
            >
              More ifno about ad
              {trending.text}
              <Text>Rate advertisment and claim a reward</Text>
              <Button radius="md">Good</Button>
              <Button radius="md">Bad</Button>
            </Modal>
            <Box sx={{ marginTop: "15px", marginBottom: "15px" }}>
              <Card
                description={trending.text}
                onClick={function noRefCheck() {}}
                setIsSelected={function noRefCheck() {}}
                title={trending.title}
                tooltipText="You are seeing this post based on your previous views and interest profile"
              >
                <Image src={SpaceShip} height={180} />
              </Card>
              <Button
                onClick={() => setOpened(true)}
                radius="md"
                sx={{ marginTop: "5px", display: "flex", marginLeft: "5px" }}
              >
                Read more
              </Button>
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
};
export default SideBar2;
