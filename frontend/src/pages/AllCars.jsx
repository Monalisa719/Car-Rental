import { useEffect, useState } from 'react';
import api from '../config/api';
import { FiStar, FiClock, FiMapPin, FiFilter, FiSearch } from 'react-icons/fi';
import BookingModal from '../component/BookingModal';

function AllCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all'
  });
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/api/cars');
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const normalizeType = (value) => {
    const type = (value || '').toString().trim().toLowerCase();
    if (!type) return 'unknown';
    if (type.includes('suv')) return 'suv';
    if (type.includes('sport')) return 'sports';
    if (type.includes('lux')) return 'luxury';
    if (type.includes('sedan')) return 'sedan';
    if (type.includes('exotic')) return 'exotic';
    if (type.includes('classic')) return 'classic';
    return type;
  };

  const filteredCars = cars.filter(car => {
    const name = (car.name || '').toLowerCase();
    const normalizedType = normalizeType(car.type);
    const price = Number(car.price) || 0;

    // Search filter
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch = !search || name.includes(search) || normalizedType.includes(search);

    // Type filter
    const matchesType = filters.type === 'all' || normalizedType === filters.type;

    // Price filter
    let matchesPrice = true;
    if (filters.priceRange === '0-3000') {
      matchesPrice = price <= 3000;
    } else if (filters.priceRange === '3000-6000') {
      matchesPrice = price > 3000 && price <= 6000;
    } else if (filters.priceRange === '6000+') {
      matchesPrice = price > 6000;
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
            Our Premium Fleet
          </h1>
          <p className="text-xl text-gray-400">
            Select from our curated collection of luxury vehicles
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="sports">Sports</option>
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="exotic">Exotic</option>
                <option value="classic">Classic</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">All Prices</option>
                <option value="0-3000">₹0 - ₹3000</option>
                <option value="3000-6000">₹3000 - ₹6000</option>
                <option value="6000+">₹6000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
          </div>
        ) : (
          /* Cars Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 hover:translate-y-[-4px]">
                  {/* Car Image */}
                  <div className="h-56 bg-gray-700 overflow-hidden relative">
                    {car.image ? (
                      <img
                        src={car.image || car.imageUrl}
                        alt={car.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl">🚗</span>
                      </div>
                    )}
                    {/* Premium Badge */}
                    {car.type === 'luxury' || car.type === 'sports' ? (
                      <div className="absolute top-4 right-4 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FiStar className="text-xs" /> PREMIUM
                      </div>
                    ) : null}
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        ₹{car.price}/day
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 mb-2 capitalize">
                      {normalizeType(car.type) === 'unknown' ? 'Vehicle' : normalizeType(car.type)}
                    </div>

                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <FiMapPin className="mr-1" />
                      <span>Available in {car.availableCities?.join(', ') || 'major cities'}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {car.specs?.map((spec, i) => (
                        <span key={i} className="text-xs bg-gray-700 text-amber-400 px-2 py-1 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-400 text-sm">
                        <FiClock className="mr-1" />
                        <span>Min. {car.minRentalDays || 1} day rental</span>
                      </div>
                      <button
                        onClick={() => openModal(car)}
                        className="bg-gray-700 hover:bg-amber-500 hover:text-gray-900 border border-amber-500 text-amber-400 px-4 py-2 rounded-lg transition duration-300 pointer-events-auto cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-xl font-bold mb-2">No cars found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Booking Modal */}
      {
        selectedCar && (
          <BookingModal
            car={selectedCar}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )
      }
    </div >
  );
}

export default AllCars;