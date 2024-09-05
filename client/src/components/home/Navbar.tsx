import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex h-[8vh] items-center justify-around">
      <p className="text-xl font-semibold">
        Clinic<span className="text-emerald-600 font-bold">Ease</span>
      </p>

      <ul className="flex items-center gap-x-8">
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Home
        </li>
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          About
        </li>
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Pricing
        </li>
        <li className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer">
          Contact
        </li>
      </ul>

      <div className="flex gap-x-5 items-center">
        <Button variant={"ghost"}>Login</Button>
        <Button>Signup</Button>
      </div>
    </nav>
  );
};

export default Navbar;
