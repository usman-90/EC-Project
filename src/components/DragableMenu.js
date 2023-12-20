import React, { useState, useRef, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Graph from "react-native-vector-icons/Foundation";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import FilterButton from "./FilterButton";
import { fetchSubCategories } from "../apiFunctions/properties";
import { useMutation, useQuery } from "@tanstack/react-query";
import FilterContext from "../context/FilterContext";

const Example = () => {
  // Needed in order to use .show()
  const bottomSheet = useRef();
  const [filters, setFilters] = useContext(FilterContext);
  const subCategoriesResult = useQuery({
    queryKey: ["SubCategories", filters?.category],
    queryFn: fetchSubCategories,
  });

  const subCategories = subCategoriesResult?.data?.data?.data ?? [];
  const [values, setValues] = useState([0, 50]);
  console.log(filters);

  const handleFilterChange = (name, val) => {
    setFilters({
      ...filters,
      [name]: val,
    });
  };
  const handleValuesChange = (newValues) => {
    setValues(newValues);
  };

  const categories = [
    {
      name: "All",
      keyword: "all",
    },
    {
      name: "Residential",
      keyword: "residential",
    },
    {
      name: "Commercial",
      keyword: "commercial",
    },
  ];

  const bedroomsNo = [
    {
      name: "All",
      keyword: "",
    },
    {
      name: 1,
      keyword: 1,
    },
    {
      name: 2,
      keyword: 2,
    },
    {
      name: 3,
      keyword: 3,
    },
    {
      name: 4,
      keyword: 4,
    },
    {
      name: "5 or above",
      keyword: "5andAbove",
    },
  ];
  const bathroomNo = [
    {
      name: "All",
      keyword: "",
    },
    {
      name: 1,
      keyword: 1,
    },
    {
      name: 2,
      keyword: 2,
    },
    {
      name: 3,
      keyword: 3,
    },
    {
      name: 4,
      keyword: 4,
    },
    {
      name: "5 or above",
      keyword: "5andAbove",
    },
  ];

  const getBedroomsIdx = () => {
    const curr = bedroomsNo.filter((elem) => {
      return elem.keyword === filters?.bedrooms;
    });
    const currIdx = bedroomsNo.indexOf(curr[0]);
    console.log(curr);

    return currIdx;
  };
  const getBathroomIdx = () => {
    const curr = bathroomNo.filter((elem) => {
      return elem.keyword === filters?.bathrooms;
    });
    const currIdx = bathroomNo.indexOf(curr[0]);
    console.log(curr);
    return currIdx;
  };

  const incrementBedroom = () => {
    let idx = getBedroomsIdx();
    if (idx === 5) {
      return;
    }
    handleFilterChange("bedrooms", bedroomsNo[idx + 1]?.keyword);
  };
  const decrementBedrooms = () => {
    let idx = getBedroomsIdx();
    if (idx === 0) {
      return;
    }
    handleFilterChange("bedrooms", bedroomsNo[idx - 1]?.keyword);
  };
  const incrementBathrooms = () => {
    let idx = getBathroomIdx();
    if (idx === 5) {
      return;
    }
    handleFilterChange("bathrooms", bathroomNo[idx + 1]?.keyword);
  };
  const decrementBathrooms = () => {
    let idx = getBathroomIdx();
    if (idx === 0) {
      return;
    }
    handleFilterChange("bathrooms", bathroomNo[idx - 1]?.keyword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <ScrollView className="mb-2">
          <Text className="px-6 text-lg my-1 font-bold">Category</Text>

          <View className="px-6">
            <FlatList
              className="grow-0"
              data={categories}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleFilterChange("category", item?.keyword);
                    }}
                  >
                    <View style={styles.me_2} className="me-3">
                      <Text className="h-8  py-2 rounded-md px-3 bg-primary">
                        {item?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              horizontal={true}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Text className="px-6 text-lg my-1 font-bold">Sub Category</Text>

          <View className="px-6 flex-row flex-wrap">
            {subCategories?.map((cat) => {
              return (
                <TouchableOpacity
                  className="my-1"
                  onPress={() => {
                    handleFilterChange("subCategory", item?.key);
                  }}
                >
                  <View style={styles.me_2} className="me-3">
                    <Text className="h-8  py-2 rounded-md px-3 bg-primary">
                      {cat?.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text className="px-6 text-lg my-1 font-bold">Completeness</Text>

          <View className="px-6 flex-row justify-between my-1 items-center">
            <Text className="text-base text-gray-500">Bedrooms</Text>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  decrementBedrooms();
                }}
              >
                <Icon name="minuscircle" style={styles.iconStyleGray} />
              </TouchableOpacity>
              <Text className="mx-2 text-base">
                {bedroomsNo[getBedroomsIdx()]?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  incrementBedroom();
                }}
              >
                <Icon style={styles.iconStyleYellow} name="pluscircle" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-6 flex-row justify-between my-1 items-center">
            <Text className="text-base text-gray-500">Bathrooms</Text>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  decrementBathrooms();
                }}
              >
                <Icon name="minuscircle" style={styles.iconStyleGray} />
              </TouchableOpacity>
              <Text className="mx-2 text-base">
                {bathroomNo[getBathroomIdx()]?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  incrementBathrooms();
                }}
              >
                <Icon style={styles.iconStyleYellow} name="pluscircle" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="px-6 text-lg my-1 font-bold">Price Range</Text>

          <View className="px-6 mt-2 flex-row justify-center">
            <Graph style={styles.graph} name="graph-bar" />
            <Graph style={styles.graph} name="graph-bar" />
          </View>

          <View className="px-6">
            <View className="items-center">
              <MultiSlider
                values={values}
                sliderLength={350}
                onValuesChange={handleValuesChange}
                min={0}
                max={5000}
                step={1}
                allowOverlap={false}
                snapped
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">${values[0]}</Text>
              <Text className="text-lg font-bold">${values[1]}</Text>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
      <TouchableOpacity onPress={() => bottomSheet.current.show()}>
        <FilterButton />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pe_2: {
    paddingEnd: 10,
  },
  me_2: {
    marginEnd: 10,
  },
  iconStyleYellow: {
    fontSize: 20,
    color: "#FFC70F",
  },

  iconStyleGray: {
    fontSize: 20,
    color: "gray",
  },
  graph: {
    fontSize: 150,
    color: "#FFC70F",
    marginHorizontal: 1,
  },
});

export default Example;
