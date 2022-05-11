import { useMoralis } from "react-moralis";
import { Box, Text, Button, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CopyButton } from "web3uikit";

const Profile = () => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const navigate = useNavigate();

  return (
    <Box>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>Profile</Text>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image
          src={
            user.attributes.banner
              ? user.attributes.banner
              : "https://www.developingngo.org/wp-content/uploads/2018/01/2560x1440-gray-solid-color-background.jpg"
          }
          sx={{ width: "100%" }}
          alt={account}
        />

        <Image
          src={
            !user.attributes.profileImage
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTn1JPdehlaYXeHrMK8G8G7_lMRLLr_FWlY6A7SfYTk4py7lpUV5DgqKvsGNaOyPtDc8w&usqp=CAU"
              : user.attributes.profileImage
          }
          sx={{ borderRadius: "50%" }}
          alt={account}
          width="50px"
          height="50px"
        />
        <Text>{user.attributes.userName}</Text>
        <Text>
          {account}
          <CopyButton text={account} revertIn={6500} />
        </Text>
        <Text>
          {user.attributes.bio}
        </Text>
      </Box>
      <Button
        onClick={() => {
          navigate("/profile/edit");
        }}
      >
        Edit profile
      </Button>
    </Box>
  );
};

export default Profile;
