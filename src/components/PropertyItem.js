import { Image, StyleSheet, Text, View } from "react-native";
import PropBanner from "../../assets/Properties/PropBanner.png";
import Like from "../../assets/Properties/Like.png";
import Pin from "../../assets/Properties/pin.png";
import Notification from "../../assets/Properties/Notification.png";

const PropertyItem = () => {
  return (
    <View className="bg-gray-100 my-3 flex justify-center rounded-lg h-100">
      <View className="flex justify-center rounded">
        <Image source={PropBanner} className="h-50 w-full rounded" />
      </View>

      <View className="my-3 px-3">
        <Text className="text-gray-500">4 Bed Rooms - 1 Garage</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold w-72">
            Hello wworldldldworldldldworldldldworldldldworldldldorldldld
          </Text>
          <Image source={Like} />
        </View>

        <View className="flex-row items-center my-2 justify-between">
          <View className="flex-row items-center">
            <Image source={Pin} />
            <Text className="text-gray-500 mx-2 w-52">
              Hello wworldldldworldldldworldldldworldldldworldldldorldldld
            </Text>
          </View>
          <Text className="text-lg text-primary w-28 font-bold">
            66,000 AED
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyItem;
