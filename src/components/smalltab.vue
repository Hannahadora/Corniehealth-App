<template>
  <div>
    <div class="flex w-full font-semibold py-2 mx-auto mt-4">
      <template v-for="(tab, index) in items" :key="`tab-${index}`">
        <span
          class="flex px-3 py-2 border-b-4  text-sm cursor-pointer hover:bg-gray-300 hover:bg-opacity-20"
          :class="syncedValue == index ? ['border-gray-100 bg-white'] : ['text-gray-500 bg-gray-100']"
          @click="syncedValue = index"
        >
          {{ tab }}
        </span>
      </template>
      <span class="flex px-3 space-x-6 pb-2 flex-grow justify-end float-right">
          <dots-horizontal-icon />
        <filter-icon class="cursor-pointer" @click="$emit('filter')" />
        <span class="flex space-x-4">
            <arrow-left @click="$emit('left',syncedValue)" class="cursor-pointer"/>
            <span class="text-sm">{{ new Date(dDate).toLocaleDateString("en-US", options) }}</span>
            <arrow-right @click="$emit('right',syncedValue)" class="cursor-pointer"/>
        </span>
      </span>
    </div>
    <tab :vnode="$slots.default()[syncedValue]" />
  </div>
</template>

<script lang="ts">
import { VNode } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
import DotsVerticalIcon from "@/components/icons/DotsVerticalIcon.vue";
import FilterByIcon from "@/components/icons/FilterByIcon.vue";
import FilterIcon from "@/components/icons/filter.vue";
import ArrowLeft from "@/components/icons/grayarrow.vue";
import ArrowRight from "@/components/icons/orangearrow.vue";
;

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
    FilterByIcon,
    DotsHorizontalIcon,
    FilterIcon,
    ArrowLeft,
    ArrowRight
  },
})
export default class Tabs extends Vue {
  @Prop()
  items!: string[];

  @PropSync("modelValue", { type: Number, default: 0 })
  syncedValue!: number;

  @Prop({ type: String, default: "" })
  dDate!: string;

  isActive(index: number): boolean {
    return index == this.syncedValue;
  }
 options = {
        weekday: "long", //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: "numeric",
        month: "long", //to display the full name of the month
        year: "numeric"
}
  mounted() {}
}
</script>
