import { FiZap } from "react-icons/fi";
import { HiUsers } from "react-icons/hi2";
import { IoCode } from "react-icons/io5";

const AboutSec = () => {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Why TechMate?
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Find your perfect match in the tech world — whether you're seeking a coding partner, mentor, or just expanding your network.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white mb-4">
              <IoCode className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Skill-Based Matching</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Find developers with complementary skills to yours. Perfect for collaborative projects.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white mb-4">
              <HiUsers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Professional Networking</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Expand your professional circle with like-minded developers in your field or area of interest.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white mb-4">
              <FiZap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Quick Connections</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Our intuitive swiping interface makes finding the right connection fast and efficient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;

