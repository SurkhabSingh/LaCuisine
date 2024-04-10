import { Button } from "@/components/ui/button";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Recipes from "./Recipes";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search by ingredient or name....."
        />
        <Button type="submit">Search</Button>
      </form>
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
  );
}

interface SearchedProps {
  searchTerm: string;
}

export const Searched = ({ searchTerm }: SearchedProps) => {
  const [searchedRecipes, setSearchedRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!searchTerm) return;

      try {
        const resp = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?number=12&apiKey=${
            import.meta.env.VITE_API_KEY
          }&query=${searchTerm}`
        );
        // console.log(import.meta.env.VITE_API_KEY);
        const data = await resp.json();
        toast.success("Search Successful!");
        setSearchedRecipes(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong!", { theme: "colored" });
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full pr-24 content-evenly -ml-10 items-center justify-center">
      <div className="grid ml-20 mt-10 md:grid-cols-4 sm:grid-cols-2 sm:grid-rows-3 gap-5 content-evenly">
        {searchedRecipes?.map((element) => (
          <Recipes
            key={element.id}
            id={element.id}
            image={element?.image}
            title={element.title}
            summary={element.summary}
          />
        ))}
      </div>
    </div>
  );
};
