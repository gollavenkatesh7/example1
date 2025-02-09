import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";

const Category = () => {
  const location = useLocation();
  const category = location.state?.category || "Unknown"; 
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/getItems")
      .then((response) => {
        const products = response?.data?.data || [];
        const filtered = products.filter((item) => item.category === category);
        setFilteredItems(filtered);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, [category]);

  const handleImageClick = (item) => {
    navigate('/subcategory', { state: { item } });  
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-10">
        <h1 className="text-3xl text-center font-bold mb-8 text-gray-800 capitalize">
          {category} Items
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li 
                key={index} 
                className="bg-white rounded-lg border shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title || "Item image"} 
                  className="w-full h-64 object-contain bg-gray-100"
                />
                <div className="p-4">
                  <p className="text-lg font-medium text-gray-800">{item.title}</p>
                  <p className="text-lg font-medium text-gray-800">Price: {item.price}</p>
                  <p className="text-lg font-medium text-gray-800">Rating: {item.rating?.rate || "N/A"} ⭐</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No items found for this category.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Category;
