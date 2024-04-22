import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../api";
import { useState } from "react";
import { useEffect } from "react";

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const countryData = data.find((country) => country.name === name);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <Button
        className="w-28 bg-white !capitalize text-[14px] text-[#858585] dark:bg-[#2b3743] dark:text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>{" "}
      <div className="flex flex-row justify-between">
        <img src={countryData?.flags} className="w-96" />
        <h1>{countryData?.subregion}</h1>
        <h1>{countryData?.currencies}</h1>
        <h1>{countryData?.languages}</h1>
        {name}
      </div>
    </div>
  );
};

export default Details;
