import {
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
	TouchableOpacity
} from "react-native";
import {useEffect, useState} from 'react'
import {searchProperties} from '../../apiFunctions/properties'
import { useMutation } from "@tanstack/react-query";
import SearchBar from "../../components/SearchBar";
import Clock from "../../../assets/Search/Clock.png";
import Close from "../../../assets/Search/Close.png";
import RecentPropertyItem from "../../components/RecentPropertyItem";
import Loader from "../../components/Loader";

const Search = ({navigation}) => {
	const  [ query, setQuery] = useState("")
	const  [ data, setData] = useState()
  const searchPropertiesMutation = useMutation({
    mutationFn: searchProperties,
    onSuccess: (data) => {
	    setData(data?.data?.data)
    },
    onError: (error) => {
    },
  });
	useEffect(()=>{
		searchPropertiesMutation.mutate(query)
	},[query])


  if (searchPropertiesMutation?.isLoading) {
    return <Loader />;
  }
  return (
    <View className="basis-full">
      <View className="px-6 my-3 flex-row">
        <SearchBar value={query} setValue={setQuery} width={100} />
      </View>

      <View className="px-6 py-2">
	  {query ?(

		  <FlatList
		  data={data}
		  renderItem={({ item }) => (
			  <TouchableOpacity
			  onPress={() => {
				  navigation.navigate("Details", {
					  item: item,
				  });
			  }}
			  >
			  <RecentPropertyItem
			  image ={item?.upload?.images ? item?.upload?.images[0] : null}
			  title = {item?.propertyDetails?.title}
			  area={item?.propertyDetails?.areaSquare}
			  amount={item?.PropertyDetails?.InclusivePrice}
			  loc={item?.locationAndAddress?.location  ? item?.locationAndAddress?.address: null}
			  />
			  </TouchableOpacity>
		  )}
		  keyExtractor={(item) => item}
		  />
	  ) : null
	  }
      </View>
    </View>
  );
};
export default Search;
