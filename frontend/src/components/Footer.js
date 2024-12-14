import React from 'react';
import { 
  Twitter,
  Facebook,
  Instagram,
  BookIcon
} from 'lucide-react';

function Footer() {
  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://x.com/OvaSupport',
      color: 'text-amber-400 hover:text-amber-500'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/Ova_books',
      color: 'text-amber-600 hover:text-amber-700'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/Ova_books',
      color: 'text-amber-500 hover:text-amber-600'
    }
  ];

  return (
    <footer className="bg-amber-50 py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <BookIcon className="w-8 h-8 text-amber-700" />
            <span className="text-2xl font-bold text-amber-900">Ova</span>
          </div>
          <p className="text-sm text-amber-800">
            © 2024 Ova. All rights reserved. 
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Made with ❤️ for book lovers
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Email us at: <a 
              href="mailto:official.ova.team@gmail.com" 
              className="hover:text-amber-900 transition"
            >
              official.ova.team@gmail.com
            </a>
          </p>
        </div>

        <div className="text-center text-amber-900">
          <h3 className="font-semibold mb-2 text-lg">Empowering Readers</h3>
          <p className="text-sm text-amber-800">
            Discover, learn, and grow through the power of reading. 
            Ova connects you with stories that inspire and transform.
          </p>
        </div>

        <div className="flex justify-center md:justify-end space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition duration-200 ${social.color}`}
              aria-label={`Ova on ${social.name}`}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;