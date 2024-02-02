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
import PropertyItem from "../../components/PropertyItem";
import Loader from "../../components/Loader";

const Save = ({ navigation }) => {
  return (
    <View className="basis-full">
      <Text className="text-2xl py-4 text-center ">Saved</Text>
    </View>
  );
};
export default Save;
