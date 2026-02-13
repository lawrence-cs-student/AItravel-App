import {
  MdAccountBalance,
  MdPark,
  MdMuseum,
  MdTempleBuddhist,
  MdTheaters,
  MdBeachAccess,
  MdShoppingBag,
  MdHiking,
  MdPalette
} from "react-icons/md";

const categoryIcons = {
  Historical: MdAccountBalance,
  Nature: MdPark,
  Museum: MdMuseum,
  Religious: MdTempleBuddhist,
  Entertainment: MdTheaters,
  Beach: MdBeachAccess,
  Shopping: MdShoppingBag,
  Adventure: MdHiking,
  Cultural: MdPalette,
};

const getCategoryIcon = (category) => categoryIcons[category] || null;

export default getCategoryIcon;
