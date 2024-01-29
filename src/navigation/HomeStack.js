import { createStackNavigator } from "@react-navigation/stack";
import Properties from "../screens/Properties";
import PropertyDetail from "../screens/PropertyDetails";
import Home from "../screens/Home";

const HomeStack = () => {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="HouseShowcase"
        component={Properties}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="Details"
        component={PropertyDetail}
        options={{ headerShown: false }}
      />
    </HomeNavigator.Navigator>
  );
};
export default HomeStack;
