import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import store from "../app/store";
import { setUserData } from "../features/user/userSlice";

export async function onFacebookButtonPress(dispatch, navigation) {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      throw "user cancelled the login process";
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "something went wrong obtaining access token";
    }
    const facebookcredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    const { user } = await auth().signInWithCredential(facebookcredential);

    let data1 = {
      userData: {
        email: user?._user?.email,
        name: user?._user?.displayName,
        userId: user?._user?.uid,
        _id: user?._user?.uid,
        phoneNumber: null,
        photo: user?._user?.photoURL,
      },
    };
    dispatch(setUserData(data1));
    navigation.reset({
      index: 0,
      routes: [{ name: "BottomTabStack" }],
    });
  } catch (error) {
    console.log(error);
  }
}
