import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Track Your Job Applications Like a Pro
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-blue-100">
            Organize applications, monitor progress, and land your dream job
            faster.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <NavLink
              to="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition text-center"
            >
              Get Started
            </NavLink>

            <NavLink
              to="/login"
              className="border border-white px-6 py-3 rounded-lg hover:bg-blue-500 transition text-center"
            >
              Login
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Why Choose Job Tracker?
          </h2>
          <p className="text-gray-600">
            Everything you need to manage your job search efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Track Applications</h3>
            <p className="text-gray-600">
              Keep all your job applications organized in one place.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-gray-600">
              See insights about your job search performance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Status Updates</h3>
            <p className="text-gray-600">
              Move applications through stages like Applied, Interview, Offer.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-lg mb-2">1. Create Account</h4>
              <p className="text-gray-600">
                Sign up and access your personal dashboard.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                2. Add Applications
              </h4>
              <p className="text-gray-600">
                Record company, role, and application status.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">3. Track & Improve</h4>
              <p className="text-gray-600">
                Analyze results and improve your job search strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Ready to Take Control of Your Job Search?
        </h2>

        <NavLink
          to="/register"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Start Tracking Today
        </NavLink>
      </section>
    </div>
  );
}

export default Home;
