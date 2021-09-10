<template>
  <cornie-dialog v-model="show" right class="w-1/3 h-full">
    <cornie-card height="100%" class="flex flex-col overflow-auto relative">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="
            text-primary
            font-extrabold
            text-lg
            border-l-2 border-gray-100
            pl-2
          "
        >
          Advanced filters
        </span>
      </cornie-card-title>
      <filter-box class="mb-3" title="Filter by Locations" :opened="true" />
      <filter-box
        class="mb-3"
        title="Filter by Gender"
        :opened="true"
        :searchable="false"
        :items="genderOptions"
      />
      <date-filter class="mb-3" title="Filter D.O.B" />
      <filter-box class="mb-3" title="Profile Type" />
      <filter-box class="mb-3" title="Filter by Payer" />
      <filter-box class="mb-3" title="Filter by Provider" />
      <filter-box class="mb-3" title="Filter by Specialty" />

      <cornie-card class="px-4 mt-auto fixed">
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            class="border-primary border-2 px-4 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            type="submit"
            class="text-white bg-danger px-4 rounded-xl"
          >
            Apply
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import SearchInput from "@/components/search-input.vue";
import FilterBox from "./filter-boxes.vue";
import DateFilter from "./date-filter.vue";

@Options({
  name: "PatientAdvancedFilter",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieBtn,
    ChevronDownIcon,
    SearchInput,
    FilterBox,
    DateFilter,
  },
})
export default class AdvancedFilter extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  genderOptions = ["Male", "Female", "Unidentified"];
}
</script>
