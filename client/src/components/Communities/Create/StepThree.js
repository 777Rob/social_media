import {
  Divider,
  Text,
  Box,
  Button,
  Image,
  TextInput,
  Center,
} from "@mantine/core";
import UploadButton from "components/UploadFileButton";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { COMMUNITY_FACTORY_ABI } from "contracts/abis";
import { COMMUNITY_FACTORY_ADDRESS } from "contracts/addresses";
import { useSnackbar } from "notistack";

export const StepThree = () => {
  const { Moralis } = useMoralis();
  const communityType = useSelector(
    (state) => state.createCommunity.communityType
  );
  const contractProcessor = useWeb3ExecuteFunction();

  // Get community details from redux state
  const communityDetails = useSelector(
    (state) => state.createCommunity.communityDetails
  );

  // Notifications
  const { enqueueSnackbar } = useSnackbar();

  const createCustomCommunity = async () => {
    // Call options
    // TODO: FINISH CONTRACT AND ADD ALL OPTIONS
    // @params
    // string memory _name,
    // string memory _ticker,
    // uint256 _memberLimit,
    // uint256 _price
    let options = {
      contractAddress: COMMUNITY_FACTORY_ADDRESS,
      abi: COMMUNITY_FACTORY_ABI,
      functionName: "createCustomCommunity",
      params: {
        _name: communityDetails.name,
        _ticker: communityDetails.ticker,
        _memberLimit: 69,
        _price: 420,
      },
      msgValue: Moralis.Units.ETH(0),
    };

    // Call
    await contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        enqueueSnackbar(`Success`, { variant: "error" });
      },
      onError: (error) => {
        // On error display error
        enqueueSnackbar(
          `Error occured during minting please try again. Error data:${error.message}`,
          { variant: "error" }
        );
        console.log(error.message);
      },
    });
  };

  // Function to mint a NFT hence create a community
  const handleMint = () => {
    // Get community type from redux state

    if (communityType == 1) {
      // TODO: HANDLE SUBSCRIBTION BASED COMMUNITIES
    }else{
        createCustomCommunity();
    }
  };

  // Format key/value pairs for display and filter out empty values
  const formatedValues = _.toPairs(communityDetails).map((item) => {
    return [
      item[0]
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      item[1],
    ];
  });

  return (
    <Box sx={{ spacing: "20px" }}>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }} align="center">
        Summary
      </Text>
      <Divider />
      {/* Map through all values */}
      {formatedValues.map(
        (value) =>
          value[1] !== "" && (
            <Center>
              <Text sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {value[0]}:
              </Text>
              <Text>{value[1]}</Text>
            </Center>
          )
      )}
      {/* Image */}
      <Text sx={{ fontSize: "20px", fontWeight: "bold" }} align="center">
        Image
      </Text>
      <Image src={communityDetails.Image} />

      <Button onClick={() => handleMint()}>Complete and mint NFT</Button>
    </Box>
  );
};
