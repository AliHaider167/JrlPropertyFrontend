import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import AdminCharts from "../../components/AdminCharts.jsx";

const formatPrice = (price, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [propRes, inqRes] = await Promise.all([
      api.get("/properties/admin/all"),
      api.get("/inquiries"),
    ]);
    setProperties(propRes.data);
    setInquiries(inqRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    await api.delete(`/properties/${id}`);
    fetchAll();
  };

  const togglePublish = async (property) => {
    await api.put(`/properties/${property._id}`, { isPublished: !property.isPublished });
    fetchAll();
  };

  const stats = [
    { label: "Total Properties", value: properties.length },
    { label: "Live on Site", value: properties.filter((p) => p.isPublished).length },
    { label: "New Enquiries", value: inquiries.filter((i) => i.status === "new").length },
    { label: "Owner Submissions", value: inquiries.filter((i) => i.type === "owner").length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-2xl text-navy-900">Properties</h1>
        <Link to="/admin/properties/new" className="btn-primary">+ Add Property</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-navy-900/10 p-5">
            <div className="font-display text-2xl text-navy-900">{loading ? "…" : s.value}</div>
            <div className="text-xs uppercase tracking-wide text-navy-700/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {!loading && (properties.length > 0 || inquiries.length > 0) && (
        <AdminCharts properties={properties} inquiries={inquiries} />
      )}

      {loading ? (
        <p className="text-sm text-navy-700/60">Loading...</p>
      ) : properties.length === 0 ? (
        <p className="text-sm text-navy-700/60">No properties yet. Add your first one.</p>
      ) : (
        <div className="bg-white border border-navy-900/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-900/5 text-left text-xs uppercase tracking-wide text-navy-700/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="border-t border-navy-900/10">
                  <td className="px-4 py-3 font-medium text-navy-900">{p.title}</td>
                  <td className="px-4 py-3 text-navy-700/70">{p.location?.city}</td>
                  <td className="px-4 py-3 text-navy-700/70">{formatPrice(p.price, p.currency)}</td>
                  <td className="px-4 py-3 capitalize text-navy-700/70">{p.status.replace("-", " ")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`text-xs px-3 py-1 rounded-sm ${
                        p.isPublished ? "bg-green-100 text-green-700" : "bg-navy-900/10 text-navy-700"
                      }`}
                    >
                      {p.isPublished ? "Live" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link to={`/admin/properties/${p._id}/edit`} className="text-brass-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
