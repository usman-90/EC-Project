import { Image, TouchableOpacity } from "react-native";
import Filter from "../../assets/Properties/Filter.png";

const FilterButton = () => {
  return (
    <TouchableOpacity>
      <Image className="mx-3 basis-1/8" source={Filter} />
    </TouchableOpacity>
  );
};
export default FilterButton;
