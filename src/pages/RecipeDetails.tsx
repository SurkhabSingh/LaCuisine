import { useEffect, useState } from "react";
import { NavbarComp } from "@/components/Home/Navbar";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Info, Wrapper, Button } from "@/components/Home/otherCss";

export type ExtendedIngredient = {
  id: number;
  original: string;
};

export type DetailType = {
  title: string;
  image: string;
  summary: string;
  instructions: string;
  extendedIngredients: ExtendedIngredient[];
};

export function GameDetailsPage() {
  const [details, setDetails] = useState<DetailType | null>(null);
  const [activeTab, setActiveTab] = useState("instructions");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchInfo();
    console.log("use effect called");
  }, []);

  const fetchInfo = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const json = await data.json();
      setDetails(json);
      console.log(json);
      // toast.success("API call successful");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!details) {
    return <div>{toast.success("Making the call to the API!")}</div>;
  }

  return (
    <section>
      <div className="  bg-white  mb-5 justify-center  ">
        <div className="h-20 justify-center">
          <NavbarComp />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
          <path
            fill="#f17228"
            fill-opacity="1"
            d="M0,96L30,122.7C60,149,120,203,180,213.3C240,224,300,192,360,181.3C420,171,480,181,540,202.7C600,224,660,256,720,234.7C780,213,840,139,900,117.3C960,96,1020,128,1080,128C1140,128,1200,96,1260,96C1320,96,1380,128,1410,144L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
        <div className="grid grid-col-2">
          <Wrapper className=" flex flex-col pt-10 ">
            <div className="w-full ">
              <h2 className="text-[#23262f] text-[2rem] font-poppins font-black ">
                {details.title}
              </h2>
              <div className="w-full flex justify-center">
                <img
                  src={details.image}
                  alt={details.title}
                  className="h-30 w-30 rounded-2xl drop-shadow-xl border-solid border-1 border-slate-400/[0.3]"
                />
              </div>
            </div>
            <Info className="drop-shadow-xl pt-20">
              <Button
                className={activeTab === "ingredients" ? "active" : " "}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </Button>
              <Button
                className={activeTab === "instructions" ? "active" : ""}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </Button>
              <div className="flex justify-center">
                <div className="w-[50vw] ">
                  {activeTab === "ingredients" && (
                    <ul className="list-disc flex flex-col justify-center text-[#23262f]  font-poppins  ">
                      {details.extendedIngredients.map(({ original, id }) => (
                        <li className="text-left" key={id}>
                          {original}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "instructions" && (
                    <div className=" list-disc text-left text-[#23262f] font-poppins p-5">
                      <span>{parse(details.summary)}</span>
                      <span>{parse(details.instructions)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Info>
          </Wrapper>
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
      </div>
    </section>
  );
}
