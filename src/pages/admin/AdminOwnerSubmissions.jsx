import InquiryList from "../../components/InquiryList.jsx";

const AdminOwnerSubmissions = () => (
  <div>
    <h1 className="font-display text-2xl text-navy-900 mb-2">Owner Submissions</h1>
    <p className="text-sm text-navy-700/60 mb-8">
      Properties submitted by owners through List Your Property, with their
      full details attached.
    </p>
    <InquiryList type="owner" emptyMessage="No property submissions yet." />
  </div>
);

export default AdminOwnerSubmissions;
