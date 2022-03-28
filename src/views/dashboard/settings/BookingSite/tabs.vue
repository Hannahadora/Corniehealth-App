<template>
  <div class="nav-tabs">
    <div class="w-full font-semibold nav-tabs mx-auto mt-4">
      <!-- <chevron-left-icon
        class="righticon cursor-pointer"
        @click="scroll_right"
      /> -->
      <div class="flex items-center space-x-7 w-full border-b-4">
        <template v-for="(tab, index) in items" :key="`tab-${index}`">
          <span
            class="flex px-3 py-2 text-gray-400 cursor-pointer text-xxs -m-1"
            :class="{'border-b-4 border-red-500 text-gray-900' : syncedValue == index}"
            @click="syncedValue = index"
          >
            {{ tab }}
          </span>
        </template>
      </div>
      <!-- <chevron-right-icon
        class="lefticon cursor-pointer"
        @click="scroll_left"
      /> -->
      <!-- <span class="flex px-3 pb-2 border-b-4 flex-grow"></span> -->
    </div>
    <tab :vnode="$slots.default()[syncedValue]" />
  </div>
</template>

<script lang="ts">
import { VNode } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
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
    ChevronRightIcon,
    ChevronLeftIcon,
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
<style scoped>
.righticon {
  margin-top: 16px;
}
.lefticon {
  margin-top: 16px;
}
.text-xxs {
  font-size: 0.8rem;
  line-height: 1rem;
}
.nav-tabs {
  flex-wrap: nowrap;
  white-space: nowrap;
  max-width: 2000px;
  overflow: auto;
  cursor: pointer;
}
::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border-radius: 2rem;
  border-color: #ffffff;
}
::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border-radius: 2rem;
  border-color: #ffffff;
}
::-webkit-scrollbar-thumb {
  height: 0.5rem;
  outline: 1px solid white;
}
.nav-tabs {
  border-bottom: 4px solid #ffffff;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgb(255 255 255 / 30%);
  width: 0.75rem;
}
</style>
