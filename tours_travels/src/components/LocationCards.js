import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/locations');
      setLocations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Famous Places</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-auto-flow-dense">
  {locations.flatMap(category =>
    category && category.states && category.states.length > 0
      ? category.states.flatMap(state =>
          state && state.places && state.places.length > 0
            ? state.places.map(place => (
                <div
                  key={place._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                            src={place.photo}
                            alt={place.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">
                              {place.name}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {place.description}
                            </p>
                            <div className="flex flex-wrap">
                              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                {category.name}
                              </span>
                              <span className=" bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                {state.name}
                              </span>
                              {place.tags &&
                                place.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full mr-2 mb-2"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))
                    : null
                )
              : null
          )}
        </div>
      </div>
  </div>
 );
 }
export default Locations;
