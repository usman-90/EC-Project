import {
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import Menu from "../../../assets/Search/Menu.png";
import Back from "../../../assets/Search/Notification.png";
import FilterButton from "../../components/FilterButton";
import RecentPropertyItem from "../../components/RecentPropertyItem";
import { useMutation } from "@tanstack/react-query";

const SearchResult = ({ route }) => {
  const { purpose, name } = route.params;
  const loginMutation = useMutation({
    mutationFn: null,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Logged In successfully! 👋",
      });
      console.log(data);
      navigation.navigate("HomeStack");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: error?.response?.data?.message,
      });
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });
  const arr = new Array(10);
  return (
    <View className="px-6">
      <View className="mb-3 flex flex-row justify-between items-center">
        <Image source={Back} />
        <Text className="text-lg font-bold">{name}</Text>
        <Image source={Menu} />
      </View>
      <View className="flex flex-row">
        <SearchBar />
        <FilterButton />
      </View>
      <View>
        <FlatList
          className="grow-0"
          data={arr}
          renderItem={({ item }) => <RecentPropertyItem />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default SearchResult;
