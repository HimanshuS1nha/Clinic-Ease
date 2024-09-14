import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <main
      className="flex flex-col lg:flex-row lg:h-[80vh] items-center justify-center gap-y-8 lg:gap-y-0 gap-x-0 lg:gap-x-8 mt-12 lg:mt-0"
      id="home"
    >
      <div className="w-[90%] md:w-[75%] lg:w-[50%] flex justify-center items-center">
        <div className="flex flex-col gap-y-6 lg:pl-16">
          <div className="flex flex-col gap-y-3">
            <div className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 shadow-sm shadow-gray-300 w-fit">
              <p className="text-xs font-semibold">ClinicEase is now public</p>
            </div>
            <h1 className="text-4xl text-emerald-600 font-bold">
              Your clinic at your Fingertips
            </h1>
          </div>

          <p className="text-justify leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius
            suscipit delectus hic consequuntur sapiente ratione earum fugiat
            dolor. Dolor voluptates iusto sit fugit mollitia cupiditate. Optio
            eaque animi recusandae! Laudantium qui reprehenderit, expedita
            praesentium perspiciatis beatae doloremque! Nostrum, doloribus!
            Incidunt voluptas eaque sint enim illum, vero quod adipisci fugiat.\
          </p>

          <div className="w-full">
            <Button asChild>
              <Link to={"/signup"}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-[75%] lg:w-[50%] h-full flex justify-center items-center">
        <div className="bg-emerald-600 md:w-[75%] lg:w-[50%] h-[90%] flex justify-center items-center rounded-3xl shadow-lg shadow-gray-400">
          <img
            src="https://www.transparentpng.com/thumb/doctor/pen-in-hand-male-doctor-free-transparent-bWzUD9.png"
            alt="Doctor"
            className="h-[98%]"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
