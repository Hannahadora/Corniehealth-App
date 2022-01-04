<template>
  <auto-complete @query="searched" :items="items" v-model="modelValueSync" />
</template>
<script lang="ts">
import { snomedSearch } from "@/plugins/snomed";
import { Codeable } from "@/types/misc";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import AutoComplete from "./autocomplete.vue";
import { debounce, DebouncedFunc } from "lodash";

@Options({
  name: "SNOMEDInput",
  components: {
    AutoComplete,
  },
})
export default class SNOMEDInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: String, required: true })
  reference!: string;

  searcher!: DebouncedFunc<(filter: string) => Promise<Codeable[]>>;

  items: Codeable[] = [];

  async searched(query: string) {
    const data = await this.searcher(query);
    this.items = data ?? [];
  }

  created() {
    this.searcher = debounce(snomedSearch, 560);
  }
}
</script>
