<template>
  <div class="w-full relative">
    <icon-input
      autocomplete="off"
      type="search"
      :placeholder="$attrs.placeholder"
      v-model="query"
      class="rounded-full w-full border-2 border-gray-300 py-2 focus:outline-none"
    >
      <template v-slot:prepend>
        <search-icon />
      </template>
    </icon-input>
    <div
      v-if="results.length"
      :class="[{ hidden: !show }, background]"
      class="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
    >
      <div class="flex flex-col w-full p-2">
        <div
          v-for="(item, i) in results"
          :key="i"
          @click="select(item)"
          :class="[hoverColor]"
          class="cursor-pointer px-4 py-1 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
        >
          <template v-if="Boolean($slots.item)">
            <slot name="item" v-bind:item="item" />
          </template>
          <div
            v-else
            class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
          >
            {{ item.display || item }}
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

@Options({
  name: "SearchInput",
  components: {
    IconInput,
    SearchIcon,
  },
})
export default class SearchInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  query!: string;

  @Prop({ type: Array, default: [] })
  results!: any[];

  @Prop({ type: String, default: "bg-white" })
  background!: string;

  get hoverColor() {
    return this.background == "bg-white" ? "hover:bg-white-cotton-ball" : "";
  }

  show = false;

  select(item: any) {
    this.$emit("selected", item);
    this.show = false;
  }

  @Watch("query")
  typed(query: string) {
    if (query) this.show = true;
    else this.show = false;
  }
}
</script>
