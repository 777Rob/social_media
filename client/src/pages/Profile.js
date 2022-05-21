import { useMoralis } from "react-moralis";
import { Box, Text, Button, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CopyButton } from "web3uikit";
import Avatar from "components/Common/Avatar"

const Profile = () => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Image
        radius="sm"
          src={
            user.attributes.banner
              ? user.attributes.banner
              : "https://www.developingngo.org/wp-content/uploads/2018/01/2560x1440-gray-solid-color-background.jpg"
          }
          sx={{ marginTop: 10, marginBottom: 20}}
          width={1200}
          align="center"
          height={400}
          alt={account}
        />
        <Avatar
        src={user.attributes.profileImage}
        />
        <Text>{user.attributes.userName}</Text>
        <Text>
          {account}
          <CopyButton text={account} revertIn={6500} />
        </Text>
        <Text>
          {user.attributes.bio}
        </Text>
      <Button
         radius="md"
         variant="gradient"
         gradient={{ from: "indigo", to: "cyan" }}
         sx={{width: "200px", marginLeft: "auto", marginRight: "0px", marginTop: "10px"}}
        onClick={() => {
          navigate("/profile/edit");
        }}
      >
        Edit profile
      </Button>
      </Box>
    </Box>
  );
};

export default Profile;
