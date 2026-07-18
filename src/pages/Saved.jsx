import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import PropertyCard from "../components/PropertyCard.jsx";
import { useFavorites } from "../hooks/useFavorites.js";

const Saved = () => {
  const { favorites } = useFavorites();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setProperties([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(
      favorites.map((slug) =>
        api
          .get(`/properties/${slug}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    )
      .then((results) => setProperties(results.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [favorites]);

  return (
    <div>
      <section className="bg-navy-900 text-ivory py-16">
        <div className="container-page">
          <p className="eyebrow text-brass-400 mb-3">Your Shortlist</p>
          <h1 className="font-display text-3xl md:text-4xl">Saved Properties</h1>
          <p className="text-ivory/70 mt-3 max-w-xl">
            Properties you've saved on this device. No account needed — they'll stay
            here until you remove them.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {loading ? (
          <p className="text-sm text-navy-700/60">Loading...</p>
        ) : properties.length === 0 ? (
          <div className="bg-white border border-navy-900/10 p-8 text-center">
            <p className="text-navy-800/70 mb-4">You haven't saved any properties yet.</p>
            <Link to="/properties" className="btn-primary">Browse Properties</Link>
          </div>
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

export default Saved;
