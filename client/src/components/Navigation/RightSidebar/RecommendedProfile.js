import { Button, Stack, Box, Avatar, Text } from "@mantine/core";
import React from "react";

// @Description: This component is used to render the avatar and the name with the handle of the user
// It also contains the button offering to follow the user
export const RecommendedProfile = ({ profile }) => {
    // @Param: profile: object
    // Profile object has the following properties:
    // name - name of the user
    // handle - handle of the user
    // picture.original.url - used to display the profile picture

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
