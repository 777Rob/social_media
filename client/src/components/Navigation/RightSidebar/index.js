import { Divider, Aside, Grid, ScrollArea, Box, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "styling/App.css";
import { MessagesSection } from "./MessagesSection";
import { CommunitiesSection } from "./CommunitiesSection";
import { getRecommendedProfiles } from "lens/profile/getRecommendedProfiles";
import SearchInput from "components/Common/Search";
import { RecommendedProfile } from "./RecommendedProfile";

// @Description: This component is used to display the right sidebar
const RightSidebar = ({ display }) => {
  // @Param: display: boolean
  // If display is true, the right sidebar will be displayed
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);

  // Load recommended profiles
  useEffect(() => {
    (async () => {
      // use getRecommendedProfiles function to get recommended profiles
      // function returns a promise that resolves to an array of profiles
      const response = await getRecommendedProfiles();

      // set the recommended profiles
      setRecommendedProfiles(response.data.recommendedProfiles);
    })();
  }, []);


  return (
    <Aside
      sx={{ display: display ? "flex" : "none", marginTop: "80px" }}
      width={{ base: display ? 400 : 500 }}
      p="xs"
    >
      <Box
        justify="center"
        sx={{
          display: display ? "block" : "none",
          flexDirection: "column",
          width: "100%"
        }}
      >
        {/* Communities */}
        {/*<CommunitiesSection />*/}
        {/*<MessagesSection />*/}
        <SearchInput />

        {/* Recommended profiles */}
        <Text align="center" sx={{ fontSize: "24px", fontWeight: "600" }}>
          Recommended profiles
        </Text>
        {recommendedProfiles.map((profile) => (
          <>
            <RecommendedProfile profile={profile} />
            <Divider />
          </>

        ))}
      </Box>
    </Aside>
  );
};

export default RightSidebar;