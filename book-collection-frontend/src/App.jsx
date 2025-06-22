import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API);
      setBooks(res.data);
    } catch (error) {
      setError("fail to fetch books");
    }
  };

  const handleAdd = async () => {
    if (!form.title.trim()) return setError("Title is required");
    setLoading(true);

    try {
      const res = await axios.post(API, form);
      setBooks((prev) => [...prev, res.data]);
      setForm({ title: "", author: "" });
    } catch (error) {
      setError("Failed to add book");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Book List
        </h1>

        {error && (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {books.map((book, index) => (
            <li key={index} className="py-2">
              <span className="font-semibold text-gray-800">{book.title}</span>{" "}
              <span className="text-gray-500">by {book.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
