import {
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  View,
	RefreshControl
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SearchBar from "../../components/SearchBar";
import Menu from "../../../assets/Search/Menu.png";
import Back from "../../../assets/Search/Notification.png";
import FilterButton from "../../components/FilterButton";
import RecentPropertyItem from "../../components/RecentPropertyItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import DragableMenu from "../../components/DragableMenu";
import FilterContext from "../../context/FilterContext";
import {useState, useCallback, useContext, useEffect } from "react";
import { fetchProperties } from "../../apiFunctions/properties";
import Loader from "../../components/Loader";
import PropertyItem from "../../components/PropertyItem";
import EmptyList from '../../components/NoItem'

const SearchResult = ({ route, navigation }) => {
	const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters] = useContext(FilterContext);
  const propertiesResult = useQuery({
    queryKey: ["FetchPropertiesByFilter", filters],
    queryFn: fetchProperties,
    enabled: false,
  });
  const refetchProperties = propertiesResult?.refetch;
  useEffect(() => {
	  console.log("ran",route.params.name)
    refetchProperties();
  }, [route]);


const handleRefresh = useCallback(async () => {
  setIsRefreshing(true);
		refetchProperties()
  setIsRefreshing(false);
});

  const { purpose, name } = route.params;

  const properties = propertiesResult?.data?.data?.data ?? [];
  return (
    <View className="px-4">
      <View className="mb-3 flex flex-row pt-2 justify-between items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="rounded-full border p-3 border-gray-300">
            <AntDesignIcon name="left" />
          </View>
        </TouchableOpacity>
        <Text className="text-lg font-bold">{name}</Text>
        <View className="invisible w-10"></View>
      </View>
      <View className="flex flex-row">
        <SearchBar />
        <DragableMenu refetchProperties={refetchProperties} />
      </View>
      <View>
        <FlatList
		refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          className="grow-0 mb-52"
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
		ListEmptyComponent={<EmptyList/>}
        />
      </View>
    </View>
  );
};

export default SearchResult;
