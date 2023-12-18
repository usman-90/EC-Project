import {
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
} from "react-native";
import Search from "../../../assets/Properties/search.png";
import Pin from "../../../assets/Properties/pin.png";
import Notification from "../../../assets/Properties/Notification.png";
import Profile from "../../../assets/Properties/Profile.png";
import Banner from "../../../assets/Properties/Banner.png";
import PropertyItem from "../../components/PropertyItem";
import SearchBar from "../../components/SearchBar";
import FilterButton from "../../components/FilterButton";

const Properties = ({ navigation }) => {
  const options = [
    "Home",
    "Villa",
    "Apartment",
    "Homestay",
    "Homestay",
    "Homestay",
    "Homestay",
  ];

  return (
    <View className="basis-full ">
      <View className="basis-15 px-6 mt-8 py-2 justify-between flex-row">
        <View>
          <Text className="text-gray-500 text-base">Location</Text>
          <View className="flex-row align items-center">
            <Image source={Pin} />
            <Text className="text-black mx-2 text-lg">Dubai, Jaddah</Text>
          </View>
        </View>
        <View className="flex-row">
          <Image className="mx-1" source={Notification} />
	  <TouchableOpacity onPress ={() => navigation.navigate("Profile")}>
          <Image className="mx-1" source={Profile} />
	  </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row  mb-3 px-6">
        <TouchableOpacity
          className="flex-row"
          onPress={() => {
            navigation.navigate("ModalStack");
          }}
        >
    <View
      className={`flex-row basis- basis-10/12 bg-gray-50 py-2 rounded-full items-center`}
    >
      <Image className="mx-3" source={Search} />
      <Text
        className="text-base text-gray-500 w-10/12 pe-2"
        style={styles.pe_2}
      >
	  Search any destination
	  </Text>
    </View>
        </TouchableOpacity>
        <FilterButton />
      </View>

      <ScrollView className="px-6">
        <ImageBackground
          className="h-40 bg-white"
          source={Banner}
          resizeMode="cover"
        ></ImageBackground>

        <View className="flex-row justify-between items-center my-3">
          <Text className="text-lg font-bold">Popular</Text>
          <Text className="text-primary">See all</Text>
        </View>

        <FlatList
          className="grow-0"
          data={options}
          renderItem={({ item }) => {
            return (
              <View style={styles.me_2} className="me-3">
                <Text className="h-8  py-2 rounded-md px-3 bg-primary">
                  {item}
                </Text>
              </View>
            );
          }}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
	<TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <PropertyItem />
	  </TouchableOpacity>
        <PropertyItem />
        <PropertyItem />
      </ScrollView>
    </View>
  );
};
export default Properties;

const styles = StyleSheet.create({
  pe_2: {
    paddingEnd: 10,
  },
  me_2: {
    marginEnd: 10,
  },
});
