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

const SearchBar = ({ width }) => {
  return (
    <View
      className={`flex-row basis- ${
        width === 100 ? "basis-full" : "basis-10/12"
      } bg-gray-50 py-2 rounded-full items-center`}
    >
      <Image className="mx-3" source={Search} />
      <TextInput
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
