// JRL Property Connect brand mark. The full lockup (icon + wordmark) reads
// best on a dark surface — its "PROPERTY CONNECT" text has a brushed-silver
// finish — so it's used on the navy navbar, footer, and admin sidebar.
const Logo = ({ variant = "full", className = "" }) => {
  if (variant === "icon") {
    return (
      <img
        src="/favicon.png"
        alt="JRL Property Connect"
        className={className || "h-9 w-9"}
      />
    );
  }

  return (
    <img
      src="/logo.png"
      alt="JRL Property Connect — Your Property. The Right Buyer."
      className={className || "max-sm:ml-[-10px] h-40 md:h-24 w-auto"}
    />
  );
};

export default Logo;
