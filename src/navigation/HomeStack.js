import { createStackNavigator } from "@react-navigation/stack";
import Properties from "../screens/Properties";
import Search from "../screens/Search";
import SearchResult from "../screens/SearchResult";
import PropertyDetail from "../screens/PropertyDetails";
import Profile from '../screens/Profile/index'
import EditProfile from '../screens/editprofile/index'
import ChangePassword from '../screens/ChangePassword/index'

const HomeStack = () => {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        name="Home"
        component={Properties}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="Details"
        component={PropertyDetail}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </HomeNavigator.Navigator>
  );
};
export default HomeStack;
