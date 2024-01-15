import {
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import PropBanner from "../../assets/Properties/PropBanner.png";
import Like from "../../assets/Properties/Like.png";
import Pin from "../../assets/Properties/pin.png";
import Notification from "../../assets/Properties/Notification.png";
import { useState } from "react";

const PropertyItem = ({
  image,
  bedrooms,
  title,
  location,
  price,
  area,
  beds,
  bathrooms,
}) => {
  const [currImage, setCurrImage] = useState(0);
  console.log(image);
  return (
    <View className="bg-gray-100 my-3 flex justify-center rounded-lg h-100">
      <View className="flex justify-center rounded">
        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: image[currImage] }}
          className="h-52 items-center flex-row justify-between w-full rounded-lg"
          imageStyle={{ borderRadius: 10 }}
        >
          <TouchableOpacity
            disabled={currImage === 0}
            onPress={() => {
              setCurrImage(currImage - 1);
            }}
          >
            <AntDesignIcon
              name="left"
              style={
                currImage === 0
                  ? {
                      backgroundColor: "white",
                      borderRadius: 50,
                      fontSize: 20,
                      color: "lightgray",
                      marginHorizontal: 10,
                      padding: 4,
                    }
                  : {
                      backgroundColor: "white",
                      borderRadius: 50,
                      fontSize: 20,
                      color: "gray",
                      marginHorizontal: 10,
                      padding: 4,
                    }
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={currImage === image?.length - 1}
            onPress={() => {
              setCurrImage(currImage + 1);
            }}
          >
            <AntDesignIcon
              name="right"
              style={
                currImage === image?.length - 1
                  ? {
                      backgroundColor: "white",
                      borderRadius: 50,
                      fontSize: 20,
                      color: "lightgray",
                      marginHorizontal: 10,
                      padding: 4,
                    }
                  : {
                      backgroundColor: "white",
                      borderRadius: 50,
                      fontSize: 20,
                      color: "gray",
                      marginHorizontal: 10,
                      padding: 4,
                    }
              }
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View className="my-3 px-3">
        <Text className="text-lg text-primary w-28 font-bold">AED {price}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold w-72">{title}</Text>
        </View>
        <View className="flex-row">
          <View className="flex-row items-center justify-center">
            <FontAwesomeIcon
              style={{
                color: "#FFC70F",
                fontSize: 16,
                marginEnd: 5,
              }}
              name="map"
            />
            <Text className="text-gray-500">Area {area} sqft</Text>
          </View>
          <View className="mx-1 flex-row items-center justify-center">
            <FontAwesomeIcon
              style={{
                color: "#FFC70F",
                fontSize: 16,
                marginEnd: 5,
              }}
              name="bed"
            />
            <Text className="text-gray-500">Beds {bedrooms}</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <FontAwesomeIcon
              style={{
                color: "#FFC70F",
                fontSize: 16,
                marginEnd: 5,
              }}
              name="bath"
            />
            <Text className="text-gray-500">Baths {bathrooms}</Text>
          </View>
        </View>

        <View className="flex-row items-center my-2 justify-between">
          <View className="flex-row items-center">
            <Image source={Pin} />
            <Text className="text-gray-500 mx-2 w-52">{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PropertyItem;
