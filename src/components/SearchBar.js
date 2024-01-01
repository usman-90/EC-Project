import {
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";
import Search from "../../assets/Properties/search.png";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const SearchBar = ({ width, navigation, willNavigate , value , setValue}) => {
  return (
    <View
      className={`flex-row basis- ${
        width === 100 ? "basis-full" : "basis-10/12"
      } bg-gray-50 py-2 rounded-full items-center`}
    >
	  <View className="px-3">
	  <AntDesignIcon name="search1" style={{fontSize:20}} />
	  </View>
      <TextInput
	      onChangeText={setValue}
        value={value}
        onPress={willNavigate ? () => navigation.navigate("ModalStack") : null}
        className="text-base w-10/12 pe-2"
        style={styles.pe_2}
        placeholder="Search any destination"
      />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  pe_2: {
    paddingEnd: 10,
  },
});
