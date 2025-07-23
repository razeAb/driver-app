import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext.jsx"; // ✅

const EarningsScreen = ({ navigation }) => {
  const { token } = useAuth(); // ✅
  const [earnings, setEarnings] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigation.navigate("Login");
    }
  }, [token]);

  const fetchEarnings = async () => {
    try {
      const res = await axios.get("https://your-backend.com/api/driver/orders/earnings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEarnings(res.data.earnings);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching earnings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchEarnings();
  }, [token]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💰 סך כל הרווחים שלך</Text>
      <Text style={styles.total}>₪ {earnings.toFixed(2)}</Text>

      <Text style={styles.subHeader}>הזמנות שסופקו</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>👤 {item.user?.name || "אורח"}</Text>
            <Text style={styles.cardText}>💵 סכום הזמנה: ₪{item.totalPrice}</Text>
            <Text style={styles.cardText}>🟢 עמלה: ₪{item.deliveryEarning?.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  total: { fontSize: 28, fontWeight: "bold", color: "green", marginBottom: 16, textAlign: "center" },
  subHeader: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default EarningsScreen;
