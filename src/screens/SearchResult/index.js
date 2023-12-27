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

const SearchResult = ({ route, navigation }) => {
  const [filters] = useContext(FilterContext);
  const { purpose, name } = route.params;

  const propertiesResult = useQuery({
    queryKey: ["FetchProperties", filters],
    queryFn: fetchProperties,
  });

  const refetchProperties = propertiesResult?.refetch;

  useEffect(() => {
    refetchProperties();
  }, [filters]);
  const properties = propertiesResult?.data?.data?.data ?? [];
  console.log(propertiesResult, "propppppppppp");

  return (
    <View className="px-6">
      <View className="mb-3 flex flex-row justify-between items-center">
        <Image source={Back} />
        <Text className="text-lg font-bold">{name}</Text>
        <Image source={Menu} />
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
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default SearchResult;
