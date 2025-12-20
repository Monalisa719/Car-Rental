import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
            Contact Our Concierge
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions about our luxury fleet or premium services? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-amber-400">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-400">concierge@RentMyRide.com</p>
                  <p className="text-gray-400 text-sm mt-1">Response time: within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-amber-400">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-400">+1 (555) 888-9999</p>
                  <p className="text-gray-400 text-sm mt-1">Mon-Fri: 9am - 7pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-amber-400">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Headquarters</h3>
                  <p className="text-gray-400">350 Fifth Avenue</p>
                  <p className="text-gray-400">New York, NY 10118</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-700">
              <h3 className="font-bold text-lg mb-4">Multiple Offices</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune'].map(city => (
                  <div key={city} className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-gray-700 border border-amber-400 text-amber-400 p-4 rounded-lg mb-6">
                Thank you for your message! Our concierge team will get back to you soon.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="h-96 bg-gray-700 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FiMapPin className="text-4xl mx-auto mb-3 text-amber-400" />
              <p>Interactive Map Would Appear Here</p>
              <p className="text-sm mt-1">(In a real implementation)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;