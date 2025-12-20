import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload, FiPlus, FiDollarSign} from 'react-icons/fi';

function AddCar() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: null,
    specs: '',
    type: 'sports'
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rentedCars, setRentedCars] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'rented'

  const token = localStorage.getItem('carToken');

  const fetchRentedCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentedCars(res.data || []);
    } catch (err) {
      console.error('Failed to fetch rented cars:', err);
    }
  };

  useEffect(() => {
    fetchRentedCars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('specs', form.specs);
    data.append('type', form.type);
    if (form.image) data.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/cars/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Car added successfully');
      setForm({ name: '', price: '', image: null, specs: '', type: 'sports' });
      setPreview(null);
      fetchRentedCars();
      setActiveTab('rented'); // Switch to rented cars view after adding
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add car');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'add' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FiPlus /> Add New Car
          </button>
          <button
            onClick={() => setActiveTab('rented')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'rented' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FiPlus /> Your Rented Cars ({rentedCars.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {activeTab === 'add' ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <FiPlus /> Add New Vehicle
              </h2>
              
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Image Upload */}
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Vehicle Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-700 hover:bg-gray-600 transition duration-300">
                        {preview ? (
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="h-full w-full object-cover rounded-xl" 
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center">
                            <FiUpload className="text-4xl text-gray-400 mb-3" />
                            <p className="text-sm text-gray-400">Upload high-quality vehicle image</p>
                            <p className="text-xs text-gray-500 mt-1">Recommended: 1200x800px</p>
                          </div>
                        )}
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="hidden"
                          accept="image/*"
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-3 text-amber-400">Quick Tips</h3>
                    <ul className="text-xs text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Use clear, well-lit photos showing the entire vehicle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Include multiple angles for better renter engagement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Highlight unique features in your description</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Vehicle Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Porsche 911 Turbo S"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Daily Rate (₹)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiDollarSign className="text-gray-400" />
                        </div>
                        <input
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="e.g. 5000"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="sports">Sports Car</option>
                        <option value="luxury">Luxury Sedan</option>
                        <option value="suv">Premium SUV</option>
                        <option value="exotic">Exotic</option>
                        <option value="classic">Classic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Key Features</label>
                      <textarea
                        name="specs"
                        value={form.specs}
                        onChange={handleChange}
                        placeholder="Comma separated features: AWD, 640HP, 3.7s 0-60, Sunroof"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 h-24 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 transition duration-300"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiPlus /> Add Vehicle
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <FiPlus /> Your Rented Cars
              </h2>

              {rentedCars.length === 0 ? (
                <div className="text-center py-12 bg-gray-700 rounded-xl">
                  <FiPlus className="mx-auto text-4xl text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-300">No cars rented yet</h3>
                  <p className="text-gray-500 mt-1">Add your first vehicle to get started</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="mt-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-medium py-2 px-6 rounded-lg inline-flex items-center gap-2 transition duration-300"
                  >
                    <FiPlus /> Add Vehicle
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rentedCars.map((car) => (
                    <div key={car._id} className="bg-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
                      <div className="h-48 bg-gray-600 relative overflow-hidden">
                        {car.imageUrl ? (
                          <img 
                            src={car.imageUrl} 
                            alt={car.name} 
                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FiPlus className="text-4xl" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <span className="bg-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                            ₹{car.price}/day
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-1">{car.name}</h3>
                        <div className="flex items-center text-gray-400 text-sm mb-3">
                          <span className="capitalize">{car.type}</span>
                          <span className="mx-2">•</span>
                          <span>Added on {new Date(car.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {car.specs?.slice(0, 3).map((spec, i) => (
                            <span key={i} className="text-xs bg-gray-600 text-amber-400 px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                          {car.specs?.length > 3 && (
                            <span className="text-xs bg-gray-600 text-gray-400 px-2 py-1 rounded">
                              +{car.specs.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                          <button className="text-sm text-amber-400 hover:text-amber-300 transition duration-300">
                            View Details
                          </button>
                          <button className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition duration-300">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCar;