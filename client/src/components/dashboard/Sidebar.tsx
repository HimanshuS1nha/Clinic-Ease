import { Link } from "react-router-dom";
import { patientSidebarItems } from "../../../constants/sidebar-items";
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
  const { user } = useUser();
  return (
    <div className="w-[280px] px-8 pt-5 flex flex-col gap-y-6">
      {patientSidebarItems.map((item) => {
        return (
          <Link
            to={`/dashboard/patient/${item.url}`}
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
          <DropdownMenuItem className="focus:bg-rose-600 focus:text-white cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
