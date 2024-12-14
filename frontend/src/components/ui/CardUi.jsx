import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const CardUi = ({ book }) => {
  const renderActionButton = () => {
    switch(book.status) {
      case 'available':
        return (
          <div className="flex space-x-2">
            <Link 
              to={`/book/${book.id}`}
              className="flex-1 flex items-center justify-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
            >
              <Eye className="mr-2" size={20} />
              Details
            </Link>
            <Link 
              to={`/read/${book.id}`}
              className="flex-1 flex items-center justify-center bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
            >
              <EyeOff className="mr-2" size={20} />
              Read
            </Link>
          </div>
        );
      case 'coming-soon':
        return (
          <Link 
            to="/coming-soon"
            className="flex items-center justify-center bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition cursor-not-allowed"
          >
            Coming Soon
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 relative">
      {book.isNew && (
        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
          New
        </span>
      )}
      <Link to={`/book/${book.id}`}>
        <img 
          src={book.thumbnail} 
          alt={book.title} 
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/book/${book.id}`}>
          <h4 className="text-xl font-bold mb-2 text-amber-900">{book.title}</h4>
          <p className="text-amber-800 mb-2">{book.author}</p>
        </Link>
        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mb-2 inline-block">
          {book.genre}
        </span>
        <p className="mt-2 text-amber-700 mb-4">{book.description}</p>
        {renderActionButton()}
      </div>
    </div>
  );
};

export default CardUi;