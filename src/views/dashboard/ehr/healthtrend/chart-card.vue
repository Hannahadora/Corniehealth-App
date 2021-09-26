<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
    "
    :style="{ height }"
  >
    <div class="w-full p-2">
      <span
        class="flex w-full justify-between mb-5 text-xs text-gray-400 py-2"
      >
        <span class="font-medium text-xs">{{ title }}</span>
        <div class="flex items-center">
          <span class="mx-2">{{ order }}</span>
          <chevron-down-icon
            @click="filter = !filter"
            class="stroke-current cursor-pointer text-danger"
          />
          <drop-down v-model="filter">
            <div class="text-base font-semibold grid grid-cols-1 gap-2">
              <span class="cursor-pointer" @click="order = 'Today'">Today</span>
              <span class="cursor-pointer" @click="order = 'WTD'">WTD</span>
              <span class="cursor-pointer" @click="order = 'MTD'">MTD</span>
              <span class="cursor-pointer" @click="order = 'YTD'">YTD</span>
            </div>
          </drop-down>
        </div>
      </span>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import DropDown from "@/components/drop-down.vue";
import { Prop } from "vue-property-decorator";

@Options({
  name: "ChartCard",
  components: {
    ChevronDownIcon,
    DropDown,
  },
})
export default class ChartCard extends Vue {
  filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  height!: string;
}
</script>
