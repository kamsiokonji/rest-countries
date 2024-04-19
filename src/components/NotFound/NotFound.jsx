import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-6 min-h-screen items-center justify-center bg-[#0d1117] ">
      <h1 className="text-white font-medium text-[20px] font-nunito">
        404 | NOT FOUND
      </h1>
      <Button
        onClick={() => {
          navigate("/");
        }}
        className="bg-white text-black font-nunito font-medium"
      >
        Back To HomePage
      </Button>
    </div>
  );
};

export default NotFound;
