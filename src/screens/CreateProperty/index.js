import React, {useRef, useEffect, useState } from "react";
import CustomMultiSelect from '../../components/MultiSelect' 
import MultiSelect from 'react-native-multiple-select';
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
import { createProperty } from "../../apiFunctions/properties";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { setPropertyData } from "../../features/property/propertySlice";
import { CommonActions } from "@react-navigation/native";


const recreationNfamily = [
  { id: "1", name: "Barbeque Area" },
  { id: "2", name: "Lawn or Garden" },
  { id: "3", name: "Day Care Center" },
  { id: "4", name: "Cafeteria or Canteen" },
  { id: "5", name: "Kids Play Area" }
];

const healthNfitness = [
  { id: "6", name: "First Aid Medical Center" },
  { id: "7", name: "Sauna" },
  { id: "8", name: "Steam Room" },
  { id: "9", name: "Jacuzzi" },
  { id: "10", name: "Swimming Pool" },
  { id: "11", name: "Facilities for Disabled" }
];

const laundryNkitchen = [
  { id: "12", name: "Laundry Room" },
  { id: "13", name: "Laundry Facility" },
  { id: "14", name: "Shared Kitchen" }
];

const building = [
  { id: "15", name: "Prayer Room" },
  { id: "16", name: "Balcony or Terrace" },
  { id: "17", name: "Waiting Room" },
  { id: "18", name: "Lobby in Building" },
  { id: "19", name: "Service Elevators" }
];

const businessNsecurity = [
  { id: "20", name: "Business Center" },
  { id: "21", name: "Conference Room" },
  { id: "22", name: "Security Staff" },
  { id: "23", name: "CCTV Security" }
];

const miscalleneous = [
  { id: "24", name: "Freehold" },
  { id: "25", name: "Maids Room" },
  { id: "26", name: "ATM Facility" },
  { id: "27", name: "24 Hours Concierge" }
];


const technology = [
  { id: "28", name: "Broadband Internet" },
  { id: "29", name: "Satellite/Cable TV" },
  { id: "30", name: "Intercom" }
];

const advanced = [
  { id: "31", name: "Double Glazed Windows" },
  { id: "32", name: "Centrally Air-Conditioned" },
  { id: "33", name: "Furnished" },
  { id: "34", name: "Electricity Backup" },
  { id: "35", name: "Storage Areas" },
  { id: "36", name: "Study Room" },
  { id: "37", name: "Central Heating" },
  { id: "38", name: "Parking Spaces" }
];
const cleaningNMaintenance = [
  { id: "39", name: "Waste Disposal" },
  { id: "40", name: "Maintenance Staff" },
  { id: "41", name: "Cleaning Services" }
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
	const [ameneties, setAmeneties] = useState({
	})
  const propertyData = useSelector((state) => state?.property?.data);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState("");
	const [selectedItems, setSelectedItems] = useState([]);
  const multiSelectRef = useRef(null);
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
console.log(ameneties,"Amenentiessss")
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

	const onAmeneitiesChange = (id, value) => {
		console.log(value,"booom")
		setAmeneties({...ameneties, [id]:value})
	//	setAmeneties({...ameneties, [id]:[...ameneties[id], value[j]]})
	}

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
                value={propertyValues.propertyDetails.refNo}
                placeholder="Reference Number"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "areasq", value)
                }
                value={propertyValues.propertyDetails.areaSquare.toString()}
                placeholder="Area Sq(ft)"
                keyboardType="number-pad"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
                returnKeyType="next"
              />

              <TextInput
                onChangeText={(value) =>
                  handleDataChange("propertyDetails", "InclusivePrice", value)
                }
                value={propertyValues.propertyDetails.InclusivePrice.toString()}
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
                value={propertyValues.propertyDetails.PermitNumber.toString()}
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
