import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookData } from '../content-data/book-data';
import Navbar from '../components/Navbar';
import PDFSidebar from './PDFSidebar';
import BookViewAds from '../ad-sources/BookViewAds';

function PDFReader() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Find the book by ID
    const foundBook = bookData.find(b => b.id === parseInt(bookId));
    setBook(foundBook);
  }, [bookId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Add a button to toggle sidebar */}
      <button 
        onClick={toggleSidebar}
        className="fixed right-4 top-20 z-40 bg-blue-500 text-white p-2 rounded"
      >
        {isSidebarOpen ? 'Close Tools' : 'Open PDF Tools'}
      </button>

      {/* Conditionally render sidebar */}
      {isSidebarOpen && (
        <PDFSidebar 
          bookId={bookId} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Add the new ads component */}
      <BookViewAds />

      <main className="flex-grow">
        <div className="h-full w-full">
          <iframe
            src={book.pdfLink}
            width="100%"
            height="100%"
            title={`${book.title} - PDF Reader`}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </main>
    </div>
  );
}

export default PDFReader;