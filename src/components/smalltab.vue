<template>
  <div>
    <div class="flex w-full font-semibold mt-5">
      <span class="text-danger text-sm font-semibold float-left flex justify-start w-full">
        <span class="text-lg -mt-1 mr-1">+</span> Create
      </span>
      <div>
        
      </div>
      <template v-for="(tab, index) in items" :key="`tab-${index}`">
        <div class="bg-gray-100 rounded  w-56 h-8 p-1 text-center">
          <span
            class="flex   hover:bg-gray-300 hover:bg-opacity-20  mt-0.5 justify-center text-center"
            :class="syncedValue == index ? ['border-gray-100 w-full pt-0.5 h-5 text-center bg-white'] : ['text-gray-600']"
            @click="syncedValue = index"
          >
        
          <span class="text-center text-xs">

            {{ tab }}
          </span>
       
           
          </span>
        </div>
      </template>
      <span class="flex px-3 w-full space-x-6 pb-2 justify-end float-right">
          <!-- <dots-horizontal-icon /> -->
        <span class="flex space-x-4">
            <span class="text-sm ">{{ new Date(dDate).toLocaleDateString("en-US", options) }}</span>
            <arrow-left @click="$emit('left',syncedValue)" class="cursor-pointer"/>
            <arrow-right @click="$emit('right',syncedValue)" class="cursor-pointer"/>
        </span>
        <span class="text-sm text-primary font-bold border-1 border-primary rounded-lg flex space-x-2 py-2 px-4">
           <filter-icon class="cursor-pointer mr-2" @click="$emit('filter')" />
           Filter
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
