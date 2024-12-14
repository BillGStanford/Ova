import React from 'react';
import { Link } from 'react-router-dom';
import { BookIcon } from 'lucide-react';
import { bookData } from '../content-data/book-data';

function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link 
          to="/" 
          className="flex items-center space-x-3 group"
        >
          <BookIcon className="w-10 h-10 text-amber-700" />
          <span className="text-3xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors duration-300">
            Ova
          </span>
        </Link>
        </div>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="text-amber-800 hover:text-amber-600 font-semibold"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition"
          >
            Join Free
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-extrabold text-amber-900 mb-8">
          Explore Books
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bookData.map((book) => (
            <Link 
              key={book.id} 
              to={`/book/${book.id}`} 
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={book.thumbnail} 
                alt={book.title} 
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ExplorePage;