import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import Loginpage from "../screens/Login";
import Register from "../screens/Register/Index";
import CreatePassword from '../screens/CreatePassword/index'
import OTP from '../screens/OTP/index'

const LoginStack = () => {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator>
      <LoginNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <LoginNavigator.Screen
        name="Login"
        component={Loginpage}
        options={{ headerShown: false }}
      />
      <LoginNavigator.Screen
        name="SignUp"
        component={Register}
        options={{ headerShown: false }}
      />
      <LoginNavigator.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />
      <LoginNavigator.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{ headerShown: false }}
      />
    </LoginNavigator.Navigator>
  );
};
export default LoginStack;
