import React from "react";

const NewLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-[100%] h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col">
      <p className="text-[30px] md:text-[20px] text-[#a5faf7] font-semibold px-[20px]  ">
        Subscribe now & get 20% off
      </p>
      <p className="md:text-[18px] text-[14px]  text-center text-blue-100 font-semibold px-[20px]">
        Subscribe now and enjoy exclusive savings, special deals, and early
        access to new collections.
      </p>
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-[100%] h-[30%] md:h-[50%] flex items-center justify-center gap-[20px] px-[20px]  mt-[20px] "
      >
        <input
          className="placeholder:text-[black] bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black"
          required
          type="text"
          value=""
          placeholder="Enter your email address"
        />
        <button className="text-[15px] md:text-[18px] font-semibold text-[#a5faf7] bg-[#0c2025] hover:bg-[#163940] px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewLetterBox;
