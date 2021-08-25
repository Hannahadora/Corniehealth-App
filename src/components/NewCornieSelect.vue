<template>
  <cornie-menu left="0" right="0" top="100%">
    <template #activator="{ on }">
      <cornie-input
        v-bind="$attrs"
        readonly
        v-on="on"
        :modelValue="itemText(selectedItem)"
      >
        <template #append-inner>
          <chevron-down-icon />
        </template>
        <template #label>
          <slot name="label" />
        </template>
      </cornie-input>
    </template>
    <cornie-card class="p-1">
      <div
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(item)"
        :class="{ 'bg-gray-100': isSelected(item) }"
        class="hover:bg-gray-100 cursor-pointer p-2 mb-1 rounded-xl"
      >
        <slot name="item" :item="item">
          {{ itemText(item) }}
        </slot>
      </div>
    </cornie-card>
  </cornie-menu>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import CornieMenu from "./CornieMenu.vue";
import CornieInput from "./CornieInput.vue";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";
import CornieCard from "./cornie-card/index";

type ItemProcessor = (item: any) => any;

@Options({
  name: "cornie-select",
  inheritAttrs: false,
  components: {
    CornieInput,
    CornieMenu,
    ChevronDownIcon,
    ...CornieCard,
  },
})
export default class CornieSelect extends Vue {
  @PropSync("modelValue", { type: Object, default: "" })
  syncedModelValue!: any;

  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Function, default: (item: any) => item })
  itemText!: ItemProcessor;

  @Prop({ type: Function, default: (item: any) => item })
  itemValue!: ItemProcessor;

  selectedItem = null;

  selectItem(item: any) {
    this.selectedItem = item;
    this.syncedModelValue = this.itemValue(item);
  }

  isSelected(item: any): boolean {
    return this.selectedItem == item;
  }

  mounted() {
    let selectedItem = this.items.find(
      (element: any) => this.itemValue(element) == this.syncedModelValue
    );
    if(selectedItem != undefined)
      this.selectItem(selectedItem);
  }
}
</script>

<style>
</style>