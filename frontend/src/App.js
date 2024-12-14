import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import BookDetails from "./pages/BookDetails";
import PDFReader from "./pages/PDFReader";
import ExplorePage from "./pages/ExplorePage";  // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />  {/* Add this route */}
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/read/:bookId" element={<PDFReader />} />
      </Routes>
    </Router>
  );
}

export default App;