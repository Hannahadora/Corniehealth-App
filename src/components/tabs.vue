<template>
  <div>
    <div class="md:flex w-full font-semibold py-2 mx-auto mt-4">
      <template v-for="(tab, index) in items" :key="`tab-${index}`">
        <span
          class="block md:flex px-3 py-2 border-b-4  text-sm cursor-pointer hover:bg-gray-300 hover:bg-opacity-20"
          :class="syncedValue == index ? ['border-danger text-black font-semibold'] : ['text-gray-400']"
          @click="syncedValue = index"
        >
          {{ tab }}
        </span>
      </template>
      <span class="block md:flex px-3 pb-2 md:border-b-4 flex-grow"></span>
    </div>
    <tab :vnode="$slots.default()[syncedValue]" />
  </div>
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
