import axios from "axios";

const url = "/src/api/data.json";

const getFullName = function (borderingCountry) {
  const borderCountry = data?.find(
    (country) => country.cca3 === borderingCountry
  );
  console.log(borderCountry);
  return borderCountry.name;
};

export const fetchData = async () => {
  try {
    const response = await axios.get(url);

    const formattedData = response.data.map((item) => ({
      name: item.name,
      population: item.population,
      capital: item.capital,
      region: item.region,
      flags: item.flags.svg,
      subregion: item.subregion,
      nativeName: item.nativeName,
      topLevelDomain: item.topLevelDomain,
      currencies: item.currencies?.map((currency) => currency.name),
      languages: item.languages?.map((language) => language.name).join(", "),
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

// export const searchCountries = (q, data) => {
//   try {
//     if (!q) {
//       return data;
//     }

//     const searchedData = data.filter((country) =>
//       country.name.toLowerCase().includes(q.toString().toLowerCase())
//     );
//     return searchedData;
//   } catch (error) {
//     console.error("Error searching countries:", error);
//     throw new Error("Failed to search countries");
//   }
// };
