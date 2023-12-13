import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import Back from "../../../assets/Search/Notification.png";
import Like from "../../../assets/Properties/Like.png";
import MainIMG from "../../../assets/Properties/IMG.png";
import Star from "../../../assets/Properties/star.png";

const PropertyDetail = () => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const text =
    "Here are all the available border color logical property utilities and their physical property equivalents in both LTR and RTL modes. Class	Left-to-right	Right-to-left rounded-s-*	rounded-l-*	rounded-r-* rounded-e-*	rounded-r-*	rounded-l-* rounded-ss-*	rounded-tl-*	rounded-tr-* rounded-se-*	rounded-tr-*	rounded-tl-* rounded-es-*	rounded-bl-*	rounded-br-* rounded-ee-*	rounded-br-*	rounded-bl-* For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction. Here are all the available border color logical property utilities and their physical property equivalents in both LTR and RTL modes. Class	Left-to-right	Right-to-left rounded-s-*	rounded-l-*	rounded-r-* rounded-e-*	rounded-r-*	rounded-l-* rounded-ss-*	rounded-tl-*	rounded-tr-* rounded-se-*	rounded-tr-*	rounded-tl-* rounded-es-*	rounded-bl-*	rounded-br-* rounded-ee-*	rounded-br-*	rounded-bl-* For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction. ";
  return (
    <View className=" px-6 basis-full">
      <View className="mb-3 flex flex-row justify-between items-center">
        <Image source={Back} />
        <Text className="text-lg font-bold">Product Detail</Text>
        <Image source={Like} />
      </View>
      <ScrollView className="mb-20">
        <View>
          <Image source={MainIMG} className="rounded-2xl w-full h-[335px] " />
        </View>

        <View>
          <Text className="text-3xl font-bold mt-3">South Villa</Text>
        </View>
        <View className="flex-row items-center">
          <Image source={Star} />
          <Text className="text-base font-bold mx-1 ">4.8</Text>
          <Text className="text-base text-gray-500">(335) | 212 reviews</Text>
        </View>
        <View>
          <Text
            onPress={() => setIsTextExpanded(!setIsTextExpanded)}
            className="text-sm text-gray-500 mt-3"
          >
            {!isTextExpanded ? `${text.slice(0, 110)}` : text}
            <Text
              onPress={() => setIsTextExpanded(true)}
              className="text-black font-bold"
            >
              {!isTextExpanded ? `...Read more` : null}
            </Text>
          </Text>
        </View>
        <View>
          <Text className="font-bold text-lg mt-2">Gallery</Text>
        </View>
        <View className="mt-2 flex-row">
          <Image
            source={MainIMG}
            style={styles.me_2}
            className="w-28 rounded-xl h-28"
          />
          <Image
            source={MainIMG}
            style={styles.me_2}
            className="w-28 rounded-xl h-28"
          />
          <Image
            source={MainIMG}
            style={styles.me_2}
            className="w-28 rounded-xl h-28"
          />
        </View>
      </ScrollView>

      <View className="flex-row px-6 py-3 bg-gray-50 items-center absolute justify-between  bottom-0 left-0 right-0">
        <View>
          <Text className="text-sm text-gray-500 ">Total Price</Text>
          <Text className="text-lg font-bold ">AED 245.99</Text>
        </View>
        <TouchableOpacity>
          <Text className="bg-primary text-white font-bold text-base py-2 px-4 rounded-xl">
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PropertyDetail;

const styles = StyleSheet.create({
  me_2: {
    marginEnd: 15,
  },
});
