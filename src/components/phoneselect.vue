<template>
  <div class="flex flex-col w-11/12">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
          <div class="w-full" @click="showDatalist = !showDatalist">
            <label
              v-if="label"
              class="block uppercase mb-1 text-xs font-bold"
              :for="`${id}-inputfield`"
            >
              {{ label }}
            </label>
            <div
              v-bind="$attrs"
              class="p-1 bg-white flex border-1 border-gray-300 rounded-r-none rounded-lg"
              style="border-right: none;"
            >
              <span class="w-full" v-if="Boolean($slots.selected)">
                <slot name="selected" :item="selectedItem" />
              </span>
              <input
                v-else
                placeholder=""
                disabled
                :value="displayVal"
                class="bg-transparent p-1 pl-2 rounded-r-none appearance-none outline-none w-full text-gray-800"
              />

              <div
                class="text-gray-300 py-1 pr-1 flex items-center border-gray-200"
              >
                <chevron-down-icon />
              </div>
            </div>
          </div>
          
          <div
            :class="{ hidden: !showDatalist }"
            class="absolute shadow bg-white top-100 z-40 left-0 rounded  max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
          >
            <div class="flex flex-col w-full p-2">
              <span class="mb-2 rounded-full">
                <icon-input
                  autocomplete="off"
                  class="border border-gray-600 rounded-full focus:outline-none"
                  type="search"
                  placeholder="Search"
                   v-model="query"
                >
                  <template v-slot:prepend>
                    <search-icon />
                  </template>
                </icon-input>
              </span>
              <div
                v-for="(item, i) in filteredItems"
                :key="i"
                @click="selected(item)"
                class="cursor-pointer w-auto border-gray-100 rounded-xl hover:bg-white-cotton-ball"
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { clickOutside } from "@/plugins/utils";
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "./icons/search.vue";
import search from "@/plugins/search";

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}
type Sorter = (a: any, b: any) => number;
@Options({
  components: {
    ChevronDownIcon,
    IconInput,
    SearchIcon,
  },
})
export default class CornieSelect extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: String })
  label!: string;
  showDatalist = false;
  id = "";
 query = "";
   orderBy: Sorter = () => 1;

  get filteredItems() {
    return this.items
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }
  

  get displayVal() {
    if (!this.modelValue || this.items.length < 1) return;

    const selected = this.selectedItem;
    return selected?.display || selected || "";
  }

  get selectedItem() {
    const selected = this.items.find(
      (item) => item.code == this.modelValue || item == this.modelValue
    );
    return selected;
  }

  selected(item: any) {
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
  }

  mounted() {
    clickOutside(this.id, () => {
      this.showDatalist = false;
    });
  }

  created() {
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>
<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
.w-custom {
  width: max-content;
}
</style>
