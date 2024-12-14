import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookIcon, 
  PlayIcon, 
  HeadphonesIcon 
} from 'lucide-react';

function Landing() {
  const [activeSection, setActiveSection] = useState('explore');

  const sections = {
    explore: {
      icon: <BookIcon className="w-16 h-16 text-amber-600" />,
      title: "Explore Boundless Worlds",
      description: "More than a platform. A portal to infinite knowledge and imagination.",
      details: "Dive into a universe where books, films, and learning collide. From classic literature to cutting-edge documentaries, discover stories that transform, educate, and inspire."
    },
    learn: {
      icon: <BookIcon className="w-16 h-16 text-emerald-600" />,
      title: "Learn Without Limits",
      description: "Education meets entertainment in a revolutionary learning experience.",
      details: "Interactive courses, expert-curated content, and adaptive learning paths tailored to your curiosity. Turn every moment into a learning adventure."
    },
    create: {
      icon: <BookIcon className="w-16 h-16 text-indigo-600" />,
      title: "Create Your Legacy",
      description: "Empower your creativity. Share your stories. Impact the world.",
      details: "A platform where creators, writers, filmmakers, and educators can publish, monetize, and connect with a global audience. Your passion, our platform."
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BookIcon className="w-10 h-10 text-amber-700" />
          <h1 className="text-3xl font-bold text-amber-900">Ova</h1>
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

      <main className="container mx-auto px-6 flex-grow flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold text-amber-900 leading-tight">
              Unlock Worlds. Transform Minds.
            </h2>
            <p className="text-xl text-amber-800 opacity-80">
              Where storytelling, learning, and creativity converge into a single, breathtaking experience.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/explore" 
                className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition flex items-center space-x-2"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Start Your Journey</span>
              </Link>
              <button className="border-2 border-amber-600 text-amber-800 px-6 py-3 rounded-full hover:bg-amber-50 transition flex items-center space-x-2">
                <HeadphonesIcon className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(sections).map(([key, section]) => (
              <div 
                key={key}
                className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  activeSection === key ? 'ring-4 ring-amber-300' : ''
                }`}
                onClick={() => setActiveSection(key)}
              >
                <div className="flex flex-col items-center text-center">
                  {section.icon}
                  <h3 className="text-lg font-bold mt-4 mb-2 text-amber-900">{section.title}</h3>
                  <p className="text-amber-700 text-sm">{section.description}</p>
                  {activeSection === key && (
                    <p className="text-xs text-amber-600 mt-3 opacity-80">
                      {section.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;