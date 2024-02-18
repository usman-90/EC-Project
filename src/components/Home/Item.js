import { styled } from "nativewind";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import FilterContext from "../../context/FilterContext";
import { useNavigation } from "@react-navigation/native";

export default function Item(props) {
  const [filters, setFilters] = useContext(FilterContext);
  const { item } = props;
  const navigation = useNavigation();
  // const { Item } = data;
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledImage = styled(Image);
  const StyledButton = styled(TouchableOpacity);
  // console.log("Item got", props);
  const handleFilterChange = (name, val) => {
    setFilters({
      ...filters,
      [name]: val,
    });
  };
  console.log(filters, "from home", setFilters);
  return (
    <StyledView className="bg-zinc-400 w-64 h-64 m-4">
      <StyledText className="absolute z-10 top-6 left-6 text-white text-xs">
        {item.propertiesNo}
      </StyledText>
      <StyledText className="absolute z-10 top-12 left-6 text-white text-xl">
        {item.rentType}
      </StyledText>
      <StyledImage source={item.Image} className="h-full w-full" />
      <StyledButton>
        <StyledText
          className="absolute z-10 bottom-9 left-6 text-white text-sm"
          onPress={() => {
            console.log(item?.value, "lol");
            handleFilterChange("subCategory", item.value);
            navigation.navigate("SearchStack");
            console.log(filters, "after change");
          }}
        >
          MORE DETAILS
        </StyledText>
      </StyledButton>
    </StyledView>
  );
}
