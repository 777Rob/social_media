import { Divider, Aside, Grid, ScrollArea, Box, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "styling/App.css";
import { MessagesSection } from "./MessagesSection";
import { CommunitiesSection } from "./CommunitiesSection";
import { getRecommendedProfiles } from "lens/profile/getRecommendedProfiles";
import SearchInput from "components/Common/Search";
import { RecommendedProfile } from "./RecommendedProfile";

const RightSidebar = ({ display }) => {
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getRecommendedProfiles();
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