import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import EarningsScreen from "./screens/EarningScreens.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import OrdersScreen from "./screens/OrdersScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { token } = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Active Orders" component={OrdersScreen} />
      <Tab.Screen name="Order History" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { token } = useAuth();
  return token ? <Tabs /> : <LoginScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
