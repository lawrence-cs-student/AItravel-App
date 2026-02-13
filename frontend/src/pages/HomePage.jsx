
import ThreeDCarousel from "../components/Carousel";
import SearchForm from "../components/SearchForm";



// const images = [
//   "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//   "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//   "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  
//   "https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//   "https://images.unsplash.com/photo-1553323855-cc1abf1930d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//   "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//   "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// ];



export default function HomePage() {

    
    return (
        <div className="h-screen w-screen lg:grid lg:grid-cols-[1.5fr_1fr]">
            <div className="w-full h-full bg-[#EBECF1] flex justify-center items-center">
              <SearchForm />
            </div>

            <div className="hidden lg:block background">

            </div>
            
            
            {/* <div className="h-auto hidden lg:flex bg-black w-1/4">
              <ThreeDCarousel images={images}/>
            </div> */}
        </div>
    )
}