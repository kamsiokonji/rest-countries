import axios from "axios";

const url = "/src/api/data.json";

export const fetchData = async () => {
  try {
    const response = await axios.get(url);

    const formattedData = response.data.map((item) => ({
      name: item.name,
      population: item.population,
      capital: item.capital,
      region: item.region,
      flags: item.flags.svg,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchRegion = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
