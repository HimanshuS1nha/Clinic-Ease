import { IoLocationSharp, IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

import { Input } from "../ui/input";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="flex justify-center items-center gap-x-8 mt-20"
    >
      <div className="flex flex-col gap-y-7 w-[45%]">
        <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-700 font-semibold">Conact Us</p>
          <p className="text-5xl text-emerald-600 font-bold">
            Get in touch with Us
          </p>
        </div>
        <p className="text-justify leading-7 w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          accusantium illum similique, quaerat facilis distinctio explicabo
          perspiciatis! Labore enim laboriosam quisquam quo quaerat molestiae
          veritatis sint aperiam alias ipsum. Libero exercitationem corporis
          iure quaerat culpa, architecto veniam vel fugiat suscipit!
        </p>

        <div className="flex flex-col gap-y-8 w-[80%]">
          <div className="flex gap-x-4 items-center">
            <div className="bg-emerald-600 p-2.5 rounded-xl">
              <IoLocationSharp color="white" size={23} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Address</p>
              <p className="text-justify leading-7 text-sm">
                ABC Street, XYZ city, UVW State, India
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="bg-emerald-600 p-2.5 rounded-xl">
              <FaPhoneAlt color="white" size={23} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Phone Number</p>
              <p className="text-justify leading-7 text-sm">+91 1234567890</p>
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="bg-emerald-600 p-2.5 rounded-xl">
              <IoMail color="white" size={23} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Email</p>
              <p className="text-justify leading-7 text-sm">demo@demo.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-emerald-600 flex flex-col gap-y-6 w-[30%] rounded-lg mt-6 shadow-xl shadow-gray-300">
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" />
        <Input placeholder="Enter your phone number" />
      </div>
    </section>
  );
};

export default ContactUs;
