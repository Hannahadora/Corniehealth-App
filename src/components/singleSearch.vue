<template>
  <div class="flex flex-col items-center w-11/12 mb-5">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
  
          <div
            :class="{ hidden: !showDatalist }"
            class="absolute shadow bg-white border-gray-400 border top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
          >
            <div class="flex flex-col w-full p-2">
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
              <div
                v-for="(item, i) in processedItems"
                :key="i"
                @click="selected(item)"
                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
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
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";
import { Field } from "vee-validate";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "./icons/search.vue";

@Options({
  components: {
    ChevronDownIcon,
    Field,
    IconInput,
    SearchIcon,
  },
  emits: ["query"],
})
export default class AutoComplete extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Object })
  rules!: any;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  @Prop({ type: String })
  label!: string;

  @Prop({ type: Function })
  filter!: (item: any, query: string) => boolean;

  customFilter(item: any) {
    if (this.filter) return this.filter(item, this.query);
    if (typeof item === "string" || item instanceof String)
      return item.toLowerCase().includes(this.query.toLowerCase());
    const { code, display }: { code: string; display: string } = item;
    return (
      `${code}`.toLowerCase().includes(this.query.toLowerCase()) ||
      `${display}`.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  showDatalist = false;
  id = "";

  query = "";

  @Watch("query")
  searched(query: string) {
    this.$emit("query", query);
  }

  get processedItems() {
    if (!this.query) return this.items;
    return this.items.filter(this.customFilter);
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

  toggle() {
    if (this.readonly) return;
    this.showDatalist = !this.showDatalist;
  }

  selected(item: any) {
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
  }
  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return `select-${id}`;
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
::placeholder {
  font-size: 0.8em;
  font-weight: 400;
  color: #667499;
}
</style>
