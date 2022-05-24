<template>
  <div class="flex flex-col items-center w-full mb-5">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
          <div class="w-full" @click="toggle">
            <label
              v-if="label || $slots.label"
              class="block capitalize mb-1 text-black text-sm font-semibold"
              :for="`${id}-inputfield`"
            >
              <slot name="label" v-if="$slots.label" />
              <template v-else>
                {{ label }}
              </template>
              <span class="text-danger ml-1" v-if="required"> * </span>
            </label>
            <field
              v-slot="{ errorMessage, meta, handleChange }"
              :rules="rules"
              v-model="modelValueSync"
              :name="inputName"
            >
              <div
                v-bind="$attrs"
                :class="{
                  'border-red-500': Boolean(errorMessage),
                  'border-green-400': meta.valid && meta.touched,
                }"
                class="p-1 bg-white flex border-1 border-gray-300 rounded-md"
              >
                <span v-if="Boolean($slots.selected)">
                  <slot name="selected" :item="selectedItem" />
                </span>
                <input
                  v-else
                  :placeholder="$attrs.placeholder"
                  disabled
                  :value="displayVal"
                  class="p-1 pl-2 bg-transparent appearance-none outline-none w-full text-gray-800"
                  @change="handleChange"
                />

                <div class="text-gray-300 py-1 pr-1 flex items-center border-gray-200">
                  <chevron-down-icon />
                </div>
              </div>
              <span v-if="errorMessage" class="text-xs text-red-500 block">
                {{ errorMessage }}
              </span>
            </field>
          </div>
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
                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
              >
                <template v-if="Boolean($slots.item)">
                  <slot name="item" v-bind:item="item" />
                </template>
                <div
                  v-else
                  class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
                >
                  <check-box
                    v-model="item.checked"
                    class="mr-2"
                    @click="selected(item)"
                  />
                  <div>{{ item.display || item }}</div>
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
import CheckBox from "@/components/custom-checkbox.vue";
import { IndexableObject } from "@/lib/http";

@Options({
  components: {
    ChevronDownIcon,
    Field,
    IconInput,
    SearchIcon,
    CheckBox,
  },
  emits: ["query", "handleSelectedItems"],
})
export default class AutoComplete extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Object })
  rules!: any;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: any[];

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
    const {
      code,
      display,
      checked,
    }: { code: string; display: string; checked: boolean } = item;
    return (
      `${code}`.toLowerCase().includes(this.query.toLowerCase()) ||
      `${display}`.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  showDatalist = false;
  id = "";

  query = "";

  checked = "";

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
    return this.selectedItem || selected || "";
  }

  selectedItems = [] as any;

  get selectedItem() {
    let selected = "";

    if (!this.selectedItems.length) return;
    for (let i = 0; i < this.selectedItems.length; i++) {
      let isFirst = Boolean(i === 0);
      selected += `${!isFirst ? "," : ""}${this.selectedItems[i]?.display}`;
    }

    return selected;
  }

  toggle() {
    if (this.readonly) return;
    this.showDatalist = !this.showDatalist;
  }

  selected(item: any) {
    nextTick(() => {
      let selected = this.items.find((i: any) => i.code === item.code);

      let isAdded = this.selectedItems.some((i: any) => i.code === item.code);

      if (isAdded) {
        this.selectedItems = this.selectedItems.filter((i: any) => i.code !== item.code);
        selected.checked = false;
      } else {
        this.selectedItems.push(item);
        selected.checked = true;
      }

      this.$emit("handleSelectedItems", this.selectedItems);
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
