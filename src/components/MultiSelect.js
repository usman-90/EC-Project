import React, { useState, useRef } from "react";
import { View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const CustomMultiSelect = ({ items, onChange, category, placeholder }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const multiSelectRef = useRef(null);

  const onSelectedItemsChange = (selectedItems) => {
    onChange(category, selectedItems);
  };

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
