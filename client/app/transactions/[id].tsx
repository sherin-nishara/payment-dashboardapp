import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../services/api';

export default function TransactionDetails() {
  const { id } = useLocalSearchParams();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/payments/${id}`).then((res) => {
        setPayment(res.data);
      }).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (!payment) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>⚠️ Payment not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>💰 Amount</Text>
        <Text style={styles.value}>₹ {payment.amount}</Text>

        <Text style={styles.label}>📝 Description</Text>
        <Text style={styles.value}>{payment.description}</Text>

        <Text style={styles.label}>📌 Status</Text>
        <Text
          style={[
            styles.status,
            payment.status === 'success' ? styles.success : styles.failed,
          ]}
        >
          {payment.status.toUpperCase()}
        </Text>

        <Text style={styles.label}>🆔 Transaction ID</Text>
        <Text style={styles.value}>{payment._id || payment.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: '#b71c1c',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  success: {
    backgroundColor: '#d0f0c0',
    color: '#1b5e20',
  },
  failed: {
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
  },
});
