import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, router } from 'expo-router';
import api from './services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

type Payment = {
  _id?: string;
  id?: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
};

export default function DashboardScreen() {
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<{ success: number; failed: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [resPayments, resStats] = await Promise.all([
        api.get('/payments'),
        api.get('/payments/stats'),
      ]);

      setAllPayments(resPayments.data || []);
      setStats({
        success: Number(resStats.data?.success || 0),
        failed: Number(resStats.data?.failed || 0),
      });
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (status: 'all' | 'success' | 'failed') => {
    setStatusFilter(status);
    let data = [...allPayments];
    if (status !== 'all') data = data.filter(p => p.status === status);
    data = data.filter(p => {
      const date = new Date(p.createdAt);
      return date >= startDate && date <= endDate;
    });
    setFilteredPayments(data);
  };

  useFocusEffect(useCallback(() => {
    fetchAll();
  }, []));

  useEffect(() => {
    applyFilter(statusFilter);
  }, [allPayments, startDate, endDate]);

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    router.replace('/');
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={filteredPayments}
      keyExtractor={(item) => item._id || item.id || Math.random().toString()}
      ListHeaderComponent={
        <>
          {stats && (
            <>
              <LineChart
                data={{
                  labels: ['Success', 'Failed'],
                  datasets: [{ data: [stats.success, stats.failed] }],
                }}
                width={screenWidth - 40}
                height={180}
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: () => '#2e7d32',
                  labelColor: () => '#555',
                  decimalPlaces: 0,
                }}
                style={{ borderRadius: 12, marginBottom: 16 }}
              />

              <PieChart
                data={[
                  {
                    name: 'Success',
                    population: stats.success,
                    color: '#2e7d32',
                    legendFontColor: '#333',
                    legendFontSize: 14,
                  },
                  {
                    name: 'Failed',
                    population: stats.failed,
                    color: '#c62828',
                    legendFontColor: '#333',
                    legendFontSize: 14,
                  },
                ]}
                width={screenWidth - 40}
                height={180}
                chartConfig={{ color: () => '#000' }}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                absolute
                style={{ marginBottom: 20 }}
              />
            </>
          )}

          <View style={styles.dateRow}>
            <TouchableOpacity onPress={() => setShowStart(true)} style={styles.dateBox}>
              <Text>📅 Start: {format(startDate, 'yyyy-MM-dd')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEnd(true)} style={styles.dateBox}>
              <Text>📅 End: {format(endDate, 'yyyy-MM-dd')}</Text>
            </TouchableOpacity>
          </View>

          {showStart && (
            <DateTimePicker
              value={startDate}
              mode="date"
              onChange={(e, date) => {
                setShowStart(false);
                if (date) setStartDate(date);
              }}
            />
          )}
          {showEnd && (
            <DateTimePicker
              value={endDate}
              mode="date"
              onChange={(e, date) => {
                setShowEnd(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          <View style={styles.filterRow}>
            {['all', 'success', 'failed'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  statusFilter === type && styles.filterButtonActive,
                ]}
                onPress={() => applyFilter(type as any)}
              >
                <Text
                  style={[
                    styles.filterText,
                    statusFilter === type && styles.filterTextActive,
                  ]}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/add-payment')}>
              <Text style={styles.buttonText}>➕ Add Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#d32f2f' }]}
              onPress={logout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/transactions/${item._id || item.id}`)}
        >
          <View style={styles.row}>
            <Text style={styles.amount}>₹ {Number(item.amount).toFixed(2)}</Text>
            <Text
              style={[
                styles.status,
                item.status === 'success' ? styles.success : styles.failed,
              ]}
            >
              {item.status?.toUpperCase() || 'UNKNOWN'}
            </Text>
          </View>
          <Text style={styles.desc}>{item.description || 'No description'}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
        ) : (
          <Text style={styles.empty}>No payments found.</Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f7fa' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 1,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#2e7d32',
  },
  filterText: {
    fontSize: 14,
    color: '#444',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474f',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  success: {
    backgroundColor: '#c8e6c9',
    color: '#2e7d32',
  },
  failed: {
    backgroundColor: '#ffcdd2',
    color: '#c62828',
  },
  desc: {
    fontSize: 15,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
});
