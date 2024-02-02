import { Image, Text, View } from "react-native";
import Pin from "../../assets/Properties/pin.png";

const RecentPropertyItem = ({ image, title, area, amount, loc }) => {
  return (
    <View className="flex-row bg-gray-100 mt-3 p-2  rounded-md">
      <View>
        <Image className="rounded-md w-20 h-20" source={{ uri: image }} />
      </View>
      <View className="mx-3 flex-column justify-between w-64">
        <Text className="text-lg font-bold w-100">{title} </Text>
        <View className="flex-row">
          <Image source={Pin} />
          <Text className="mx-2 text-gray-500">
            {loc} , {area} sqft
          </Text>
        </View>
        <Text className="font-bold text-black text-base">
          <Text className="text-gray-500">AED</Text> {amount}
        </Text>
      </View>
    </View>
  );
};

export default RecentPropertyItem;
