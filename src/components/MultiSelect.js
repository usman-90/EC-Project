import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { MultipleSelectList } from "./CreateProperty/ReactNativeDropdownList";

const CustomMultiSelect = ({
  items,
  onChange,
  category,
  placeholder,
  editSelected,
}) => {
  const [selectedItems, setSelectedItems] = useState(editSelected.length > 0 ? editSelected.map(item => item.name) : []);
  const multiSelectRef = useRef(null);

  const onSelectedItemsChange = (pickedItems) => {
    console.log("selectedItems", pickedItems, items);
    let arr = items.filter((elem) => {
      return pickedItems.includes(elem.name);
    });
    console.log("filtered array", arr);
    onChange(category, arr);
  };

  useEffect(() => {
    if (editSelected.length > 0) {
      onChange(category, editSelected);
    }
    console.log("editSelected", items, category, placeholder, editSelected);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MultipleSelectList
        setSelected={(val) => setSelectedItems(val)}
        data={items}
        selected={editSelected}
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
