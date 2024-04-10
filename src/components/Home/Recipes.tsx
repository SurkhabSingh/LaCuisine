import parser from "html-react-parser";

import { useNavigate } from "react-router-dom";

export type RecipeProps = {
  id: number;
  title: string;
  image: string;
  summary: string;
};
export default function Recipes({ title, id, image, summary }: RecipeProps) {
  const navigate = useNavigate();
  const parsedSummary = typeof summary === "string" ? parser(summary) : null;
  return (
    <div
      key={id}
      onClick={() => navigate(`/recipe/${id}`)}
      className={`cursor-pointer `}
    >
      <img
        src={image}
        alt="No image available"
        className=" w-full rounded-t-md object-cover"
      />
      <div className="p-5 font-inter">
        <p className="  text-sm text-left font-extrabold font-poppins text-[#23262f]">
          {title}
        </p>
        <p className="mt-3 text-xs line-clamp-4 text-left font-semibold text-[#23262f] ">
          {parsedSummary}
        </p>
      </div>
    </div>
  );
}
