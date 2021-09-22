<template>
  <search-input @selected="selected" :results="results" v-model="query" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchInput from "@/components/search-input.vue";
import { Prop, Watch } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";
import { Provider } from "@/types/IPatient";
import { debounce, DebouncedFunc } from "lodash";

@Options({
  name: "ProviderSearch",
  components: {
    SearchInput,
  },
})
export default class ProviderSearch extends Vue {
  searchResults: Provider[] = [];
  query = "";

  @Prop({ type: String, required: true })
  type!: string;

  debouncedSearch!: DebouncedFunc<(q: string) => Promise<Provider[]>>;

  @Watch("query")
  async queryChanged(query: string) {
    if (!query) this.debouncedSearch.cancel();
    this.debouncedSearch(query);
  }

  get results() {
    return this.searchResults.map((r) => ({ code: r, display: r.name, ...r }));
  }

  async search(query: string) {
    if (!query) return [] as Provider[];
    try {
      const response = await cornieClient().get(
        "/api/v1/patient/provider/search",
        { q: query, type: this.type }
      );
      this.searchResults = response.data;
    } catch (error) {
      window.notify({ msg: "Couldn't reach the server", status: "error" });
    }
  }

  selected(item: Provider) {
    this.$emit("selected", item);
  }

  created() {
    this.debouncedSearch = debounce(this.search, 700);
  }
}
</script>
