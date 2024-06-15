import React, { useRef, useCallback, useEffect, useState } from "react";
import PropertyItem from "../../components/PropertyItem";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmptyList from "../../components/NoItem";
import { getListings } from "../../apiFunctions/properties";
import { SelectList } from "../../components/CreateProperty/ReactNativeDropdownList";

const data = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "residential",
    value: "Residential",
  },
  {
    key: "commercial",
    value: "Commercial",
  },
];

const Listing = ({ navigation, route }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { userData } = useSelector((state) => state?.user.data);
  const propertiesResult = useQuery({
    queryKey: ["FetchListings", userData?.email, selected, selectedCategory],
    queryFn: getListings
  });

  const refetchSavedProperties = propertiesResult?.refetch;

  let properties = propertiesResult?.data?.data?.data ?? [];
  if (properties.length) {
    properties = properties.filter((prop) => prop !== null);
  }

  // useEffect(() => {
  //   console.log("Selected Purpose", selected);
  // }, [selected]);

  // useEffect(() => {
  //   console.log("Selected Category", selectedCategory);
  // }, [selectedCategory])

  useEffect(() => {
    const runonfocus = navigation.addListener("focus", () => {
      setSelected("");
      setSelectedCategory("");
    });

    return runonfocus;
  }, []);

  useEffect(() => {
    setIsRefreshing(propertiesResult.isLoading);
    console.log("user Listings", properties);
  }, [propertiesResult.isLoading]);

  useEffect(() => {
    refetchSavedProperties();
  }, [route]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    refetchSavedProperties().finally(() => {
      setIsRefreshing(false);
    });
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1  bg-[#f2f2f2]">
      <StatusBar translucent={false} />
      <View className="flex-row p-6 justify-between ">
        <View className="w-8 h-8 items-center flex-row mb-8">
          <AntDesignIcon
            name={`arrowleft`}
            style={{
              fontSize: 28,
              borderRadius: 20,
              padding: 5,
            }}
            onPress={handleBackPress}
          />
        </View>
        <View className="items-center flex-row h-8">
          <Text className="font-bold">My Listing</Text>
        </View>
        <View className="w-8 h-8"></View>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        data={properties}
        className="px-6"
        ListHeaderComponent={
          <ListHeader setSelectedPurpose={setSelected} selectedPurpose={selected} data={data} setSelectedCategory={setSelectedCategory} />
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
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
                bedrooms={item?.amenities?.filter((item) => item.name == "bedRooms")[0]?.value}
                bathrooms={item?.amenities?.filter((item) => item.name == "bathRooms")[0]?.value}
                area={item?.propertyDetails?.areaSquare}
                beds={item?.propertyDetails?.bedRooms}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, idx) => idx}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};
export default Listing;

const ListHeader = ({ setSelectedPurpose, selectedPurpose, setSelectedCategory, data }) => {
  return (
    <>
      <View className="flex flex-row items-center justify-evenly">
        <TouchableOpacity className={`mx-2 px-4 py-3 rounded-lg ${"forRent" === selectedPurpose
          ? "bg-white border border-primary"
          : "bg-primary"
          }`} onPress={() => setSelectedPurpose("forRent")}>
          <Text className={`${"forRent" === selectedPurpose ? "text-primary" : "text-white"}`}>For Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`mx-2 px-4 py-3 rounded-lg ${"forSale" === selectedPurpose
          ? "bg-white text-primary border border-primary"
          : "bg-primary text-white"
          }`} onPress={() => setSelectedPurpose("forSale")}>
          <Text className={`${"forSale" === selectedPurpose ? "text-primary" : "text-white"}`}>For Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`mx-2 px-4 py-3 rounded-lg ${"offPlan" === selectedPurpose
          ? "bg-white text-primary border border-primary"
          : "bg-primary text-white"
          }`} onPress={() => setSelectedPurpose("offPlan")}>
          <Text className={`${"offPlan" === selectedPurpose ? "text-primary" : "text-white"}`}>Off-Plan</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        <SelectList
          setSelected={(val) => setSelectedCategory(val)}
          data={data}
          save="key"
          placeholder="Category"
        />
      </View>
    </>
  );
};
