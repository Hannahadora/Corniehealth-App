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
        <span class="text-primary font-bold text-sm">{{ title }} <span v-if="showTotal" class="font-bold text-sm text-danger">({{total}})</span> </span>
        <div class="flex items-center">
             <slot name="actions"/>
        </div>
      </span>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { Prop } from "vue-property-decorator";

import AddIcon from "@/components/icons/add.vue";



@Options({
  name: "DetailCard",
  components: {
    ChevronDownIcon,
    AddIcon,
  },
})
export default class DetailCard extends Vue {
  filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Number, default: 0 })
  total!: number;

  @Prop({ type: Boolean, default: false })
  showTotal!: boolean;

  @Prop({ type: String, default: "" })
  height!: string;
}
</script>
