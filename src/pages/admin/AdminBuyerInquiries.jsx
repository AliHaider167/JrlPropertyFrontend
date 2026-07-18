import InquiryList from "../../components/InquiryList.jsx";

const AdminBuyerInquiries = () => (
  <div>
    <h1 className="font-display text-2xl text-navy-900 mb-2">Buyer Enquiries</h1>
    <p className="text-sm text-navy-700/60 mb-8">
      Messages from the Contact page and individual property pages.
    </p>
    <InquiryList type="buyer" emptyMessage="No buyer enquiries yet." />
  </div>
);

export default AdminBuyerInquiries;
