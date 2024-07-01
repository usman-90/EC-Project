import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import SearchResult from "../screens/SearchResult";
import PropertyDetail from "../screens/PropertyDetails";
import Map from "../screens/Map/index";
import Payment from "../screens/Payment/index";

const SearchStack = () => {
  const SearchNavigator = createStackNavigator();
  return (
    <SearchNavigator.Navigator>
      <SearchNavigator.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="Details"
        component={PropertyDetail}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
    </SearchNavigator.Navigator>
  );
};
export default SearchStack;
