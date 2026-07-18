import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const ListPropertyForm = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    propertyAddress: "",
    city: "",
    country: "",
    propertyType: "house",
    askingPrice: "",
    message: "",
    phone: user?.phone || "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.post("/inquiries/owner", {
        message: form.message,
        ownerDetails: {
          propertyAddress: form.propertyAddress,
          city: form.city,
          country: form.country,
          propertyType: form.propertyType,
          askingPrice: form.askingPrice,
        },
      });
      setStatus("sent");
      setForm({
        propertyAddress: "",
        city: "",
        country: "",
        propertyType: "house",
        askingPrice: "",
        message: "",
        phone: user?.phone || "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-brass-500/40 bg-brass-500/10 p-6 text-navy-900">
        <p className="font-display text-lg mb-1">Thank you for reaching out.</p>
        <p className="text-sm text-navy-800/80">
          We've received your property details. A member of our team will contact you
          within one working day to discuss next steps. You can track the status of
          this submission any time from{" "}
          <a href="/my-listings" className="text-brass-700 underline underline-offset-2">My Listings</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-navy-950/[0.03] border border-navy-900/10 p-4 text-sm text-navy-700/70">
        Submitting as <span className="text-navy-900 font-medium">{user?.name}</span> ({user?.email})
      </div>

      <input
        className="input-field"
        name="propertyAddress"
        placeholder="Property address"
        value={form.propertyAddress}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="input-field"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
        />
        <select className="input-field" name="propertyType" value={form.propertyType} onChange={handleChange}>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <input
        className="input-field"
        name="askingPrice"
        placeholder="Asking price (approximate)"
        value={form.askingPrice}
        onChange={handleChange}
      />

      <textarea
        className="input-field min-h-[120px]"
        name="message"
        placeholder="Tell us a little about the property and your timeline..."
        value={form.message}
        onChange={handleChange}
        required
      />

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button type="submit" className="btn-brass w-full md:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Submit Property Details"}
      </button>
    </form>
  );
};

export default ListPropertyForm;
