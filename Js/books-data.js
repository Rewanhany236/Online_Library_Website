const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    description: "Clean Code by Robert C. Martin is an essential guide for software developers " +
                  "focusing on the principles and practices of writing clean, maintainable, and efficient code.",
    imageUrl: "images/clean-code.jpg",
    authorWikipedia: "https://en.wikipedia.org/wiki/Robert_C._Martin"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    description: "Atomic Habits by James Clear is a comprehensive guide on how to change your habits and achieve personal growth. " +
                  "The book introduces the Four Laws of Behavior Change: Make It Obvious, Make It Attractive, Make It Easy, and Make It Satisfying. " +
                  "It provides a simple framework of four steps—cue, craving, response, reward—to build good habits and break bad ones.",
    imageUrl: "images/atomic-habits.jpeg",
    authorWikipedia: "https://en.wikipedia.org/wiki/James_Clear"
  },
  {
    id: 3,
    title: "Algorithm Design",
    author: "Tomas H. Cormen",
    category: "Computer Science",
    description: "Algorithm Design by Tomas H. Cormen is a comprehensive textbook covering the principles and techniques of algorithm design. " +
                  "It explores topics such as divide and conquer, dynamic programming, greedy algorithms, and graph algorithms, " +
                  "providing both theoretical foundations and practical applications.",
    imageUrl: "images/algorithm-design.jpeg",
    authorWikipedia: "https://en.wikipedia.org/wiki/Thomas_H._Cormen"
  },
  {
    id: 4,
    title: "Matilda",
    author: "Roald Dahl",
    category: "Children's Literature",
    description: "Matilda by Roald Dahl is a classic children's novel about a young girl with extraordinary intelligence and telekinetic powers. " +
                  "It tells the story of Matilda Wormwood, who overcomes neglectful parents and a tyrannical headmistress, Miss Trunchbull, " +
                  "through her wit, courage, and a little bit of magic.",
    imageUrl: "images/matilda.jpeg",
    authorWikipedia: "https://en.wikipedia.org/wiki/Roald_Dahl"
  }
];

if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(books));
}