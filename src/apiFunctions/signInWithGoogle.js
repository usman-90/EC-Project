import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '276924636442-p16kdksu0aacmvoa10e08qo0ldahho8v.apps.googleusercontent.com',
});

export async function onGoogleButtonPress(navigation) {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, user } = await GoogleSignin.signIn();
    console.log(user)
    navigation.navigate("HomeStack")
}

