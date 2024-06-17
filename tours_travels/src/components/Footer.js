
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faHome, faMapMarkerAlt, faHotel, faBoxOpen, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navItems = [
    { name: 'Home', icon: faHome, href: 'home' },
    { name: 'Locations', icon: faMapMarkerAlt, href: 'locations' },
    { name: 'Accommodations', icon: faHotel, href: '#accommodations' },
    { name: 'Packages', icon: faBoxOpen, href: '#packages' },
    { name: 'Travel Connections', icon: faPlaneDeparture, href: '#travel-connections' },
    { name: 'Contact', icon: faEnvelope, href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: faFacebook, href: '#facebook', color: '#1877F2' },
    { name: 'Twitter', icon: faTwitter, href: '#twitter', color: '#1DA1F2' },
    { name: 'Instagram', icon: faInstagram, href: '#instagram', color: '#E4405F' },
    { name: 'YouTube', icon: faYoutube, href: '#youtube', color: '#FF0000' },
    { name: 'WhatsApp', icon: faWhatsapp, href: '#whatsapp', color: '#25D366' }
  ];

  return (
    <footer className="bg-navy py-10 pl-10 pr-4 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:pr-6">
            <div className="flex items-center mb-4">
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.Cc3IgeTMqNI1ZTooo39thwHaGa&pid=Api&P=0&h=180"
                alt="Logo"
                className="h-14 mr-3"
              />
              <span className="text-white font-bold text-xl">Bharat Explorer</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the heart of India with our curated travel experiences. From bustling cities to serene landscapes, we've got your journey covered.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              {navItems.map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <FontAwesomeIcon icon={item.icon} className="mr-2 text-sm opacity-75" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact & Connect</h3>
            <div className="mb-4">
              <div className="flex items-center text-gray-300 mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-3 opacity-75" />
                <span>+91-9632587412</span>
              </div>
              <div className="flex items-center text-gray-300 mb-2">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-3 opacity-75" />
                <span>+91-7412589632 (WhatsApp)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 opacity-75" />
                <span>info@bharatexplorer.com</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Follow Our Journey</h4>
              <ul className="flex space-x-3">
                {socialLinks.map(({ name, icon, href, color }) => (
                  <li key={name}>
                    <a 
                      href={href} 
                      className="block w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg"
                      style={{ backgroundColor: color }}
                      aria-label={name}
                    >
                      <FontAwesomeIcon icon={icon} className="text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-white text-xs">
          <p>
            &copy; {new Date().getFullYear()} Bharat Explorer. All rights reserved. | 
            <a href="#privacy" className="hover:text-gray-300 ml-1 mr-1 transition-colors">Privacy Policy</a> | 
            <a href="#terms" className="hover:text-gray-300 ml-1 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;