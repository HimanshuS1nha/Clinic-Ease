const AboutUs = () => {
  return (
    <section
      className="flex flex-col xl:flex-row justify-center items-center gap-y-12 xl:gap-y-0 gap-x-0 xl:gap-x-8 mt-20"
      id="about"
    >
      <div className="flex flex-col gap-y-7 w-[90%] md:w-[75%] xl:w-[45%]">
        <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-700 font-semibold">About Us</p>
          <p className="text-5xl text-emerald-600 font-bold">Our Journey</p>
        </div>
        <p className="text-justify leading-7 w-full md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          accusantium illum similique, quaerat facilis distinctio explicabo
          perspiciatis! Labore enim laboriosam quisquam quo quaerat molestiae
          veritatis sint aperiam alias ipsum. Libero exercitationem corporis
          iure quaerat culpa, architecto veniam vel fugiat suscipit!
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start w-[80%] flex-wrap justify-between gap-y-8">
          <div className="flex flex-col gap-y-1.5 border-t-4 border-t-emerald-600 w-[90%] md:w-[45%] pt-2">
            <p className="text-2xl font-bold">50+ years</p>
            <p className="text-gray-700 text-sm">
              of experience in providing medical facilities
            </p>
          </div>
          <div className="flex flex-col gap-y-1.5 border-t-4 border-t-emerald-600 w-[90%] md:w-[45%] pt-2">
            <p className="text-2xl font-bold">100+ services</p>
            <p className="text-gray-700 text-sm">provided to patients</p>
          </div>
          <div className="flex flex-col gap-y-1.5 border-t-4 border-t-emerald-600 w-[90%] md:w-[45%] pt-2">
            <p className="text-2xl font-bold">25+ awards</p>
            <p className="text-gray-700 text-sm">
              given to us in medical field
            </p>
          </div>
          <div className="flex flex-col gap-y-1.5 border-t-4 border-t-emerald-600 w-[90%] md:w-[45%] pt-2">
            <p className="text-2xl font-bold">100K+ customers</p>
            <p className="text-gray-700 text-sm">cured of major illness</p>
          </div>
        </div>
      </div>

      <img
        src="https://img.freepik.com/free-photo/confident-doctor-standing-hospital-room-with-patient-bed_9975-22166.jpg?semt=ais_hybrid"
        alt="Hospital"
        className="w-[90%] md:w-[75%] xl:w-[600px] md:h-[500px] rounded-xl"
      />
    </section>
  );
};

export default AboutUs;
