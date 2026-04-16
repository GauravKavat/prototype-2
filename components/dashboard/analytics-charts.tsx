'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const deliverySuccessData = [
  { date: 'Mon', success: 92, failed: 8 },
  { date: 'Tue', success: 94, failed: 6 },
  { date: 'Wed', success: 91, failed: 9 },
  { date: 'Thu', success: 95, failed: 5 },
  { date: 'Fri', success: 93, failed: 7 },
  { date: 'Sat', success: 89, failed: 11 },
  { date: 'Sun', success: 90, failed: 10 },
];

const rtoTrendData = [
  { date: 'Week 1', rto: 3.2 },
  { date: 'Week 2', rto: 3.5 },
  { date: 'Week 3', rto: 3.1 },
  { date: 'Week 4', rto: 2.8 },
];

const courierComparisonData = [
  { name: 'DPL', deliveries: 1250 },
  { name: 'Ecom Express', deliveries: 890 },
  { name: 'Blue Dart', deliveries: 640 },
  { name: 'FedEx', deliveries: 420 },
  { name: 'APML', deliveries: 320 },
];

const statusDistributionData = [
  { name: 'Delivered', value: 7401, color: '#22c55e' },
  { name: 'In Transit', value: 892, color: '#3b82f6' },
  { name: 'Pending', value: 249, color: '#eab308' },
];

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#f97316', '#ef4444'];

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Delivery Success Rate */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">Delivery Success Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deliverySuccessData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="success" fill="#22c55e" name="Successful" />
            <Bar dataKey="failed" fill="#ef4444" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RTO Trend */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">RTO Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rtoTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rto"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: '#f97316', r: 5 }}
              name="RTO %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Courier Comparison */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold">Courier Deliveries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courierComparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="deliveries" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
