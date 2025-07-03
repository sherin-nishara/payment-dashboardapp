import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import api from './services/api'; // ✅ adjust if in 'app/services/api'

export default function AddPayment() {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const submit = async () => {
    if (!amount || !desc) {
      Alert.alert('Missing Fields', 'Please fill all fields');
      return;
    }

    try {
      await api.post('/payments', {
        amount: Number(amount),
        description: desc,
        status: 'success',
      });
      Alert.alert('Success', 'Payment added successfully');
      router.replace('/dashboard');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add payment');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
      />
      <Button title="Add Payment" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f2f2f2' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
