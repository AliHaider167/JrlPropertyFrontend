import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const statusStyles = {
  new: "bg-navy-900/10 text-navy-700",
  contacted: "bg-brass-500/20 text-brass-700",
  closed: "bg-green-100 text-green-700",
};

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/inquiries/mine")
      .then((res) => setListings(res.data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-navy-900 text-ivory py-16">
        <div className="container-page">
          <p className="eyebrow text-brass-400 mb-3">Your Account</p>
          <h1 className="font-display text-3xl md:text-4xl">My Listings</h1>
          <p className="text-ivory/70 mt-3">Signed in as {user?.name} ({user?.email})</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <p className="text-sm text-navy-700/60">
            Every property you've submitted, and its current status with our team.
          </p>
          <Link to="/list-your-property" className="btn-primary">+ Submit Another Property</Link>
        </div>

        {loading ? (
          <p className="text-sm text-navy-700/60">Loading...</p>
        ) : listings.length === 0 ? (
          <div className="bg-white border border-navy-900/10 p-8 text-center">
            <p className="text-navy-800/70 mb-4">You haven't submitted any properties yet.</p>
            <Link to="/list-your-property" className="btn-primary">List Your First Property</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((item) => (
              <div key={item._id} className="bg-white border border-navy-900/10 p-5">
                <div className="flex flex-wrap justify-between gap-3 mb-2">
                  <div>
                    <p className="font-display text-lg text-navy-900">{item.ownerDetails?.propertyAddress}</p>
                    <p className="text-xs text-navy-700/60">
                      {[item.ownerDetails?.city, item.ownerDetails?.country].filter(Boolean).join(", ")}
                      {item.ownerDetails?.propertyType && ` · ${item.ownerDetails.propertyType}`}
                      {item.ownerDetails?.askingPrice && ` · ${item.ownerDetails.askingPrice}`}
                    </p>
                  </div>
                  <span className={`h-fit text-[11px] uppercase tracking-wide px-3 py-1 rounded-sm ${statusStyles[item.status] || statusStyles.new}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-navy-800/80">{item.message}</p>
                <p className="text-xs text-navy-700/40 mt-2">Submitted {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyListings;
