import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { LineChart, PieChart } from 'react-native-chart-kit';
import api from './services/api';

export default function AnalyticsScreen() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/payments/stats')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Payment Analytics</Text>

      <Text style={styles.label}>Success vs Failed</Text>
      <PieChart
        data={[
          { name: 'Success', population: stats.success, color: '#4caf50', legendFontColor: '#333', legendFontSize: 14 },
          { name: 'Failed', population: stats.failed, color: '#f44336', legendFontColor: '#333', legendFontSize: 14 },
        ]}
        width={Dimensions.get('window').width - 30}
        height={200}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.label}>Payment Totals</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{ data: [20, 45, 28] }]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          color: () => `#333`,
        }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginVertical: 12 },
});
