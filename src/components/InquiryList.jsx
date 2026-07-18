import { useEffect, useState } from "react";
import api from "../api/axios.js";

const statusOptions = ["new", "contacted", "closed"];

// Shared list UI for both the Buyer Enquiries and Owner Submissions admin
// pages — each passes its own `type` so the two stay completely separate.
const InquiryList = ({ type, emptyMessage }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await api.get("/inquiries", { params: { type } });
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const updateStatus = async (id, status) => {
    await api.put(`/inquiries/${id}`, { status });
    fetchInquiries();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    await api.delete(`/inquiries/${id}`);
    fetchInquiries();
  };

  if (loading) return <p className="text-sm text-navy-700/60">Loading...</p>;
  if (inquiries.length === 0) return <p className="text-sm text-navy-700/60">{emptyMessage}</p>;

  return (
    <div className="space-y-4">
      {inquiries.map((inq) => (
        <div key={inq._id} className="bg-white border border-navy-900/10 p-5">
          <div className="flex flex-wrap justify-between gap-3 mb-2">
            <div>
              <p className="font-medium text-navy-900">{inq.name}</p>
              <p className="text-xs text-navy-700/60 break-all">{inq.email} {inq.phone && `· ${inq.phone}`}</p>
              {inq.property && (
                <p className="text-xs text-brass-600 mt-1">Re: {inq.property.title}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={inq.status}
                onChange={(e) => updateStatus(inq._id, e.target.value)}
                className="text-xs border border-navy-900/20 px-2 py-1 rounded-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={() => handleDelete(inq._id)} className="text-xs text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>

          {inq.type === "owner" && inq.ownerDetails && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-navy-800/70 bg-navy-950/[0.03] p-3 mb-3 border border-navy-900/10">
              <div><span className="block text-navy-700/50 uppercase tracking-wide mb-0.5">Address</span>{inq.ownerDetails.propertyAddress || "—"}</div>
              <div><span className="block text-navy-700/50 uppercase tracking-wide mb-0.5">City / Country</span>{[inq.ownerDetails.city, inq.ownerDetails.country].filter(Boolean).join(", ") || "—"}</div>
              <div><span className="block text-navy-700/50 uppercase tracking-wide mb-0.5">Type</span>{inq.ownerDetails.propertyType || "—"}</div>
              <div><span className="block text-navy-700/50 uppercase tracking-wide mb-0.5">Asking Price</span>{inq.ownerDetails.askingPrice || "—"}</div>
            </div>
          )}

          <p className="text-sm text-navy-800/80">{inq.message}</p>
          <p className="text-xs text-navy-700/40 mt-2">{new Date(inq.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default InquiryList;
