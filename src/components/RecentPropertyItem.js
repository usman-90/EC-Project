import { Image, Text, View } from "react-native";
import IMG from "../../assets/Search/IMG.png";
import Pin from "../../assets/Properties/pin.png";

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

export default RecentPropertyItem;
