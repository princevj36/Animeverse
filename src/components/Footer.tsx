import { Link } from 'react-router-dom';
import { Instagram, Mail, Truck, RefreshCw, Headset, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/categories/logo.jpg';

const FeatureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureItem 
            icon={Truck}
            title="Free Shipping"
            description="Free shipping on all orders above ₹999"
          />
          <FeatureItem 
            icon={RefreshCw}
            title="Easy Returns"
            description="Hassle-free returns within 7 days"
          />
          <FeatureItem 
            icon={Headset}
            title="24/7 Support"
            description="Dedicated support all day, every day"
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={logo} 
                alt="AnimeVerse Logo" 
                className="h-10 w-auto mr-3"
              />
              <h3 className="text-xl font-bold">AnimeVerse</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for premium anime merchandise and collectibles.
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Jaipur, Rajasthan</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:9414378779" className="hover:text-white transition-colors">9414378779</a>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:theanimeverse.in@gmail.com" className="hover:text-white transition-colors break-all">theanimeverse.in@gmail.com</a>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="https://www.instagram.com/theanimeversein/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @theanimeversein
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/sale" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
                <li><Link to="/trending" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary rounded-l"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} AnimeVerse. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
