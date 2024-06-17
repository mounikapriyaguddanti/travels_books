  

                  import React, { useState, useEffect } from 'react';
                  import { useLocation, useNavigate } from 'react-router-dom';
                  import axios from 'axios';
                  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
                  import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
                  import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
                  import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
                  
                  const PurchaseModal = ({ message, onClose }) => {
                    return (
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white rounded p-8 max-w-lg flex flex-col items-center">
                          <p className="text-lg font-semibold mb-4">{message}</p>
                          <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                            Close
                          </button>
                        </div>
                      </div>
                    );
                  };
                  
                  const UserDashboard = () => {
                    const location = useLocation();
                    const navigate = useNavigate();
                    const [user, setUser] = useState(null);
                    const [publishers, setPublishers] = useState([]);
                    const [wishlist, setWishlist] = useState([]);
                    const [selectedBook, setSelectedBook] = useState(null);
                    const [showWishlist, setShowWishlist] = useState(false);
                    const [purchaseMessage, setPurchaseMessage] = useState('');
                    const [searchTerm, setSearchTerm] = useState('');
                    const [filteredBooks, setFilteredBooks] = useState([]);
                    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
                  
                    useEffect(() => {
                      if (location.state && location.state.user) {
                        setUser(location.state.user);
                      }
                  
                      const fetchBooks = async () => {
                        try {
                          const response = await axios.get('http://localhost:5000/books');
                          console.log('Books data:', response.data);
                          setPublishers(response.data);
                        } catch (error) {
                          console.error('Error fetching books:', error);
                        }
                      };
                  
                      fetchBooks();
                    }, [location.state]);
                  
                    const handleLogout = async () => {
                      try {
                        if (user) {
                          await axios.post('http://localhost:8000/logout', {
                            username: user.username,
                            logoutTime: new Date().toISOString()
                          });
                        }
                        navigate('/');
                      } catch (error) {
                        console.error('Error during logout:', error);
                      }
                    };
                  
                    const handleViewMore = (book) => {
                      setSelectedBook(book);
                    };
                  
                    const closeModal = () => {
                      setSelectedBook(null);
                      setShowPurchaseModal(false);
                      setPurchaseMessage('');
                    };
                  
                    const toggleWishlist = (book) => {
                      if (wishlist.includes(book)) {
                        setWishlist(wishlist.filter(item => item !== book));
                      } else {
                        setWishlist([...wishlist, book]);
                      }
                    };
                  
                    const handleShowWishlist = () => {
                      setShowWishlist(!showWishlist);
                    };
                  
                    const handleBuyBook = async (book) => {
                      try {
                        const response = await axios.post(`http://localhost:5000/purchase/${book._id}`);
                        if (response.status === 200) {
                          setPurchaseMessage('Purchase successful!');
                          setShowPurchaseModal(true);
                          setPublishers((prevPublishers) =>
                            prevPublishers.map((publisher) => ({
                              ...publisher,
                              authors: publisher.authors.map((author) => ({
                                ...author,
                                books: author.books.map((b) =>
                                  b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
                                )
                              }))
                            }))
                          );
                          setWishlist((prevWishlist) =>
                            prevWishlist.map((b) =>
                              b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
                            )
                          );
                          setTimeout(() => closeModal(), 3000); // Close modal after 3 seconds
                        }
                      } catch (error) {
                        console.error('Error purchasing book:', error);
                      }
                    };
                  
                    const handleSearch = (event) => {
                      setSearchTerm(event.target.value);
                      if (event.target.value === '') {
                        setFilteredBooks([]);
                      } else {
                        const filtered = publishers.flatMap((publisher) =>
                          publisher.authors.flatMap((author) =>
                            author.books.filter((book) =>
                              book.bookName.toLowerCase().includes(event.target.value.toLowerCase()) ||
                              author.authorName.toLowerCase().includes(event.target.value.toLowerCase()) ||
                              publisher.publisherName.toLowerCase().includes(event.target.value.toLowerCase())
                            ).map((book) => ({
                              ...book,
                              author: author.authorName,
                              publisherName: publisher.publisherName,
                            }))
                          )
                        );
                        setFilteredBooks(filtered);
                      }
                    };
                  
                    const handleDeleteFromWishlist = (book) => {
                      setWishlist(wishlist.filter(item => item !== book));
                    };
                  
                    return (
                      <div className="flex flex-col min-h-screen bg-gray-100">
                        <header className="bg-blue-500 py-4 px-6 flex justify-between items-center">
                          <h1 className="text-white font-bold">User Dashboard</h1>
                          <div>
                            <button
                              className="bg-white text-blue-500 font-bold py-2 px-4 rounded mr-4"
                              onClick={handleShowWishlist}
                            >
                              Wishlist ({wishlist.length})
                            </button>
                            <button
                              className="bg-white text-blue-500 font-bold py-2 px-4 rounded"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                        </header>
                        <div className="w-full px-6 py-6">
                          <input
                            type="text"
                            placeholder="Search by book, author, or publisher"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 w-1/2 rounded"
                          />
                        </div>
                  
                        <main className="flex-grow flex flex-col items-center justify-center">
                          <div className="w-full px-4 py-6">
                            {showWishlist ? (
                              <div>
                                <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                  {wishlist.map((book) => (
                                    <div key={book?._id} className="bg-white rounded shadow-md p-4 relative">
                                      <img src={book.imgUrl} alt={book.bookName} className="w-full object-cover mb-4" />
                                      <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold">{book.bookName}</h3>
                                        <button
                                          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                                          onClick={() => handleDeleteFromWishlist(book)}
                                        >
                                          <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                      </div>
                                      <p className="mb-2">Author: {book.author}</p>
                                      <p className="mb-2">Publisher: {book.publisherName}</p>
                                      <p className="mb-2">Total Copies: {book.totalCopies}</p>
                                      <p className="mb-2">Price: ${book.price}</p>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={() => handleViewMore(book)}
                                      >
                                      View More
                                      </button>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => handleBuyBook(book)}
                                      disabled={book.totalCopies === 0}
                                      >
                                      Buy
                                      </button>
                                      </div>
                                      ))}
                                      </div>
                                      </div>
                                      ) : (
                                      <>
                                      {searchTerm ? (
                                      <div className="mb-8">
                                      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                      {filteredBooks.length > 0 ? (
                                      filteredBooks.map((book) => (
                                      <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
                                      <img src={book.imgUrl} alt={book.bookName} className="w-full object-cover mb-4" />
                                      <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-lg font-bold">{book.bookName}</h3>
                                      <button
                                      className={`py-2 px-4 rounded ${wishlist.includes(book) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                                      onClick={() => toggleWishlist(book)}
                                      >
                                      <FontAwesomeIcon icon={wishlist.includes(book) ? solidHeart : regularHeart} />
                                      </button>
                                      </div>
                                      <p className="mb-2">Author: {book.author}</p>
                                      <p className="mb-2">Publisher: {book.publisherName}</p>
                                      <p className="mb-2">Total Copies: {book.totalCopies}</p>
                                      <p className="mb-2">Price: ${book.price}</p>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={() => handleViewMore(book)}
                                      >
                                      View More
                                      </button>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => handleBuyBook(book)}
                                      disabled={book.totalCopies === 0}
                                      >
                                      Buy
                                      </button>
                                      </div>
                                      ))
                                      ) : (
                                      <p>No books found matching your search criteria.</p>
                                      )}
                                      </div>
                                      </div>
                                      ) : (
                                      <>
                                      {publishers.map((publisher) => (
                                      <div key={publisher.publisherName} className="mb-8">
                                      <h2 className="text-2xl font-bold mb-4">Publisher: {publisher.publisherName}</h2>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                      {publisher.authors.flatMap((author) =>
                                      author.books.map((book) =>
                                      book && (
                                      <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
                                      <img src={book.imgUrl} alt={book.bookName} className="w-full object-cover mb-4" />
                                      <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-lg font-bold">{book.bookName}</h3>
                                      <button
                                      className={`py-2 px-4 rounded ${wishlist.includes(book) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                                      onClick={() => toggleWishlist(book)}
                                      >
                                      <FontAwesomeIcon icon={wishlist.includes(book) ? solidHeart : regularHeart} />
                                      </button>
                                      </div>
                                      <p className="mb-2">Author: {author.authorName}</p>
                                      <p className="mb-2">Publisher: {publisher.publisherName}</p>
                                      <p className="mb-2">Total Copies: {book.totalCopies}</p>
                                      <p className="mb-2">Price: ${book.price}</p>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={() => handleViewMore(book)}
                                      >
                                      View More
                                      </button>
                                      <button
                                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => handleBuyBook(book)}
                                      disabled={book.totalCopies === 0}
                                      >
                                      Buy
                                      </button>
                                      </div>
                                      )
                                      )
                                      )}
                                      </div>
                                      </div>
                                      ))}
                                      </>
                                      )}
                                      </>
                                      )}
                                      </div>
                                      </main>
                                      {selectedBook && (
                                      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                                      <div className="bg-white rounded p-8 w-full max-w-lg flex">
                                      <div className="flex-shrink-0 mr-4">
                                      <img src={selectedBook?.imgUrl} alt={selectedBook?.bookName} className="object-contain h-60" />
                                      </div>
                                      <div>
                                      <h2 className="text-xl font-bold">{selectedBook?.bookName}</h2>
                                      <p><strong>Author:</strong> {selectedBook?.author}</p>
                                      <p><strong>Description:</strong> {selectedBook?.description}</p>
                                      <p><strong>Publisher Date:</strong> {new Date(selectedBook?.publisherDate).toLocaleDateString()}</p>
                                      <p><strong>Total Copies:</strong> {selectedBook?.totalCopies}</p>
                                      <button
                                                   onClick={closeModal}
                                                   className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                                 >
                                      Close
                                      </button>
                                      <button
                                      onClick={() => handleBuyBook(selectedBook)}
                                      className="mt-4 bg-orangered text-white font-bold py-2 px-4 rounded ml-4"
                                      >
                                      Buy
                                      </button>
                                      </div>
                                      </div>
                                      </div>
                                      )}
                                      {showPurchaseModal && (
                                          <PurchaseModal message={purchaseMessage} onClose={closeModal} />
                                        )}
                                      </div>
                                      );
                                      };
                                      export default UserDashboard;
                                      
