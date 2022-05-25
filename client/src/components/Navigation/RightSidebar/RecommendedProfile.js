import { Button, Stack, Box, Avatar, Text } from "@mantine/core";
import React from "react";

export const RecommendedProfile = ({ profile }) => {
    return <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
        <Avatar size="lg" radius="xl" src={profile.picture?.original.url || ""} sx={{ marginRight: "10px" }} />
        <Stack spacing={0}>
            <Text weight="bold">
                {profile.name}
            </Text>
            <Text>
                {profile.handle}
            </Text>
        </Stack>
        <Button sx={{ marginLeft: "auto", marginRight: "0px" }}>
            Follow
        </Button>
    </Box>;
};
