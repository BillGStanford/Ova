import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, BookOpen, Clock, Globe } from 'lucide-react';
import { bookData } from '../content-data/book-data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Find the book by ID
    const foundBook = bookData.find(b => b.id === parseInt(bookId));
    setBook(foundBook);
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Book Cover and Actions */}
          <div className="md:col-span-1">
            <img 
              src={book.coverImage || book.thumbnail} 
              alt={book.title} 
              className="w-full rounded-lg shadow-lg mb-6"
            />
            <div className="space-y-4">
              {book.status === 'available' ? (
                <Link
                  to={`/read/${book.id}`}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <BookOpen className="mr-2" /> Read Book
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-3 rounded-lg text-center font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>

          {/* Book Information */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">By {book.author}</p>

            {/* Ratings */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-500 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < Math.round(book.ratings.averageRating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {book.ratings.averageRating} ({book.ratings.totalReviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">About the Book</h2>
              <p className="text-gray-700 leading-relaxed">{book.longDescription}</p>
            </div>

            {/* Book Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <Clock className="mr-2 text-blue-500" />
                  <h3 className="font-semibold">Book Details</h3>
                </div>
                <ul className="space-y-1 text-gray-600">
                  <li>Pages: {book.details.pages}</li>
                  <li>Published: {book.details.publishedYear}</li>
                  <li>Publisher: {book.details.publisher}</li>
                  <li>ISBN: {book.details.isbn}</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <Globe className="mr-2 text-green-500" />
                  <h3 className="font-semibold">Language</h3>
                </div>
                <p className="text-gray-600">{book.details.language}</p>
              </div>
            </div>

            {/* Genre and Keywords */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Genre & Keywords</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {book.genre}
                </span>
                {book.keywords.map((keyword) => (
                  <span 
                    key={keyword} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BookDetails;