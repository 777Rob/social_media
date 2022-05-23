import {
  Box,
  Button,
  Divider,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {useMoralis} from "react-moralis";
import { withNfts } from "components/Loader/withNfts";
import { UserNfts } from "components/Communities/UserNfts";
import {useNavigate} from "react-router-dom"

const Communities = () => {
  const {account} = useMoralis();
  const UserNftsWithLoader = withNfts(UserNfts, account)
const navigate = useNavigate();

  return (
    <Box>
      <Text sx={{ fontSize: "30px", fontWeight: "500" }} align="center">
        Enter the communities
      </Text>
      <Divider my="xs" />

      <Text sx={{ fontSize: "20px", marginBottom: "25px" }}>
        Communities enable communication and collaboration for owners of NFTs
        from the same collection. For the NFT's already deployed on chain
        communities are generated automatically by owning NFT from the
        collection you are automatically eligable to join. You can create your
        own community by simply minting NFT collection or through our website.
        When creating community through our website you can create
        fully-customisable subscription based communities where you can share
        content and earn revenue.
      </Text>
      <Text sx={{ fontSize: "30px", fontWeight: "500" }} align="center">
        Your Communities
      </Text>
      <Divider my="xs" />
      <Text
        sx={{
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        You haven't joined any communities ....
      </Text>
        <Button sx={{height: "100px"}} fullWidth onClick={() => navigate("/community/mock")}>
          Mock community
        </Button>
      <Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
        Available Communities
      </Text>
      <Divider my="xs" />
      <UserNftsWithLoader />
      <Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
        Explore communities based on your interests
      </Text>
      <Divider my="xs" />
    </Box>
  );
};

export default Communities;
