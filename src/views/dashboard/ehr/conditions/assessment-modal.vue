<template>
  <cornie-dialog v-model="show" center class="w-2/4 h-2/3" style="z-index: 999">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Assessment
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <div class="px-4">
        <span class="capitalize font-bold text-sm"> Reference </span>
        <span class="grid grid-cols-3 gap-2 mt-2 border-b-2 pb-3 border-dashed">
          <cornie-radio
            v-model="active"
            value="impression"
            name="reference"
            label="Clinical Impression"
          />
          <cornie-radio
            v-model="active"
            value="diagnosis"
            name="reference"
            label="Diagnostic Reports"
          />
          <cornie-radio
            v-model="active"
            value="observation"
            name="reference"
            label="Observation"
          />
        </span>
      </div>
      <div class="mt-2 px-4 block">
        <search-input class="" v-model="query" />
      </div>
      <cornie-card-text class="overflow-y-auto flex-col">
        <div
          class="flex items-center cursor-pointer hover:bg-gray-100 rounded-md justify-between py-2 my-1 text-sm px-2"
          :class="{ 'bg-gray-200': isSelected(item) }"
          v-for="(item, i) in items"
          :key="i"
          @click="select(item)"
        >
          <span class="flex-col flex">
            <span>{{ item.id }}</span>
            {{ item.description }}
          </span>
          <span>
            <span class="text-gray-500">{{ item.date }}</span>
          </span>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn @click="add" class="text-white bg-danger px-9 rounded-xl">
          Add
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SearchInput from "@/components/search-input.vue";
import { IClinicalImpression } from "@/types/ClinicalImpression";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

@Options({
  name: "AssessmentModal",
  components: {
    CornieDialog,
    SearchInput,
    CornieRadio,
    ArrowLeftIcon,
    ...CornieCard,
    DeleteIcon,
  },
})
export default class AssessmentModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: false;

  query = "";
  active: "impression" | "diagnosis" | "observation" = "impression";

  @Prop({ type: Object, default: {} })
  selectedValue!: { reference: string; id: string };

  @PropSync("selectedValue", { default: {} })
  selected!: { reference: string; id: string };

  @Prop({ type: String, default: "" })
  patientId!: string;

  rawClinicalImpressions: IClinicalImpression[] = [];

  get items() {
    switch (this.active) {
      case "impression":
        return this.clinicalImpressions;
      default:
        return [];
    }
  }

  isSelected(impression: IClinicalImpression) {
    return impression.id == this.selected.id;
  }

  select(impression: IClinicalImpression) {
    this.selected = {
      id: impression.id!!,
      reference: this.active,
    };
  }

  get clinicalImpressions() {
    const clinicalImpressions = this.query
      ? search.searchObjectArray(this.rawClinicalImpressions, this.query)
      : this.rawClinicalImpressions;
    return clinicalImpressions.map((impression) => ({
      ...impression,
      date: this.printDate(impression.createdAt!!),
    }));
  }

  printDate(dateString: string) {
    const date = new Date(dateString);
    const localeDate = date.toLocaleDateString();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return `${localeDate}, ${time}`;
  }

  add() {
    this.show = false;
  }

  async fetchClinicalImpressions() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/clinical-impressions/findAllByPatient/${this.patientId}`
      );
      this.rawClinicalImpressions = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's clinical impressions",
        status: "error",
      });
    }
  }

  mounted() {
    this.selectedValue.reference = this.active;
  }

  created() {
    this.fetchClinicalImpressions();
  }
}
</script>
