<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full" style="z-index: 999">
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
        <span class="grid grid-cols-3 gap-2 mt-4 border-b-2 pb-3 border-dashed">
          <cornie-radio
            v-model="active"
            value="Clinical Impression"
            name="reference"
            label="Clinical Impression"
          />
          <cornie-radio
            v-model="active"
            value="Diagnostic Reports"
            name="reference"
            label="Diagnostic Reports"
          />
          <cornie-radio
            v-model="active"
            value="Observation"
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
          class="flex items-center cursor-pointer hover:bg-gray-50 rounded-full justify-between py-2 my-1 text-sm"
          :class="{ 'bg-gray-100': isSelected(item) }"
          v-for="(item, i) in items"
          :key="i"
          @click="select(item)"
        >
        <div class="flex items-center w-full" v-if="active == 'Clinical Impression'">
          <span class="w-full">
            <span>{{ item.findings.item  }} <span class="text-gray-400">. {{ item.date }}</span>
            </span>
            <p>{{ item.description  }}</p>
            
          </span>
          <div class="flex justify-end w-full">
            <div>

              <p class="mb-0">{{ getPractitionerName(item.practitionerId)}}</p>
              <p class="text-gray-400">
                {{ getJobName(item.practitionerId)}}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center w-full" v-if="active == 'Observation'">
          <span class="w-full">
            <span>{{ item?.basicInfo?.subject }}
             <span class="text-gray-400">. {{ item.date }}</span>
            </span>
            <p>{{ item?.reasonInfo?.note }}</p>
            
          </span>
          <div class="flex justify-end w-full">
            <div>
              <p class="mb-0">{{ getPractitionerName(item.practitionerId)}}</p>
              <p class="text-gray-400">
                {{ getJobName(item.practitionerId)}}
              </p>
            </div>
          </div>
        </div>
        </div>
      </cornie-card-text>
    
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn @click.prevent="add"   :loading="loading" class="text-white bg-danger px-9 rounded-xl">
          Add
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
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
import IPractitioner from "@/types/IPractitioner";

const practitioner = namespace("practitioner");
const diagnosticReport = namespace("diagnosticReport");

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
  active: "Clinical Impression" | "Diagnostic Reports" | "Observation" = "Clinical Impression";

  @Prop({ type: Object, default: {} })
  selectedValue!: { reference: string; id: string };

  @PropSync("selectedValue", { default: {} })
  selected!: { reference: string; id: string };

  @Prop({ type: String, default: "" })
  patientId!: string;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  rawClinicalImpressions: IClinicalImpression[] = [];
  diagnosticreport = [];
  observations = [];

  get items() {
    switch (this.active) {
      case "Clinical Impression":
        return this.clinicalImpressions;
      case "Diagnostic Reports":
        return this.diagnosticReports;
      case "Observation":
        return this.allObservations;
      default:
        return [];
    }
  }

  setImpression = {} as any;

  loading = false;

  isSelected(impression: IClinicalImpression) {
    return impression.id == this.selected.id;
  }

  select(impression: any) {
    // this.selected = {
    //   id: impression.id!!,
    //   reference: this.active,
    // };
    if(this.active == 'Clinical Impression'){
      this.assesData = {
       id: impression.id,
      name: impression.findings.item,
      reference: this.active,
      description: impression.description,
      practionerName: this.getPractitionerName(impression.practitionerId),
      date: impression.createdAt,
      department:  this.getJobName(impression.practitionerId),
     }

    } else if(this.active == 'Observation')
      this.assesData = {
       id: impression.id,
      name: impression.basicInfo?.subject,
      reference: this.active,
      description: impression.reasonInfo?.note,
      practionerName: this.getPractitionerName(impression.practitionerId),
      date: impression.createdAt,
      department:  this.getJobName(impression.practitionerId),
     }

    
  }

  get clinicalImpressions() {
    const clinicalImpressions = this.query
      ? search.searchObjectArray(this.rawClinicalImpressions, this.query)
      : this.rawClinicalImpressions;
    return clinicalImpressions.map((impression:any) => ({
      ...impression,
      date: this.printDate(impression.createdAt!!),
    }));
  }

  get diagnosticReports(){
      const diagnosticreports = this.query
      ? search.searchObjectArray(this.diagnosticreport, this.query)
      : this.diagnosticreport;
    return diagnosticreports.map((report:any) => ({
      ...report,
      date: this.printDate(report.createdAt!!),
    }));
  }

   get allObservations(){
     console.log('Gello');
      const observations = this.query
      ? search.searchObjectArray(this.observations, this.query)
      : this.observations;
    return observations.map((observation:any) => ({
      ...observation,
      date: this.printDate(observation.createdAt!!),
    }));
  }

  printDate(dateString: string) {
    const date = new Date(dateString);
    const localeDate = date.toLocaleDateString();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return `${localeDate}, ${time}`;
  }

  assesData = {} as any;

  async add() {
    this.$emit('asses-data', this.assesData)
    this.show = false;
  }

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
   getJobName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.department}` : "";
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

  async fetchReport() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/diagnostic/report/patient/${this.patientId}`
      );
      this.diagnosticreport = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching diagnotic report",
        status: "error",
      });
    }
  }

   async fetchObservations() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/observations/`
      );
      this.observations = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching observations",
        status: "error",
      });
    }
  }


  

  mounted() {
  //  this.selectedValue.reference = this.active;
  }

  async created() {
    await this.fetchPractitioners();
    if(this.patientId) await this.fetchReport();
    await this.fetchObservations();
    if(this.patientId) await this.fetchClinicalImpressions();
  }
}
</script>
