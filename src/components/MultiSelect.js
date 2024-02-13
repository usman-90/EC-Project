import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const CustomMultiSelect = ({items,onChange,category}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const multiSelectRef = useRef(null);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  return (
    <View style={{ flex: 1 }}>
      <MultiSelect
        hideTags
        items={items} // Assuming items is defined elsewhere
        uniqueKey="id"
        ref={multiSelectRef}
        onSelectedItemsChange={(data) => {
		let arr = items.filter((elem) => {
			return data.includes(elem.id)
		})
		onChange(category, arr)
		onSelectedItemsChange(data)
	}}
        selectedItems={selectedItems}
        selectText="     Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#FFC70F' }}
        submitButtonColor="#FFC70F"
        submitButtonText="Done"
	  hideDropdown={true}
	hideSubmitButton={true}
	  iconSearch={false}
	  styleTextTag={{
		    borderColor: '#FFC70F', 
    color: '#FFC70F' 
	  }}
	  styleIndicator={
		  {
			  position:"relative",
				  bottom:5,
				  color:"#FFC70F"
		  }
	  }
      />
      <View>
        {multiSelectRef.current?.getSelectedItemsExt(selectedItems)}
      </View>
    </View>
  );
};

export default CustomMultiSelect;

