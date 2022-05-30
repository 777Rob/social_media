import { defaultImages } from "./defaultProfileImages";
import { useMoralis } from "react-moralis";

export const MockTopics = [
  {
    topic: "Some topic about our amazing NFT Collection",
    replyCount: 0,
    viewCount: 0,
    lastActivity: "14h",
    users: [
      { avatar: defaultImages[0] },
      { avatar: defaultImages[1] },
      { avatar: defaultImages[2] },
    ],
  },
  {
    topic: "Amazing topic nr2",
    replyCount: 0,
    viewCount: 0,
    lastActivity: "14h",
    users: [
      { avatar: defaultImages[0] },
      { avatar: defaultImages[1] },
      { avatar: defaultImages[2] },
    ],
  },
  {
    topic: "Some topic about our amazing NFT Collection",
    replyCount: 0,
    viewCount: 0,
    lastActivity: "14h",
    users: [
      { avatar: defaultImages[0] },
      { avatar: defaultImages[1] },
      { avatar: defaultImages[2] },
    ],
  },
  {
    topic: "Amazing topic nr2",
    replyCount: 0,
    viewCount: 0,
    lastActivity: "14h",
    users: [
      { avatar: defaultImages[0] },
      { avatar: defaultImages[1] },
      { avatar: defaultImages[2] },
    ],
  },
];
//
export const MockTopicPostsFull = [
  {
    user: {
      avatar: defaultImages[0],
      userName: "postGod",
    },
    date: "21 May",
    text: "Nicee i can post !!!! ",
    likes: 6,
    views: 0,
  },
  {
    user: {
      avatar: defaultImages[1],
      userName: "commenter",
    },
    date: "1 Jan",
    text: "Nice post bro",
    likes: 5,
  },
  {
    user: {
      avatar: defaultImages[2],
      userName: "TheCommenter",
    },
    date: "1 Jan",
    text: "Yes",
    likes: 5,
  },
  {
    user: {
      avatar: defaultImages[1],
      userName: "Komentatorius",
    },
    date: "1 Jan",
    text: "Nice post bro",
    likes: 2,
  },
  {
    user: {
      avatar: defaultImages[1],
      userName: "commenter",
    },
    date: "1 Jan",
    text: "+Rep",
    likes: 5,
  },
];
