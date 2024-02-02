import { createStackNavigator } from "@react-navigation/stack";
import PropertyDetail from "../screens/PropertyDetails";
import Save from "../screens/Save";
import Map from "../screens/Map/index";

const SaveStack = () => {
  const SaveNavigator = createStackNavigator();
  return (
    <SaveNavigator.Navigator>
      <SaveNavigator.Screen
        name="Save"
        component={Save}
        options={{ headerShown: false }}
      />
      <SaveNavigator.Screen
        name="Details"
        component={PropertyDetail}
        options={{ headerShown: false }}
      />
      <SaveNavigator.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </SaveNavigator.Navigator>
  );
};
export default SaveStack;
