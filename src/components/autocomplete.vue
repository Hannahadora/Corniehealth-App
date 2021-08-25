<template>
  <span class="relative">
    <cornie-input v-bind="$attrs" v-model="displayVal" />
    <div
      :class="{ show: !showDatalist }"
      class="
        absolute
        flex flex-col
        max-h-52
        overflow-y-auto
        bg-white
        z-10
        mt-2
        px-1
        w-11/12
        py-2
        border-2 border-gray-200
      "
    >
      <div
        class="flex flex-row px-1 divide-y-2 divide-solid cursor-pointer"
        v-for="(item, i) in filteredItems"
        :key="i"
        @click="selected(item)"
      >
        <div class="ml-2 text-center my-1">
          <span class="block mx-auto">{{ item.display || item }}</span>
        </div>
      </div>
    </div>
  </span>
</template>
<script lang="ts">
import search from "@/plugins/search";
import { nextTick } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieInput from "./cornieinput.vue";
@Options({
  inheritAttrs: false,
  components: {
    CornieInput,
  },
})
export default class AutoComplete extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  displayVal = "";

  showDatalist = false;

  get filteredItems() {
    if (!this.displayVal) return this.items;
    return search.searchObjectArray(this.items, this.displayVal);
  }

  @Watch("displayVal")
  changed(val: string, prev: string) {
    if (val && val != prev) {
      this.showDatalist = true;
    } else this.showDatalist = false;
  }

  selected(item: any) {
    this.displayVal = item.display || item;
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
  }
}
</script>
