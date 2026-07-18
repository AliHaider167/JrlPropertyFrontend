import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-ivory mt-24">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-ivory/60 leading-relaxed max-w-xs">
            Connecting exceptional properties with the right buyers, through
            professional presentation and digital marketing.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-brass-400 mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link to="/" className="hover:text-brass-400">Home</Link></li>
            <li><Link to="/properties" className="hover:text-brass-400">Properties</Link></li>
            <li><Link to="/about" className="hover:text-brass-400">About</Link></li>
            <li><Link to="/list-your-property" className="hover:text-brass-400">List Your Property</Link></li>
            <li><Link to="/contact" className="hover:text-brass-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-brass-400 mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li>hello@jrlpropertyconnect.com</li>
            <li>+44 20 7946 0958</li>
            <li>14 Lambford Court, London, EC2A 4DP</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-brass-400 mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link to="/login" className="hover:text-brass-400">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-brass-400">Create Account</Link></li>
            <li><Link to="/saved" className="hover:text-brass-400">Saved Properties</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page py-6 text-xs text-ivory/50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} JRL Property Connect. All rights reserved.</span>
          <span>Your Property. The Right Buyer.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
