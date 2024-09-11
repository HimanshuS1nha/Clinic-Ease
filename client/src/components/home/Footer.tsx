import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="flex justify-around mt-20 bg-emerald-600 p-4 text-white">
      <div className="flex flex-col gap-y-2 w-[30%]">
        <p className="text-xl font-semibold">
          Clinic<span className="font-bold">Ease</span>
        </p>
        <p className="text-justify leading-7">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          exercitationem at facilis id veniam, possimus quia blanditiis, iusto
          itaque assumenda tempore neque dolores minima accusantium quo in ipsam
          rem, maxime sunt. Officiis, dicta veniam consequuntur culpa fugit est
          quibusdam magni vitae impedit, illum, quasi officia ad aliquam
          distinctio ratione illo eveniet soluta nihil. Optio alias vel quos
          omnis nihil. Eligendi?
        </p>
      </div>

      <div className="flex flex-col gap-y-6 items-center">
        <p className="text-lg font-bold">Links</p>

        <ul className="flex flex-col gap-y-4 items-center">
          <li className="hover:text-emerald-600 delay-100 transition-all cursor-pointer">
            Home
          </li>
          <li
            className="hover:text-emerald-600 delay-100 transition-all cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            About
          </li>
          <li className="hover:text-emerald-600 delay-100 transition-all cursor-pointer">
            Services
          </li>
          <li
            className="hover:text-emerald-600 delay-100 transition-all cursor-pointer"
            onClick={() => scrollTo("contact")}
          >
            Contact
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-3">
          <p className="text-lg font-bold">Social Networks</p>
          <div className="flex gap-x-4 items-center">
            <FaFacebookF
              className="text-white hover:scale-125 delay-100 transition-all cursor-pointer"
              size={20}
            />
            <FaInstagram
              className="text-white hover:scale-125 delay-100 transition-all cursor-pointer"
              size={20}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-lg font-bold">Contact Details</p>
          <div className="flex gap-x-3 items-center">
            <p className="font-semibold">Address : </p>
            <p className="text-justify leading-7 text-sm">
              ABC Street, XYZ city, UVW State, India
            </p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="font-semibold">Phone Number : </p>
            <p className="text-justify leading-7 text-sm">+91 1234567890</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <p className="font-semibold">Email : </p>
            <p className="text-justify leading-7 text-sm">demo@demo.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
