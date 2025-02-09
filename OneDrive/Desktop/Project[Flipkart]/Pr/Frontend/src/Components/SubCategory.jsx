import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";

const SubCategory = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [itemDetails, setItemDetails] = useState(item || null);
  const [count,setCount]=useState(1);


  useEffect(() => {
    if (!itemDetails && item?.id) {
      axios.get(`http://localhost:3000/getItems/${item.id}`)
        .then((response) => {
          console.log("Item Details:", response.data);
          setItemDetails(response.data?.data || response.data);
        })
        .catch((err) => {
          console.error("Error fetching item details:", err);
        });
    }
  }, [item, itemDetails]);
  const Increment=()=>{
    if(count<10)
      setCount(count+1)
  }
  const Decrement=()=>{
    if(count>1)
      setCount(count-1)
  }
  const Addtocart=async ()=>{
      // const token = localStorage.getItem("token"); 
    
      // if (!token) {
      //   alert("Please log in to add items to the cart.");
      //   return;
      // }
    
      // if (count === 0) return; 
    
      const cartItem = {
        title: item.title,
        price: item.price,
        quantity: count, 
        image: item.image,
      };
    
      try {
        const response = await fetch("http://localhost:3000/cartItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization":  `${token}`
          },
          body: JSON.stringify(cartItem),
        });
    
        const data = await response.json();
        console.log("Response from server:", data);
    
        if (data.message.includes("successfully")) {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };
  if (!itemDetails) {
    return <p className="text-center text-gray-600 text-lg mt-20">Loading item details...</p>;
  }

  const { title, image, category, price, rating, description } = itemDetails;

  return (
    <>
      <Header />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">{title || "Item Details"}</h1>
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={title || "Item image"}
              className="w-full h-96 object-contain p-4"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <p className="text-2xl font-semibold text-gray-800 mb-6">Category: <span className="text-blue-600 capitalize">{category}</span></p>
            <p className="text-xl text-gray-700 mb-4">Price: <span className="font-bold">&#8377;{price || "N/A"}</span></p>
            <p className="text-xl text-gray-700 mb-4">
              Rating: 
              <span className="text-red-400 font-bold ml-2">
                {rating && typeof rating === "object" ? `${rating.rate} ⭐ (${rating.count} reviews)` : "N/A"}
              </span>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">Description: {description || "No description available."}</p>
            <div className="flex items-center gap-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 bg-sky-300 w-fit rounded-lg" onClick={()=> Decrement()}>
            <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl font-bold">{count}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 bg-sky-300 w-fit rounded-lg" onClick={()=> Increment()}>
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>

            </div>
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300" onClick={()=> Addtocart()}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategory;
