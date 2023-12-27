import { Image, StyleSheet, Text, View } from "react-native";
import PropBanner from "../../assets/Properties/PropBanner.png";
import Like from "../../assets/Properties/Like.png";
import Pin from "../../assets/Properties/pin.png";
import Notification from "../../assets/Properties/Notification.png";

const PropertyItem = ({ image,bedrooms, title, location,price}) => {
  return (

    <View className="bg-gray-100 my-3 flex justify-center rounded-lg h-100">
      <View className="flex justify-center rounded">
        <Image source={{uri:image[0]  }} className="h-52 w-full rounded" />
      </View>

      <View className="my-3 px-3">
        <Text className="text-gray-500">Bed Room {bedrooms}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold w-72">
      {title}
          </Text>
          <Image source={Like} />
        </View>

        <View className="flex-row items-center my-2 justify-between">
          <View className="flex-row items-center">
            <Image source={Pin} />
            <Text className="text-gray-500 mx-2 w-52">
                {location}
            </Text>
          </View>
          <Text className="text-lg text-primary w-28 font-bold">
                {price} AED
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyItem;
