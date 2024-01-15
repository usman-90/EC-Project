import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Pin from "../../../assets/Properties/location-pin.png";

const Map = ({ route }) => {
  const { coords } = route?.params;
  const { navigateBack } = route?.params;
  return (
    <View className="basis-full">
      <View className="flex-row items-center justify-enter py-3 text-xl fw-bold">
        <TouchableOpacity onPress={() => navigateBack()} className="">
          <View className="rounded-full border p-2 border-gray-300 px-3 mx-5">
            <Text>&lt;</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-xl">Location</Text>
      </View>
      <MapView
        style={styles.map}
        className="rounded-lg"
        initialRegion={{
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          }}
          image={Pin}
        />
      </MapView>
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  me_2: {
    marginEnd: 15,
  },
  featureIcons: {
    backgroundColor: "red",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
