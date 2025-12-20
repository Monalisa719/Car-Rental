import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';

const BookingModal = ({ car, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setDays(diffDays);
                setTotalPrice(diffDays * car.price);
            } else {
                setDays(0);
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, car.price]);

    const handleBooking = () => {
        if (!startDate || !endDate) return alert("Please select dates!");

        const bookingData = {
            orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            car,
            bookingDetails: {
                startDate,
                endDate,
                days,
                totalPrice
            }
        };

        alert("Booking Successful!");

        navigate('/confirmation', {
            state: bookingData
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-700 animate-fadeIn">
                {/* Header */}
                <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                        Book {car.name}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Car Info */}
                    <div className="flex gap-4 items-center mb-4">
                        <div className="w-20 h-14 bg-gray-700 rounded-lg overflow-hidden">
                            {car.image ? (
                                <img
                                    src={`http://localhost:5000/uploads/${car.image}`}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">🚗</div>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-white">{car.name}</p>
                            <p className="text-amber-400 text-sm font-medium">₹{car.price} / day</p>
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Pick-up Date</label>
                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="date"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Drop-off Date</label>
                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="date"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Duration</span>
                            <span className="text-white font-medium">{days} Days</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                            <span className="text-gray-200 font-semibold">Total Price</span>
                            <span className="text-2xl font-bold text-amber-400">₹{totalPrice}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleBooking}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
