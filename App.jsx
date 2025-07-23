import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EarningsScreen from "./screens/EarningsScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import OrderDetailsScreen from "./screens/OrderDetailsScreen.jsx";
import OrdersScreen from "./screens/OrdersScreen.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
        <Stack.Screen name="Earnings" component={EarningsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
