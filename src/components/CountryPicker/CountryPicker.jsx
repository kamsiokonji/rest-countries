import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchRegion, fetchData, searchCountries } from "../../api";
import { IoMdSearch } from "react-icons/io";
import Cards from "../Cards/Cards";

const CountryPicker = () => {
  const [value, setValue] = useState("");
  const [fetchedRegion, setFetchedRegion] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [q, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchDataAndRegions = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchData();
        const distinctRegions = await fetchRegion();
        setData(fetchedData);
        setFilteredData(fetchedData);
        setFetchedRegion(distinctRegions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataAndRegions();
  }, []);

  useEffect(() => {
    if (value) {
      const filtered = data.filter((item) => item.region === value);
      setFilteredData(filtered);
    }
  }, [value, data]);

  useEffect(() => {
    const fetchDataAndSearch = async () => {
      try {
        if (q) {
          setLoading(true);
          const searchedData = await searchCountries(q, data);
          setFilteredData(searchedData);

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setFilteredData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching or filtering data:", error);
        setLoading(false);
      }
    };

    fetchDataAndSearch();
  }, [q, data]);

  return (
    <>
      <div className="flex lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:space-y-14 lg:space-y-5">
        <div className="relative w-full gap-2 md:w-max">
          <Input
            type="search"
            placeholder="Search for a country..."
            containerProps={{
              className: "lg:min-w-[500px] font-nunito md:min-w-[600px]",
            }}
            className="bg-[#fafafa] dark:bg-[#2b3743]  text-[#858585] dark:text-white py-7 indent-16 border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleSearchChange}
          />
          <div className="!absolute left-6 top-[22px]">
            <IoMdSearch />
          </div>
        </div>

        <div className={`sm:w-56 `}>
          <Select
            value={value}
            onChange={(val) => setValue(val)}
            className={` dark:bg-[#2b3743] text-[#858585] dark:text-white py-7 border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{
              className: "flex items-center",
            }}
            placeholder="Filter by Region"
          >
            {fetchedRegion?.map((region, index) => (
              <Option
                key={index}
                value={region}
                className=" dark:bg-[#2b3743] dark:text-white text-[#858585]"
              >
                {region}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <Cards filteredData={filteredData} />
    </>
  );
};

export default CountryPicker;
