import {
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  View,
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
import { useContext, useEffect } from "react";
import { fetchProperties } from "../../apiFunctions/properties";
import Loader from "../../components/Loader";

const SearchResult = ({ route, navigation }) => {
  const [filters] = useContext(FilterContext);
  const propertiesResult = useQuery({
    queryKey: ["FetchProperties", filters],
    queryFn: fetchProperties,
  });
  const refetchProperties = propertiesResult?.refetch;
  useEffect(() => {
    refetchProperties();
  }, [filters]);

  if (propertiesResult?.isLoading) {
    return <Loader />;
  }

  const { purpose, name } = route.params;

  const properties = propertiesResult?.data?.data?.data ?? [];
  console.log(propertiesResult, "proppppppp");

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
        <DragableMenu />
      </View>
      <View>
        <FlatList
          className="grow-0"
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
                <RecentPropertyItem
                  title={item?.propertyDetails?.title}
                  loc={item?.locationAndAddress?.address}
                  area={item?.propertyDetails?.areaSquare}
                  image={item?.upload?.images[0]}
                  amount={item?.propertyDetails?.InclusivePrice}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item,idx) => idx}
        />
      </View>
    </View>
  );
};

export default SearchResult;
