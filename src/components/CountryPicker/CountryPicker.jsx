import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import search from "../../assets/search.svg";
import { useState } from "react";
import { useEffect } from "react";
import { fetchRegion } from "../../api";

const CountryPicker = () => {
  const [value, setValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [fetchedRegion, setFetchedRegion] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await fetchRegion();

        const distinctRegions = data?.reduce((acc, country) => {
          if (!acc.includes(country.region)) {
            acc.push(country.region);
          }
          return acc;
        }, []);

        setFetchedRegion(distinctRegions);
      } catch (error) {
        console.error("Error fetching region:", error);
      }
    };

    fetchRegions();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount
  // Empty dependency array to ensure useEffect runs only once on component mount

  return (
    <div className="flex lg:flex-row justify-between lg:items-center sm:flex-col sm:space-y-14 lg:space-y-4">
      <div className="relative w-full gap-2 md:w-max">
        <Input
          type="search"
          placeholder="Search for a country..."
          containerProps={{
            className: "lg:min-w-[500px] font-nunito",
          }}
          className="bg-[#fafafa] dark:bg-[#1a2c3a] text-[#858585] dark:text-white py-7 indent-16 border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <div className="!absolute left-6 top-[22px]">
          <img src={search} alt="search-icon" className="fill-white" />
        </div>
      </div>

      <div className={`sm:w-56 `}>
        {/* <Select
          value={value}
          onChange={(val) => setValue(val)}
          className={`bg-${
            darkMode ? "dark" : "#fafafa"
          } dark:bg-[#1a2c3a] text-[#858585] dark:text-white py-7 border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito`}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          placeholder="Filter by Region"
        >
          {fetchedRegion?.map((region, index) => (
            <Option key={index} value={region}>
              {region}
            </Option>
          ))}
        </Select> */}

        <select
          className={`bg-${
            darkMode ? "dark" : "#fafafa"
          } dark:bg-[#1a2c3a] text-[#858585] sm:w-full px-2 dark:text-white py-5 rounded-md border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito`}
        >
          <option value="">select region</option>
          {fetchedRegion?.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryPicker;
