import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="h-screen dark:bg-[#202d36] bg-[#fafafa] text-[#111517] dark:text-white">
        <Header />

        <div className="lg:px-40 sm:py-10 sm:px-4 flex flex-col space-y-14 dark:bg-[#202d36] bg-[#fafafa] text-[#111517] dark:text-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
