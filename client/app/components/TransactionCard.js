import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TransactionCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.receiver}</Text>
      <Text>₹{item.amount} - {item.method}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    marginTop: 4,
    color: 'gray',
  },
});
