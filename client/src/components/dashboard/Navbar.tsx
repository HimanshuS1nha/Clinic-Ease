import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="h-[8vh] flex justify-between px-8 items-center">
      <p className="text-xl font-semibold">
        Clinic<span className="text-emerald-600 font-bold">Ease</span>
      </p>

      <ul className="flex gap-x-4 items-center">
        <FaFacebookF
          className="text-black hover:text-emerald-600 hover:scale-125 delay-100 transition-all cursor-pointer"
          size={20}
        />
        <FaInstagram
          className="text-black hover:text-emerald-600 hover:scale-125 delay-100 transition-all cursor-pointer"
          size={20}
        />

        <Sheet>
          <SheetTrigger>
            <MdMenu size={24} />
          </SheetTrigger>
          <SheetContent>
            <Sidebar show />
          </SheetContent>
        </Sheet>
      </ul>
    </nav>
  );
};

export default Navbar;
