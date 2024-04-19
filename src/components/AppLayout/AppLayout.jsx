import React from "react";
import Header from "../Header/Header";
import CountryPicker from "../CountryPicker/CountryPicker";
import Cards from "../Cards/Cards";

const AppLayout = () => {
  return (
    <>
      <div className="dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
        <Header />
      </div>

      <div className="h-[100&] lg:px-20 sm:py-10 sm:px-4 flex flex-col space-y-14 dark:bg-[#1a2c3a] bg-[#fafafa] text-[#111517] dark:text-white">
        <CountryPicker />
      </div>
    </>
  );
};

export default AppLayout;
