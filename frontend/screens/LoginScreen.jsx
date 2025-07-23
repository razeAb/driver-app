import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      return Alert.alert("שגיאה", "נא למלא טלפון וסיסמה");
    }

    try {
      setLoading(true);
      const res = await axios.post("https://your-backend.com/api/driver/login", {
        phone,
        password,
      });

      const token = res.data.token;

      // Navigate to Orders screen and pass the token
      navigation.navigate("Orders", { token });
    } catch (err) {
      console.error(err.message);
      Alert.alert("שגיאה", "טלפון או סיסמה לא נכונים");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>התחברות שליח</Text>

      <TextInput
        placeholder="טלפון"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="סיסמה"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title={loading ? "מתחבר..." : "התחבר"} onPress={handleLogin} disabled={loading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});

export default LoginScreen;
