import {
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import PropertyItem from "../../components/PropertyItem";
import { getSavedProperties } from "../../apiFunctions/properties";
import Loader from "../../components/Loader";
import { useState, useContext, useCallback } from "react"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Save = ({ navigation }) => {
  const { userData } = useSelector((state) => state?.user.data);
  const propertiesResult = useQuery({
    queryKey: ["FetchAllSavedProperties", userData?._id],
    queryFn: getSavedProperties,
  });
  const [isRefreshing, setIsRefreshing] = useState(false)
  const refetchSavedProperties = propertiesResult?.refetch
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    refetchSavedProperties()
    setIsRefreshing(false);
  });
  let properties = propertiesResult?.data?.data?.properties ?? [];
  if (properties.length) {
    properties = properties.filter((prop) => prop !== null)
  }

  console.log(properties, "lol")
  return (
    <View className="basis-full">
      <Text className="text-2xl font-bold py-4 text-center ">Saved</Text>
      <View>
        <FlatList
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          className="grow-0 mb-52 px-6"
          data={properties}
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
                  bedrooms={
                    item?.amenities?.filter(
                      (item) => item.name == "bedRooms",
                    )[0].value
                  }
                  area={item?.propertyDetails?.areaSquare}
                  beds={item?.propertyDetails?.bedRooms}
                  bathrooms={item?.propertyDetails?.bathRooms}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, idx) => idx}
        />
      </View>
    </View>
  );
};
export default Save;
