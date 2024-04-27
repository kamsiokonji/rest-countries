import React, { useState, useEffect } from "react";
import { fetchData } from "../../api";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";

const Cards = ({ filteredData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (name) => {
    navigate(`/country/${name}`);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const delay = 1000;
    const timerId = setTimeout(fetchRegions, delay);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    setData(filteredData);
  }, [filteredData]);

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-20">
        {loading ? (
          <Skeleton cards={8} />
        ) : (
          data?.map((item, index) => (
            <div
              key={index}
              className="relative sm:w-full flex flex-col overflow-hidden rounded-md bg-white dark:bg-[#2b3743] dark:text-white bg-clip-border text-[#111517] text-[17px] shadow-md font-nunito cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => {
                handleCardClick(item.name);
              }}
            >
              <div className="relative h-64 overflow-hidden bg-transparent rounded-none shadow-sm bg-clip-border">
                <img
                  src={item.flags}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="block text-2xl antialiased font-extrabold leading-snug tracking-normal">
                  {item.name}
                </h4>
                <span className="flex flex-row space-x-2 items-center">
                  <h2 className="font-semibold">Population:</h2>
                  <p className="block antialiased font-normal leading-relaxed ">
                    {item.population?.toLocaleString()}
                  </p>
                </span>
                <span className="flex flex-row space-x-2 items-center">
                  <h2 className="font-semibold">Region:</h2>
                  <p className="block antialiased font-normal leading-relaxed ">
                    {item.region}
                  </p>
                </span>
                <span className="flex flex-row space-x-2 items-center">
                  <h2 className="font-semibold">Capital:</h2>
                  <p className="block antialiased font-normal leading-relaxed ">
                    {item.capital ?? "N/A"}
                  </p>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Cards;
