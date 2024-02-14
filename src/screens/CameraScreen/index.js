import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyData } from "../../features/property/propertySlice";

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const propertyInformation = useSelector((state) => state?.property.data);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const CAMERA_WIDTH = useWindowDimensions().width;
  const CAMERA_HEIGHT = useWindowDimensions().height;

  useEffect(() => {
    //this basically helps to initiate camera on screen
    const unsubscribefocus = navigation.addListener("focus", () => {
      setShowCamera(true);
    });
    return unsubscribefocus;
  }, []);

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
    });
    return unsubscribeblur;
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  if (!permission) {
    console.log("No permissions available", permission);
    requestPermission();
  }

  if (!permission?.granted) {
  }

  const takePicture = async () => {
    const { upload } = propertyInformation;
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
            <TouchableOpacity onPress={toggleCameraType}>
              <View className="w-20 h-20 items-center justify-center">
                <AntDesignIcon
                  name={`sync`}
                  style={{
                    fontSize: 28,
                    color: "#FFC70F",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={takePicture}>
              <View className="w-20 h-20 bg-slate-500 rounded-full border-solid border-8 border-gray-300"></View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreatePropertyScreen");
              }}
            >
              <View className="w-20 h-20 items-center justify-center">
                <AntDesignIcon
                  name={`check`}
                  style={{
                    fontSize: 28,
                    color: "#FFC70F",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
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
