<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded-2xl w-full"
    :style="{ height }"
  >
    <div class="w-full p-2">
      <span class="flex w-full justify-between mb-2 text-primary py-2">
        <span class="font-bold text-2xl">{{ title }}</span>
        <div class="flex items-center">
          <span
            class="mx-2 text-sm font-semibold cursor-pointer"
            style="color: #fe4d3c"
            @click="$emit('more')"
          >
            {{ action }}
          </span>
        </div>
      </span>
      <span class="text-sm font-bold" style="color: #667499">{{
        subtitle
      }}</span>
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
  emits: ["more"],
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
