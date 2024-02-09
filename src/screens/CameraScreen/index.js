import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(true);
  const cameraRef = useRef(null);
  const CAMERA_WIDTH = "";
  const CAMERA_HEIGHT = "";

  useEffect(() => {
    //this basically helps to initiate camera on screen
    const unsubscribefocus = navigation.addListener('focus', () => {
      setShowCamera(true);
    });
    return unsubscribefocus;
  }, [])

  useEffect(() => {
    //this basically helps to unsubscribe camera on screen
    const unsubscribeblur = navigation.addListener('blur', () => {
      setShowCamera(false);
    });
    return unsubscribeblur;
  }, [])



  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  if (!permission) {
    console.log("No permissions available");
    requestPermission();
  }

  if (!permission?.granted) {

  }

  function handleSingleTap(event) {
    const xPercent = event.nativeEvent.x / CAMERA_WIDTH;
    const yPercent = event.nativeEvent.y / CAMERA_HEIGHT;
    // Implement your focus logic here based on the tap event
    // For example, adjust focus using the Camera's ref and autoFocus methods
    (async () => {
      try {
        if (cameraRef.current) {
          const cameraInstance = await cameraRef.current.getCameraInstanceAsync();
          cameraInstance.autoFocus({ x: xPercent, y: yPercent });          
        }
      } catch (error) {
        console.error('Error adjusting focus:', error);
      }
    })();
  }

  return (
    <View className="flex-1">
      {showCamera &&
        <TapGestureHandler onHandlerStateChange={handleSingleTap}>
          <Camera
            style={{ flex: .8 }}
            type={type}
            autoFocus={Camera.Constants.AutoFocus.on}
          />
        </TapGestureHandler>
      }

      <View className="flex-row justify-around items-center" style={{ flex: .2 }}>
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

        <TouchableOpacity onPress={toggleCameraType}>
          <View className="w-20 h-20 bg-slate-500 rounded-full border-solid border-8 border-gray-300"></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('CreatePropertyScreen')}}>
          <View className="w-20 h-20 items-center justify-center">
            <AntDesignIcon
              name={`check`}
              style={{
                fontSize: 28,
                color: "#FFC70F",
                borderRadius: 20,
                padding: 5
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
