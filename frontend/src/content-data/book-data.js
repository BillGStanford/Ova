export const bookData = [
    {
      id: 1,
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      genre: "Tragedy",
      keywords: ["love", "fate", "family", "conflict", "revenge"],
      description: "A tragedy about two young lovers whose deaths ultimately unite their feuding families.",
      longDescription: "In 'Romeo and Juliet', Shakespeare explores the themes of love, fate, and family loyalty. Set in Verona, the story follows the forbidden romance between Romeo Montague and Juliet Capulet, two members of rival families. Their love leads to tragic consequences as misunderstandings and external pressures force them into a desperate situation, ultimately leading to their untimely deaths.",
      thumbnail: "/book-images/romeo.jpg",
      coverImage: "/book-images/romeo.jpg",
      isNew: true,
      majorRelease: false,
      pdfLink: "/books/pg1513-images.pdf",
      status: "available",
      details: {
        pages: 160,
        publishedYear: 1597,
        publisher: "Various",
        isbn: "9780743477116",
        language: "English"
      },
      ratings: {
        averageRating: 4.6,
        totalReviews: 500000
      }
    },
  
    {
      id: 2,
      title: "The Shadows of Power | Part 1",
      author: "Natoli Lemessa",
      genre: "Non-Fiction",
      keywords: ["deep state", "global power", "financial manipulation", "war profiteering", "historical conspiracies", "cold war", "world war", "shadow networks", "money and power", "secret societies"],
      description: "Uncover the hidden forces shaping world history. From global wars to financial crashes, this chilling exploration reveals how powerful elites have manipulated money, war, and crime from the shadows to control wealth, create instability, and steer the course of nations.",
      longDescription: "Natoli Lemessa delves into the dark undercurrents of global history, examining how financial elites have manipulated world events for centuries. Through the lens of major wars, economic crises, and covert operations, this book unveils how powerful figures have orchestrated conflict, reaped the profits, and pulled the strings behind the scenes. From World War I to the Cold War and beyond, the book connects the dots between historical events, money, and power, exposing the untold story of how wealth and control have shaped the modern world. A gripping, chilling narrative that will change the way you view history and finance.",
      thumbnail: "/book-images/shawdosofpower.jpg",
      coverImage: "/book-images/powershadow.jpg",
      isNew: true,
      majorRelease: false,
      pdfLink: "/books/Shadows of Power _ Part 1.pdf",
      status: "available",
      details: {
        pages: 256,
        publishedYear: 2024,
        publisher: "Ova",
        isbn: "0",
        language: "English, Spanish, French, Arabic"
      },
      ratings: {
        averageRating: 4.6,
        totalReviews: 150000
      }
    },
  
    {
      id: 3,
      title: "The History of the Decline and Fall of the Roman Empire",
      author: "Edward Gibbon",
      genre: "History",
      keywords: ["decline", "Rome", "empire", "history", "politics"],
      description: "A detailed historical account of the decline and eventual fall of the Roman Empire.",
      longDescription: "In 'The History of the Decline and Fall of the Roman Empire', Edward Gibbon traces the history of the Roman Empire from the height of its power to its ultimate collapse. This monumental work examines the political, military, and cultural factors that contributed to the empire's decline, exploring themes such as corruption, military overstretch, and the impact of Christianity on the empire’s foundations.",
      thumbnail: "/book-images/romefall.jpg",
      coverImage: "/book-images/romefall.jpg",
      isNew: true,
      majorRelease: false,
      pdfLink: "/books/pg25717-images.pdf",
      status: "available",
      details: {
        pages: 1200,
        publishedYear: 1776,
        publisher: "Various",
        isbn: "9780140437645",
        language: "English"
      },
      ratings: {
        averageRating: 4.3,
        totalReviews: 35000
      }
    },
  
    {
      id: 4,
      title: "The Blue Castle",
      author: "L. M. Montgomery",
      genre: "Fiction",
      keywords: ["love", "self-discovery", "family", "courage", "independence"],
      description: "A novel about a woman’s journey of self-discovery and the pursuit of happiness in the face of adversity.",
      longDescription: "In 'The Blue Castle', L. M. Montgomery tells the story of Valancy Stirling, a 29-year-old woman trapped in a stifling life dictated by her controlling family. After receiving life-altering news, Valancy embarks on a journey to find freedom, independence, and love, all while defying societal expectations. This novel is a tale of personal growth, courage, and the transformative power of love.",
      thumbnail: "/book-images/bluecastle.jpg",
      coverImage: "/book-images/bluecastle.jpg",
      isNew: true,
      majorRelease: true,
      pdfLink: "/books/pg67979-images.pdf",
      status: "available",
      details: {
        pages: 320,
        publishedYear: 1926,
        publisher: "McClelland and Stewart",
        isbn: "9780770427026",
        language: "English"
      },
      ratings: {
        averageRating: 4.4,
        totalReviews: 22000
      }
      }
      
      

      

  ];
  
  // Get unique genres
  export const genres = [...new Set(bookData.map(book => book.genre))];