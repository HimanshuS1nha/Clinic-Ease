import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = () => {
  const scrollTo = (id: string) => {
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      500
    );
  };
  return (
    <nav className="flex h-[10vh] items-center justify-between lg:justify-around px-6 lg:px-0">
      <p className="text-xl font-semibold">
        Clinic<span className="text-emerald-600 font-bold">Ease</span>
      </p>

      <ul className="hidden lg:flex items-center gap-x-8">
        <li
          className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          Home
        </li>
        <li
          className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          About
        </li>
        <li
          className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
          onClick={() => scrollTo("why-us")}
        >
          Why Us
        </li>
        <li
          className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
          onClick={() => scrollTo("contact")}
        >
          Contact
        </li>
      </ul>

      <div className="flex gap-x-5 items-center">
        <Button variant={"ghost"} asChild className="hidden lg:block">
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link to={"/signup"}>Signup</Link>
        </Button>

        <Drawer>
          <DrawerTrigger className="block lg:hidden">
            <MdMenu size={28} />
          </DrawerTrigger>
          <DrawerTitle className="hidden">Navbar</DrawerTitle>
          <DrawerContent>
            <div className="flex flex-col items-center gap-y-5 pt-5">
              <DrawerClose asChild>
                <p
                  className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                  onClick={() => scrollTo("home")}
                >
                  Home
                </p>
              </DrawerClose>
              <DrawerClose>
                <p
                  className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                  onClick={() => scrollTo("about")}
                >
                  About
                </p>
              </DrawerClose>
              <p
                className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                onClick={() => scrollTo("why-us")}
              >
                Why Us
              </p>
              <p
                className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                onClick={() => scrollTo("contact")}
              >
                Contact
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
