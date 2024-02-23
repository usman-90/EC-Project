import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import sendImage from '../../../assets/CameraScreen/send.png'
import ring from '../../../assets/CameraScreen/ring.png'
import centerdot from '../../../assets/CameraScreen/centerdot.png'
import Toast from "react-native-toast-message";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyData } from "../../features/property/propertySlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

export default function CameraScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const propertyInformation = useSelector((state) => state?.property.data);
  const [type, setType] = useState(CameraType.back);
  const [gallarySelectedPics, setGallarySelectedPics] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [imagesData, setImagesData] = useState(propertyInformation?.upload?.images);

  useEffect(() => {
    //this basically helps to initiate camera on screen
    const unsubscribefocus = navigation.addListener("focus", () => {
      setShowCamera(true);
      const parentNav = navigation.getParent();
      parentNav.setOptions({

        tabBarStyle: { display: 'none' },
      });
    });
    return unsubscribefocus;
  }, []);

  useLayoutEffect(() => {
    navigation.setParams({ disableTabBar: true })
  }, [navigation]);

  useEffect(() => {
    //this basically helps to unsubscribe camera on screen
    const unsubscribeblur = navigation.addListener("blur", () => {
      setShowCamera(false);
      // dispatch(
      //   setPropertyData({
      //     ...propertyInformation,
      //     upload: {
      //       images: [],
      //       videos: [],
      //     },
      //   }),
      // );
      // setImagesData([]);
      // setGallarySelectedPics(0);
    });
    return unsubscribeblur;
  }, []);

  useEffect(() => {
    console.log("useEffect ran");
    if (propertyInformation?._id) {
      // navigation.navigate("CreatePropertyScreen");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'CreatePropertyScreen',
            }
          ],
        }),
      );
    }
  }, [])


  async function pickImagesFromGallery() {
    try {
      const { upload } = propertyInformation;
      const options = { mediaType: 'photo', quality: 1, selectionLimit: 4 };
      if (gallarySelectedPics > 3) {
        Toast.show({
          type: "info",
          text1: "Warning !",
          text2: "Max amount of images selected",
        });
        return;
      }
      // You can also use as a promise without 'callback':
      const result = await launchImageLibrary(options);
      if (result.didCancel || gallarySelectedPics > 3) {
        return;
      }
      const tempImgArr = [];
      console.log("pick image result", result);
      result.assets.map((e, i) => {
        if (i < 4) {
          tempImgArr.push(e.uri);
        }
      })
      if (result.assets.length > 4) {
        Toast.show({
          type: "info",
          text1: "Warning !",
          text2: "Only 4 pictures are allowed only top 4 will be selected",
        });
      }
      dispatch(
        setPropertyData({
          ...propertyInformation,
          upload: {
            images: [...upload.images, ...tempImgArr],
            videos: upload.videos,
          },
        }),
      );
      setGallarySelectedPics(gallarySelectedPics + tempImgArr.length)
      console.log("Gallery results", result);
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (!permission) {
    console.log("No permissions available", permission);
    requestPermission();
  }

  if (!permission?.granted) {
  }

  const takePicture = async () => {
    const { upload } = propertyInformation;
    try {
      if (cameraRef && imagesData.length < 4) {
        const data = await cameraRef.takePictureAsync(null);
        console.log("Image uri", data);
        setImagesData([...imagesData, data.uri]);
        dispatch(
          setPropertyData({
            ...propertyInformation,
            upload: {
              images: [...upload.images, data.uri],
              videos: upload.videos,
            },
          }),
        );
      } else if (imagesData.length > 3) {
        Toast.show({
          type: "info",
          text1: "Warning !",
          text2: "Only 4 pictures are allowed",
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // function handleSingleTap(event) {
  //   const xPercent = event.nativeEvent.x / CAMERA_WIDTH;
  //   const yPercent = event.nativeEvent.y / CAMERA_HEIGHT;
  //   // Implement your focus logic here based on the tap event
  //   console.log("SingleTap:", xPercent, yPercent);
  //   // For example, adjust focus using the Camera's ref and autoFocus methods
  //   (async () => {
  //     try {
  //       if (cameraRef) {
  //         // console.log(cameraRef._cameraRef);
  //         // const cameraInstance = await cameraRef.getCameraInstanceAsync();
  //         // cameraInstance.autoFocus({ x: xPercent, y: yPercent });
  //       }
  //     } catch (error) {
  //       console.error("Error adjusting focus:", error);
  //     }
  //   })();
  // }

  return (
    <View className="flex-1">
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      {showCamera && (
        <Camera
          style={{ flex: 1 }}
          type={type}
          autoFocus={Camera.Constants.AutoFocus.on}
          ref={(ref) => setCameraRef(ref)}
          focusDepth={1}
          ratio="16:9"
        >
          <View className="absolute w-screen">
            <View className="h-full items-end mt-8">
              <View>
                {imagesData.length > 0 &&
                  imagesData.map((e, i) => (
                    <ImageComponent e={e} key={"image-" + i} />
                  ))}
              </View>
            </View>
          </View>
          <View className="flex-row justify-around items-center h-32 absolute w-screen bottom-0">
            <TouchableOpacity onPress={pickImagesFromGallery}>
              <View className="w-20 h-20 items-center justify-center">
                <AntDesignIcon
                  name={`picture`}
                  style={{
                    fontSize: 28,
                    color: "#FFC70F",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
                {gallarySelectedPics > 0 && <Text className="text-white bg-red-600 w-4 right-5 top-5 text-center absolute rounded-full">{gallarySelectedPics}</Text>}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={takePicture}>
              <View className="w-20 h-20 rounded-full items-center justify-center border-solid ">
                <Image source={ring} />
                <Image source={centerdot} className="absolute" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.push("CreatePropertyScreen");
              }}
            >
              <View className="w-20 h-20 items-center justify-center">
                {/* <AntDesignIcon
                  name={`check`}
                  style={{
                    fontSize: 28,
                    color: "#FFC70F",
                    borderRadius: 20,
                    padding: 5,
                  }}
                /> */}
                <Image source={sendImage} />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const ImageComponent = ({ e }) => {
  return (
    <View className="my-2 mx-6 border-2 rounded-md border-white">
      <Image className="h-16 w-16" source={{ uri: e }} />
    </View>
  );
};
