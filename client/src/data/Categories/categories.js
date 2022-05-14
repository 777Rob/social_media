import { GiMaterialsScience, GiFilmProjector, GiHealthIncrease, GiCookingPot, GiClothes, GiBrain, GiVote, GiPaintBrush  } from "react-icons/gi";
import { GrMusic, GrTechnology } from "react-icons/gr";
import { ImBooks } from "react-icons/im";
import { AiOutlineStock } from "react-icons/ai";
import { CgMathPlus } from "react-icons/cg";
import { MdPsychology, MdHistoryEdu, MdTravelExplore, MdSportsKabaddi } from "react-icons/md";
import Technology from "./Images/Technology.jpg";
import Science from "./Images/Science.jpg";
import Films from "./Images/Films.jpg";
import Music from "./Images/Music.jpg";
import Psychology from "./Images/Psychology.jpg";
import Health from "./Images/Health.jpg";
import Travel from "./Images/Travel.jpg";
import Books from "./Images/Books.jpg";
import History from "./Images/History.jpg";
import Cooking from "./Images/Cooking.jpg";
import Sport from "./Images/Sport.jpg";
import Fashion from "./Images/Fashion.jpg";
import Philosophy from "./Images/Philosophy.jpg";
import Politics from "./Images/Politics.jpg";
import Finance from "./Images/Finance.jpg";
import Arts from "./Images/Arts.jpg";
import Mathematics from "./Images/Mathematics.jpg";

// https://www.pexels.com/
// https://react-icons.github.io/react-icons/
export const Categories = [
  {
    name: "Technology",
    icon: <GrTechnology />,
    image: Technology,
  },
    {
      name: "Science",
      icon: <GiMaterialsScience />,
      image: Science,
    },
    {
      name: "Films",
      icon: <GiFilmProjector />,
      image: Films,
    },
    {
      name: "Music",
      icon: <GrMusic />,
      image: Music,
    },
    {
      name: "Health",
      icon: <GiHealthIncrease />,
      image: Health,
    },
    {
      name: "Psychology",
      icon: <MdPsychology />,
      image: Psychology,
    },
    {
      name: "Travel and tourism",
      icon: <MdTravelExplore />,
      image: Travel,
    },
    {
      name: "Books",
      icon: <ImBooks />,
      image: Books,
    },
    {
      name: "History",
      icon: <MdHistoryEdu />,
      image: History,
    },
    {
      name: "Cooking",
      icon: <GiCookingPot />,
      image: Cooking,
    },
    {
      name: "Sport",
      icon: <MdSportsKabaddi />,
      image: Sport,
    },
    {
      name: "Fashion",
      icon: <GiClothes />,
      image: Fashion,
    },
    {
      name: "Philosophy",
      icon: <GiBrain />,
      image: Philosophy,
    },
    {
      name: "Politics",
      icon: <GiVote />,
      image: Politics,
    },
    {
      name: "Finance",
      icon: <AiOutlineStock />,
      image: Finance,
    },
    {
      name: "Fine Arts",
      icon: <GiPaintBrush />,
      image: Arts,
    },
    {
      name: "Mathematics",
      icon: <CgMathPlus />,
      image: Mathematics,
    },
];
