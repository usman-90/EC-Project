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
import Clock from "../../../assets/Search/Clock.png";
import Close from "../../../assets/Search/Close.png";
import IMG from "../../../assets/Search/IMG.png";
import Pin from "../../../assets/Properties/pin.png";

const RecentPropertyItem = () => {
  return (
    <View className="flex-row bg-gray-100 mt-3 p-2  rounded-md">
      <View>
        <Image className="rounded-md w-20 h-20" source={IMG} />
      </View>
      <View className="mx-3 flex-column justify-between w-64">
        <Text className="text-lg font-bold w-100">Business Bay</Text>
        <View className="flex-row">
          <Image source={Pin} />
          <Text className="mx-2 text-gray-500">8080 Railroad St.</Text>
        </View>
        <Text className="font-bold text-black text-base">
          <Text className="text-gray-500">$</Text>245.99
        </Text>
      </View>
    </View>
  );
};

const Search = () => {
  let options = new Array(10);
  return (
    <View className="basis-full">
      <View className="px-6 my-3 flex-row">
        <SearchBar width={100} />
      </View>
      <View className="px-6 flex-row justify-between items-center my-">
        <Text className="text-lg font-bold">Recent Searched</Text>
        <Text className="text-red-500 text-base font-bold">Clear all</Text>
      </View>

      <View className="flex-row px-6 justify-between items-center my-3">
        <View className="flex-row items-center w-5/6">
          <Image source={Clock} />
          <Text className="mx-3 w-full">Residential</Text>
        </View>
        <Image source={Close} />
      </View>
      <View className="flex-row px-6 justify-between items-center my-3">
        <View className="flex-row items-center">
          <Image source={Clock} />
          <Text className="mx-3">Studio</Text>
        </View>
        <Image source={Close} />
      </View>

      <View className="px-6 flex-row justify-between items-center my-">
        <Text className="text-lg font-bold">Recent View</Text>
      </View>

      <View className="px-6 py-2">
        <FlatList
          className="grow-0"
          data={options}
          renderItem={({ item }) => <RecentPropertyItem />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};
export default Search;
