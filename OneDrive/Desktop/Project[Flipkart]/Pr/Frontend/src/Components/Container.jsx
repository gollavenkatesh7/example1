import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getItems")
      .then((response) => {
        const products = response?.data?.data || [];
        setItems(products);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load items. Please try again.");
        setLoading(false);
        console.error("Error fetching items:", err);
      });
  }, []);

  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.category, item])).values()
  );

  const handleImageClick = (category) => {
    navigate("/category", { state: { category } });
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        Categories
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : uniqueItems.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueItems.map((item, index) => (
            <li
              key={index}
              className="bg-white rounded-lg border shadow-lg hover:shadow-2xl hover:border-green-400 transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(item.category)}
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name || "Item image"}
                className="w-full h-64 object-contain bg-gray-100"
              />
              <div className="p-4">
                <p className="text-xl font-semibold text-gray-800 mt-1 capitalize">
                  {item.category}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No items found.</p>
      )}
    </div>
  );
};

export default Container;
