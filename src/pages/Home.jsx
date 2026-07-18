import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import PropertyCard from "../components/PropertyCard.jsx";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/properties", { params: { featured: true } })
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-900 text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-page py-28 md:py-36">
          <p className="eyebrow text-brass-400 mb-5">Your Property. The Right Buyer.</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.1] max-w-2xl mb-6">
            Connecting Exceptional Properties with the Right Buyers
          </h1>
          <p className="text-ivory/75 max-w-xl mb-10 leading-relaxed">
            We help property owners showcase their properties to potential buyers
            through professional presentation and digital marketing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/properties" className="btn-brass">View Properties</Link>
            <Link to="/list-your-property" className="border border-ivory/40 text-ivory px-6 py-3 text-sm tracking-wide hover:bg-ivory/10 transition-colors">
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="py-24">
        <div className="container-page">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="eyebrow mb-3">Featured</p>
              <h2 className="font-display text-3xl md:text-4xl text-navy-900">Featured Properties</h2>
            </div>
            <Link to="/properties" className="text-sm text-navy-800 hover:text-brass-600 tracking-wide underline underline-offset-4">
              View all properties
            </Link>
          </div>

          {loading ? (
            <p className="text-sm text-navy-700/60">Loading properties...</p>
          ) : featured.length === 0 ? (
            <p className="text-sm text-navy-700/60">New properties will appear here shortly.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-950/[0.03] py-24">
        <div className="container-page">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-14 max-w-xl">
            A straightforward process, from listing to sale.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Properties",
                body: "We work with property owners to showcase suitable properties.",
              },
              {
                step: "02",
                title: "Marketing",
                body: "We promote properties through our website and digital marketing channels.",
              },
              {
                step: "03",
                title: "Buyers",
                body: "We connect properties with potential buyers.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t-2 border-brass-500 pt-6">
                <div className="text-xs tracking-[0.2em] uppercase text-navy-700/50 mb-3">{item.step}</div>
                <h3 className="font-display text-xl text-navy-900 mb-3">{item.title}</h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For property owners */}
      <section className="container-page py-24 text-center">
        <p className="eyebrow mb-3">For Property Owners</p>
        <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-6 max-w-xl mx-auto">
          Have a Property to Sell?
        </h2>
        <p className="text-navy-800/70 max-w-xl mx-auto mb-8 leading-relaxed">
          If you are considering selling your property and would like to reach more
          potential buyers, get in touch with our team.
        </p>
        <Link to="/list-your-property" className="btn-primary">Get in Touch</Link>
      </section>
    </div>
  );
};

export default Home;
