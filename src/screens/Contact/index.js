import React from "react";
import {TextInput, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import topWave from "../../../assets/Home/topWave.png";
import LogoSVG from "../../components/Logo.js"
import logo from "../../../assets/Home/logo.png";
import buildingIcon from "../../../assets/Home/Buildings.png"
import bottomWave from "../../../assets/Home/bottomWave.png";
import apart1 from "../../../assets/Home/Image1.png";
import resi1 from "../../../assets/Home/Image2.png";
import { styled } from "nativewind";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ItemsList from "../../components/Home/ItemsList";
import { useNavigation } from "@react-navigation/native";

const featuredItems = [
  {
    propertiesNo: "3 Properties",
    rentType: "Apartment",
    Image: apart1,
  },
  {
    propertiesNo: "1 Property",
    rentType: "Residential",
    Image: resi1,
  },
];

export default function Contact() {
  const navigation = useNavigation();
  const animatedRef = useAnimatedRef();
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledButton = styled(TouchableOpacity);
  const StyledImage = styled(Image);
  const StyledScrollView = styled(Animated.ScrollView);
  const opacity1 = useSharedValue(1);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const opaVal = 1.5 - 1 * 0.01 * event.contentOffset.y;
    opacity1.value = opaVal;
  });

  const openListing = () => {
    navigation.navigate("HouseShowcase");
  };

  return (
    <StyledScrollView
      className="flex-1 bg-white"
      ref={animatedRef}
      onScroll={scrollHandler}
    >
      <StatusBar backgroundColor={"#FFF5D3"} />
      <StyledView className="h-72">
        <StyledImage source={topWave} className="-top-6" />
        <StyledView className="flex flex-row relative sm:bottom-24 md:bottom-24 h-0">
          <StyledView className="flex-[.45] bg-red-200 flex-col items-center relative">
	  <View style={{
		  position:"absolute",
			  top:20,
			left:20,
			  zIndex:4
	  }}>
	  <LogoSVG/>
	  </View>
            <StyledView
              className="absolute flex-row sm:left-4 md:left-5 sm:top-24 rounded-full"
              style={{ backgroundColor: "#FFF5D3" }}
            >
              <View className="px-1 py-1">
                <Text className=" bg-primary rounded-full px-3 py-1">
                  Contact Us
                </Text>
              </View>
            </StyledView>
          </StyledView>
          <StyledView style={{position:"relative",zIndex:0}} className=" flex-[.65] items-center relative">
            <AnimatedImage
              source={buildingIcon}
              className={"sm:w-[203px] sm:h-[188px]"}
              style={{ opacity: opacity1 , position:"relative",zIndex:0}}
            />
          </StyledView>
        </StyledView>
        <StyledImage
          source={bottomWave}
          className="bottom-0 absolute sm:w-96"
        />
      </StyledView>
      <StyledView className="flex-grow">
        <StyledView className="items-center p-4">
          <StyledText className="p-2 text-lg font-bold">Contact Us</StyledText>
          <StyledText className="p-1 text-xs" style={{ color: "#9C9C9C" }}>
            We'll help you find your perfect home
          </StyledText>
        </StyledView>
      </StyledView>
      <View className="px-6 mb-4">
        <View className="bg-gray-100 rounded-lg w-full py-3">
          <View className="flex-row justify-between px-4">
            <View className="w-6/12 px-1">
	  <TextInput
	  placeholder="First Name"
	  className="border-b border-gray-300 w-full"
        editable
        maxLength={40}
      />
	  </View>
            <View className="w-6/12 px-1">
	  <TextInput
	  className="border-b border-gray-300 w-full"
	  placeholder="Last Name"
        editable
        maxLength={40}
      />
	  </View>
          </View>
	  
<View className="px-4 my-2">
	  <TextInput 
	  className="border-b border-gray-300 w-full"
	  placeholder="Email"
        editable
        maxLength={40}
	  />
</View>

<View className="px-4 my-2">
	  <TextInput 
	  className="border-b border-gray-300 w-full"
	  placeholder="Mobile"
        editable
        maxLength={40}
	  />
</View>

<View className="px-4 my-3">
	  <TextInput 
	  multiline = {true}
numberOfLines = {4}
	  className="border-b border-gray-300 h-20 w-full"
	  placeholder="Message"
        editable
	  style={{ textAlignVertical: 'top',}}
	  />
</View>

	  <TouchableOpacity className="bg-primary justify-center items-center py-2 mx-4 rounded-lg my-3">
	  <Text className="text-white ">
	  Submit
	  </Text>
	  </TouchableOpacity>

        </View>
      </View>
    </StyledScrollView>
  );
}
