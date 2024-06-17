
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [editedBook, setEditedBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('API Response:', response.data); // Log API response
        setPublishers(response.data);
      } catch (error) {
        setError('Error fetching books');
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditedBook({ ...book });
    setIsEditModalOpen(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/books/${selectedBook._id}`, editedBook);
      const updatedPublishers = publishers.map((publisher) => {
        const updatedAuthors = publisher.authors?.map((author) => {
          const updatedBooks = author.books?.map((book) => {
            if (book._id === selectedBook._id) {
              return response.data.book;
            }
            return book;
          });
          return { ...author, books: updatedBooks };
        });
        return { ...publisher, authors: updatedAuthors };
      });
      setPublishers(updatedPublishers);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/books/${selectedBook._id}`);
      const updatedPublishers = publishers.map((publisher) => {
        const updatedAuthors = publisher.authors?.map((author) => {
          const updatedBooks = author.books?.filter((book) => book._id !== selectedBook._id);
          return { ...author, books: updatedBooks };
        });
        return { ...publisher, authors: updatedAuthors };
      });
      setPublishers(updatedPublishers);
      setIsDeleteModalOpen(false);
      setSelectedBook(null); // Clear selected book after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Error deleting book. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-500 py-4 px-6 flex justify-between items-center">
        <h1 className="text-white font-bold">Book Details</h1>
      </header>
      <main className="flex-grow p-6">
        {error && <p className="text-red-500">{error}</p>}
        {publishers.length > 0 ? (
          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="border py-2 px-4">Publisher</th>
                  <th className="border py-2 px-4">Author</th>
                  <th className="border py-2 px-4">Book Name</th>
                  <th className="border py-2 px-4">Published Date</th>
                  <th className="border py-2 px-4">Price</th>
                  <th className="border py-2 px-4">Total available Copies</th>
                  <th className="border py-2 px-4">Purchased Copies</th>
                  <th className="border py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((publisher, publisherIndex) => (
                  <React.Fragment key={publisherIndex}>
                    {publisher.authors?.map((author, authorIndex) =>
                      author.books?.map((book, bookIndex) => (
                        <tr key={`${publisherIndex}-${authorIndex}-${bookIndex}`}>
                          {bookIndex === 0 && authorIndex === 0 && (
                            <td
                              className="border py-2 px-4"
                              rowSpan={publisher.authors?.reduce(
                                (total, author) => total + author.books.length,
                                0
                              )}
                            >
                              {publisher.publisherName}
                            </td>
                          )}
                          {bookIndex === 0 && (
                            <td
                              className="border py-2 px-4"
                              rowSpan={author.books?.length || 0}
                            >
                              {author.authorName}
                            </td>
                          )}
                          <td className="border py-2 px-4">{book.bookName}</td>
                          <td className="border py-2 px-4">
                            {new Date(book.publisherDate).toLocaleDateString()}
                          </td>
                          <td className="border py-2 px-4">{book.price}</td>
                          <td className="border py-2 px-4">{book.totalCopies}</td>
                          <td className="border py-2 px-4">
                            {book.purchasedCopies || 0}
                          </td>
                          <td className="border py-2 px-4">
                            <button
                              onClick={() => handleEdit(book)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(book)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-700">No books available.</p>
        )}
      </main>

      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-full max-w-md p-8 rounded shadow-lg">
              <div className="absolute top-0 right-0 cursor-pointer p-4" onClick={() => setIsDeleteModalOpen(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this book?</p>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-full max-w-md p-8 rounded shadow-lg">
              <div className="absolute top-0 right-0 cursor-pointer p-4" onClick={() => setIsEditModalOpen(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Edit Book Details</h2>
              <div className="mb-4">
                <label htmlFor="bookName" className="block font-bold mb-2">
                  Book Name
                </label>
                <input
                  type="text"
                  id="bookName"
                  value={editedBook.bookName}
                  onChange={(e) => setEditedBook({ ...editedBook, bookName: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imgUrl" className="block font-bold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imgUrl"
                  value={editedBook.imgUrl}
                  onChange={(e) => setEditedBook({ ...editedBook, imgUrl: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={editedBook.description}
                  onChange={(e) => setEditedBook({ ...editedBook, description: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="publisherDate" className="block font-bold mb-2">
                  Published Date
                </label>
                <input
                  type="date"
                  id="publisherDate"
                  value={editedBook.publisherDate.slice(0, 10)}
                  onChange={(e) => setEditedBook({ ...editedBook, publisherDate: new Date(e.target.value) })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="totalCopies" className="block font-bold mb-2">
                  Total Copies
                </label>
                <input
                  type="number"
                  id="totalCopies"
                  value={editedBook.totalCopies}
                  onChange={(e) => setEditedBook({ ...editedBook, totalCopies: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={editedBook.price}
                  onChange={(e) => setEditedBook({ ...editedBook, price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;















