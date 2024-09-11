import { whyUs } from "../../../constants/why-us";

const WhyUs = () => {
  return (
    <section className="mt-20 flex flex-col gap-y-12 items-center" id="why-us">
      <div className="flex flex-col gap-y-3 items-center">
        <p className="text-5xl text-emerald-600 font-bold">Why Choose Us</p>
        <p className="leading-7 w-[60%] text-center text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          tenetur sapiente id, consectetur nulla magni veniam dolore vero
          repellat ea?
        </p>
      </div>

      <div className="flex flex-wrap justify-between w-[1200px] items-center gap-y-10">
        {whyUs.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-y-5 w-[350px]">
              <div className="flex flex-col gap-y-3">
                <item.Icon size={40} color={item.color} />
                <p className="text-2xl font-bold">{item.title}</p>
              </div>
              <p className="text-justify leading-7">{item.content}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyUs;
