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
        <span class="text-primary font-bold text-sm">{{ title }}</span>
        <div class="flex items-center">
            <span class="cursor-pointer"><add-icon/></span>
        </div>
      </span>
      <slot />
    </div>

    <side-modal :visible="showModal" :header="'New Procedure'" :width="990"  @closesidemodal="() => showModal = false">
      <div class="w-full px-4">
          <new-procedure  @closesidemodal="() => showModal = false" />
      </div>
    </side-modal>
      
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { Prop } from "vue-property-decorator";

import AddIcon from "@/components/icons/add.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue"
import NewProcedure from "@/views/dashboard/ehr/procedures/components/new-procedure.vue"

@Options({
  name: "DetailCard",
  components: {
    ChevronDownIcon,
    AddIcon,
    SideModal,
    NewProcedure,
  },
})
export default class DetailCard extends Vue {
  filter = false;

  showModal = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  height!: string;
}
</script>
