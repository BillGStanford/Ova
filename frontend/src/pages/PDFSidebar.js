import React, { useState, useRef, useEffect } from 'react';
import { X, Highlighter, StickyNote, Palette } from 'lucide-react';


const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: 'bg-yellow-200' },
  { name: 'Green', value: 'bg-green-200' },
  { name: 'Blue', value: 'bg-blue-200' },
  { name: 'Pink', value: 'bg-pink-200' },
  { name: 'Purple', value: 'bg-purple-200' }
];

const PDFSidebar = ({ bookId, onClose }) => {
  const [activeMode, setActiveMode] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_COLORS[0]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const textareaRef = useRef(null);
  const highlightNameRef = useRef(null);

  // Load highlights and notes from localStorage when component mounts
  useEffect(() => {
    const storedHighlights = JSON.parse(localStorage.getItem(`highlights_${bookId}`)) || [];
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${bookId}`)) || [];
    setHighlights(storedHighlights);
    setNotes(storedNotes);
  }, [bookId]);

  // Save highlights to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`highlights_${bookId}`, JSON.stringify(highlights));
  }, [highlights, bookId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`notes_${bookId}`, JSON.stringify(notes));
  }, [notes, bookId]);

  const handleHighlight = () => {
    setActiveMode(activeMode === 'highlight' ? null : 'highlight');
    setIsColorPickerOpen(false);
  };

  const handleAddNote = () => {
    setActiveMode(activeMode === 'note' ? null : 'note');
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const saveHighlight = () => {
    const text = document.getElementById('highlightInput').value;
    const highlightName = highlightNameRef.current?.value || `Highlight ${highlights.length + 1}`;

    if (text) {
      const newHighlight = { 
        text, 
        id: Date.now(),
        color: selectedColor.value,
        name: highlightName
      };

      setHighlights([...highlights, newHighlight]);
      
      // Reset inputs
      document.getElementById('highlightInput').value = '';
      if (highlightNameRef.current) {
        highlightNameRef.current.value = '';
      }
      
      setActiveMode(null);
    }
  };

  const saveNote = () => {
    const noteText = textareaRef.current?.value;
    if (noteText) {
      const newNote = { 
        text: noteText, 
        id: Date.now(),
        name: `Note ${notes.length + 1}`
      };

      setNotes([...notes, newNote]);
      textareaRef.current.value = '';
      setActiveMode(null);
    }
  };

  const removeHighlight = (id) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };

  const removeNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">PDF Tools</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button 
          onClick={handleHighlight}
          className={`flex items-center p-2 rounded ${
            activeMode === 'highlight' 
              ? 'bg-yellow-100 text-yellow-700' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Highlighter size={20} className="mr-2" />
          Highlight
        </button>
        <button 
          onClick={handleAddNote}
          className={`flex items-center p-2 rounded ${
            activeMode === 'note' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <StickyNote size={20} className="mr-2" />
          Add Note
        </button>
      </div>

      {activeMode === 'highlight' && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <input 
              id="highlightInput"
              type="text" 
              placeholder="Enter text to highlight" 
              className="w-full p-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveHighlight();
                }
              }}
            />
            <button 
              onClick={toggleColorPicker}
              className="p-2 bg-gray-100 rounded"
            >
              <Palette size={20} />
            </button>
          </div>

          {isColorPickerOpen && (
            <div className="flex space-x-2 mb-2">
              {HIGHLIGHT_COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded ${color.value} ${
                    selectedColor.name === color.name ? 'border-2 border-black' : ''
                  }`}
                  onClick={() => {
                    setSelectedColor(color);
                    setIsColorPickerOpen(false);
                  }}
                />
              ))}
            </div>
          )}

          <input 
            ref={highlightNameRef}
            type="text" 
            placeholder="Name this highlight (optional)" 
            className="w-full p-2 border rounded"
          />

          <button 
            onClick={saveHighlight}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Save Highlight
          </button>
        </div>
      )}

      {activeMode === 'note' && (
        <div className="mb-4">
          <textarea 
            ref={textareaRef}
            placeholder="Write your note here" 
            className="w-full p-2 border rounded h-32"
          ></textarea>
          <button 
            onClick={saveNote}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Save Note
          </button>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Highlights</h3>
          {highlights.map((highlight) => (
            <div 
              key={highlight.id} 
              className={`p-2 mb-2 rounded ${highlight.color} flex justify-between items-center`}
            >
              <div>
                <div className="font-semibold text-sm">{highlight.name}</div>
                <span>{highlight.text}</span>
              </div>
              <button 
                onClick={() => removeHighlight(highlight.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Notes</h3>
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="p-2 mb-2 border rounded bg-blue-50 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-sm">{note.name}</div>
                <span>{note.text}</span>
              </div>
              <button 
                onClick={() => removeNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFSidebar;