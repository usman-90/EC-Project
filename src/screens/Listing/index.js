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


const Listing= () => {
return (<View>
		<Text>
	Hello
		</Text>
	</View>)
}
export default Listing;

