import { useNavigate } from "react-router-dom";
import img from "../assets/flipkart logo.png"
import search from "../assets/search.png"

const Header = ({cartItemCount}) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  }

  const goToLogin = () => {
    navigate("/login");
  };
  const Gotocart=()=>{
    navigate("/cart")
  }

  return (
    <>
      <div className="flex bg-blue-500 items-center justify-center gap-15">
        <div className="flex flex-col">
          <img src={img} alt="flipkart logo" className="w-20 cursor-pointer" onClick={goToHome}/>
          <a href="" className="font-semibold">Explore <span className="text-orange-400 font-semibold">Plus</span></a>
        </div>
        <div className="m-6 flex" >
          <input type="text"
              placeholder="Search for Products,Brands and more" 
              className="bg-white w-100 p-2 border-white-2 focus-visible:outline-none focus:ring-0 cursor-pointer rounded-bl-sm rounded-tl-sm"
          />
          <img src={search} alt="search" className="w-10 p-2 bg-white cursor-pointer rounded-tr-sm rounded-br-sm"/>
        </div>
        <div>
          <button className="bg-white py-1 px-10 font-semibold text-blue-500 cursor-pointer rounded-sm" onClick={goToLogin}>Login</button>
        </div>
        <div className="flex text-white font-semibold pl-10 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8" onClick={()=> Gotocart()}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <button className="cursor-pointer text-xl font-bold" onClick={()=> Gotocart()}>Cart
          <sup className="p-0.5 text-white-500 rounded-2xl text-lg">{cartItemCount}</sup>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
