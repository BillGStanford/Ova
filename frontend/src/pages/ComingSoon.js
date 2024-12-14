import React from 'react';
import { bookData } from '../content-data/book-data';
import CardUi from '../components/ui/CardUi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ComingSoon() {
  const comingSoonBooks = bookData.filter(book => book.status === 'coming-soon');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get ready for these exciting upcoming releases!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {comingSoonBooks.map(book => (
            <CardUi key={book.id} book={book} />
          ))}
        </div>

        {comingSoonBooks.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No upcoming books at the moment. Check back later!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ComingSoon;