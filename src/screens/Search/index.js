import {
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { searchProperties, fetchProperties } from "../../apiFunctions/properties";
import { useMutation, useQuery } from "@tanstack/react-query";
import FilterContext from "../../context/FilterContext";
import SearchBar from "../../components/SearchBar";
import DragableMenu from "../../components/DragableMenu";
import PropertyItem from "../../components/PropertyItem";
import Loader from "../../components/Loader";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [filters] = useContext(FilterContext);
  const propertiesResult = useQuery({
    queryKey: ["FetchPropertiesByFilter", filters],
    queryFn: fetchProperties,
    enabled: false,
  });

  const searchPropertiesMutation = useMutation({
    mutationFn: searchProperties,
    onSuccess: (data) => {
      setData(data?.data?.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    searchPropertiesMutation.mutate(query);
  }, [query]);
  const properties = propertiesResult?.data?.data?.data ?? [];
  const refetchProperties = propertiesResult?.refetch;
  if (propertiesResult?.isLoading) {
    return <Loader />;
  }

  if (searchPropertiesMutation?.isLoading) {
    return <Loader />;
  }
  const renderData = data ? data : properties ? properties : null
  console.log("sdfashdfLOLLLLLLLLLLLLLLLLLLJJLA", properties, "propertiesssss")
  console.log("sdfashdfLOLLLLLLLLLLLLLLLLLLJ22222222222222", renderData, "propertiesssss")
  console.log("sdfashdfLOLLLLLLLLLLLLLLLLLLJ222222222222223333333", data, "propertiesssss")
  return (
    <View className="basis-full">
      <View className="px-6 my-3 flex flex-row">
        <SearchBar value={query} setValue={setQuery} />
        <DragableMenu
          setData={setData}
          refetchProperties={refetchProperties}
        />
      </View>
      <View className="grow-0 py-2">
        {renderData ? (
          <FlatList
            data={renderData}
            className="px-6"
            renderItem={({ item }) => <SearchedItem navigation={navigation} item={item} />}
            keyExtractor={(item) => item}
          />
        ) : null}
      </View>
    </View>
  );
};
export default Search;


const SearchedItem = ({ navigation, item }) => {


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
  )
}
