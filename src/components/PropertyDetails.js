import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import AntDesingIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Pin from "../../assets/Properties/location-pin.png";
import { useState } from "react";
import Back from "../../assets/Search/Notification.png";
import Like from "../../assets/Properties/Like.png";
import MainIMG from "../../assets/Properties/IMG.png";
import Star from "../../assets/Properties/star.png";

const detailsNames = [
  "Price",
  "Property Size",
  "Bedrooms",
  "Parking Size",
  "Bathrooms",
  "Garage",
  "Property Type",
  "Property Status",
];
const featureIcons = {
  Garden: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="swimming-pool"
    />
  ),
  Jacuzzi: (
    <AntDesingIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="wifi"
    />
  ),

  "Laundry Facility": (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="local-laundry-service"
    />
  ),
  completionYear: (
    <AntDesingIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="calendar"
    />
  ),
  totalFloors: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="building"
    />
  ),
  mainFeatures: (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="featured-play-list"
    />
  ),
  landArea: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="landmark"
    />
  ),
  nearbyHospitals: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="hospital-alt"
    />
  ),
  distance: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="car-alt"
    />
  ),
  otherNearbyPlaces: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="landmark"
    />
  ),
  view: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="street-view"
    />
  ),
  petPolicy: (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="pets"
    />
  ),
  Furnished: (
    <CommunityIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="sofa"
    />
  ),
  elevatorBuilding: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="building"
    />
  ),
  otherRooms: (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="bedroom-parent"
    />
  ),
  facilities: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="water"
    />
  ),
  nearbySchool: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="school"
    />
  ),
  nearbyMalls: (
    <AntDesingIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="shoppingcart"
    />
  ),
  nearbyTransport: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="car-alt"
    />
  ),
  parkingSpaces: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="parking"
    />
  ),
  floor: (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="building"
    />
  ),
  "Lanudry Room": (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="local-laundry-service"
    />
  ),
  "Business Center": (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="business-time"
    />
  ),
  "Storage Areas": (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="storage"
    />
  ),
  "Cafeteria or Canteen": (
    <CommunityIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="food"
    />
  ),
  "Prayer Room": (
    <FontAwesomeIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="pray"
    />
  ),
  Intercom: (
    <AntDesingIcon
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="phone"
    />
  ),
  "Cleaning Services": (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="local-laundry-service"
    />
  ),
  Sauna: <FontAwesomeIcon name="bath" />,
  "Balcony or Terrace": (
    <MaterialIcons
      style={{
        color: "#FFC70F",
        fontSize: 20,
      }}
      name="balcony"
    />
  ),
};

const PropertyDetails = ({location , title, text, images, price, features ,area, bedrooms, parkingSpace, bathrooms, garage, category, status}) => {
    const loc  = location?.location?.split("-")
    const detailsVals = [
        price,
        area,
        bedrooms,
        parkingSpace,
        bathrooms,
        garage,
        category,
       status 
    ]
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [currImage, setCurrImage] = useState(null);

    console.log(location)
  return (
    <View className=" px-6 basis-full">
      <View className="mb-3 flex flex-row justify-between items-center">
        <Image source={Back} />
        <Text className="text-lg font-bold">Property Detail</Text>
        <Image source={Like} />
      </View>
      <ScrollView className="mb-20">
        <View>
          <Image
            source={{ uri: currImage ?? images[0] }}
            className="rounded-2xl w-full h-[335px] "
          />
        </View>

        <View>
          <Text className="text-3xl font-bold mt-3">{title}</Text>
        </View>
        <View className="flex-row items-center">
          <Image source={Star} />
          <Text className="text-base font-bold mx-1 ">4.8</Text>
          <Text className="text-base text-gray-500">(335) | 212 reviews</Text>
        </View>
        {text && (
          <View>
            <Text
              onPress={() => setIsTextExpanded(!setIsTextExpanded)}
              className="text-sm text-gray-500 mt-3"
            >
              {!isTextExpanded ? `${text?.slice(0, 110)}` : text}
              <Text
                onPress={() => setIsTextExpanded(true)}
                className="text-black font-bold"
              >
                {!isTextExpanded ? `...Read more` : null}
              </Text>
            </Text>
          </View>
        )}
        <View>
          <Text className="font-bold text-lg mt-2">Gallery</Text>
        </View>
        <View className="mt-2 flex-row">
          <FlatList
            className="grow-0"
            data={images}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCurrImage(item);
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.me_2}
                    className="w-28 rounded-xl h-28"
                  />
                </TouchableOpacity>
              );
            }}
            horizontal={true}
            keyExtractor={(item) => item?.id}
          />
        </View>

        <View>
          <Text className="font-bold text-lg mt-2">Property Details</Text>
        </View>

        <View className="rounded-lg bg-gray-200 py-1 pb-3 px-3 mt-2">
          <FlatList
            className="grow-0"
            data={detailsNames}
            renderItem={({ item,index }) => {
              return (
                <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                  <Text className="text-base">{item}</Text>
                  <Text className="text-base">{detailsVals[index]}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item?.id}
          />
        </View>

        <View>
          <Text className="font-bold text-lg mt-2">Features</Text>
        </View>

        <View className="mt-2 flex-row flex-wrap ">
          {features?.map((elem) => {
            if (elem.name !== "bathRooms" && elem.name !== "bedRooms") {
              const Icon = featureIcons[elem.name];
              const displayText =
                elem.value && !isNaN(elem.value)
                  ? `${elem.name} : ${elem.value}`
                  : elem.name;
              return (
                <View className="my-1" style={styles.me_2}>
                  <Text>
                    {Icon} {displayText}
                  </Text>
                </View>
              );
            }
          })}
        </View>


        <View>
          <Text className="font-bold text-lg mt-2">Address</Text>
        </View>

        <View className="rounded-lg bg-gray-200 py-1 pb-3 px-3 mt-2">
                <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                  <Text className="text-base">Country</Text>
                  <Text className="text-base">{loc ? loc[2] : "---"}</Text>
                </View>
                <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                  <Text className="text-base">City</Text>
                  <Text className="text-base">{loc ? loc[1] : "---"}</Text>
                </View>
                <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                  <Text className="text-base">Street</Text>
                  <Text className="text-base">{loc ? loc[0] : "---"}</Text>
                </View>
      </View>
<View className="h-60 my-3 rounded-lg">
      <MapView style={styles.map} className="rounded-lg"
initialRegion={{
    latitude: parseFloat(location?.latitude),
    longitude: parseFloat(location?.longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
      >
      <Marker coordinate={{
    latitude: parseFloat(location?.latitude),
    longitude: parseFloat(location?.longitude)
      }} 
    image={Pin}
      />
      </MapView>
    </View>


      </ScrollView>

      <View className="flex-row px-6 py-3 bg-gray-50 items-center absolute justify-between  bottom-0 left-0 right-0">
        <View>
          <Text className="text-sm text-gray-500 ">Total Price</Text>
          <Text className="text-lg font-bold ">AED {price}</Text>
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

const styles = StyleSheet.create({
  me_2: {
    marginEnd: 15,
  },
  featureIcons: {
    backgroundColor: "red",
  },
      map: {
    width: '100%',
    height: '100%',
  },
});

export default PropertyDetails;
