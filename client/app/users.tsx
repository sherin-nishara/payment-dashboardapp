import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import api from './services/api';

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id || item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.role}>{item.role || 'user'}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, elevation: 2 },
  username: { fontSize: 16, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#666' },
});
