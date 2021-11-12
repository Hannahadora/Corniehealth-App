import { getCountries, getStates } from "@/plugins/nation-states";
import { ref, watch, onBeforeMount } from "vue";

export function useCountryStates() {
  const countries = getCountries();
  const states = ref([] as string[]);
  const country = ref("Nigeria");
  onBeforeMount(async () => {
    states.value = await getStates(country.value);
  });
  watch(country, async (val, prev) => {
    if (!val) {
      states.value = [];
    }
    states.value = await getStates(val);
  });
  return {
    countries,
    states,
    country,
  };
}
