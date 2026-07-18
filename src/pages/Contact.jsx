import ContactForm from "../components/ContactForm.jsx";

const Contact = () => {
  return (
    <div>
      <section className="bg-navy-900 text-ivory py-16">
        <div className="container-page">
          <p className="eyebrow text-brass-400 mb-3">Get in Touch</p>
          <h1 className="font-display text-3xl md:text-4xl">Contact JRL Property Connect</h1>
        </div>
      </section>

      <section className="container-page py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl text-navy-900 mb-4">Send us a message</h2>
          <p className="text-sm text-navy-700/70 mb-6">
            Looking for a property or interested in selling? Get in touch with us.
          </p>
          <ContactForm />
        </div>

        <div>
          <h2 className="font-display text-2xl text-navy-900 mb-4">Details</h2>
          <ul className="space-y-3 text-navy-800/80 text-sm mb-6">
            <li>
              <span className="block text-xs uppercase tracking-wide text-navy-700/50 mb-1">Email</span>
              hello@jrlpropertyconnect.com
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-navy-700/50 mb-1">Phone</span>
              +44 20 7946 0958
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-navy-700/50 mb-1">Office</span>
              14 Lambford Court, Moorgate, London, EC2A 4DP, United Kingdom
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-navy-700/50 mb-1">Hours</span>
              Monday – Friday, 9:00am – 6:00pm (GMT)
            </li>
          </ul>

          <div className="aspect-[4/3] border border-navy-900/10 overflow-hidden">
            <iframe
              title="JRL Property Connect office location"
              src="https://www.google.com/maps?q=Moorgate,London,EC2A+4DP,UK&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
