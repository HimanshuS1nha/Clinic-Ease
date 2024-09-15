import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import {
  adminSidebarItems,
  patientSidebarItems,
} from "../../../constants/sidebar-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";

const Sidebar = () => {
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
      setUser(null);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <div className="w-[280px] px-8 pt-5 flex flex-col gap-y-6">
      {user?.role !== "patient"
        ? patientSidebarItems.map((item) => {
            return (
              <Link
                to={`/dashboard/patient/${item.url}`}
                className="font-semibold hover:text-emerald-600 delay-100 transition-all"
                key={item.title}
              >
                {item.title}
              </Link>
            );
          })
        : adminSidebarItems.map((item) => {
            return (
              <Link
                to={`/dashboard/admin/${item.url}`}
                className="font-semibold hover:text-emerald-600 delay-100 transition-all"
                key={item.title}
              >
                {item.title}
              </Link>
            );
          })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-x-4 items-center absolute bottom-4 group hover:bg-emerald-200 py-2 pl-4 pr-8 cursor-pointer -mx-4 rounded-full">
            <div className="bg-emerald-600 flex items-center justify-center w-10 h-10 rounded-full">
              <p className="text-white text-lg font-semibold capitalize">
                {user?.email[0]}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-lg font-semibold">{user?.email}</p>
              <p className="text-gray-700 text-sm -mt-0.5 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-rose-600 focus:text-white cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
