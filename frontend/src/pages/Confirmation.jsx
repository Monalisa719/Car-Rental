import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiPrinter } from 'react-icons/fi';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, car, bookingDetails } = location.state || {}; // Mock data can be used if accessed directly for demo, but ideally comes from checkout

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl border border-gray-700 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>

                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="text-6xl text-green-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
                <p className="text-gray-400 text-lg mb-8">Thank you for choosing us. Your ride is ready.</p>

                <div className="bg-gray-700/50 rounded-xl p-6 mb-8 text-left border border-gray-600">
                    <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-semibold">Booking Reference: <span className="text-amber-400">{orderId || 'ORD-UNKNOWN'}</span></p>

                    {car && (
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-600 pb-6">
                            <div className="w-20 h-14 bg-gray-600 rounded-md overflow-hidden">
                                <img src={car.image} alt="Car" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{car.name}</h3>
                                <p className="text-amber-500 text-sm">₹{car.price} / day</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-400">Pick-up Date</p>
                            <p className="text-white font-medium">{bookingDetails?.startDate || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Total Paid</p>
                            <p className="text-amber-400 font-bold text-lg">₹{bookingDetails?.totalPrice || '0'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => window.print()} className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                        <FiPrinter /> Print Receipt
                    </button>
                    <button onClick={() => navigate('/')} className="px-8 py-3 rounded-lg bg-amber-500 text-gray-900 font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                        <FiHome /> Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
