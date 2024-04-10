import { SearchBar, Searched } from "@/components/Home/SearchBar";
import { NavbarComp } from "@/components/Home/Navbar";
import { useState } from "react";
import RecipeGrid from "@/components/Home/RecipeGrid";
import { Category } from "@/components/Home/Category";

export default function MarketPlace() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <section className="h-full">
      <div className="h-20 ">
        <NavbarComp />
      </div>

      <div className=" bg-[#F17228] absolute right-0 ">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
          <path
            fill="#f17228"
            fill-opacity="1"
            d="M0,96L30,122.7C60,149,120,203,180,213.3C240,224,300,192,360,181.3C420,171,480,181,540,202.7C600,224,660,256,720,234.7C780,213,840,139,900,117.3C960,96,1020,128,1080,128C1140,128,1200,96,1260,96C1320,96,1380,128,1410,144L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className=" text-[#23262f] bg-white text-[4rem] font-black  font-poppins  ">
        Recipes
      </div>
      <div className="bg-white  py-4 flex flex-col  sm:px-60 md:px-[10rem]">
        <div className=" text-[#23262f]  font-black  font-poppins   ">
          <Category />
          {searchTerm && <Searched searchTerm={searchTerm} />}
          {!searchTerm && <RecipeGrid />}
        </div>
      </div>
    </section>
  );
}
