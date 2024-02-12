import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { createProperty } from "../../apiFunctions/properties";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { setPropertyData } from "../../features/property/propertySlice";
import { CommonActions } from "@react-navigation/native";

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
  const propertyData = useSelector((state) => state?.property?.data);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState("");
  const [propertyValues, setPropertyValues] = useState(propertyData);
  const dispatch = useDispatch();
  // const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    console.log("Upcomming property information", propertyValues);
  }, []);

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

  const onDoneClicked = async () => {
    if (steps === 1) {
      setSteps(2);
    } else if (steps === 2) {
      const updatedImages = await Promise.all(
        propertyValues?.upload?.images.map(async (imageUri) => {
          return await handleImageUpload(imageUri);
        }),
      );
      console.log("updatedImages", updatedImages);
      setPropertyValues({
        ...propertyValues,
        upload: {
          ...propertyValues.upload,
          images: updatedImages,
        },
      });

      const response = await createProperty(propertyValues);
      console.log("Upload was completed then I was executed", response);
      dispatch(
        setPropertyData({
          ...propertyValues,
          upload: {
            images: [],
            videos: [],
          },
        }),
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'HomeStack' }
          ],
        })
      );
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
                onChangeText={(value) =>
                  handleDataChange("locationAndAddress", "location", value)
                }
                value={propertyValues.locationAndAddress.location}
                placeholder="location"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

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
                value={propertyValues.propertyDetails.refNo !== 0 ? propertyValues.propertyDetails.refNo : ""}
                placeholder="Reference Number"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "areaSquare", value)
                }
                value={propertyValues.propertyDetails.areaSquare !== 0 ? propertyValues.propertyDetails.areaSquare.toString() : ""}
                placeholder="Area Sq(ft)"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "InclusivePrice", value)
                }
                value={propertyValues.propertyDetails.InclusivePrice !== 0 ? propertyValues.propertyDetails.InclusivePrice.toString() : ""}
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
                value={propertyValues.propertyDetails.PermitNumber !== 0 ? propertyValues.propertyDetails.PermitNumber.toString() : ""}
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

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("kidsplayarea", value)
                }
                value={propertyValues.kidsplayarea}
                placeholder="Kids Play area"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Health & Fitness</Text>

              <TextInput
                onChangeText={(value) => handleDataChange("steamroom", value)}
                value={propertyValues.steamroom}
                placeholder="Steam Room"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Laundry and kitchen</Text>

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("laundryfacility", value)
                }
                value={propertyValues.laundryfacility}
                placeholder="Laundry facility"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">Building</Text>

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("laundryfacility", value)
                }
                value={propertyValues.laundryfacility}
                placeholder="Building facility"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                editable={false}
                selectTextOnFocus={false}
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
