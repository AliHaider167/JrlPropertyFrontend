import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const BRAND = {
  navy: "#12233D",
  brass: "#B8925A",
  stone: "#8C9A8E",
  navyLight: "#5C7093",
};

const statusLabels = { "for-sale": "For Sale", "under-offer": "Under Offer", sold: "Sold" };

// Builds counts for the last 7 days (inclusive of today) from a list of
// { createdAt, type } records, so the trend chart doesn't need a dedicated
// backend endpoint — just the enquiries already loaded on the dashboard.
const buildLast7DaysTrend = (inquiries) => {
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  return days.map((day) => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const inRange = inquiries.filter((inq) => {
      const created = new Date(inq.createdAt);
      return created >= day && created < next;
    });
    return {
      label: day.toLocaleDateString("en-GB", { weekday: "short" }),
      Buyer: inRange.filter((i) => i.type === "buyer").length,
      Owner: inRange.filter((i) => i.type === "owner").length,
    };
  });
};

const AdminCharts = ({ properties, inquiries }) => {
  const statusData = ["for-sale", "under-offer", "sold"].map((status) => ({
    status: statusLabels[status],
    count: properties.filter((p) => p.status === status).length,
  }));

  const typeData = [
    { name: "Buyer Enquiries", value: inquiries.filter((i) => i.type === "buyer").length },
    { name: "Owner Submissions", value: inquiries.filter((i) => i.type === "owner").length },
  ];

  const trendData = buildLast7DaysTrend(inquiries);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
      <div className="bg-white border border-navy-900/10 p-5 lg:col-span-1">
        <h3 className="text-xs uppercase tracking-wide text-navy-700/60 mb-4">Properties by Status</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={statusData} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#12233D" strokeOpacity={0.08} />
            <XAxis dataKey="status" tick={{ fontSize: 11, fill: "#12233D" }} axisLine={{ stroke: "#12233D22" }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#12233D" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0, borderColor: "#12233D22" }} />
            <Bar dataKey="count" fill={BRAND.navy} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-navy-900/10 p-5 lg:col-span-1">
        <h3 className="text-xs uppercase tracking-wide text-navy-700/60 mb-4">Enquiries by Type</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={typeData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
              <Cell fill={BRAND.navy} />
              <Cell fill={BRAND.brass} />
            </Pie>
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0, borderColor: "#12233D22" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-navy-900/10 p-5 lg:col-span-1">
        <h3 className="text-xs uppercase tracking-wide text-navy-700/60 mb-4">Enquiries — Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#12233D" strokeOpacity={0.08} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#12233D" }} axisLine={{ stroke: "#12233D22" }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#12233D" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0, borderColor: "#12233D22" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="Buyer" stroke={BRAND.navy} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Owner" stroke={BRAND.brass} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;
