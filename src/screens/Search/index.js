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
} from "react-native";
import { useEffect, useState } from "react";
import { searchProperties } from "../../apiFunctions/properties";
import { useMutation } from "@tanstack/react-query";
import SearchBar from "../../components/SearchBar";
import DragableMenu from "../../components/DragableMenu";
import PropertyItem from "../../components/PropertyItem";
import Loader from "../../components/Loader";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const searchPropertiesMutation = useMutation({
    mutationFn: searchProperties,
    onSuccess: (data) => {
      setData(data?.data?.data);
      console.log(data);
    },
    onError: (error) => { console.log(error)},
  });
  useEffect(() => {
    searchPropertiesMutation.mutate(query);
  }, [query]);

  if (searchPropertiesMutation?.isLoading) {
    return <Loader />;
  }
  return (
    <View className="basis-full">
      <View className="px-6 my-3 flex flex-row">
        <SearchBar value={query} setValue={setQuery} />
      <DragableMenu query={query} refetchProperties={
          searchPropertiesMutation.mutate
      } />
      </View>
      <View className="grow-0 py-2">
        {query ? (
          <FlatList
            data={data}
            className="px-6"
            renderItem={({ item }) => (
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
            )}
            keyExtractor={(item) => item}
          />
        ) : null}
      </View>
    </View>
  );
};
export default Search;
