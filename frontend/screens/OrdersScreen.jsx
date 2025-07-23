import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FlatList, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import { useAuth } from "../context/AuthContext.jsx";

// Enable layout animation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OrdersScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://your-backend.com/api/driver/orders/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await axios.post(
        `https://your-backend.com/api/driver/orders/${orderId}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("Error delivering order", err);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item._id;
    return (
      <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.card}>
        <Text style={styles.text}>👤 {item.user?.name || "אורח"}</Text>
        <Text style={styles.text}>📞 {item.user?.phone || item.phone}</Text>
        <Text style={styles.text}>💰 ₪{item.totalPrice}</Text>

        {isExpanded && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.subHeader}>🧾 מוצרים:</Text>
            {item.items.map((i, idx) => (
              <Text key={idx} style={styles.item}>
                • {i.quantity} × {i.product}
              </Text>
            ))}
            <Button title="סמן כסופק" onPress={() => handleMarkDelivered(item._id)} color="green" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return <FlatList data={orders} keyExtractor={(item) => item._id} contentContainerStyle={{ padding: 16 }} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  text: { fontSize: 16, marginBottom: 4 },
  subHeader: { fontWeight: "bold", marginTop: 10, marginBottom: 6 },
  item: { fontSize: 14, marginBottom: 2 },
});

export default OrdersScreen;
