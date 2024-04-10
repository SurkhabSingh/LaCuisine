import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Recipes from "./Recipes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Category() {
  const [cuisine, setCuisine] = React.useState<string>("");
  const [recipes, setRecipes] = React.useState<any[]>([]);

  const handleCuisineChange = (newCuisine: string) => {
    setCuisine(newCuisine);
    fetchRecipes(newCuisine);
  };

  const fetchRecipes = async (selectedCuisine: string) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=72b7dfd3bf284f27b1965ac6f11fbd8c&cuisine=${selectedCuisine}`
      );
      const data = await response.json();
      setRecipes(data.results);
      toast.success("Category Search Successful!");
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Category</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={cuisine}
          onValueChange={handleCuisineChange}
        >
          <DropdownMenuRadioItem value="Indian">Indian</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Chinese">Chinese</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Italian">Italian</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="American">
            American
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      <div className="bg-[white] flex flex-col w-full  content-evenly items-center justify-between ">
        <div className="bg-[white] grid p-10 mt-10 md:grid-cols-5 sm:grid-cols-2 gap-10 content-evenly">
          {recipes?.map(
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
                  summary=""
                />
              </div>
            )
          )}
        </div>
      </div>
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
    </DropdownMenu>
  );
}
