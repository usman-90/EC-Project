import {
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import FilterContext from "../../context/FilterContext";
import Search from "../../../assets/Properties/search.png";
import Pin from "../../../assets/Properties/pin.png";
import Notification from "../../../assets/Properties/Notification.png";
import Profile from "../../../assets/Properties/Profile.png";
import Banner from "../../../assets/Properties/Banner.png";
import PropertyItem from "../../components/PropertyItem";
import { fetchAllProperties } from "../../apiFunctions/properties";
import Loader from "../../components/Loader";

const Properties = ({ navigation }) => {
  const propertiesData = useQuery({
    queryKey: ["allProperties"],
    queryFn: fetchAllProperties,
  });
  const [filters, setFilters] = useContext(FilterContext);

  if (propertiesData?.isLoading) {
    return <Loader />;
  }

  const properties = propertiesData?.data?.data?.data ?? [];
console.log(properties,"preppppp")
  const handleFilterChange = (name, val) => {
    setFilters({
      ...filters,
      [name]: val,
    });
  };
  const options = [
    {
      name: "Buy",
      keyword: "forSale",
    },
    {
      name: "Rent",
      keyword: "rent",
    },
    {
      name: "Off-Plan",
      keyword: "offPlan",
    },
  ];

  return (
    <View className="basis-full ">
      <View className="basis-15 px-6 mt- py-2 justify-between flex-row">
        <View>
          <Text className="text-gray-500 text-base">Location</Text>
          <View className="flex-row align items-center">
            <Image source={Pin} />
            <Text className="text-black mx-2 text-lg">Dubai, Jaddah</Text>
          </View>
        </View>
        <View className="flex-row">
          <Image className="mx-1" source={Notification} />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image className="mx-1" source={Profile} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row  mb-3 px-6">
        <TouchableOpacity
          className="flex-row"
          onPress={() => {
            navigation.navigate("ModalStack");
          }}
        >
          <View
            className={`flex-row basis- basis-full  bg-gray-50 py-2 rounded-full items-center`}
          >
            <View className="px-3">
              <AntDesignIcon name="search1" style={{ fontSize: 20 }} />
            </View>
            <Text
              className="text-base text-gray-500 w-full pe-2"
              style={styles.pe_2}
            >
              Search any destination
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-6">
        <ImageBackground
          className="rounded-lg h-40 bg-white"
          source={Banner}
          resizeMode="cover"
        ></ImageBackground>

        <View className="flex-row justify-between items-center my-3">
          <Text className="text-lg font-bold">Popular</Text>
        </View>

        <View className="flex-row justify-cente">
          {options?.map((item, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                className="w-20"
                onPress={() => {
                  handleFilterChange("purpose", item.keyword);
                  navigation.navigate("SearchResult", {
                    name: item.name,
                    purpose: item.keyword,
                  });
                }}
              >
                <View style={styles.me_2} className="me-3">
                  <Text className="text-center h-8  py-2 text-white rounded-md px-3 bg-primary">
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {properties?.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                navigation.navigate("Details", {
                  item: item,
                });
              }}
            >
              <PropertyItem
                title={item?.propertyDetails?.title}
                image={item?.upload?.images}
                price={item?.propertyDetails?.InclusivePrice}
                location={item?.locationAndAddress?.location}
                bedrooms={
                  item?.amenities?.filter((item) => item.name == "bedRooms")[0]
                    .value
                }
		  area={item?.propertyDetails?.areaSquare}
		  beds={item?.propertyDetails?.bedRooms}
		  bathrooms={item?.propertyDetails?.bathRooms}

              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Properties;

const styles = StyleSheet.create({
  pe_2: {
    paddingEnd: 10,
  },
  me_2: {
    marginEnd: 10,
  },
  loader: {
    position: "absolute",
    zIndex: 19,
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
