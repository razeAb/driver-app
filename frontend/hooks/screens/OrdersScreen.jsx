import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";

const OrdersScreen = ({ navigation, route }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = route.params?.token; // passed from login

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://your-backend.com/api/driver/orders/available", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await axios.post(
        `https://your-backend.com/api/driver/orders/${orderId}/assign`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      alert("Failed to accept order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.text}>👤 {item.user?.name || "Guest"}</Text>
          <Text style={styles.text}>📞 {item.user?.phone || item.phone}</Text>
          <Text style={styles.text}>💰 {item.totalPrice} ₪</Text>
          <Button title="Accept" onPress={() => handleAccept(item._id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  text: { fontSize: 16, marginBottom: 4 },
});

export default OrdersScreen;
