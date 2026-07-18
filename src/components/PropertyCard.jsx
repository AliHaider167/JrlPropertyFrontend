import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites.js";

const formatPrice = (price, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);

const statusLabel = {
  "for-sale": "For Sale",
  "under-offer": "Under Offer",
  sold: "Sold",
};

const PropertyCard = ({ property }) => {
  const cover = property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200";
  const { isSaved, toggleSaved } = useFavorites();
  const saved = isSaved(property.slug);

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group block bg-white border border-navy-900/10 hover:border-brass-500/60 transition-colors duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={cover}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-navy-900/90 text-ivory text-[11px] tracking-wide uppercase px-3 py-1">
          {statusLabel[property.status] || property.status}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(property.slug);
          }}
          aria-label={saved ? "Remove from saved properties" : "Save property"}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "#B8925A" : "none"} stroke={saved ? "#B8925A" : "#12233D"} strokeWidth="2">
            <path d="M12 21s-7.5-4.7-10-9.1C0.3 8.4 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 12.7 5 14.6 5 18 5 19.7 8.4 22 11.9 19.5 16.3 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <div className="text-brass-600 font-display text-xl mb-1">{formatPrice(property.price, property.currency)}</div>
        <h3 className="font-display text-lg text-navy-900 mb-1">{property.title}</h3>
        <p className="text-sm text-navy-700/70 mb-3">
          {property.location?.city}, {property.location?.country}
        </p>
        <div className="flex gap-4 text-xs text-navy-800/70 tracking-wide">
          <span>{property.bedrooms} Bed</span>
          <span>{property.bathrooms} Bath</span>
          <span>{property.areaSqft?.toLocaleString()} sqft</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
