import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getcartItems");
        const data = response?.data?.data || [];
        setItems(data);
        calculateTotal(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, []);

  const calculateTotal = (data) => {
    const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const updateQuantity = (index, change) => {
    const updatedItems = [...items];
    const newQuantity = updatedItems[index].quantity + change;

    if (newQuantity >= 1 && newQuantity <= 10) {
      updatedItems[index].quantity = newQuantity;
      setItems(updatedItems);
      calculateTotal(updatedItems);
    }
  };

  const removeItem = async (index) => {
    const itemToRemove = items[index];
    try {
      const response = await axios.delete(
        `http://localhost:3000/removeItems/${itemToRemove._id}`
      );
      if (response.status === 200) {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        calculateTotal(updatedItems);
      } else {
        console.error("Failed to remove item. Response:", response);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <>
      <Header cartItemCount={items.length>0} />
      <div className="flex flex-col md:flex-row p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
        <div className="md:w-2/3 w-full p-6">
          {items.length>0 && (<h1 className="text-4xl font-bold mb-6 text-gray-800 hover:text-blue-600">Your Cart</h1>)}
          <ul className="space-y-8 mt-2">
            {items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="bg-white shadow-lg rounded-lg flex items-center p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="w-1/4">
                    <img
                      src={item.image}
                      alt={item.title || "Item image"}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </div>
                  <div className="w-2/4 pl-6">
                    <p className="text-2xl font-semibold text-gray-800">{item.title}</p>
                    <div className="mt-4 text-lg flex items-center">
                      <span className="mr-4">Quantity:</span>
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg text-gray-600 mt-2">
                      Price: <span className="font-medium">&#8377;{item.price}</span>
                    </p>
                    <p className="text-lg text-gray-800 mt-2">
                      Subtotal: <span className="font-bold">&#8377;{item.price * item.quantity}</span>
                    </p>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-red-600 text-2xl font-smallbold bg-gray-300 w-2/4 h-full p-10 border-1 border-black rounded-lg">Your Cart is Empty.</p>
            )}
          </ul>
        </div>

        {items.length > 0 && (
          <div className="md:w-1/3 w-full mt-20 md:mt-0 p-6 bg-white shadow-xl rounded-lg transform transition-transform duration-100 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="text-lg text-gray-700 space-y-4">
              <p className="flex justify-between">
                <span>Total Quantity:</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </p>
              <p className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">&#8377;{totalAmount.toFixed(2)}</span>
              </p>
            </div>
            <button className="w-full mt-8 bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
