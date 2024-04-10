import Recipes from "./Recipes";
// import { dummyRecipes } from "@/utils/dummyData/dummyRecipes";
import { PaginationSection } from "./PaginationSection";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecipeGrid() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchInfo();
    console.log("use effect called");
  }, []);

  const fetchInfo = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/random?number=100&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await data.json();
      setInfo(json.recipes);
      console.log(json.recipes);
      toast.success("Data Loaded Successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong!");
    }
  };

  const recipes = info;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const slicedData = recipes?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-[white] flex flex-col w-full">
      <div className="bg-[white] grid p-10  md:grid-cols-5 sm:grid-cols-2 gap-10 content-evenly">
        {slicedData?.map(
          (element: {
            id: number;
            image: string;
            title: string;
            summary: string;
          }) => (
            <div className="bg-white drop-shadow-xl rounded-lg border-solid border-1 border-slate-400/[0.3]">
              <Recipes
                key={element.id}
                id={element.id}
                image={element?.image}
                title={element.title}
                summary={element.summary}
              />
            </div>
          )
        )}
      </div>

      <div className=" mb-2 w-full">
        <PaginationSection
          totalPosts={recipes.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
