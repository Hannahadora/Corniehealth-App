<template>
  <div
    class="grid card-grid bg-white shadow-md p-2 mt-2 mb-2 rounded w-full"
    :style="{ height }"
  >
    <div class="w-full p-2">
      <span class="flex w-full justify-between text-xs text-gray-400 py-2">
        <div class="font-bold text-sm">
          <span class="text-primary pr-1">
            {{ title }}
          </span>
          <span class="text-danger">({{ count || 0 }})</span>
        </div>
        <div class="flex items-center cursor-pointer" @click="$emit('add')">
          <add-icon />
        </div>
      </span>
    </div>
    <div class="flex flex-col px-2 justify-center items-center" v-if="empty">
      <slot name="empty" />
    </div>
    <div class="flex flex-col px-2 overflow-y-hidden" v-else>
      <slot />
    </div>
    <div
      @click="$emit('view:all')"
      class="
        w-full
        cursor-pointer
        flex
        justify-end
        text-sm
        font-semibold
        text-danger
      "
    >
      {{ more }}
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

  @Prop({ type: Number, default: 0 })
  count!: number;

  @Prop({ type: String, default: "View all" })
  more!: number;

  get empty() {
    return this.count < 1;
  }
}
</script>
<style scoped>
.card-grid {
  grid-template-rows: 3rem 1fr 1.5rem;
}
</style>
