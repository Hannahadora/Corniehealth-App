import LocalStore from "@/lib/localstore";

type Concept = {
  [state: string]: {
    code: string;
    display: string;
  }[];
};

const localStore = new LocalStore("corniehealth-dd-cache");

let cache = {} as Concept;

function cacheEmpty() {
  return Object.keys(cache).length < 1;
}

async function getRemoteDefinitions() {
  const response = await fetch("/definitions.json");
  const concept: Concept = await response.json();
  return concept;
}

function getFromStore() {
  const dataString = localStore.get("definitions");
  try {
    return JSON.parse(dataString);
  } catch (error) {
    return;
  }
}

async function populateCache() {
  const data = await getRemoteDefinitions();
  cache = data;
}

export async function getDropdown(key: string) {
  if (cacheEmpty()) await populateCache();
  return cache[key];
}

export async function mapDisplay(key: string) {
  const data = await getDropdown(key);
  return (code: string) =>
    data.find((d) => d.code == code.replace('"', ""))?.display;
}
