import {
  MdAccountBalance,
  MdPark,
  MdMuseum,
  MdTempleBuddhist,
  MdBeachAccess,
  MdHiking,
  MdPalette,
  MdWater,
  MdRemoveRedEye,
  MdPool,
  MdHistoryEdu,
  MdAttractions,
  MdDirectionsWalk,
  MdLocalFlorist,
  MdPets,
  MdGrass,
} from "react-icons/md";
import { FaUmbrellaBeach, FaTree, FaMountain, FaWater, FaLeaf } from "react-icons/fa";

const categoryIcons = {
  Waterfall: FaWater,
  Beach: FaUmbrellaBeach,
  Island: MdBeachAccess,
  Historical: MdAccountBalance,
  Nature: FaTree,
  Park: MdPark,
  Viewpoint: MdRemoveRedEye,
  Mountain: FaMountain,
  Religious: MdTempleBuddhist,
  Adventure: MdHiking,
  Museum: MdMuseum,
  Lake: MdWater,
  Cultural: MdPalette,
  Resort: MdPool,
  Heritage: MdHistoryEdu,
  ThemePark: MdAttractions,
  Promenade: MdDirectionsWalk,
  Garden: MdLocalFlorist,
  Wildlife: MdPets,
  Farm: MdGrass,
};

const getCategoryIcon = (category) => categoryIcons[category] || null;

export default getCategoryIcon;
