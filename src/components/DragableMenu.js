import React, { useState, useRef, useContext, useEffect } from "react";
import FilterContext from "../context/FilterContext";
import Icon from "react-native-vector-icons/AntDesign";
import Graph from "react-native-vector-icons/Foundation";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { fetchProperties } from "../apiFunctions/properties";
import FilterButton from "./FilterButton";
import { fetchSubCategories } from "../apiFunctions/properties";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const DragableMenu = ({ setData, query, refetchProperties }) => {
  const bottomSheet = useRef();
  const [filters, setFilters] = useContext(FilterContext);
  const subCategoriesResult = useQuery({
    queryKey: ["SubCategories", filters?.category],
    queryFn: fetchSubCategories,
  });

  const subCategories = [
    { value: "All", key: "" },
    ...(subCategoriesResult?.data?.data?.data ?? []),
  ];
  console.log("DragableMenu", filters);

  const handleFilterChange = (name, val) => {
    setFilters({
      ...filters,
      [name]: val,
    });
  };
  const handleMultipleChanges = (data) => {
    setFilters({
      ...filters,
      ...data,
    });
  };
  const handleValuesChange = (newValues) => {
    const [min, max] = newValues;
    handleMultipleChanges({
      priceMin: min,
      priceMax: max,
    });
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
      name: 5,
      keyword: 5
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
      name: 5,
      keyword: 5
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

    return currIdx;
  };
  const getBathroomIdx = () => {
    const curr = bathroomNo.filter((elem) => {
      return elem.keyword === filters?.bathrooms;
    });
    const currIdx = bathroomNo.indexOf(curr[0]);
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
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} >
        <ScrollView className="basis-full">
          <TouchableWithoutFeedback>
            <View>
              <Text className="px-6 py-3 text-lg my-1 font-bold">Category</Text>

              <View className="px-6">
                <View className="flex-row">
                  {categories.map((item, i) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleFilterChange("category", item?.keyword);
                      }}
                      className="w-fit"
                      key={i}
                    >
                      <View style={styles.me_2} className="me-3 mr-5">
                        <Text
                          className={`h-9 py-2 rounded-md px-3 bg-primary ${item?.keyword === filters?.category
                            ? "bg-white text-primary border border-primary"
                            : "bg-primary text-white"
                            }`}
                        >
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Text className={`px-6 py-3 text-lg my-1 font-bold`}>
                Sub Category
              </Text>

              <View className="px-6 flex-row flex-wrap">
                {subCategories?.map((cat, i) => {
                  return (
                    <TouchableOpacity
                      className="my-1"
                      onPress={() => {
                        handleFilterChange("subCategory", cat?.key);
                      }}
                      key={i}
                    >
                      <View style={styles.me_2} className="me-3 mr-5 mb-3">
                        <Text
                          className={`h-9 py-2 rounded-md px-3 bg-primary  ${cat?.key === filters?.subCategory
                            ? "bg-white text-primary border border-primary"
                            : "bg-primary text-white"
                            }`}
                        >
                          {cat?.value}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text className="px-6 py-3 text-lg my-1 font-bold">
                Completeness
              </Text>

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

              <Text className="px-6 pt-3 text-lg my-1 font-bold">
                Price Range
              </Text>

              <View className="px-6 mt-2 flex-row justify-center">
                <Graph style={styles.graph} name="graph-bar" />
                <Graph style={styles.graph} name="graph-bar" />
              </View>

              <View className="px-6">
                <View className="items-center ">
                  <MultiSlider
                    values={[filters?.priceMin, filters?.priceMax]}
                    sliderLength={300}
                    onValuesChangeFinish={handleValuesChange}
                    min={0}
                    max={5000}
                    step={100}
                    allowOverlap={false}
                    containerStyle={{ height: 25 }}
                    selectedStyle={{ backgroundColor: "#FFC70F", height: 5 }}
                    trackStyle={{ height: 5 }}
                    markerStyle={{
                      backgroundColor: "#ffffff",
                      height: 20,
                      width: 20,
                      borderWidth: 1,
                      borderColor: "#FFC70F",
                      top: 2,
                    }}
                    snapped
                  />
                </View>
                <View className="flex-row justify-between px-6">
                  <Text className="text-lg font-bold">
                    ${filters?.priceMin}
                  </Text>
                  <Text className="text-lg font-bold">
                    ${filters?.priceMax === "" ? 0 : filters?.priceMax}
                  </Text>
                </View>
              </View>

              <Text className="px-6 text-lg my-1 font-bold">Area</Text>
              <View className="px-6">
                <View className="items-center">
                  <MultiSlider
                    values={[filters?.areaMin, filters?.areaMax]}
                    sliderLength={300}
                    onValuesChangeFinish={(newValues) => {
                      const [min, max] = newValues;
                      handleMultipleChanges({
                        areaMin: min,
                        areaMax: max,
                      });
                    }}
                    min={0}
                    max={5000}
                    step={100}
                    allowOverlap={false}
                    containerStyle={{ height: 25 }}
                    selectedStyle={{ backgroundColor: "#FFC70F", height: 5 }}
                    trackStyle={{ height: 5 }}
                    markerStyle={{
                      backgroundColor: "#ffffff",
                      height: 20,
                      width: 20,
                      borderWidth: 1,
                      borderColor: "#FFC70F",
                      top: 2,
                    }}
                    snapped
                  />
                </View>
                <View className="flex-row justify-between px-6 h-8">
                  <Text className="text-lg font-bold">
                    {filters?.areaMin}
                    <Text style={{ fontSize: 9 }}>SqFt</Text>
                  </Text>
                  <Text className="text-lg font-bold">
                    {filters?.areaMax === "" ? 0 : filters?.areaMax}
                    <Text style={{ fontSize: 9 }}>SqFt</Text>
                  </Text>
                </View>
              </View>
              <View className="mt-2 flex-row w-full px-6 py-3  bottom-0 left-0 right-0 bg-gray-200">
                <TouchableOpacity
                  onPress={() =>
                    handleMultipleChanges({
                      areaMax: 5000,
                      areaMin: 0,
                      bathrooms: "",
                      bedrooms: "",
                      category: "all",
                      priceMax: 5000,
                      priceMin: 0,
                      subCategory: "all",
                    })
                  }
                  className="bg-red-500 text-white px-4 py-2 w-3/12 text-base rounded-lg"
                >
                  <View className="">
                    <Text className="text-white text-center">Reset</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-primary text-white mx-2 px-4 py-2 w-9/12 text-base rounded-lg"
                  onPress={() => {
                    console.log(query ? "yes" : "no");
                    setData ? setData(null) : null;
                    query ? refetchProperties(query) : refetchProperties();
                    bottomSheet.current.close();
                  }}
                >
                  <View className="">
                    <Text className="text-white w-full text-center">
                      Search
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
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

export default React.memo(DragableMenu);
