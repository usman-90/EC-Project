import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const CustomMultiSelect = ({ items, onChange, category, placeholder, editSelected }) => {
  const [selectedItems, setSelectedItems] = useState(editSelected.length > 0 ? editSelected : []);
  const multiSelectRef = useRef(null);

  const onSelectedItemsChange = (selectedItems) => {
    let arr = items.filter((elem) => {
      return selectedItems.includes(elem.value);
    });
    // console.log(arr);
    console.log("selectedItems", arr);
    onChange(category, arr);
  };

  useEffect(() => {
    console.log("editSelected", editSelected);
  }, [])
  

  return (
    <View style={{ flex: 1 }}>
      <MultipleSelectList
        setSelected={(val) => setSelectedItems(val)}
        data={items}
        save="value"
        placeholder={placeholder}
        onSelect={(_) => onSelectedItemsChange(selectedItems)}
        // label={category}
        boxStyles={{ borderWidth: 0, backgroundColor: "#e9e9e1" }}
        badgeStyles={{ backgroundColor: "#FFC70F" }}
        labelStyles={{ display: "none" }}
      />
      <View>{multiSelectRef.current?.getSelectedItemsExt(selectedItems)}</View>
    </View>
  );
};

export default CustomMultiSelect;
