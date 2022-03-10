<template>
  <div
    v-for="(tab, index) in items"
    :key="`tab-${index}`"
    class="px-1 py-0.5 my-2 border-l-2 text-xs cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 block"
    :class="syncedValue == index ? ['border-danger'] : ['border-transparent']"
    @click="syncedValue = index"
  >
    <span>
      {{ tab }}
    </span>
  </div>
  <!-- <tab :vnode="$slots.default()[syncedValue]" /> -->
</template>

<script lang="ts">
import { VNode } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "tab",
})
class Tab extends Vue {
  @Prop()
  vnode!: VNode;

  render() {
    return this.vnode;
  }
}

@Options({
  name: "tabs",
  components: {
    Tab,
  },
})
export default class Tabs extends Vue {
  @Prop()
  items!: string[];

  @PropSync("modelValue", { type: Number, default: 0 })
  syncedValue!: number;

  isActive(index: number): boolean {
    return index == this.syncedValue;
  }

  mounted() {}
}
</script>
