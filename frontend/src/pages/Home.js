import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Book, Zap, TrendingUp, Search, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardUi from "../components/ui/CardUi";
import { bookData, genres } from "../content-data/book-data";

function Home() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [majorReleaseBook, setMajorReleaseBook] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Function to handle image error
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/placeholder-book.jpg'; // Fallback image
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Find major release book
    const majorBook = bookData.find(book => book.majorRelease);
    setMajorReleaseBook(majorBook);

    // Simulate API call
    const timer = setTimeout(() => {
      setRecommendations(bookData);
      setFilteredBooks(bookData);
      setIsLoading(false);
    }, 1000);

    // Cleanup function to cancel timeout if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  // Search and filter function
  useEffect(() => {
    let result = recommendations;

    // Genre filter
    if (selectedGenre) {
      result = result.filter(book => book.genre === selectedGenre);
    }

    // Search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTermLower) ||
        book.author.toLowerCase().includes(searchTermLower) ||
        book.genre.toLowerCase().includes(searchTermLower) ||
        book.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTermLower)
        )
      );
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, recommendations]);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8 pt-24">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full">
  <input 
    type="text" 
    placeholder="Search books by title, author, genre..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 bg-white shadow-md transition-all duration-300 ease-in-out"
  />
  <Search 
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-500 glow-effect" 
    size={20} 
  />
</div>

          {/* Genre Filter */}
          <div className="relative w-full md:w-64">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
          </div>
        </div>

        {/* Major Release Hero Section */}
        {majorReleaseBook && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg mb-12 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-4">Major Release</h2>
                <h3 className="text-4xl font-extrabold mb-4">{majorReleaseBook.title}</h3>
                <p className="text-xl mb-6">{majorReleaseBook.description}</p>
                <div className="flex items-center space-x-4">
                  <Link 
                    to={`/read/${majorReleaseBook.id}`}
                    className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition"
                  >
                    View Now
                  </Link>
                  <span className="text-sm">By {majorReleaseBook.author}</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-96 relative">
                <img 
                  src={majorReleaseBook.thumbnail || '/placeholder-book.jpg'} 
                  alt={majorReleaseBook.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
        )}

        {/* Book Display Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Zap className="mr-2 text-amber-500" />
            <h3 className="text-2xl font-semibold text-amber-900">
              {filteredBooks.length} Book{filteredBooks.length !== 1 ? 's' : ''} Found
            </h3>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-amber-300 mb-4 rounded"></div>
                  <div className="h-4 bg-amber-300 mb-2 rounded w-3/4"></div>
                  <div className="h-4 bg-amber-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <CardUi key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-amber-800">No books found matching your search.</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center mb-6">
            <TrendingUp className="mr-2 text-amber-500" />
            <h3 className="text-2xl font-semibold text-amber-900">Best Selling Authors</h3>
          </div>
          <p className="text-amber-800">Coming soon! We're curating the hottest reads for you.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;