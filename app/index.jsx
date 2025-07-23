import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import { AuthProvider, useAuth } from "../frontend/context/AuthContext";
import LoginScreen from "../frontend/screens/LoginScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
    </View>
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
