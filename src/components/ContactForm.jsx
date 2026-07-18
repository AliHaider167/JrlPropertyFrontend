import { useState } from "react";
import api from "../api/axios.js";

const ContactForm = ({ propertyId = null, propertyTitle = "", submitLabel = "Send Enquiry" }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.post("/inquiries", { ...form, property: propertyId });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-brass-500/40 bg-brass-500/10 p-6 text-navy-900">
        <p className="font-display text-lg mb-1">Thank you.</p>
        <p className="text-sm text-navy-800/80">
          Your message has been received. A member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {propertyTitle && (
        <p className="text-xs text-navy-800/60 tracking-wide uppercase">Enquiring about: {propertyTitle}</p>
      )}
      <input
        className="input-field"
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input-field"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        className="input-field min-h-[120px]"
        name="message"
        placeholder="Tell us what you're looking for..."
        value={form.message}
        onChange={handleChange}
        required
      />
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button type="submit" className="btn-brass w-full md:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
};

export default ContactForm;
