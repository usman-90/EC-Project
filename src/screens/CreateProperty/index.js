import React, { useRef, useEffect, useState } from "react";
import CustomMultiSelect from "../../components/MultiSelect";
import {
  FlatList,
  Switch,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {
  createProperty,
  getLocationSuggestions,
} from "../../apiFunctions/properties";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { setPropertyData } from "../../features/property/propertySlice";
import { CommonActions } from "@react-navigation/native";

const recreationNfamily = [
  {
    name: "Barbeque",
    value: "Barbeque",
    _id: "65c795ddf4edf337647a1682",
  },
  { name: "Garden", value: "Garden" },
  { name: "Care", value: "Care", _id: "65c795ddf4edf337647a1683" },
  { name: "Cafeteria or Canteen", value: "Cafeteria or Canteen" },
  {
    name: "Kids Play Area",
    value: "Kids Play Area",
    _id: "65c795ddf4edf337647a1684",
  },
];

const healthNfitness = [
  { name: "First Aid Medical Center", value: "First Aid Medical Center" },
  { name: "Sauna", value: "Sauna", _id: "65c795ddf4edf337647a1685" },
  {
    name: "Steam Room",
    value: "Steam Room",
    _id: "65c795ddf4edf337647a1687",
  },
  { name: "Jacuzzi", value: "Jacuzzi" },
  {
    name: "Swimming Pool",
    value: "Swimming Pool",
    _id: "65c795ddf4edf337647a1686",
  },
  { name: "Facilities for Disabled", value: "Facilities for Disabled" },
];

const laundryNkitchen = [
  {
    name: "Laundry Facility",
    value: "Laundry Facility",
    _id: "65c795ddf4edf337647a1688",
  },
  { name: "Shared Kitchen", value: "Shared Kitchen" },

  { name: "Lanudry Room", value: "Lanudry Room" },
];

const building = [
  {
    name: "Reception/Waiting room",
    value: "Reception/Waiting room",
    _id: "65c795ddf4edf337647a168a",
  },
  { name: "Balcony or Terrace", value: "Balcony or Terrace" },
  { name: "Lobby in Building", value: "Lobby in Building" },
  {
    name: "Service Elevator",
    value: "Service Elevator",
    _id: "65c795ddf4edf337647a1689",
  },
];

const businessNsecurity = [
  { name: "Business Center", value: "Business Center" },
  { name: "Conference Room", value: "Conference Room" },
  { name: "Security Staff", value: "Security Staff" },

  {
    name: "CCTV security",
    value: "CCTV security",
    _id: "65c795ddf4edf337647a168b",
  },
];

const miscalleneous = [
  { name: "Freehold", value: "Freehold" },
  { name: "Maids Room", value: "Maids Room" },
  { name: "ATM Facility", value: "ATM Facility" },
  { name: "24 Hours Challenge", value: "24 Hours Challenge" },
];

const technology = [
  { name: "Braodband Internet", value: "Braodband Internet" },
  { name: "Satellite/Cable Tv", value: "Satellite/Cable Tv" },
  { name: "Intercom", value: "Intercom" },
];

const advanced = [
  { name: "Double Glazed Windows", value: "Double Glazed Windows" },
  {
    name: "Centrally Air-Conditioned",
    value: "Centrally Air-Conditioned",
  },

  { name: "Furnished", value: "Furnished" },
  { name: "Electricity Backup", value: "Electricity Backup" },
  { name: "Storage Areas", value: "Storage Areas" },
  { name: "Study Room", value: "Study Room" },
  { name: "Central Heating", value: "Central Heating" },
  { name: "parkingSpaces", value: "2" },
];
const cleaningNMaintenance = [
  {
    name: "Waste Disposal",
    value: "Waste Disposal",
    _id: "65c795ddf4edf337647a168c",
  },
  {
    name: "Maintenance Staff",
    value: "Maintenance Staff",
    _id: "65c795ddf4edf337647a168d",
  },
  {
    name: "Cleaning Services",
    value: "Cleaning Services",
    _id: "65c795ddf4edf337647a168e",
  },
];

const propertyTypes = [
  {
    name: "Villa",
    keyword: "villa",
  },
  {
    name: "Apartment",
    keyword: "apartment",
  },
  {
    name: "Townhouse",
    keyword: "townhouse",
  },
  {
    name: "Commercial",
    keyword: "commercial",
  },
  {
    name: "Residential",
    keyword: "residential",
  },
  {
    name: "Sale",
    keyword: "sale",
  },
  {
    name: "Rent",
    keyword: "rent",
  },
];

export default function CreateProperty({ navigation }) {
  const [ameneties, setAmeneties] = useState({});
  const propertyData = useSelector((state) => state?.property?.data);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [propertyValues, setPropertyValues] = useState(propertyData);
  const dispatch = useDispatch();
  const [steps, setSteps] = useState(1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // useEffect(() => {
  //   console.log("Upcomming property information", propertyValues);
  // }, []);

  useEffect(() => {
    const { typesAndPurpose } = propertyValues;
    setPropertyValues({
      ...propertyValues,
      typesAndPurpose: {
        ...typesAndPurpose,
        category: selectedPropertyTypes,
      },
    });
  }, [selectedPropertyTypes]);

  const onAmeneitiesChange = (id, value) => {
    setAmeneties({ ...ameneties, [id]: value });
    console.log("booom", ameneties);
    //	setAmeneties({...ameneties, [id]:[...ameneties[id], value[j]]})
  };
  console.log(ameneties);
  const handleDataChange = (parentProp, childProp, value) => {
    console.log("Changing values", childProp, value);
    setPropertyValues({
      ...propertyValues,
      [parentProp]: {
        ...propertyValues[parentProp],
        [childProp]: value,
      },
    });
  };

  const handleImageUpload = async (imageUri) => {
    try {
      return await uploadImage(imageUri);
    } catch (error) {
      console.log("Error uploading image:", error);
      return null;
    }
  };

  const onLocationSelected = (value) => {
    setLocationSelected(true);
    handleDataChange("locationAndAddress", "location", value);
  };

  const onDoneClicked = async () => {
    if (steps === 1) {
      setSteps(2);
    } else if (steps === 2) {
      const updatedImages = await Promise.all(
        propertyValues?.upload?.images.map(async (imageUri) => {
          return await handleImageUpload(imageUri);
        }),
      );
      setPropertyValues({
        ...propertyValues,
        upload: {
          ...propertyValues.upload,
          images: updatedImages,
        },
      });
      console.log("propertyValues", propertyValues);

      // const response = await createProperty(propertyValues);
      // console.log("Upload was completed then I was executed", response);
      // dispatch(
      //   setPropertyData({
      //     ...propertyValues,
      //     upload: {
      //       images: [],
      //       videos: [],
      //     },
      //   }),
      // );

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       { name: 'HomeStack' }
      //     ],
      //   })
      // );
    }
  };

  const handleBackPress = () => {
    if (steps === 1) {
      navigation.goBack();
    } else if (steps === 2) {
      setSteps(1);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      if (!imageUri) {
        return null;
      }
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        "Stuff/" + new Date().getTime() + ".jpeg",
      );
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Uploaded progress", progress.toFixed());
          },
          (error) => {
            console.log("Error uploading image. Reason:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            } catch (error) {
              console.log("Error getting download URL. Reason:", error);
              reject(error);
            }
          },
        );
      });
    } catch (error) {
      console.log("Error in image upload", error);
      throw error;
    }
  };

  return (
    <View className="flex-1 p-6 bg-[#f2f2f2]">
      <StatusBar translucent={false} />
      <View className="flex-row justify-between ">
        <View className="w-8 h-8 items-center flex-row mb-8">
          <AntDesignIcon
            name={`arrowleft`}
            style={{
              fontSize: 28,
              borderRadius: 20,
              padding: 5,
            }}
            onPress={handleBackPress}
          />
        </View>
        <View className="items-center flex-row h-8">
          <Text className="font-bold">Add Property</Text>
        </View>
        <View className="w-8 h-8"></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {steps == 1 && (
          <View id="first-step" className="mb-16">
            <View className="top-1">
              <Text className="font-bold">Property Type</Text>

              <FlatList
                className={"mt-4"}
                data={propertyTypes}
                // horizontal={true}
                numColumns={3}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  return (
                    <RenderSingleTag
                      item={item}
                      selectedPropertyTypes={selectedPropertyTypes}
                      setSelectedPropertyTypes={setSelectedPropertyTypes}
                    />
                  );
                }}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Location & address</Text>

              <TextInput
                onChangeText={async (value) => {
                  setLocationSelected(false);
                  handleDataChange("locationAndAddress", "location", value);
                  setLocationSuggestions(
                    (await getLocationSuggestions({ value })).data,
                  );
                }}
                value={
                  propertyValues.locationAndAddress.location !== 0
                    ? propertyValues.locationAndAddress.location
                    : ""
                }
                placeholder="Location"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              {locationSuggestions.length > 0 && !locationSelected && (
                <FlatList
                  className={"mt-4"}
                  data={locationSuggestions}
                  // horizontal={true}
                  numColumns={1}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    return (
                      <LocationSuggestion
                        item={item}
                        // selectedPropertyTypes={selectedPropertyTypes}
                        onLocationSelected={onLocationSelected}
                      />
                    );
                  }}
                />
              )}

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("locationAndAddress", "address", value)
                }
                value={propertyValues.locationAndAddress.address}
                placeholder="Address"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Property details</Text>

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "refNo", value)
                }
                value={
                  propertyValues.propertyDetails.refNo !== 0
                    ? propertyValues.propertyDetails.refNo
                    : ""
                }
                placeholder="Reference Number"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "areaSquare", value)
                }
                value={
                  propertyValues.propertyDetails.areaSquare !== 0
                    ? propertyValues.propertyDetails.areaSquare.toString()
                    : ""
                }
                placeholder="Area Sq(ft)"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "InclusivePrice", value)
                }
                value={
                  propertyValues.propertyDetails.InclusivePrice !== 0
                    ? propertyValues.propertyDetails.InclusivePrice.toString()
                    : ""
                }
                placeholder="Inclusive price"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "title", value)
                }
                value={propertyValues.propertyDetails.title}
                placeholder="Title"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "description", value)
                }
                value={propertyValues.propertyDetails.description}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                keyboardType="default"
                className="bg-[#e9e9e1] text-black py-2 my-1 px-4 rounded-md min-h-[100px]"
                style={{
                  textAlignVertical: "top",
                }}
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "PermitNumber", value)
                }
                value={
                  propertyValues.propertyDetails.PermitNumber !== 0
                    ? propertyValues.propertyDetails.PermitNumber.toString()
                    : ""
                }
                placeholder="Permit Number"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "ownerShipStatus", value)
                }
                value={propertyValues.propertyDetails.ownerShipStatus}
                placeholder="Ownership status"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />
            </View>
          </View>
        )}

        {steps == 2 && (
          <View id="second-step" className="mb-16">
            <View className="mt-6">
              <Text className="font-bold mb-2">Recreation & family</Text>

              <CustomMultiSelect
                items={recreationNfamily}
                selectedItems={ameneties.recreationNfamily ?? []}
                onChange={onAmeneitiesChange}
                category={"recreationNfamily"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Health & Fitness</Text>

              <CustomMultiSelect
                items={healthNfitness}
                onChange={onAmeneitiesChange}
                category={"healthNfitness"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Laundry and kitchen</Text>

              <CustomMultiSelect
                items={laundryNkitchen}
                onChange={onAmeneitiesChange}
                category={"laundryNkitchen"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Building</Text>

              <CustomMultiSelect
                items={building}
                onChange={onAmeneitiesChange}
                category={"building"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Business and Security</Text>

              <CustomMultiSelect
                items={businessNsecurity}
                onChange={onAmeneitiesChange}
                category={"businessNsecurity"}
              />
            </View>
            <View className="mt-6">
              <Text className="font-bold mb-2">Miscellaneous</Text>

              <CustomMultiSelect
                items={miscalleneous}
                onChange={onAmeneitiesChange}
                category={"miscalleneous"}
              />
            </View>
            <View className="mt-6">
              <Text className="font-bold mb-2">Technology</Text>

              <CustomMultiSelect
                items={technology}
                onChange={onAmeneitiesChange}
                category={"technology"}
              />
            </View>
            <View className="mt-6">
              <Text className="font-bold mb-2">Technology</Text>

              <CustomMultiSelect
                items={technology}
                onChange={onAmeneitiesChange}
                category={"technology"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">More</Text>

              <CustomMultiSelect
                items={advanced}
                onChange={onAmeneitiesChange}
                category={"more"}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Cleaning and Maintenance</Text>

              <CustomMultiSelect
                items={cleaningNMaintenance}
                onChange={onAmeneitiesChange}
                category={"cleaningNMaintenance"}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View className="absolute p-6 bottom-0 w-screen">
        <TouchableOpacity onPress={onDoneClicked}>
          <Text className="bg-primary w-full text-center py-3 rounded-full text-white font-bold">
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const RenderSingleTag = ({
  item,
  selectedPropertyTypes,
  setSelectedPropertyTypes,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedPropertyTypes(item?.keyword);
      }}
      key={`key-${item?.keyword}`}
      className={"mr-8 mb-4"}
    >
      <View>
        <Text
          className={`py-3 px-3 rounded-sm text-[10px] w-[83px] text-center bg-primary ${
            item?.keyword === selectedPropertyTypes
              ? "bg-white text-primary border border-primary"
              : "bg-primary text-white"
          }`}
        >
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LocationSuggestion = ({ item, onLocationSelected }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onLocationSelected(item?.fulladdress);
      }}
      key={`key-${item?.address}`}
      className={"mb-2"}
    >
      <View className="py-0 rounded-sm w-full">
        <Text className={`text-[11px] font-bold pt-2 px-3 text-left `}>
          {item?.address}
        </Text>
        <Text className={`text-[10px] pb-2 px-3 text-left`}>
          {item?.fulladdress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
