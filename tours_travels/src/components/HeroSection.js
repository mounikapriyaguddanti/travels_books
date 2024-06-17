


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';  // Import star icon from react-icons
import image from '../about.jpg';
import LoginForm from './LoginForm';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navy py-4 px-8 fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.Cc3IgeTMqNI1ZTooo39thwHaGa&pid=Api&P=0&h=180"
            alt="Logo"
            className="h-12 mr-4"
          />
          <span className="text-white font-bold text-2xl">Bharat Explorer</span>
        </div>
        <div className="hidden md:flex">
          <ul className="flex space-x-8 text-white text-lg">
            <li><Link to="/" className="hover:text-orangered">Home</Link></li>
            <li><Link to="/locations" className="hover:text-orangered">Locations</Link></li>
            <li><Link to="/" className="hover:text-orangered">Accommodations</Link></li>
            <li><Link to="/" className="hover:text-orangered">Packages</Link></li>
            <li><Link to="/" className="hover:text-orangered">Travel Connections</Link></li>
            <li><Link to="/" className="hover:text-orangered">Contact</Link></li>
          </ul>
        </div>
         <div className="hidden md:block">
          <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="text-white hover:text-orangered focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/locations" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Locations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Accommodations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Packages</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Travel Connections</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded block">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};


const HeroSection = () => {
  const images = [
    'http://getwallpapers.com/wallpaper/full/a/c/c/1503644-free-download-desktop-wallpaper-travel-2560x1440-hd-for-mobile.jpg',
    'https://wallpaperaccess.com/full/1431622.jpg',
    'http://www.beautiful-views.net/views/mountains-snow-viewes-winter-trees-snowy.jpg',
  ];

  const quotes = [
    'Travel is the only thing you buy that makes you richer.',
    'The world is a book, and those who do not travel read only a page.',
    'Travel is the main thing you purchase that makes you fundamentally richer.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative">
      <div className="bg-cover bg-center flex relative h-screen sm:h-auto">
        <img src={images[currentIndex]} alt="Hero" className="w-full h-auto sm:h-screen animate-fade-in" />
        <div className="absolute inset-0 flex justify-between items-center px-8 md:px-4 sm:px-2">
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handlePrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center text-black md:text-4xl sm:text-2xl">
            <h1 className="text-4xl textfont-bold mb-4 md:mb-2 sm:mb-1">Welcome to Bharat Explorer</h1>
            <p className="font-bold text-orangered mb-8 md:mb-4 sm:mb-2">"Embark on a Journey of Discovery"</p>
          </div>
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-2 sm:p-1 flex justify-between items-center bg-black bg-opacity-50">
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handlePrevious}></button>
          <p className="text-white text-lg font-semibold md:text-base sm:text-sm">{quotes[currentIndex]}</p>
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handleNext}></button>
        </div>
        <div className="absolute top-4 right-4 bg-orangered text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300">
  <Link to="/login">Login</Link>
</div>
      </div>
    </div>
  );
};

/*  import LoginForm from './LoginForm'; */// Import your login form component here
  
const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-8"> {/* Added padding */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">About Bharat Explorer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative pl-8"> {/* Added left padding */}
            <img
              src={image}
              alt="About Bharat Explorer"
              className="w-full h-96 md:h-120 object-cover rounded-lg shadow-lg"
            />
            {/*  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
               <p className="text-white text-2xl font-bold text-center px-8">
                 Exploring the Hidden Gems <br /> of Incredible India
               </p>
             </div> */}
          </div>
          <div>
            <p className="text-lg mb-4">
              At Bharat Explorer, we are passionate about showcasing the rich cultural heritage and breathtaking natural beauty of our incredible country. With a team of experienced and knowledgeable travel enthusiasts, we curate unforgettable journeys that take you off the beaten path and into the heart of India's diverse landscapes and traditions.
            </p>
            <p className="text-lg mb-4">
              Whether you seek the serenity of the Himalayas, the vibrant colors of Rajasthan, or the tranquil backwaters of Kerala, we are dedicated to crafting tailor-made experiences that cater to your unique interests and preferences. Our personalized approach ensures that every traveler gets to immerse themselves in the authentic essence of India, creating memories that will last a lifetime.
            </p>
            <p className="text-lg">
              Join us on a journey of discovery, where every step unveils the hidden gems of our incredible homeland. Together, let's explore the untold stories, savor the flavors, and embrace the warmth of India's rich tapestry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const WhyChooseUs = () => {
  const reasons = [
    { icon: '🌟', title: 'Expert Guidance', description: 'Our seasoned travel experts craft personalized itineraries.' },
    { icon: '🏆', title: 'Top-notch Service', description: 'Award-winning customer service available 24/7.' },
    { icon: '💰', title: 'Best Deals', description: 'Unbeatable prices and exclusive package offers.' },
    { icon: '🌍', title: 'Diverse Options', description: 'From serene retreats to bustling cities, we have it all.' },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Bharat Explorer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-full shadow-md text-center"> {/* Changed to rounded-full for circular shape */}
              <p className="text-4xl mb-4">{reason.icon}</p>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Testimonials = () => {
  const reviews = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      quote: 'Bharat Explorer made my Rajasthan trip unforgettable. The palaces, the culture - everything was perfect!',
      photo: 'https://i.pinimg.com/originals/1f/e6/51/1fe651e1726e805aff12298209e7cb6c.jpg',
      rating: 4,
    },
    {
      name: 'Rahul Verma',
      location: 'Delhi',
      quote: 'Kudos to the team of Bharat Explorer for an amazing Kerala backwaters experience. Truly Gods own country!',
      photo: 'https://wallpapercave.com/wp/wp8295906.jpg',
      rating: 5,
    },
    {
      name: 'Anjali Desai',
      location: 'Ahmedabad',
      quote: 'From the peaks of Ladakh to the beaches of Goa, they planned it all flawlessly.',
      photo: 'https://www.pngall.com/wp-content/uploads/5/Cute-Anime-Girl-PNG-Free-Download.png',
      rating: 3,
    },
  ];

  return (
    <section className="bg-navy text-white py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Explorers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-blue-900 p-6 rounded-lg shadow-md">
              <img
                src={review.photo}
                alt={`${review.name}`}
                className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
              />
              <p className="text-lg mb-4">"{review.quote}"</p>
              <div className="flex justify-center mb-2">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <FaStar key={`gray-${i}`} className="text-gray-500" />
                ))}
              </div>
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-gray-300">{review.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: 'How do I book a trip?', answer: 'You can book a trip through our website, by phone, or by visiting our office. We recommend booking online for exclusive deals.' },
    { question: 'Can you customize trips?', answer: 'Absolutely! Our experts specialize in crafting personalized itineraries tailored to your preferences, budget, and timeline.' },
    { question: 'Whats included in your packages?', answer: 'Our packages typically include accommodation, some meals, transportation, guided tours, and entry fees. Check each package for specifics.' },
    { question: 'How safe is traveling with you?', answer: 'Safety is our top priority. We work with trusted partners, provide 24/7 support, and follow all local safety guidelines.' },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 md:px-16"> {/* Added padding to container */}
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg">
              <button 
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg className={`w-6 h-6 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && <p className="p-4 pt-0 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUs  />
      <WhyChooseUs />
      <Testimonials />
      <FAQs />
    </div>
  );
};

export default HomePage;
