import React, { useEffect, useState } from "react";
import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
// import LogoSVG from "../../components/Logo.js"
import topWave from "../../../assets/Home/topWave.png";
import logo from "../../../assets/Home/logo.png";
import buildingIcon from "../../../assets/Home/buildingIcon.png";
import bottomWave from "../../../assets/Home/bottomWave.png";
import apart1 from "../../../assets/Home/4.png";
import resi1 from "../../../assets/Home/Image2.png";
import townhouse from "../../../assets/Home/Image1.png";
import villa from "../../../assets/Home/5.png";
import commercial from "../../../assets/Home/7.png";
import { styled } from "nativewind";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ItemsList from "../../components/Home/ItemsList";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import FilterContext from "../../context/FilterContext";
import { useQuery } from "@tanstack/react-query";
import { getPropertyCountForCategory } from "../../apiFunctions/properties";
import Loader from '../../components/Loader';

const featuredItems = [
  {
    propertiesNo: "3 Properties",
    rentType: "Apartment",
    value: "apartment",
    catType: "subCategory",
    Image: apart1,
  },
  {
    propertiesNo: "1 Property",
    rentType: "Residential",
    value: "residential",
    catType: "category",
    Image: resi1,
  },
  {
    propertiesNo: "1 Property",
    rentType: "Commercial",
    value: "commercial",
    catType: "category",
    Image: commercial,
  },
  {
    propertiesNo: "1 Property",
    rentType: "Villa",
    value: "villa",
    catType: "subCategory",
    Image: villa,
  },
  {
    propertiesNo: "1 Property",
    rentType: "Townhouse",
    value: "townHouse",
    catType: "subCategory",
    Image: townhouse,
  }
];

export default function Home() {
  // const [propertyCategoriesList, setPropertyCategoriesList] = useState(featuredItems);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useContext(FilterContext);
  const navigation = useNavigation();
  const animatedRef = useAnimatedRef();
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledButton = styled(TouchableOpacity);
  const StyledImage = styled(Image);
  const StyledScrollView = styled(Animated.ScrollView);
  const opacity1 = useSharedValue(1);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const propertiesData = useQuery({
    queryKey: ["catCounts"],
    queryFn: getPropertyCountForCategory,
  });

  const handleFilterChange = (name, val) => {
    setFilters({
      ...filters,
      [name]: val,
    });
  };

  useEffect(() => {
    //this basically helps to refresh the counts of the home categories
    const unsubscribefocus = navigation.addListener("focus", async () => {
      opacity1.value = 1;
      setIsRefreshing(true);
      propertiesData.refetch().then(_ => {
        setIsRefreshing(false);
      });
    });
    return unsubscribefocus;
  }, []);

  const propertiesLength = propertiesData?.data?.data?.data ?? {};

  if (propertiesLength) {
    featuredItems[0].propertiesNo = propertiesLength.apartment + (propertiesLength.apartment > 1 ? " Properties" : " Property");
    featuredItems[1].propertiesNo = propertiesLength.residential + (propertiesLength.residential > 1 ? " Properties" : " Property");
    featuredItems[2].propertiesNo = propertiesLength.commercial + (propertiesLength.commercial > 1 ? " Properties" : " Property");
    featuredItems[3].propertiesNo = propertiesLength.villa + (propertiesLength.villa > 1 ? " Properties" : " Property");
    featuredItems[4].propertiesNo = propertiesLength.townhouse + (propertiesLength.townhouse > 1 ? " Properties" : " Property");
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const opaVal = 1.5 - 1 * 0.01 * event.contentOffset.y;
    opacity1.value = opaVal;
  });

  // const openListing = () => {
  //   navigation.navigate("HouseShowcase");
  // };

  if (propertiesData?.isLoading || isRefreshing) {
    return <Loader />;
  }

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
          <StyledView className="flex-[.45] flex-col items-center relative">
            <StyledImage
              source={logo}
              className={`sm:w-[155px] sm:h-[33px] absolute sm:left-4 md:left-5 sm:top-5`}
            />
            {/* <StyledView className="sm:w-[155px] sm:h-[33px] absolute sm:left-4 md:left-5 sm:top-5" >
              <LogoSVG />
            </StyledView> */}
            <StyledView
              className="absolute flex-row sm:left-4 md:left-5 sm:top-24 rounded-full"
              style={{ backgroundColor: "#FFF5D3" }}
            >
              <StyledButton
                title="Buy"
                onPress={() => {
                  handleFilterChange("purpose", "forRent");
                  // console.log(filters)
                  navigation.navigate("SearchStack", {
                    screen: "SearchResult",
                    params: {
                      name: "Rent",
                      purpose: "rent",
                    },
                  });
                }}
                className="p-1 m-2 w-16 md:p-1 md:m-2 md:w-16 bg-[#FFD549] rounded-full"
              >
                <Text className="text-center font-bold">Rent</Text>
              </StyledButton>
              <StyledButton
                title="Rent"
                onPress={() => {
                  handleFilterChange("purpose", "forSale");
                  navigation.navigate("SearchStack", {
                    screen: "SearchResult",
                    params: {
                      name: "Buy",
                      purpose: "forSale",
                    },
                  });
                }}
                className="p-1 my-2 w-12 md:p-1 md:my-2 md:mr-2 md:w-12 rounded-full"
              >
                <Text className="text-gray-500 font-bold">Buy</Text>
              </StyledButton>
            </StyledView>
          </StyledView>
          <StyledView className="flex-[.65] items-center relative">
            <AnimatedImage
              source={buildingIcon}
              className={"sm:h-[188px] sm:w-[203px]"}
              style={{ opacity: opacity1 }}
            />
          </StyledView>
        </StyledView>
        <StyledImage
          source={bottomWave}
          className="bottom-0 absolute sm:w-96 md:w-[400px] lg:w-[410px]"
        />
      </StyledView>
      <StyledView className="flex-grow">
        <StyledView className="items-center p-4">
          <StyledText className="p-2 text-lg font-bold">
            Discover Our Featured Listings
          </StyledText>
          <StyledText className="p-1 text-xs" style={{ color: "#9C9C9C" }}>
            We'll help you find your perfect home
          </StyledText>
          <StyledView>
            <ItemsList Items={featuredItems} />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}
