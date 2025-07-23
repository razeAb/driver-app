import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext.jsx";

const ProfileScreen = () => {
  const { logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert("התנתקות", "האם אתה בטוח שברצונך להתנתק?", [
      { text: "ביטול", style: "cancel" },
      { text: "התנתק", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 פרופיל שליח</Text>
      <Button title="התנתק" onPress={confirmLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ProfileScreen;
