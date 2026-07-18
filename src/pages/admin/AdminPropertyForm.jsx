import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios.js";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  currency: "GBP",
  status: "for-sale",
  propertyType: "house",
  bedrooms: 0,
  bathrooms: 0,
  areaSqft: 0,
  location: { addressLine: "", city: "", country: "" },
  images: [],
  videoUrl: "",
  featured: false,
  isPublished: true,
};

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api.get(`/properties/admin/${id}`).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });
  const handleLocationChange = (field, value) =>
    setForm({ ...form, location: { ...form.location, [field]: value } });

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      Array.from(files).forEach((file) => data.append("images", file));
      const res = await api.post("/properties/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, images: [...form.images, ...res.data.paths] });
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        areaSqft: Number(form.areaSqft),
      };
      if (isEdit) {
        await api.put(`/properties/${id}`, payload);
      } else {
        await api.post("/properties", payload);
      }
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save property.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-navy-900 mb-8">
        {isEdit ? "Edit Property" : "Add New Property"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-navy-900/10 p-6">
        <div>
          <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Title</label>
          <input
            className="input-field"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Description</label>
          <textarea
            className="input-field min-h-[120px]"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Price</label>
            <input
              type="number"
              className="input-field"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Currency</label>
            <input
              className="input-field"
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Status</label>
            <select className="input-field" value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
              <option value="for-sale">For Sale</option>
              <option value="under-offer">Under Offer</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Type</label>
            <select
              className="input-field"
              value={form.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Bedrooms</label>
            <input
              type="number"
              className="input-field"
              value={form.bedrooms}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Bathrooms</label>
            <input
              type="number"
              className="input-field"
              value={form.bathrooms}
              onChange={(e) => handleChange("bathrooms", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Area (sqft)</label>
            <input
              type="number"
              className="input-field"
              value={form.areaSqft}
              onChange={(e) => handleChange("areaSqft", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Address Line</label>
            <input
              className="input-field"
              value={form.location.addressLine}
              onChange={(e) => handleLocationChange("addressLine", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">City</label>
            <input
              className="input-field"
              value={form.location.city}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Country</label>
            <input
              className="input-field"
              value={form.location.country}
              onChange={(e) => handleLocationChange("country", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Video URL (embed link, optional)</label>
          <input
            className="input-field"
            placeholder="https://www.youtube.com/embed/..."
            value={form.videoUrl}
            onChange={(e) => handleChange("videoUrl", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-navy-700/60 mb-2">Photos</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="text-sm" />
          {uploading && <p className="text-xs text-navy-700/60 mt-2">Uploading...</p>}
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {form.images.map((img, idx) => (
                <div key={img + idx} className="relative aspect-square overflow-hidden border border-navy-900/10">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-navy-900/80 text-ivory text-xs w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-navy-800">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
            />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-800">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => handleChange("isPublished", e.target.checked)}
            />
            Published (visible to visitors)
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Property"}
          </button>
          <button type="button" className="btn-outline" onClick={() => navigate("/admin/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
