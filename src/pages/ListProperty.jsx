import { Link } from "react-router-dom";
import ListPropertyForm from "../components/ListPropertyForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const steps = [
  {
    title: "Tell us about your property",
    body: "Submit the form below with the property address, type and your asking price. It takes about two minutes.",
  },
  {
    title: "We'll be in touch",
    body: "A member of our team reviews every submission and calls or emails you within one working day to discuss photos, pricing and timeline.",
  },
  {
    title: "We list and promote it",
    body: "Once agreed, your property goes live on our site and is promoted across our social channels to reach genuine, ready buyers.",
  },
];

const ListProperty = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <section className="bg-navy-900 text-ivory py-16">
        <div className="container-page">
          <p className="eyebrow text-brass-400 mb-3">For Property Owners</p>
          <h1 className="font-display text-3xl md:text-4xl max-w-xl">List Your Property With Us</h1>
          <p className="text-ivory/70 mt-4 max-w-xl leading-relaxed">
            Reach genuine buyers without the hassle. Tell us about your property below
            and our team will take care of the rest, from presentation to enquiries.
          </p>
        </div>
      </section>

      <section className="container-page py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl text-navy-900 mb-6">Property details</h2>
          {isAuthenticated ? (
            <ListPropertyForm />
          ) : (
            <div className="bg-white border border-navy-900/10 p-8 text-center">
              <p className="font-display text-lg text-navy-900 mb-2">Sign in to list your property</p>
              <p className="text-sm text-navy-700/70 mb-6 max-w-sm mx-auto">
                We ask owners to create a free account so you can track your submission and
                we know exactly who to get back to.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/login" state={{ from: "/list-your-property" }} className="btn-primary">
                  Sign In
                </Link>
                <Link to="/register" state={{ from: "/list-your-property" }} className="btn-outline">
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl text-navy-900 mb-6">What happens next</h2>
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="border-t-2 border-brass-500 pt-4">
                <div className="text-xs tracking-[0.2em] uppercase text-navy-700/50 mb-2">
                  Step {idx + 1}
                </div>
                <h3 className="font-display text-lg text-navy-900 mb-2">{step.title}</h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-navy-950/[0.03] border border-navy-900/10 text-sm text-navy-800/70">
            <p className="font-medium text-navy-900 mb-2">No upfront cost</p>
            <p>
              There's no charge to list your property with us at this stage. We'll agree
              terms with you directly before anything goes live.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListProperty;
