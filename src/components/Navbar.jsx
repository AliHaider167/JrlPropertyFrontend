// import { useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import Logo from "./Logo.jsx";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useFavorites } from "../hooks/useFavorites.js";

// const navLinks = [
//   { to: "/", label: "Home" },
//   { to: "/properties", label: "Properties" },
//   { to: "/about", label: "About" },
//   { to: "/contact", label: "Contact" },
// ];

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const { user, isAuthenticated, isAdmin, logout } = useAuth();
//   const { favorites } = useFavorites();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-navy-900/97 backdrop-blur border-b border-ivory/10">
//       <div className="container-page flex items-center justify-between h-24">
//         <Link to="/" onClick={() => setOpen(false)}>
//           <Logo />
//         </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               end={link.to === "/"}
//               className={({ isActive }) =>
//                 `text-sm tracking-wide transition-colors ${
//                   isActive ? "text-brass-400 font-medium" : "text-ivory/80 hover:text-brass-400"
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}

//           <Link to="/saved" className="text-sm tracking-wide text-ivory/80 hover:text-brass-400 flex items-center gap-1.5">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M12 21s-7.5-4.7-10-9.1C0.3 8.4 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 12.7 5 14.6 5 18 5 19.7 8.4 22 11.9 19.5 16.3 12 21 12 21z" />
//             </svg>
//             Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
//           </Link>

//           {isAuthenticated ? (
//             <div className="flex items-center gap-4">
//               {isAdmin ? (
//                 <Link to="/admin/dashboard" className="text-sm tracking-wide text-ivory/80 hover:text-brass-400">
//                   Admin Dashboard
//                 </Link>
//               ) : (
//                 <Link to="/my-listings" className="text-sm tracking-wide text-ivory/80 hover:text-brass-400">
//                   My Listings
//                 </Link>
//               )}
//               <button onClick={handleLogout} className="text-sm tracking-wide text-ivory/50 hover:text-brass-400">
//                 Log out
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" className="text-sm tracking-wide text-ivory/80 hover:text-brass-400">
//               Sign In
//             </Link>
//           )}

//           <Link to="/list-your-property" className="btn-brass">
//             List Your Property
//           </Link>
//         </nav>

//         <button
//           className="md:hidden flex flex-col gap-1.5 p-2"
//           aria-label="Toggle menu"
//           onClick={() => setOpen(!open)}
//         >
//           <span className={`w-6 h-px bg-ivory transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
//           <span className={`w-6 h-px bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
//           <span className={`w-6 h-px bg-ivory transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
//         </button>
//       </div>

//       {open && (
//         <nav className="md:hidden border-t border-ivory/10 bg-navy-900">
//           <div className="container-page flex flex-col py-4 gap-4">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 end={link.to === "/"}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `text-sm tracking-wide ${isActive ? "text-brass-400 font-medium" : "text-ivory/80"}`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}

//             <Link to="/saved" onClick={() => setOpen(false)} className="text-sm tracking-wide text-ivory/80">
//               Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 {isAdmin ? (
//                   <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="text-sm tracking-wide text-ivory/80">
//                     Admin Dashboard
//                   </Link>
//                 ) : (
//                   <Link to="/my-listings" onClick={() => setOpen(false)} className="text-sm tracking-wide text-ivory/80">
//                     My Listings ({user?.name})
//                   </Link>
//                 )}
//                 <button onClick={handleLogout} className="text-sm tracking-wide text-ivory/50 text-left">
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" onClick={() => setOpen(false)} className="text-sm tracking-wide text-ivory/80">
//                 Sign In
//               </Link>
//             )}

//             <Link to="/list-your-property" onClick={() => setOpen(false)} className="btn-brass w-fit">
//               List Your Property
//             </Link>
//           </div>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useFavorites } from "../hooks/useFavorites.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-900/97 backdrop-blur border-b border-ivory/10">
      <div className="container-page flex items-center justify-between h-20">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-brass-400 font-medium"
                    : "text-gray-400 hover:text-brass-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/saved"
            className="text-sm tracking-wide text-gray-400 hover:text-brass-400 flex items-center gap-1.5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s-7.5-4.7-10-9.1C0.3 8.4 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 12.7 5 14.6 5 18 5 19.7 8.4 22 11.9 19.5 16.3 12 21 12 21z" />
            </svg>
            Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="text-sm tracking-wide text-ivory/80 hover:text-brass-400"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/my-listings"
                  className="text-sm tracking-wide text-gray-400 hover:text-brass-400"
                >
                  My Listings
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-sm tracking-wide text-gray-400 hover:text-brass-400"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm tracking-wide text-gray-400 hover:text-brass-400"
            >
              Sign In
            </Link>
          )}

          <Link to="/list-your-property" className="btn-brass">
            List Your Property
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`w-6 h-px bg-gray-400 transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`w-6 h-px bg-gray-400 transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-px bg-gray-400 transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ivory/10 bg-navy-900">
          <div className="container-page flex flex-col py-4 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-wide ${isActive ? "text-brass-400 font-medium" : "text-ivory/80"}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/saved"
              onClick={() => setOpen(false)}
              className="text-sm tracking-wide text-ivory/80"
            >
              Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm tracking-wide text-ivory/80"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/my-listings"
                    onClick={() => setOpen(false)}
                    className="text-sm tracking-wide text-ivory/80"
                  >
                    My Listings ({user?.name})
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm tracking-wide text-ivory/50 text-left"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-sm tracking-wide text-ivory/80"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/list-your-property"
              onClick={() => setOpen(false)}
              className="btn-brass w-fit"
            >
              List Your Property
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
