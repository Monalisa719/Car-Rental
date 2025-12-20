import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiShield, FiStar, FiMapPin } from 'react-icons/fi';

const LandingPage = () => {
  const featuredCars = [
    {
      id: 1,
      name: 'Porsche 911 Turbo S',
      price: '$499/day',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      specs: ['AWD', '3.7s 0-60', '640 HP']
    },
    {
      id: 2,
      name: 'Mercedes-Benz S-Class',
      price: '$399/day',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      specs: ['Luxury', 'V8', '4K Miles']
    },
    {
      id: 3,
      name: 'Range Rover Autobiography',
      price: '$449/day',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      specs: ['SUV', '4WD', 'Premium']
    }
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-70">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
            Experience Automotive Excellence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Drive the world's most prestigious vehicles with RentMyRide exclusive luxury car rental service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cars" 
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              Browse Cars <FiArrowRight />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:bg-opacity-10 font-bold rounded-lg transition duration-300"
            >
              Concierge Service
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentMyRide</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Unparalleled service meets exceptional vehicles for the ultimate driving experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition duration-300">
            <div className="text-amber-400 mb-4">
              <FiStar className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Premium Selection</h3>
            <p className="text-gray-400">
              Only the finest vehicles from the world's most prestigious manufacturers.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition duration-300">
            <div className="text-amber-400 mb-4">
              <FiShield className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Complete Protection</h3>
            <p className="text-gray-400">
              Comprehensive insurance coverage and 24/7 roadside assistance.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition duration-300">
            <div className="text-amber-400 mb-4">
              <FiClock className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Rental</h3>
            <p className="text-gray-400">
              Hourly, daily, or weekly rentals to suit your exact needs.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Fleet</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A curated selection from our exclusive collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      {car.price}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-5">
                    {car.specs.map((spec, i) => (
                      <span key={i} className="text-xs bg-gray-800 text-amber-400 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/cars/${car.id}`} 
                    className="w-full inline-block text-center px-4 py-2 bg-gray-800 hover:bg-amber-500 hover:text-gray-900 border border-amber-500 text-amber-400 rounded-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/cars" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-amber-500 hover:bg-amber-400 transition duration-300"
            >
              Explore Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Multiple Locations</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Serving elite clients in the world's most prestigious cities
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune'].map((city) => (
            <div key={city} className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300">
              <FiMapPin className="text-amber-400" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for an Unforgettable Drive?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join NoirClub today and unlock exclusive benefits and priority access to our rarest vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 font-bold rounded-lg transition duration-300"
            >
              Become a Member
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:bg-opacity-10 font-bold rounded-lg transition duration-300"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;