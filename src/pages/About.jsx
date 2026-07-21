import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <section className="relative bg-navy-900 text-ivory py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-page">
          <p className="eyebrow text-brass-400 mb-3">About Us</p>
          <h1 className="font-display text-3xl md:text-5xl max-w-2xl">
            About JRL Property Connect
          </h1>
        </div>
      </section>

      <section className="container-page py-20 max-w-2xl">
        <p className="text-navy-800/80 leading-relaxed text-lg">
          JRL Property Connect is a property marketing platform focused on
          connecting quality properties with potential buyers through
          professional presentation and digital marketing.
        </p>
      </section>

      <section className="bg-navy-950/[0.03] py-20">
        <div className="container-page">
          <p className="eyebrow mb-3">How We Work</p>
          <h2 className="font-display text-2xl md:text-3xl text-navy-900 mb-12 max-w-xl">
            Properties, marketing, buyers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Properties",
                body: "We work with property owners to showcase suitable properties.",
              },
              {
                title: "Marketing",
                body: "We promote properties through our website and digital marketing channels.",
              },
              {
                title: "Buyers",
                body: "We connect properties with potential buyers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-t-2 border-brass-500 pt-5"
              >
                <h3 className="font-display text-lg text-navy-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why JRL Property Connect */}
      <section className="bg-navy-950/[0.03] py-24">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Why JRL Property Connect</p>
            <h2 className="font-display text-3xl md:text-4xl text-navy-900 max-w-xl mx-auto">
              A considered approach to property marketing.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Targeted Marketing",
                body: "We connect properties with carefully targeted audiences.",
              },
              {
                title: "Professional Presentation",
                body: "Every property is presented through high-quality digital marketing.",
              },
              {
                title: "Trusted Connections",
                body: "We work through established relationships and direct communication.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-t-2 border-brass-500 pt-6 text-center md:text-left"
              >
                <h3 className="font-display text-xl text-navy-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24 text-center">
        <h2 className="font-display text-2xl md:text-3xl text-navy-900 mb-6 max-w-lg mx-auto">
          Whether you're buying or selling, we're happy to talk it through.
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/list-your-property" className="btn-primary">
            List a Property
          </Link>
          <Link to="/contact" className="btn-outline">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
