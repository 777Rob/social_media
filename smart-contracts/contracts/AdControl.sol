//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./UserAttentionToken.sol";
import "./AdProfile.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "hardhat/console.sol";

contract AdControl is AccessControl, VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;

  /**
    This contract: Lets to create advertisments
    Tracks active ads of active advertisments

    Can be called by aproved ad distributor to receive 
    ads for display in the frontend and submit bundled
    responses 

    Users will receive ads randomly if they are eligible and are in online pool 
    using chainlink randomness oracle from online user pool
    The ad distributor bundles user responses if there was
    a task and 
*/

  // Chainlink subscription ID.
  uint64 s_subscriptionId;

  // Mumbai coordinator. For other networks,
  // see https://docs.chain.link/docs/vrf-contracts/#configurations
  address vrfCoordinator = 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;

  // The gas lane to use, which specifies the maximum gas price to bump to.
  // For a list of available gas lanes on each network,
  // see https://docs.chain.link/docs/vrf-contracts/#configurations
  bytes32 keyHash =
    0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

  // Depends on the number of requested values that you want sent to the
  // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
  // so 100,000 is a safe default for this example contract. Test and adjust
  // this limit based on the network that you select, the size of the request,
  // and the processing of the callback request in the fulfillRandomWords()
  // function.
  uint32 callbackGasLimit = 10000;

  // The default is 3, but you can set this higher.
  uint16 requestConfirmations = 3;

  // For this example, retrieve 2 random values in one request.
  // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.

  // Amount of words to get from chainlink oracle
  uint32 numWords = 1;

  //  Last request to chain link oracle id
  uint256 public s_requestId;

  // Last chain link oracles response
  uint256[] public s_randomWords;

  address public s_owner;

  // Time stamp of previous ad distribution
  uint256  public lastDistribution;

  // User attention token address
  address _userAttentionTokenAddress =
    0x3771EB38AFCADF851bbd7341D270F614877525a8;

  // User attention token
  UserAttentionToken userAttentionToken =
    UserAttentionToken(_userAttentionTokenAddress);

  // Advertisings listed on the contract
  uint256 public adCount = 0;

  // All created ads
  mapping(uint256 => Advertisment) public advertisments;

  // Currently active advertisments
  uint256[] public activeAdvertisments;

  // Allows to approve people for creation of advertisments
  bytes32 public constant ADVERTISER_VALIDATOR =
    keccak256("ADVERTISER_VALIDATOR");

  // Display of ads for users, who are eligible for them // 0x3c4e9b410af022677d29c4723f471e1ac54f70cc7b83275ca9a5d181d2dea7ca
  bytes32 public constant AD_DISTRIBUTOR = keccak256("AD_DISTRIBUTOR");

  // Users that can create advertisments // 0xe7089359c1c3558504b0d32de2434b98f656eab9908578f5f194908ebf460d01
  bytes32 public constant ADVERTISER_ROLE = keccak256("ADVERTISER_ROLE");

  // Address of advertisment profile nft contract
  address adProfileContract;

  // Count of users that have been approved to upload advertisments
  uint256 public advertiserCount = 0;

  // Users that are online and have available advertisments to see
  uint256[] public onlineUsersWithAdBalance;

  // How often new users can be added to the pool of seeing ads
  uint256 public distributionCooldown = 5 minutes;

  // How many users can be added to the pool of seeing ads
  uint256 public selectedPerDistribution = 50;

  // uint256 public lastDistribution
  // Numnber of distributions to chache in order to give user time to respond;
  uint256 public numDistributionsToCache = 3;

  // Users are eligible to receive a reward for seeing an advertisment if they see the
  //   reward within 2 distributions after being selected eligible
  uint256[] public eligibleUsers;

  // Ad randomly selected users will see the ads while using app and earn rewards
  // If there is a task specified by ad creator users will be offered to complete it for extra reward
  AdProfile AdProfiles = AdProfile(adProfileContract);

  constructor(
    // address _userAttentionTokenAddress,
    uint64 _subscriptionId,
    address _adProfileContract
  ) VRFConsumerBaseV2(vrfCoordinator) {
    //   Set the chainlink subscription ID.
    uint64 subscriptionId = _subscriptionId;

    //  Set the contract admin.
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

    // Set Ad profile nft contract
    adProfileContract = _adProfileContract;

    // Set the subscription id
    s_subscriptionId = subscriptionId;

    // Set the Chainlink vrf coordinator
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    s_owner = msg.sender;
  }

  struct Advertisment {
    //Address of advertiser
    address advertiser;
    // Amount given for completing task
    uint256 taskReward;
    // Total amount of tokens that will be distributed for the users that reviewd advertisment and creators they support
    uint256 rewardBalance;
    // Advertisment status
    bool active;
    // Reward for seeing the ad if
    uint256 viewReward;
    // Ipfs url
    string data;
  }

  // Assumes the subscription is funded sufficiently.
  function requestRandomWords() internal {
    // Will revert if subscription is not set and funded.
    s_requestId = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );
  }

  // Fullfils randomness chainlink calls this function after fullfilling randomWords
  function fulfillRandomWords(
    uint256, /* requestId */
    uint256[] memory randomWords
  ) internal override {
    // Receive and set random words
    s_randomWords = randomWords;

    // Set time of a last distribution
    lastDistribution = block.timestamp;

    for (uint256 i = 0; i < selectedPerDistribution; i++) {
      // Get the user id from the random word
      // Cache the previous users for the next few distributions in order to give a time for users to see the ad and complete the task
      eligibleUsers.push(
        onlineUsersWithAdBalance[
          onlineUsersWithAdBalance.length % s_randomWords[0]
        ]
      );

      //   If cache is full remove the last user
      if (
        eligibleUsers.length <=
        selectedPerDistribution * numDistributionsToCache
      ) {
        eligibleUsers.pop();
      }
    }
  }

  // Approval to transfer uat is needed before the transaction
  //  _rewardBalance should be equal to the amount of uat that is being transfered
  function createAd(
    // Cost of one task submitted by user
    uint256 _taskReward,
    // Reward balance for the ad campaign
    uint256 _rewardBalance,
    // Cost of ad shown to the user
    uint256 _viewReward,
    // Advertisment metadata url from the ipfs
    string calldata _data
  ) external onlyRole(ADVERTISER_ROLE) {
    require(_rewardBalance > 0, "Reward balance must be greater than 0");

    // Transfer uat to the contract
    userAttentionToken.transferFrom(msg.sender, address(this), _rewardBalance);

    // Increment adCount
    adCount++;

    // Create the advertisment
    Advertisment memory advertisment = advertisments[adCount];
    advertisment.advertiser = msg.sender;
    advertisment.rewardBalance = _rewardBalance;
    advertisment.taskReward = _taskReward;
    advertisment.viewReward = _viewReward;
    advertisment.active = false;
  }

  // Approve an addvertiser profile so that they can create advertisments
  function approveAddvertiser(address _advertiser)
    external
    onlyRole(ADVERTISER_VALIDATOR)
  {
    grantRole(ADVERTISER_ROLE, _advertiser);
  }

  // Remove approval for addvertiser profile so that they can no longer create advertisments
  function removeAddvertiser(address _advertiser)
    external
    onlyRole(ADVERTISER_VALIDATOR)
  {
    revokeRole(ADVERTISER_ROLE, _advertiser);
  }

  // Function to call by the reward distributor to update online users, eligible users
  function updateOnlineUsers(
    uint256[] calldata _onlineUsers,
    uint256[] calldata _rewardedUsers,
    uint256[] calldata _rewardTypes
  ) external onlyRole(AD_DISTRIBUTOR) {
    //   Check for cooldown
    require(
      lastDistribution + distributionCooldown < block.timestamp,
      "Distribution cooldown not reached"
    );
    // Update users that received rewards
    AdProfiles.updateUsers(_rewardedUsers, _rewardTypes);

    // Update online users with their balance
    onlineUsersWithAdBalance = AdProfiles.getUsersWithBalance(_onlineUsers);

    // Request random words and update the users that are eligible to see ads in the callback
    requestRandomWords();
  }

  // Function to check if user is eligible to receive ad and has enough ad balance
  function checkIfUserIsEligible(uint256 _userId) internal returns (bool) {
    for (uint256 i = 0; i < eligibleUsers.length; i++) {
      if (
        eligibleUsers[i] == _userId && AdProfiles.getUserAdBalance(_userId) > 0
      ) {
        return true;
      }
    }

    return false;
  }

  // Get advertisment to show
  function getAdvertismentToShow(uint256 _userId)
    external
    returns (uint256)
  {
    // Check if user is eligible to see the ad
    require(
      checkIfUserIsEligible(_userId) == true,
      "User is not eligible to see an ad"
    );
    // Find the advertisment with the most reward
    uint256 advertismentID = 0;
    uint256 maxViewReward = 0;
    for (uint256 i = 1; i <= adCount; i++) {
      if (
        advertisments[i].active &&
        advertisments[i].viewReward > maxViewReward
      ) {
        advertismentID = i;
        maxViewReward = advertisments[i].viewReward;
      }
    }
    return advertismentID;
  }
}

  // struct AdDistributor{
  // // Pool of online users that are eligible to receive ad
  // address[] onlineUsersWithAdBalance;
  // uint256 adsDisplayed;
  // uint256 lastDistribution;
  // address distributor;
  // uint256 distributionLimit;
  // }

  
  // AdDistributor distributor;
  // distributor



  // // Getter for advertisment to show
  // function getAdvertismentToShow(address _user)
  //   external
  //   view
  //   returns (uint256)
  // {
  //   uint256 advertismentID = 0;
  //   uint256 maxRewardPerView = 0;
  //   for (uint256 i = 1; i <= adCount; i++) {
  //     if (
  //       advertisments[i].active &&
  //       userInTargets(i, _user) &&
  //       advertisments[i].rewardPerReview > maxRewardPerView
  //     ) {
  //       advertismentID = i;
  //       maxRewardPerView = advertisments[i].rewardPerReview;
  //       break;
  //     }
  //   }
  //   return advertismentID;
  // }
