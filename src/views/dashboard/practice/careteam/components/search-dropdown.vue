<template>
  <div class="w-full relative">
    <icon-input
      autocomplete="off"
      type="search"
      :placeholder="$attrs.placeholder"
      v-model="searchValue"
      @click="toggleDisplay"
      class="rounded-lg w-full border-2 py-2 focus:outline-none"
    >
      <template v-slot:prepend>
        <search-icon />
      </template>
      <template v-slot:append>
        <chevron-down />
      </template>
    </icon-input>
    <div
      v-if="results.length > 0 && show"
      :class="[{ hidden: !show }, background]"
      class="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
      style="max-height: 300px"
    >
      <div class="flex flex-col w-full p-2">
        <div
          v-for="(item, i) in items"
          :key="i"
          @click="select(item)"
          class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
        >
          <template v-if="Boolean($slots.item)">
            <slot name="item" v-bind:item="item" />
          </template>
          <div
            v-else
            class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
          >
            {{ item.display ? item.display : item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";

@Options({
  components: {
    IconInput,
    SearchIcon,
    ChevronDown,
  },
})
export default class SearchDropdown extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  query!: string;

  @Prop({ type: Array, default: [] })
  results!: any[];

  @Prop({ type: String, default: "bg-white" })
  background!: string;

  show = false;
  searchValue = "";

  get items() {
    if (!this.searchValue) return this.results;
    const results = this.results.filter((i: any) => {
      return i.display
        ? i.display?.toLowerCase().includes(this.searchValue?.toLowerCase())
        : i?.toLowerCase().includes(this.searchValue?.toLowerCase());
    });
    return results;
  }

  select(item: any) {
    this.$emit("selected", item);
    this.show = false;
    this.searchValue = item.display ? item.display : item;
  }

  toggleDisplay() {
    this.show = !this.show;
  }

  @Watch("query")
  typed(query: string) {
    if (query) this.show = true;
    else this.show = false;
  }
}
</script>
