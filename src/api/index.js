import axios from "axios";

const url = "https://restcountries.com/v3.1/all";

export const fetchData = async () => {
  try {
    const response = await axios.get(url);

    const formattedData = response?.data?.map((item) => ({
      name: item.name.official,
      population: item.population,
      capital: item.capital?.join(", "),
      region: item.region,
      flags: item.flags.svg,
      subregion: item.subregion,
      nativeName: item.name.nativeName
        ? Object.values(item.name.nativeName)[0].official
        : "N/A",
      tld: item.tld?.join(", "),
      currencies: item.currencies
        ? Object.values(item.currencies)[0].name
        : "N/A",
      languages: item.languages
        ? Object.values(item.languages)?.join(", ")
        : "N/A",
      borders: Array.isArray(item.borders) ? item.borders : [],
      cca3: item.cca3,
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

    const distinctRegions = [...new Set(data.map((item) => item.region))];

    return distinctRegions;
  } catch (error) {
    console.error("Error fetching region data:", error);
    throw new Error("Failed to fetch region data");
  }
};

// New function for searching by country name
export const searchCountries = async (q) => {
  try {
    const fetchedData = await fetchData();

    if (!q) {
      return fetchedData;
    }

    const searchedData = fetchedData.filter((country) =>
      country.name.toLowerCase().includes(q.toString().toLowerCase())
    );

    return searchedData;
  } catch (error) {
    console.error("Error searching countries:", error);
    throw new Error("Failed to search countries");
  }
};
