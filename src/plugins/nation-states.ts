import { countryCodes } from "./countrycodes";
import localStore from "./localstore";

export function getCountries() {
  return countryCodes.map((c) => c.name);
}

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

let countryMap: any;

async function fetchCountries() {
  let countries: any;
  if (localStore.has("countryMap")) {
    countries = await getCountriesFromCache();
  } else {
    countries = await getCountriesFromRemote();
    localStore.put("countryMap", countries, 7);
  }
  return countries;
}

async function getCountriesFromRemote() {
  const response = await fetch("/country-state.json");
  const countries = await response.json();
  return countries;
}

async function getCountriesFromCache() {
  const rawData = localStore.get("countryMap");
  try {
    const countries = JSON.parse(rawData);
    return countries;
  } catch (error) {
    const countries = await getCountriesFromRemote();
    localStore.put("countryMap", countries, 7);
    return countries;
  }
}

export async function getStates(country: string = "nigeria") {
  if (!countryMap) countryMap = await fetchCountries();
  return countryMap[country];
}
