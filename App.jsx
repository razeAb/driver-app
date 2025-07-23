import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// Context provider and auth hook
import { AuthProvider, useAuth } from "./frontend/context/AuthContext";

// Screens (adjust imports if needed)
import EarningsScreen from "./frontend/screens/EarningsScreen";
import LoginScreen from "./frontend/screens/LoginScreen";
import OrdersScreen from "./frontend/screens/OrdersScreen";
import ProfileScreen from "./frontend/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
