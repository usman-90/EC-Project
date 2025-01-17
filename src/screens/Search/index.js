import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  StatusBar
} from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import {
  searchProperties,
  fetchProperties,
} from "../../apiFunctions/properties";
import { useMutation, useQuery } from "@tanstack/react-query";
import FilterContext from "../../context/FilterContext";
import SearchBar from "../../components/SearchBar";
import DragableMenu from "../../components/DragableMenu";
import PropertyItem from "../../components/PropertyItem";
import Loader from "../../components/Loader";
import EmptyList from "../../components/NoItem";

const defaultFilter = {
  category: "all",
  subCategory: "",
  priceMin: 0,
  priceMax: "",
  areaMin: 0,
  purpose: "",
  areaMax: "",
  bathrooms: "",
  bedrooms: "",
}

function areObjectsDifferent(originalObj, newObj) {
  // console.log("Objects recieved", originalObj, newObj);
  let found = false;
  // Get the keys of the original object
  const keys = Object.keys(originalObj);

  // Iterate through the keys
  for (let key of keys) {
    // Check if the values are different and not empty strings
    if (originalObj[key] !== newObj[key] && (originalObj[key] || newObj[key])) {
      // console.log("Is different");
      found = true;
    }
  }
  // All values are the same or empty strings
  return found;
}

const Search = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [filters, setFilters] = useContext(FilterContext);
  const propertiesResult = useQuery({
    queryKey: ["FetchPropertiesByFilter", filters],
    queryFn: fetchProperties,
    enabled: false
  });
  const [filterApplied, setFilterApplied] = useState(areObjectsDifferent(defaultFilter, filters));

  useEffect(() => {
    searchPropertiesMutation.mutate(query);
  }, [query]);

  useEffect(() => {
    //this basically helps to unsubscribe camera on screen
    const unsubscribeblur = navigation.addListener("blur", () => {
      setFilters({
        category: "all",
        subCategory: "",
        priceMin: 0,
        priceMax: "",
        areaMin: 0,
        areaMax: "",
        bathrooms: "",
        bedrooms: "",
        purpose: ""
      })
    });
    return unsubscribeblur;
  }, []);

  useEffect(() => {
    setIsRefreshing(true);
    refetchProperties().then(_ => {
      setIsRefreshing(false);
    });
    setFilterApplied(areObjectsDifferent(defaultFilter, filters));
    // console.log("filter and searched items", data, properties);
  }, [filters])


  const searchPropertiesMutation = useMutation({
    mutationFn: searchProperties,
    onSuccess: (data) => {
      // console.log("searched data", data);
      setIsRefreshing(false);
      setData(data?.data?.data);
    },
    onError: (error) => {
      setIsRefreshing(false);
      console.log(error);
    },
  });

  const refetchProperties = propertiesResult?.refetch;
  const properties = propertiesResult?.data?.data?.data ?? [];

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    if (query) {
      searchPropertiesMutation.mutate(query);
    } else {
      refetchProperties().then(_ => {
        setIsRefreshing(false);
      });
    }
  });

  const renderData = filterApplied ? (properties ? properties : []) : data;
  // console.log("IN SEARCHHHHH", filters);

  // console.log("Rendered", renderData);

  if (propertiesResult?.isLoading) {
    return <Loader />;
  }

  return (
    <View className="basis-full">
      <StatusBar backgroundColor={"#fff"} translucent={false} />
      <View className="px-6 my-3 flex flex-row">
        <SearchBar value={query} setValue={setQuery} />
        <DragableMenu setData={setData} refetchProperties={refetchProperties} />
      </View>
      <View className="grow-0 py-2">
        {renderData ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            data={renderData}
            className="px-6"
            renderItem={({ item }) => (
              <SearchedItem navigation={navigation} item={item} />
            )}
            keyExtractor={(item, idx) => idx}
            ListEmptyComponent={<EmptyList />}
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
          item?.amenities?.filter((item) => item.name == "bedRooms")[0]?.value
        }
        bathrooms={
          item?.amenities?.filter((item) => item.name == "bathRooms")[0]?.value
        }
        area={item?.propertyDetails?.areaSquare}
        beds={item?.propertyDetails?.bedRooms}
      />
    </TouchableOpacity>
  );
};
