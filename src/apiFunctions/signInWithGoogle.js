import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setUserData } from "../features/user/userSlice";
import { socialLogin } from './register';
import { setPropertyData } from '../features/property/propertySlice';

GoogleSignin.configure({
  webClientId:
    "276924636442-p16kdksu0aacmvoa10e08qo0ldahho8v.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});

export function onGoogleButtonPress(dispatch, navigation, propertyInformation) {
	return new Promise(async (resolve, reject) => {
		try {
			await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
			const { idToken, user } = await GoogleSignin.signIn();
			console.log("User info from google", user);
			const response = await socialLogin({
				email: user.email,
				name: user.name,
				image: user.photo
			});

			console.log("response on social login", response);
			
			if (response.status !== 200) {
				reject(response.data); // Reject with the response data
				return;
			}
			const { userData, token } = response.data?.data;

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
			dispatch(setPropertyData({
				...propertyInformation,
				contactDetails: {
				  ListingOwner: userData?.name,
				  contactPerson: userData?.name,
				  email: userData?.email,
				  phone: userData?.phoneNumber,
				},
				ownerId: userData?._id
			  }));
			navigation.reset({
				index: 0,
				routes: [{ name: 'BottomTabStack' }],
			});
			resolve(response.data); // Resolve with the response data
		} catch (error) {
			console.log("Error in onGoogleButtonPress:", error);
			reject(error); // Reject with the error
		}
	});
}
