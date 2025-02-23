import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/966558880867"  // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#2a7c2a] hover:bg-[#1e571e] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:0558880867"  // Replace with your phone number
        className="bg-[#AA9554] hover:bg-[#8c7a43] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <FaPhone className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;