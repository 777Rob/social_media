import {
  Badge,
  Grid,
  Box,
  Button,
  Card,
  Group,
  Image,
  Divider,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import _ from "lodash";
import CreateYourOwn from "data/CreateYourOwn.jpg";
// TODO: Fetch data for all nfts


// Card component to display card data takes in metadata of an NFT and collection name
function NftCard({ metadata, name }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={metadata.image} height={320} alt={name} />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{!metadata.name ? name : metadata.name}</Text>
          <Badge color="green" variant="light">
            420 Members active
          </Badge>
        </Group>

        <Text
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        ></Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Enter the community
        </Button>
      </Card>
    </div>
  );
}
const Communities = () => {
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState([]);
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

    // Function for fetching nfts
  const fetchNFTs = async () => {
    // get NFTs for current user on Mainnet
    const userEthNFTs = await Web3Api.account.getNFTs();
    console.log(userEthNFTs);
    // get testnet NFTs for user
    const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
      chain: "mainnet",
    });
    console.log(testnetNFTs);

    // get polygon NFTs for address
    const options = {
      chain: "polygon",
      address: "0x75e3e9c92162e62000425c98769965a76c2e387a",
    };
    const polygonNFTs = await Web3Api.account.getNFTs(options);
    console.log(polygonNFTs);
    setNfts(polygonNFTs.result);
  };

  // Call function on component mount
  useEffect(() => {
    fetchNFTs();
  }, []);

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

      <Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
        Available Communities
      </Text>
      <Divider my="xs" />
      <Grid gutter="sm" columns={8}>
        <Grid.Col span={2}>
          <div style={{ margin: "auto" }}>
            <Card shadow="sm" p="lg">
              <Card.Section>
                <Image src={CreateYourOwn} height={320} alt="rad" />
              </Card.Section>

              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text weight={500}>Create your own!</Text>
              </Group>

              <Text
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              ></Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                Start
              </Button>
            </Card>
          </div>
        </Grid.Col>
        {_.uniqBy(nfts, "token_address").map(
          (nft) =>
            nft.metadata && (
              <Grid.Col span={2}>
                <NftCard name={nft.name} metadata={JSON.parse(nft.metadata)} />
              </Grid.Col>
            )
        )}
      </Grid>
      <Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
        Explore communities based on your interests
      </Text>
      <Divider my="xs" />
    </Box>
  );
};

export default Communities;
