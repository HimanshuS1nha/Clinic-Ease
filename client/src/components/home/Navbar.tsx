import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { mutate: handleLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/", { replace: true });
      setUser(null);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });

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
        {user?.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-emerald-600 flex items-center justify-center w-10 h-10 rounded-full">
                <p className="text-white text-lg font-semibold capitalize">
                  {user?.email[0]}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="focus:bg-emerald-600 focus:text-white cursor-pointer"
                asChild
              >
                <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-rose-600 focus:text-white cursor-pointer"
                onClick={() => handleLogout()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} asChild>
                  <Link to={"/login"}>Login</Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="focus:bg-emerald-600 focus:text-white cursor-pointer"
                  asChild
                >
                  <Link to={`/login/patient`}>Login as Patient/Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-emerald-600 focus:text-white cursor-pointer"
                  asChild
                >
                  <Link to={`/login/doctor`}>Login as Doctor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="hidden lg:block">
              <Link to={"/signup"}>Signup</Link>
            </Button>
          </>
        )}

        <Drawer>
          <DrawerTrigger className="block lg:hidden">
            <MdMenu size={28} />
          </DrawerTrigger>
          <DrawerTitle className="hidden">Navbar</DrawerTitle>
          <DrawerContent>
            <div className="flex flex-col items-center gap-y-5 py-5">
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
              <DrawerClose>
                <p
                  className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                  onClick={() => scrollTo("why-us")}
                >
                  Why Us
                </p>
              </DrawerClose>
              <DrawerClose>
                <p
                  className="font-semibold hover:text-emerald-600 delay-100 transition-all cursor-pointer"
                  onClick={() => scrollTo("contact")}
                >
                  Contact
                </p>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
