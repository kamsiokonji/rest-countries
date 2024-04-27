import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../api";
import { IoIosArrowRoundBack } from "react-icons/io";

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const countryData = data.find((country) => country.name === name);

  const getFullName = function (borderingCountry) {
    const borderCountry = data.find(
      (country) => country.alpha3Code === borderingCountry
    );
    return borderCountry?.name;
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchedData();
  }, []);

  return (
    <div className="flex flex-col lg:space-y-14 sm:space-y-14 sm:px-2">
      <Button
        className="flex items-center shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl rounded-sm lg:mt-8 sm:m-0 justify-center lg:w-32 sm:w-28 p-2 bg-white !capitalize text-[14px] text-[#858585] dark:bg-[#2b3743] dark:text-white font-nunito font-normal"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowRoundBack className="mr-4 text-lg" />
        <h1 className="mr-4">Back</h1>
      </Button>{" "}
      <div className="flex lg:flex-row sm:flex-col lg:items-center justify-between">
        <img
          src={countryData?.flags}
          className="sm:w-full lg:w-auto lg:h-96 md:w-full shadow-md lg:mr-48"
        />

        <div className="flex flex-col py-10 font-nunito lg:w-full sm:w-full md:w-full xl:w-full">
          <h1 className="text-3xl font-extrabold">{name}</h1>
          <div className="flex lg:flex-row sm:flex-col md:flex-row justify-between text-[16px]">
            <div className="mt-7 flex-col space-y-2 ">
              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Native Name:</h1>
                <p className="font-normal dark:font-light">
                  {countryData?.nativeName}
                </p>
              </span>

              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Population:</h1>
                <p className="dark:font-light">
                  {countryData?.population?.toLocaleString()}
                </p>
              </span>

              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Region:</h1>
                <p className="dark:font-light">{countryData?.region}</p>
              </span>

              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Sub Region:</h1>
                <p className="dark:font-light">{countryData?.subregion}</p>
              </span>

              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Capital:</h1>
                <p className="dark:font-light">{countryData?.capital}</p>
              </span>
            </div>

            <div className="lg:mt-7 sm:mt-10 md:mt-7 flex-col space-y-2">
              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Top Level Domain:</h1>
                <p className="dark:font-light">{countryData?.tld}</p>
              </span>

              <span className="flex flex-row space-x-2 ">
                <h1 className="font-semibold">Currencies:</h1>
                <p className="dark:font-light">{countryData?.currencies}</p>
              </span>

              <span className="flex flex-row space-x-2">
                <h1 className="font-semibold">Languages:</h1>
                <p className="dark:font-light">{countryData?.languages}</p>
              </span>
            </div>
          </div>

          {countryData?.borders && (
            <div className="flex lg:flex-row lg:space-x-2 lg:items-center sm:flex-col">
              <h1 className="lg:mt-20 sm:mt-10 font-semibold">
                Border Countries:
              </h1>

              <span className="lg:flex lg:space-x-2 sm:grid sm:grid-cols-3 sm:gap-3">
                {countryData?.borders?.map((borderingCountry, index) => (
                  <Button
                    key={index}
                    className="lg:mt-20 sm:mt-2 shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl rounded-sm sm:!p-1 lg:!p-2 lg:!px-3  bg-white !capitalize text-[14px] text-[#858585] dark:bg-[#2b3743] dark:text-white font-nunito font-normal dark:font-light"
                    onClick={() => {
                      const fullName = getFullName(borderingCountry);
                      navigate(`/country/${fullName}`);
                    }}
                  >
                    {getFullName(borderingCountry)}
                  </Button>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
