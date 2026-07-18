import { useEffect, useState } from "react";
import api from "../api/axios.js";
import PropertyCard from "../components/PropertyCard.jsx";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", propertyType: "", status: "", city: "", sort: "newest" });

  const fetchProperties = async (params = {}) => {
    setLoading(true);
    try {
      const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v));
      const { data } = await api.get("/properties", { params: cleaned });
      setProperties(data);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };

  return (
    <div>
      <section className="bg-navy-900 text-ivory py-16">
        <div className="container-page">
          <p className="eyebrow text-brass-400 mb-3">Listings</p>
          <h1 className="font-display text-3xl md:text-4xl mb-4">Available Properties</h1>
          <p className="text-ivory/70 max-w-xl leading-relaxed">
            Every property below is listed directly on behalf of its owner. Use the
            filters to narrow your search, or open a listing to see full details,
            photos and video, and send an enquiry.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12 bg-white p-5 border border-navy-900/10">
          <input
            className="input-field"
            placeholder="Search by title or city"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="input-field"
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Any Status</option>
            <option value="for-sale">For Sale</option>
            <option value="under-offer">Under Offer</option>
            <option value="sold">Sold</option>
          </select>
          <input
            className="input-field"
            placeholder="City"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-navy-700/60">
            {loading ? "Searching..." : `${properties.length} propert${properties.length === 1 ? "y" : "ies"} found`}
          </p>
          <select
            className="input-field w-auto"
            value={filters.sort}
            onChange={(e) => {
              const next = { ...filters, sort: e.target.value };
              setFilters(next);
              fetchProperties(next);
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <p className="text-sm text-navy-700/60">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-sm text-navy-700/60">No properties match your search yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Properties;
