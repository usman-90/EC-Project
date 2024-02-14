import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile/index";
import EditProfile from "../screens/editprofile/index";
import ChangePassword from "../screens/ChangePassword/index";
import Contact from "../screens/Contact/index";
import Listing from "../screens/Listing/index";

const ProfileStack = () => {
  const ProfileNavigator = createStackNavigator();
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileNavigator.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <ProfileNavigator.Screen
        name="Listing"
        component={Listing}
        options={{ headerShown: false }}
      />
      <ProfileNavigator.Screen
        name="contact"
        component={Contact}
        options={{ headerShown: false }}
      />
      <ProfileNavigator.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </ProfileNavigator.Navigator>
  );
};
export default ProfileStack;
