import { FiShield, FiStar, FiAward, FiMapPin, FiUsers } from 'react-icons/fi';

function AboutPage() {
  const citiesServed = [
    { name: 'Mumbai', icon: '🏙️' },
    { name: 'Delhi NCR', icon: '🗼' },
    { name: 'Bangalore', icon: '💻' },
    { name: 'Hyderabad', icon: '💎' },
    { name: 'Chennai', icon: '🏖️' },
    { name: 'Pune', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
            About RentMyRide
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Redefining luxury mobility across India's most vibrant cities
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 mb-16 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-amber-400">Our Journey</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2023, RentMyRide began with a simple vision: to bring world-class car rental services to India's urban centers. 
                What started as a fleet of 5 premium vehicles in Mumbai has now grown to become a trusted name in luxury mobility.
              </p>
              <p className="text-gray-300 mb-4">
                We recognized that India's growing class of discerning travelers and professionals deserved better options - vehicles that combine 
                performance, comfort, and prestige without the hassles of ownership.
              </p>
              <p className="text-gray-300">
                Today, we proudly serve 6 major cities with a carefully curated collection of premium automobiles, each maintained to exacting 
                standards and delivered with impeccable service.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg overflow-hidden h-80 flex items-center justify-center">
              <div className="text-center p-6">
                <span className="text-6xl mb-4">🚗</span>
                <p className="text-gray-400">Our premium fleet in action</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cities We Serve */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">Cities We Serve</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {citiesServed.map((city, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
                <div className="text-3xl mb-3">{city.icon}</div>
                <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                <p className="text-gray-400 text-sm">
                  {city.name === 'Mumbai' && 'Financial capital with premium demand'}
                  {city.name === 'Delhi NCR' && 'Political hub with luxury needs'}
                  {city.name === 'Bangalore' && 'Tech city with discerning clients'}
                  {city.name === 'Hyderabad' && 'Emerging market for luxury rentals'}
                  {city.name === 'Chennai' && 'Coastal metropolis with style'}
                  {city.name === 'Pune' && 'Educational hub with premium aspirations'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-400">Why RentMyRide Stands Out</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
                <FiShield className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rigorous Maintenance</h3>
              <p className="text-gray-400">
                Each vehicle undergoes 150-point inspection before every rental. We never compromise on safety.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
                <FiStar className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Fleet</h3>
              <p className="text-gray-400">
                Only premium models that meet our exacting standards for performance and comfort.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
                <FiUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-400">
                Our city teams know the best routes, parking, and local regulations to save you time.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 md:p-12 shadow-lg border border-gray-600">
          <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">Our Commitment to India</h2>
          <p className="text-gray-300 mb-6 text-center max-w-4xl mx-auto">
            As an Indian company serving Indian cities, we're committed to elevating the car rental experience while supporting 
            local businesses and employment. Our chauffeurs are trained professionals, our maintenance partners are local garages 
            with certified expertise, and our growth means opportunities for our communities.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 text-center">
              <FiAward className="text-3xl mx-auto mb-3 text-amber-400" />
              <h3 className="text-lg font-bold mb-2">100% Verified</h3>
              <p className="text-gray-400 text-sm">Every driver and vehicle is background checked</p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 text-center">
              <FiMapPin className="text-3xl mx-auto mb-3 text-amber-400" />
              <h3 className="text-lg font-bold mb-2">City Specialists</h3>
              <p className="text-gray-400 text-sm">Deep knowledge of each city we serve</p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 text-center">
              <div className="text-3xl mx-auto mb-3">🇮🇳</div>
              <h3 className="text-lg font-bold mb-2">Proudly Indian</h3>
              <p className="text-gray-400 text-sm">Investing in local infrastructure and talent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;