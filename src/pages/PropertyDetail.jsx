import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import ContactForm from "../components/ContactForm.jsx";
import { useFavorites } from "../hooks/useFavorites.js";

const formatPrice = (price, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

const statusLabel = {
  "for-sale": "For Sale",
  "under-offer": "Under Offer",
  sold: "Sold",
};

const PropertyDetail = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { isSaved, toggleSaved } = useFavorites();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/properties/${slug}`)
      .then((res) => setProperty(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="container-page py-24 text-sm text-navy-700/60">
        Loading...
      </div>
    );

  if (notFound || !property) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl mb-4">Property not found</h1>
        <Link
          to="/properties"
          className="text-brass-600 underline underline-offset-4"
        >
          Back to properties
        </Link>
      </div>
    );
  }

  const images = property.images?.length
    ? property.images
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"];

  return (
    <div className="container-page py-12">
      <Link
        to="/properties"
        className="text-sm text-navy-700/60 hover:text-brass-600"
      >
        &larr; Back to properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6">
        <div className="lg:col-span-2">
          <div className="aspect-[16/10] overflow-hidden bg-navy-900/5">
            <img
              src={images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[4/3] overflow-hidden border ${idx === activeImage ? "border-brass-500" : "border-transparent"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}


          {property.videoUrl && (
            <div className="mt-6 aspect-video">
              {/cloudinary\.com\/.*\/video\/|\.(mp4|mov|webm|ogg)(\?|$)/i.test(
                property.videoUrl,
              ) ? (
                <video
                  src={property.videoUrl}
                  controls
                  className="w-full h-full bg-black"
                />
              ) : (
                <iframe
                  src={property.videoUrl}
                  title="Property video"
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>
          )}

          <div className="mt-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <span className="inline-block bg-navy-900 text-ivory text-[11px] tracking-wide uppercase px-3 py-1 mb-4">
                {statusLabel[property.status] || property.status}
              </span>
              <button
                type="button"
                onClick={() => toggleSaved(property.slug)}
                className="flex items-center gap-2 text-sm text-navy-800 border border-navy-900/20 px-4 py-2 hover:border-brass-500 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={isSaved(property.slug) ? "#B8925A" : "none"}
                  stroke={isSaved(property.slug) ? "#B8925A" : "#12233D"}
                  strokeWidth="2"
                >
                  <path d="M12 21s-7.5-4.7-10-9.1C0.3 8.4 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 12.7 5 14.6 5 18 5 19.7 8.4 22 11.9 19.5 16.3 12 21 12 21z" />
                </svg>
                {isSaved(property.slug) ? "Saved" : "Save Property"}
              </button>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-navy-900 mb-2">
              {property.title}
            </h1>
            <p className="text-navy-700/70 mb-6">
              {property.location?.addressLine
                ? `${property.location.addressLine}, `
                : ""}
              {property.location?.city}, {property.location?.country}
            </p>

            <div className="flex gap-8 border-y border-navy-900/10 py-5 mb-8 text-sm">
              <div>
                <span className="block text-navy-900 font-display text-lg">
                  {property.bedrooms}
                </span>
                Bedrooms
              </div>
              <div>
                <span className="block text-navy-900 font-display text-lg">
                  {property.bathrooms}
                </span>
                Bathrooms
              </div>
              <div>
                <span className="block text-navy-900 font-display text-lg">
                  {property.areaSqft?.toLocaleString()}
                </span>
                Sqft
              </div>
              <div>
                <span className="block text-navy-900 font-display text-lg capitalize">
                  {property.propertyType}
                </span>
                Type
              </div>
            </div>

            <p className="text-navy-800/80 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </div>

        <div>
          <div className="sticky top-28 bg-white border border-navy-900/10 p-6">
            <div className="font-display text-2xl text-brass-600 mb-1">
              {formatPrice(property.price, property.currency)}
            </div>
            <p className="font-display text-lg text-navy-900 mb-4">
              Interested in this property?
            </p>
            <ContactForm
              propertyId={property._id}
              propertyTitle={property.title}
              submitLabel="Enquire About This Property"
            />

            <div className="mt-6 pt-6 border-t border-navy-900/10 text-xs text-navy-700/60 space-y-1">
              <p className="text-navy-900 font-medium text-sm mb-1">
                Prefer to talk directly?
              </p>
              <p>hello@jrlpropertyconnect.com</p>
              <p>+44 20 7946 0958</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
