import {
  Grid, Button,
  Card,
  Group,
  Image, Text,
  useMantineTheme
} from "@mantine/core";
import React from "react";
import _ from "lodash";
import CreateYourOwn from "data/CreateYourOwn.jpg";
import { NftCard } from "components/Common/Nfts/NftCard";
import { useNavigate } from "react-router-dom";

export const UserNfts = ({ nfts }) => {
  const theme = useMantineTheme();
  console.log(nfts)
  const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const navigate = useNavigate()
  return (
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
              onClick={() => navigate("create")}
            >
              Start
            </Button>
          </Card>
        </div>
      </Grid.Col>
      {_.uniqBy(nfts, "token_address").map(
        (nft) => nft.metadata && (
          <Grid.Col span={2}>
            <NftCard name={nft.name} metadata={JSON.parse(nft.metadata)} />
          </Grid.Col>
        )
      )}
    </Grid>
  );
};
