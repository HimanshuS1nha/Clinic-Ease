import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const scrollTo = (id: string) => {
    console.log(document.getElementById(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="flex h-[10vh] items-center justify-around">
      <p className="text-xl font-semibold">
        Clinic<span className="text-emerald-600 font-bold">Ease</span>
      </p>

      <ul className="flex items-center gap-x-8">
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Home
        </li>
        <li
          className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          About
        </li>
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Services
        </li>
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Contact
        </li>
      </ul>

      <div className="flex gap-x-5 items-center">
        <Button variant={"ghost"} asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link to={"/signup"}>Signup</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
