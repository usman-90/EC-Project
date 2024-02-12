import { GoogleSignin } from '@react-native-google-signin/google-signin';
import store from "../app/store"
import { setUserData } from "../features/user/userSlice";
import { socialLogin } from './register';

GoogleSignin.configure({
	webClientId: '276924636442-p16kdksu0aacmvoa10e08qo0ldahho8v.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
});
export async function onGoogleButtonPress(dispatch, navigation) {
	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
	const { idToken, user } = await GoogleSignin.signIn();
	console.log("User info from google", user);
	const response = await socialLogin({
		email: user.email,
		name: user.name,
		image: user.photo
	});

	const { userData, token } = response.data?.data;

	console.log("response on social login", response);

	if (response.status !== 200) {
		return;
	}

	let data1 = {
		token: token,
		userData: {
			email: user?.email,
			name: user?.name,
			_id: userData?._id,
			phoneNumber: null,
			photo: user?.photo
		},
	}
	dispatch(setUserData(data1));
	navigation.reset({
		index: 0,
		routes: [{ name: 'BottomTabStack' }],
	});
}
