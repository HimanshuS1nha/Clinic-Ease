import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <main className="flex h-[80vh] items-center justify-center gap-x-12">
      <div className="w-[50%] flex flex-col justify-center items-center gap-y-6">
        <div className="flex flex-col gap-y-3">
          <div className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 shadow-sm shadow-gray-300 w-fit">
            <p className="text-xs font-semibold">ClinicEase is now public</p>
          </div>
          <h1 className="text-4xl text-emerald-600 font-bold">
            Your clinic at your Fingertips
          </h1>
        </div>

        <p className="text-justify leading-7 pl-32">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius
          suscipit delectus hic consequuntur sapiente ratione earum fugiat
          dolor. Dolor voluptates iusto sit fugit mollitia cupiditate. Optio
          eaque animi recusandae! Laudantium qui reprehenderit, expedita
          praesentium perspiciatis beatae doloremque! Nostrum, doloribus!
          Incidunt voluptas eaque sint enim illum, vero quod adipisci fugiat.\
        </p>

        <div className="w-full pl-32">
          <Button>Get Started</Button>
        </div>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="bg-emerald-600 w-[50%] h-[90%] flex justify-center items-center rounded-3xl shadow-lg shadow-gray-400">
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
