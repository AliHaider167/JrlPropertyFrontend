import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProperty from "./pages/ListProperty.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyListings from "./pages/MyListings.jsx";
import Saved from "./pages/Saved.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminPropertyForm from "./pages/admin/AdminPropertyForm.jsx";
import AdminBuyerInquiries from "./pages/admin/AdminBuyerInquiries.jsx";
import AdminOwnerSubmissions from "./pages/admin/AdminOwnerSubmissions.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public / client-facing site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
      <Route path="/properties/:slug" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/list-your-property" element={<PublicLayout><ListProperty /></PublicLayout>} />

      {/* Single sign-in for everyone — owners, buyers, and admins */}
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

      <Route path="/saved" element={<PublicLayout><Saved /></PublicLayout>} />
      <Route
        path="/my-listings"
        element={
          <PublicLayout>
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          </PublicLayout>
        }
      />

      {/* Admin dashboard — reachable only by accounts with role "admin" */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="properties/new" element={<AdminPropertyForm />} />
        <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
        <Route path="inquiries/buyers" element={<AdminBuyerInquiries />} />
        <Route path="inquiries/owners" element={<AdminOwnerSubmissions />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <div className="container-page py-32 text-center">
              <h1 className="font-display text-3xl text-navy-900 mb-4">Page not found</h1>
              <a href="/" className="text-brass-600 underline underline-offset-4">Back to home</a>
            </div>
          </PublicLayout>
        }
      />
      </Routes>
    </>
  );
}

export default App;
