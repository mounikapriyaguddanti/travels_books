/* /* import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import PlaceList from './components/PlaceList';
import PlaceDetails from './components/PlaceDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} /> 
          <Route path="/" element={<PlaceList />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
        <main className="flex-grow"></main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; */

/* import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import PlacesGrid from './components/PlacesGrid';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/places" element={<PlacesGrid />} />
        </Routes>
        <main className="flex-grow"></main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; */
/* import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlacesGrid from './components/PlacesGrid';
import HeroSection from './components/HeroSection';
// Import other components as needed

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/places" element={<PlacesGrid />} />
     
        </Routes>
     
      </div>
    </Router>
  );
}

export default App; */

/* import React from 'react';
import './App.css';
import LocationCards from './components/LocationCards';

function App() {
  return (
    <div className="App">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Navbar</div>
          </div>
        </div>
      </nav>
      <LocationCards />
    </div>
  );
}

export default App; */
/* 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LocationCards from './components/LocationCards';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
// Import other components/pages as needed

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} /> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/locations" element={<LocationCards />} />
        
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

        </Routes>
    
        <Footer />
      </div>
    </Router>
  );
}

export default App;


 */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import LocationCards from './components/LocationCards';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddBookForm from './components/AddBookForm';
import BookDetails from './components/BookDetails';

// Import other components/pages as needed

function App() {
  return (
    <Router>
      <div className="App">
        {/*<Navbar />*/}
        <Routes>
          <Route path="/" element={<HeroSection/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/locations" element={<LocationCards />} />
       
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/addbookform" element={<AddBookForm />}  />
          <Route path="/bookdetails" element={<BookDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
