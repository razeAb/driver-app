import axios from "axios";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order, token } = route.params;

  const handleMarkAsDelivered = async () => {
    try {
      await axios.post(
        `https://your-backend.com/api/driver/orders/${order._id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("הצלחה", "ההזמנה סומנה כסופקה");
      navigation.navigate("Orders", { token });
    } catch (err) {
      console.error("Failed to mark delivered:", err.message);
      Alert.alert("שגיאה", "לא ניתן לעדכן את הסטטוס");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦 פרטי הזמנה</Text>

      <Text style={styles.label}>שם לקוח: {order.user?.name || "אורח"}</Text>
      <Text style={styles.label}>טלפון: {order.user?.phone || order.phone}</Text>
      <Text style={styles.label}>סה״כ לתשלום: ₪{order.totalPrice}</Text>

      <Text style={styles.subHeader}>מוצרים:</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            • {item.quantity} × {item.product}
          </Text>
        )}
      />

      <View style={styles.buttonWrapper}>
        <Button title="סמן כסופק" onPress={handleMarkAsDelivered} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  subHeader: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 4 },
  buttonWrapper: { marginTop: 30 },
});

export default OrderDetailsScreen;
