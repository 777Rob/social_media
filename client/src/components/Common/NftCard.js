import {
  Badge, Button,
  Card,
  Group,
  Image, Text,
  useMantineTheme
} from "@mantine/core";
import React from "react";

// Card component to display card data takes in metadata of an NFT and collection name
export function NftCard({ metadata, name }) {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

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
