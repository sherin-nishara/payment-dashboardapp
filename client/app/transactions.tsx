// File: app/transactions.tsx
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const transactions = [
  { id: '1', title: 'UPI Payment', amount: 500 },
  { id: '2', title: 'Recharge', amount: 200 },
  { id: '3', title: 'Subscription', amount: 299 },
];

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/transactions/${item.id}`)}
          >
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: { fontSize: 16 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});
