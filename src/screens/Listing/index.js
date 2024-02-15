import React, { useRef, useCallback, useEffect, useState } from "react";
import PropertyItem from "../../components/PropertyItem";
import { SelectList } from "react-native-dropdown-select-list";
import CustomMultiSelect from "../../components/MultiSelect";
import {
  FlatList,
  RefreshControl,
  Switch,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { createProperty } from "../../apiFunctions/properties";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { setPropertyData } from "../../features/property/propertySlice";
import { CommonActions } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmptyList from "../../components/NoItem";
import { getListings } from "../../apiFunctions/properties";

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

const Listing = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selected, setSelected] = useState("");

  const { userData } = useSelector((state) => state?.user.data);
  const propertiesResult = useQuery({
    queryKey: ["FetchListings", userData?.email],
    queryFn: getListings,
  });

  const refetchSavedProperties = propertiesResult?.refetch;

  let properties = propertiesResult?.data?.data?.data ?? [];
  if (properties.length) {
    properties = properties.filter((prop) => prop !== null);
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    refetchSavedProperties();
    setIsRefreshing(false);
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  
  console.log("user Listings", properties);
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
          <ListHeader setSelected={setSelected} data={data} />
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
                // bedrooms={
                //   item?.amenities?.filter((item) => item.name == "bedRooms")[0]
                //     .value
                // }
                area={item?.propertyDetails?.areaSquare}
                beds={item?.propertyDetails?.bedRooms}
                bathrooms={item?.propertyDetails?.bathRooms}
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

const ListHeader = ({ setSelected, data }) => {
  return (
    <>
      <View className="flex flex-row items-center justify-center">
        <TouchableOpacity className="bg-primary mx-2 px-4 py-3 rounded-lg">
          <Text className="text-white">For Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary mx-2 px-4 py-3 rounded-lg">
          <Text className="text-white">For Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary mx-2 px-4 py-3 rounded-lg">
          <Text className="text-white">Off-Plan</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          placeholder="Category"
        />
      </View>
    </>
  );
};
