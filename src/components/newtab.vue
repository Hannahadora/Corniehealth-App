<template>
  <div class="">
    <div class="flex mb-12 font-semibold bg-gray-100 rounded-lg py-2 px-2  mt-4" :class="width">
      <template v-for="(tab, index) in items" :key="`tab-${index}`">
        <span
          class="flex py-1 px-14  rounded-lg text-sm cursor-pointer text-black hover:bg-gray-300 hover:bg-opacity-20"
          :class="syncedValue == index ? ['bg-white font-semibold'] : ['font-light']"
          @click="syncedValue = index"
        >
          {{ tab }}
        </span>
      </template>
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

  @Prop({ type: String, default: 'w-1/3' })
  width!: string;

  isActive(index: number): boolean {
    return index == this.syncedValue;
  }

  mounted() {}
}
</script>
