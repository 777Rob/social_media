import { Text, Button } from "@mantine/core";
import CommunityLanding from "components/Communities/CommunityLanding";
import { useParams } from "react-router-dom";
const Community = () => {
  // TODO: ADD LOGIC TO CHECK IF MEMBER
  const isMember = true;
  const {nftCollectionAddress} = useParams();
  if (!isMember) {
    return <Button>Join</Button>;
  }


  return <CommunityLanding />;
};

export default Community;
