import React, { useState, useRef, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import EditIcon from "../../../Asset/Images/Profile/edit-line.png";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../../apiFunctions/profileSettings";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/user/userSlice";
import Toast from "react-native-toast-message";

const ProfileDragableMenu = () => {
  const { userData, token } = useSelector(state => state?.user?.data);
  const dispatch = useDispatch();
  const bottomSheet = useRef();
  const [insertingMessage, setInsertingMessage] = useState("");
  const addProfilePhotoMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      console.log("Data on edit Profile photo", data);
      bottomSheet.current.close();
    }
  })

  useEffect(() => {
    console.log("ProfileDragableMenu");
  }, [])

  const closePanel = () => {
    bottomSheet.current.close();
  }

  const uploadImageAndGetUrl = async (result, imgName) => {
    let tempImg = "";
    result.assets.map((e, i) => {
      if (i < 1) {
        tempImg = (e.uri);
      }
    });
    if (!tempImg) {
      Toast.show({
        type: "error",
        text1: "Image Not Selected!",
        autoHide: true
      });
      return null;
    }
    const response = await fetch(tempImg);
    setInsertingMessage("Uploading Images");
    const blob = await response.blob();
    const storageRef = ref(
      storage,
      "Profile/" + imgName,
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setTotalUploadPercent(progress.toFixed());
          console.log("Uploaded progress", progress.toFixed());
        },
        (error) => {
          console.log("Error uploading image. Reason:", error);
          setInsertingMessage("Error uploading image. Reason: " + error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // console.log("File available at", downloadURL);
            setInsertingMessage("Upload complete");
            resolve(downloadURL);
          } catch (error) {
            console.log("Error getting download URL. Reason:", error);
            setInsertingMessage("Error getting download URL. Reason: " + error);
            reject(error);
          }
        },
      );
    });
  }

  const selectFromAlbums = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, selectionLimit: 1, maxHeight: 500, maxWidth: 500 });
      if (result.didCancel) {
        return;
      }
      console.log("photo selected", result);

      const imageName = new Date().getTime() + ".jpeg";
      const imageUrl = await uploadImageAndGetUrl(result, imageName);

      const profileData = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        photo: imageUrl
      }

      addProfilePhotoMutation.mutate(profileData);

      dispatch(setUserData({
        token,
        userData: {
          ...userData,
          photo: imageUrl,
          photoName: imageName
        }
      }))
      console.log("Image Url", imageUrl);
    } catch (error) {
      console.log("Error while picking profile photo", error);
    }
  }

  const captureImage = async () => {
    try {
      const result = await launchCamera({ cameraType: 'front', quality: 1, mediaType: 'photo' })
      if (result.didCancel) {
        return;
      }
      console.log("Image captured", result);

      const imageName = new Date().getTime() + ".jpeg";
      const imageUrl = await uploadImageAndGetUrl(result, imageName);

      const profileData = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        photo: imageUrl
      }

      addProfilePhotoMutation.mutate(profileData);

      dispatch(setUserData({
        token,
        userData: {
          ...userData,
          photo: imageUrl,
          photoName: imageName
        }
      }))
      console.log("Image Url", imageUrl);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Image upload got into an issue!",
        autoHide: true
      });
    }
  }

  const deleteUserPhoto = () => {
    const { photoName } = userData;
    let imageRef = ref(
      storage,
      "Profile/" + photoName,
    );
    deleteObject(imageRef).then(_ => {
      console.log(`${photoName} has been deleted successfully.`);

      const profileData = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        photo: undefined,
        photoName: undefined
      }

      addProfilePhotoMutation.mutate(profileData);

      dispatch(setUserData({
        token,
        userData: {
          ...userData,
          photo: undefined,
          photoName: undefined
        }
      }));
      bottomSheet.current.close();
    }).catch(e => {
      console.log('error on image deletion => ', e);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet ref={bottomSheet} height={300} >
        <TouchableOpacity onPress={closePanel} className="absolute pl-7 pt-11">
          <Icon name="close" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <View className="pb-6">
            <Text className="text-lg font-bold">Change photo profile</Text>
          </View>
          <View className="p-4 border-b-[1px] border-gray-300 w-60 items-center">
            <TouchableOpacity onPress={deleteUserPhoto}>
              <Text className="text-primary">Delete</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 border-b-[1px] border-gray-300 w-60 items-center">
            <TouchableOpacity onPress={captureImage}>
              <Text className="text-primary">Take A photo</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 w-60 items-center">
            <TouchableOpacity onPress={selectFromAlbums}>
              <Text className="text-primary">Select from albums</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <TouchableOpacity onPress={() => bottomSheet.current.show()}>
        <Image source={EditIcon} />
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

export default React.memo(ProfileDragableMenu);
