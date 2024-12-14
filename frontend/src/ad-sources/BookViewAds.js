import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const adData = [
  {
    id: 1,
    title: 'Unlock Your Coding Potential',
    description: 'Comprehensive Python Programming Masterclass',
    imageUrl: '/favicon.jpg',
    ctaText: 'Start Your Coding Journey',
    ctaLink: 'https://example.com/python-course',
    features: [
      'Live Instructor-Led Sessions',
      'Hands-on Project Experience',
      'Career Support Included',
      'Learn from Industry Experts'
    ],
    gradient: 'from-blue-500 to-blue-700',
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'Transform Your Writing Skills',
    description: 'Professional Writing Workshop - Zero to Published',
    imageUrl: '/api/placeholder/800/400',
    ctaText: 'Enroll Now & Write Better',
    ctaLink: 'https://example.com/writing-course',
    features: [
      'Bestselling Author Mentorship',
      'Publishing Industry Insights',
      'Personalized Writing Critique',
      'Multiple Genre Specializations'
    ],
    gradient: 'from-green-500 to-green-700',
    textColor: 'text-white'
  },
  {
    id: 3,
    title: 'Digital Marketing Accelerator',
    description: 'Become a Marketing Pro in 12 Weeks',
    imageUrl: '/api/placeholder/800/400',
    ctaText: 'Boost Your Marketing Career',
    ctaLink: 'https://example.com/marketing-course',
    features: [
      'Google & Facebook Ads Mastery',
      'Social Media Marketing Strategies',
      'SEO & Content Marketing',
      'Real-World Campaign Management'
    ],
    gradient: 'from-purple-500 to-purple-700',
    textColor: 'text-white'
  }
];

const BookViewAds = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => 
        (prevIndex + 1) % adData.length
      );
    }, 10000);

    return () => clearInterval(adInterval);
  }, []);

  const handleNextAd = () => {
    setCurrentAdIndex((prevIndex) => 
      (prevIndex + 1) % adData.length
    );
  };

  const handlePrevAd = () => {
    setCurrentAdIndex((prevIndex) => 
      (prevIndex - 1 + adData.length) % adData.length
    );
  };

  const currentAd = adData[currentAdIndex];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-96 z-40 shadow-2xl rounded-r-2xl overflow-hidden">
      {/* Ad Container */}
      <div 
        key={currentAd.id}
        className={`relative bg-gradient-to-r ${currentAd.gradient} text-white h-[500px] flex flex-col`}
      >
        {/* Navigation Buttons */}
        {adData.length > 1 && (
          <>
            <button 
              onClick={handlePrevAd} 
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition-colors z-10"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            <button 
              onClick={handleNextAd} 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition-colors z-10"
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </>
        )}

        {/* Image */}
        <a href={currentAd.ctaLink} target="_blank" rel="noopener noreferrer" className="block">
          <img 
            src={currentAd.imageUrl} 
            alt={currentAd.title} 
            className="w-full h-64 object-cover"
          />
        </a>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{currentAd.title}</h3>
            <p className="text-lg opacity-80 mb-4">{currentAd.description}</p>

            {/* Features List */}
            <ul className="space-y-2 mb-4">
              {currentAd.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg 
                    className="w-5 h-5 mr-2 text-white/80" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <a 
            href={currentAd.ctaLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button 
              className="w-full bg-white text-blue-700 font-bold py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              {currentAd.ctaText}
            </button>
          </a>
        </div>

        {/* Ad Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {adData.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentAdIndex 
                  ? 'bg-white' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookViewAds;