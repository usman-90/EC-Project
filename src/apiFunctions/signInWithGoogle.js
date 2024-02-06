import { GoogleSignin } from '@react-native-google-signin/google-signin';
import store from "../app/store"
import { setUserData } from "../features/user/userSlice";

GoogleSignin.configure({
  webClientId: '276924636442-p16kdksu0aacmvoa10e08qo0ldahho8v.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});
export async function onGoogleButtonPress(dispatch,navigation) {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, user } = await GoogleSignin.signIn();
	console.log(user)
	let data1 = {
      userData: {
		email: user?.email,
		name: user?.name,
		userId: user?.id,
		_id:user?.id,
		phoneNumber:null,
	      photo:user?.photo
      },
    }
	dispatch(setUserData(data1));
    navigation.navigate("BottomTabStack")
}
