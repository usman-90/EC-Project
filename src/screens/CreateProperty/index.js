import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EditPageInputField from "../../components/EditPageInputField";

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

export default function CreateProperty() {

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState("");
  const [propertyValues, setPropertyValues] = useState({});
  const [steps, setSteps] = useState(1);

  const handleDataChange = (name, value) => {
    console.log("Changing values", name, value);
    setPropertyValues({ ...propertyValues, [name]: value });
  };

  const onDoneClicked = () => {
    if (steps === 1) {
      setSteps(2);     
    }else if (steps === 2) {
      setSteps(1);
    }
  }

  return (
    <View className="flex-1 p-6 bg-[#f2f2f2]">
      <View className="flex-row justify-between">
        <View className="w-8 h-8 items-center flex-row mb-8">
          <AntDesignIcon
            name={`arrowleft`}
            style={{
              fontSize: 28,
              borderRadius: 20,
              padding: 5,
            }}
          />
        </View>
        <View className="items-center flex-row h-8">
          <Text className="font-bold">Add Property</Text>
        </View>
        <View className="w-8 h-8">
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {steps == 1 &&
          <View id='first-step' className="mb-16">
            <View className="top-1">
              <Text className="font-bold">
                Property Type
              </Text>

              <FlatList
                className={'mt-4'}
                // horizontal={true}
                data={propertyTypes}
                numColumns={3}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleFilterChange("category", item?.keyword);
                      }}
                      key={`key-${item?.keyword}`}
                      className={'mr-8 mb-4'}
                    >
                      <View>
                        <Text
                          className={`py-3 px-3 rounded-md text-[10px] w-[83px] text-center bg-primary ${item?.keyword === selectedPropertyTypes
                            ? "bg-white text-primary border border-primary"
                            : "bg-primary text-white"
                            }`}
                        >
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">
                Location & address
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("location", value)}
                value={propertyValues.location}
                placeholder="location"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("address", value)}
                value={propertyValues.address}
                placeholder="Address"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>

            <View className="mt-6">

              <Text className="font-bold mb-2">
                Property details
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("referenceno", value)}
                value={propertyValues.referenceno}
                placeholder="Reference Number"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("areasq", value)}
                value={propertyValues.areasq}
                placeholder="Area Sq(ft)"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("inclusiveprice", value)}
                value={propertyValues.inclusiveprice}
                placeholder="Inclusive price"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("title", value)}
                value={propertyValues.title}
                placeholder="Title"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("description", value)}
                value={propertyValues.description}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                keyboardType="default"
                className="bg-[#e9e9e1] text-black py-2 my-1 px-4 rounded-md min-h-[100px]"
                style={{
                  textAlignVertical: 'top'
                }}
              />

              <TextInput
                onChangeText={value => handleDataChange("permitnumber", value)}
                value={propertyValues.permitnumber}
                placeholder="Permit Number"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

              <TextInput
                onChangeText={value => handleDataChange("ownershipstatus", value)}
                value={propertyValues.ownershipstatus}
                placeholder="Ownership status"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>
          </View>
        }

        {steps == 2 &&
          <View id='second-step' className="mb-16">
            <View className="mt-6">
              <Text className="font-bold mb-2">
                Recreation & family
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("kidsplayarea", value)}
                value={propertyValues.kidsplayarea}
                placeholder="Kids Play area"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">
                Health & Fitness
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("steamroom", value)}
                value={propertyValues.steamroom}
                placeholder="Steam Room"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">
                Laundry and kitchen
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("laundryfacility", value)}
                value={propertyValues.laundryfacility}
                placeholder="Laundry facility"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>

            <View className="mt-6">
              <Text className="font-bold mb-2">
                Laundry and kitchen
              </Text>

              <TextInput
                onChangeText={value => handleDataChange("laundryfacility", value)}
                value={propertyValues.laundryfacility}
                placeholder="Laundry facility"
                keyboardType="default"
                className="bg-[#e9e9e1] text-black p-1 my-1 px-4 rounded-md"
              />

            </View>
          </View>
        }
      </ScrollView>


      <View className="absolute p-6 bottom-0 w-screen">
        <TouchableOpacity onPress={onDoneClicked}>
          <Text className="bg-primary w-full text-center py-3 rounded-full text-white font-bold">
            Done
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
