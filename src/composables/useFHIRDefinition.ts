import { getDropdown } from "@/plugins/definitions";
import { Codeable } from "@/types/misc";
import { ref, computed, onBeforeMount } from "vue";

export function useFHIRDefinition(url: string) {
  const definitions = ref([] as Codeable[]);
  onBeforeMount(async () => {
    const defs = await getDropdown(url);
    definitions.value = defs || [];
  });
  const code = ref("");
  const display = computed(() => {
    if (!code.value) return "";
    const codeVal = code.value.replaceAll("\"", "");
    return definitions.value.find(d => d.code == codeVal)?.display || "";
  });

  return {
    code,
    display,
  };
}
