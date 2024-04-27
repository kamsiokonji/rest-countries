import React, { useState, useEffect } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
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
        const fetchedData = await fetchData();
        const distinctRegions = await fetchRegion();
        setData(fetchedData);
        setFilteredData(fetchedData);
        setFetchedRegion(distinctRegions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndRegions();
  }, []);

  const handleRegionSelect = (value) => {
    const filtered = data.filter((item) => item.region === value);
    setFilteredData(filtered);
  };

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
            label="Filter by Region"
            value={value}
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={handleRegionSelect}
            className={` dark:bg-[#2b3743] text-[#858585] dark:text-white py-7 border border-none shadow-[rgba(218,218,218,0.50)_0px_3px_8px_3px] dark:shadow-2xl placeholder:text-blue-gray-300 dark:placeholder:text-white placeholder:font-nunito`}
            labelProps={{
              className:
                "before:content-none px-3 after:content-none dark:text-white text-[#858585] font-nunito text-[14px] ",
            }}
            containerProps={{
              className: "flex items-center",
            }}
          >
            {fetchedRegion?.map((region, index) => (
              <Option
                key={index}
                value={region}
                className=" dark:bg-[#2b3743] dark:text-white text-[#858585] font-nunito"
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
