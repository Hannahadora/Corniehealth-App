<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded-2xl w-full"
    :style="{ height }"
  >
    <div class="w-full p-2">
      <span
        class="flex w-full justify-between mb-2 text-primary py-2"
      >
        <span class="font-bold text-2xl">{{ title }}</span>
        <div class="flex items-center">
          <span class="mx-2 text-sm font-semibold cursor-pointer" style="color: #FE4D3C;">{{ action }}</span>
          <!-- <span class="mx-2">{{ order }}</span> -->
          <!-- <chevron-down-icon
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
          </drop-down> -->
        </div>
      </span>
      <span class="text-sm font-bold" style="color: #667499;">{{ subtitle }}</span>
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

  // order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  subtitle!: string;

  @Prop({ type: String, default: "" })
  action!: string;

  @Prop({ type: String, default: "" })
  height!: string;
}
</script>
