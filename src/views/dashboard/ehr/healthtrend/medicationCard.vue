<template>
  <detail-card
    height="337px"
    @view:all="
      $router.push(`/dashboard/provider/clinical/${patientId}/medications`)
    "
    @add="showMedication"
    more="View all"
    title="Medications"
    :showTotal="true"
    :count="totalMedication"
  >
    <div
      class="flex flex-col items-center justify-center my-auto"
      v-if="items?.length === 0"
    >
      <img class="mb-3" src="@/assets/img/no-medication-trend.svg" alt="" />
      <p class="text-sm text-center" style="color: #667499">No Medications</p>
    </div>
    <div class="p-2">
      <div class="w-full grid grid-cols-1 gap-y-4">
        <div
          class="w-full flex items-center justify-between pb-2 border-b"
          v-for="(input, index) in items.slice(0,2)"
          :key="index"
        >
          <div class="w-full flex space-x-2 items-center">
            <drug-icon />
            <div class="text-xs flex flex-col">
              <span class="font-semibold text-sm mb-2 text-primary">
                {{ input.medicationCode }}
              </span>
              <span class="">
                <span class="text-gray-500">
                  <h3>{{ input.dosageInstruction }}</h3></span
                >
                <!-- <span class="text-gray-600">
                          | 45 respondent | 45 feedback |
                        </span> -->
              </span>
            </div>
          </div>
          <div class="text-xs text-primary">
            <span class="flex items-center">
              <chevron-right-icon />
              <!-- Details
                      <chevron-down-icon
                        class="ml-2 stroke-current cursor-pointer text-danger"
                      /> -->
            </span>
          </div>
        </div>

        <!-- <div class="w-full flex justify-end pb-2">
              <div class="text-xs text-danger font-semibold">
                <span class="cursor-pointer" >
                  View all
                </span>
              </div>
            </div> -->
      </div>
    </div>
  </detail-card>
  <medication-modal :columns="practitioner" v-model="showMedicationModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import Avatar from "@/components/avatar.vue";
import AddIcon from "@/components/icons/add.vue";
import DrugIcon from "@/components/icons/drug.vue";
import NodrugIcon from "@/components/icons/nodrug.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import { string } from "yup/lib/locale";
import MedicationModal from "@/views/dashboard/ehr/medication/medicationModal.vue";
const request = namespace("request");

@Options({
  name: "MedicationCard",
  components: {
    DetailCard,
    Avatar,
    MedicationModal,
    AddIcon,
    DrugIcon,
    NodrugIcon,
    // ArrowRightIcon,
    ChevronRightIcon,
  },
})
export default class MedicationCard extends Vue {
  photo = require("@/assets/img/avatar.png");
  medicationMapper = (code: string) => "";
  dosageInstructions = "";

  @request.State
  patientrequests!: any;

  @request.Action
  fetchrequestsById!: (patientId: string) => Promise<void>;

  showMedicationModal = false;
  async showMedication() {
    this.showMedicationModal = true;
  }
  get newmedicationrequest() {
    return this.patientrequests.slice(0, 3);
  }
  get patientId() {
    return this.$route.params.id as string;
  }

  get sortMedications() {
    return this.items.slice().sort(function (a: any, b: any) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  get totalMedication() {
    return this.patientrequests?.length;
  }
  oldclinicalStatus = "";

  async createMapper() {
    this.medicationMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/medication-codes"
    );
  }

  get items() {
    const newmedicationrequest = this.newmedicationrequest?.map(
      (medication: any) => {
        medication?.Medications?.map((codeme: any) => {
          this.oldclinicalStatus = this.medicationMapper(
            codeme.medicationDetails.medicationCode
          );
          this.dosageInstructions = codeme.medicationDetails.dosageInstruction;

          return {
            ...codeme,
            medicationCode: this.oldclinicalStatus,
          };
        });
        return {
          ...medication,
          medicationCode: this.oldclinicalStatus,
          dosageInstruction: this.dosageInstructions,
        };
      }
    );
    return newmedicationrequest;
  }

  async created() {
    await this.createMapper();
    await this.fetchrequestsById(this.patientId);
  }
}
</script>
