<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newAction }} Diagnostic Report
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col gap-10" @submit="submit">
          <accordion-component
            class="text-primary"
            title="General"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 w-full mt-5">
              <cornie-select
                class="w-full"
                label="Status"
                placeholder="status"
                v-model="reportModel.status"
                :items="statuses"
              />

              <cornie-input
                class="w-full"
                label="Specimen Id"
                placeholder="Specimen Id"
                v-model="reportModel.specimenId"
                :disabled="true"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                label="Based On"
                placeholder="Autoloaded or Enter Alphanumeric ID"
                v-model="reportModel.basedOn"
                :disabled="true"
              />

              <cornie-input
                class="w-full"
                label="Category"
                placeholder="Category"
                v-model="reportModel.category"
                :disabled="true"
                :rules="required"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/report-codes"
                class="required w-full"
                label="Code"
                v-model="reportModel.code"
                placeholder="Code"
              />

              <cornie-select
                class="w-full"
                label="Patient"
                placeholder="Patient"
                v-model="reportModel.patientId"
                :items="allPatients"
              />
              <cornie-input
                class="w-full"
                label="Encounter"
                placeholder="Autogenrated"
                v-model="reportModel.encounter"
                :disabled="true"
                :rules="required"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Effective"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-3 mt-5 w-1/2">
              <cornie-radio
                v-model="type"
                label="Date/Time"
                value="date-time"
              />
              <cornie-radio v-model="type" value="period" label="Period" />
            </div>
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-time-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="effective.period.startTime"
                v-model:time="effective.period.time1"
                v-if="type == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="effective.period.endTime"
                v-model:time="effective.period.time2"
                v-if="type == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="Date/Time"
                v-model:date="effective.date"
                v-model:time="effective.time"
                v-if="type == 'date-time'"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Issue Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <div class="col-span-2 grid grid-cols-2 gap-6">
                <date-time-picker
                  class="w-full"
                  label="Issued"
                  v-model:date="reportModel.issued.date"
                  v-model:time="reportModel.issued.time"
                />
              </div>
              <practioner-select
                class="w-full mb-2"
                label="Performer"
                v-model="reportModel.performerId"
              >
              </practioner-select>
              <practioner-select
                class="w-full mb-2"
                label="Result Interpreter"
                v-model="reportModel.interpreterId"
              >
              </practioner-select>
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Result"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-select
                class="w-full"
                label="Reference Observation"
                placeholder="Reference Observation"
                v-model="obs"
                :items="observations"
              />
              <choose-file class="w-full" label="Media" @uploaded="getFile" />
            </div>
            <div class="flex flex-col space-y-3 pb-5">
              <cornie-input
                class="w-full"
                label="Comment"
                placeholder="Comment"
                v-model="result.comments"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                label="Imaging Studying"
                placeholder="Imaging Studying"
                v-model="result.imaging_Study"
                :rules="required"
              />
            </div>

            <div class="flex items-center my-6 justify-end">
              <plus-icon />
              <span class="text-danger text-sm ml-2" @click="addResult"
                >Add</span
              >
            </div>

            <div v-if="collectedResults.length > 0">
              <div class="w-full flex items-center py-5">
                <div
                  class="w-4/12"
                  v-for="(result, index) in collectedResults"
                  :key="index"
                >
                  <p class="capitalize text-red-500 text-sm font-medium">
                    {{ result?.observation }}
                  </p>
                  <div
                    class="w-11/12 mt-4"
                    style="border-right: 1px dashed #878e99"
                  >
                    <div class="w-full flex items-center">
                      <div class="w-8/12 flex flex-col text-sm">
                        <img :src="result?.image" />
                        <div class="" style="font-size: 10px">
                          <span class=""> {{ result?.imaging_Study }}</span>
                        </div>
                        <div class="" style="font-size: 10px">
                          <span class=""> {{ result?.comments }}</span>
                        </div>
                      </div>
                      <div class="w-4/12 flex items-center justify-center">
                        <span class="mx-2 cursor-pointer"><edit-icon /></span>
                        <span class="mx-2 cursor-pointer"
                          ><delete-icon
                            @click="removeItem(index, collectedResults)"
                        /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Conclusion"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-select
                class="w-full"
                label="Conclusion"
                placeholder="Conclusion"
                v-model="reportModel.conclusion.conclusion"
                :items="[]"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/clinical-findings"
                class="required w-full"
                label="Conclusion Code"
                v-model="reportModel.conclusion.conclusionCode"
                placeholder="Conclusion Code"
              />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import AutoComplete from "@/components/autocomplete.vue";
import CornieCard from "@/components/cornie-card";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import FhirInput from "@/components/fhir-input.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import PractionerSelect from "@/components/practitioner-select.vue";
import { cornieClient } from "@/plugins/http";
import { IPatient } from "@/types/IPatient";
import uploader from "@/views/dashboard/ehr/attachments/uploader.vue";
import ChooseFile from "@/views/dashboard/settings/kyc/components/choose-file.vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");
const patients = namespace("patients");
const report = namespace("diagnosticReport");

@Options({
  name: "DiagnosticReportDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    CancelIcon,
    AccordionComponent,
    PlusIcon,
    PractionerSelect,
    uploader,
    FhirInput,
    ChooseFile,
  },
})
export default class DiagnosticReportDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: string })
  reportId!: string;

  @Prop({ type: string })
  requestId!: string;

  @Prop({ type: string, default: <any>{} })
  report!: {};

  @Prop({ type: string, default: <any>{} })
  request!: {};

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @report.Action
  createDReport!: (s: any) => Promise<void>;

  required = string().required();

  loading = false;
  opened = true;
  type = "date-time";

  issuedDate = "";
  issuedTime = "";

  reference = "";
  salesDate = 0;
  customers = "";
  types = "";
  observations: any = [];
  allObservations: any = [];
  file = "";
  fileInfo = "";
  obs = "";
  result = {
    observation: this.findObservationId(this.obs),
    image: "",
    comments: "",
    imaging_Study: "",
  };
  collectedResults = <any>[];

  reportModel = {
    id: "",
    status: (this.request as any).status,
    patientId: (this.request as any).patientId,
    specimenId: "",
    basedOn: (this.request as any).id,
    category: "",
    code: "",
    effective: {
      dateTime: undefined,
      period: {
        start: undefined,
        end: undefined,
      },
    },
    issued: {
      date: "",
      time: "",
    },
    performerId: "",
    interpreterId: "",
    result: <any>[],
    conclusion: {
      conclusion: "",
      conclusionCode: "",
    },
  };

  effective = {
    date: "",
    time: "",
    period: {
      startTime: "",
      endTime: "",
      time1: "",
      time2: "",
    },
  };

  // @Watch("obs")
  // setObservations() {
  //   if (this.obs !== "" || this.obs !== undefined) {
  //     this.result.observation = this.findObservationId(this.obs);
  //   }
  // }

  @Watch("reportId")
  reportIdChanged() {
    if (this.reportId) {
      this.setDiagnoticRecord();
    }
  }

  get statuses() {
    return [
      "Registered",
      "Partial",
      "Preliminary",
      "Final",
      "Ammended",
      "Corrected",
      "Appended",
      "Cancelled",
      "Entered-in-Errors",
      "Unknown",
    ];
  }

  get newAction() {
    return this.reportId ? "Update" : "Create New";
  }

  get allPatients() {
    return this.patients.map((x) => x.firstname + " " + x.lastname);
  }

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  findObservationId(g: any) {
    console.log(
      "fff",
      this.allObservations.find((x: any) => x.reasonInfo.note == g)
    );
    return this.allObservations.length > 0
      ? this.allObservations.find((x: any) => x.reasonInfo.note == g).id
      : "";
    // return "";
  }
  addResult() {
    if (this.result.image && this.result?.comments) {
      this.collectedResults.push(this.result);
      this.result = {
        observation: this.findObservationId(this.obs),
        image: "",
        comments: "",
        imaging_Study: "",
      };
    }
  }
  removeItem(index: number, items: any) {
    items.splice(index, 1);
  }
  async fetchObservations() {
    try {
      const data = await cornieClient().get(`/api/v1/observations`);
      this.allObservations = data.data;
      if (this.allObservations.length > 0) {
        this.observations = this.allObservations.map((x: any) => {
          return x.reasonInfo.note;
        });
      } else {
        this.observations = [];
      }
    } catch (error) {
      window.notify({
        msg: "There was an error fetching observations",
        status: "error",
      });
    }
  }

  findePatientId(name: string) {
    if (!name) return "";
    return this.patients.find((x) => x.firstname + " " + x.lastname == name)
      ?.id;
  }

  getFile(fileUrl: any) {
    this.result.image = fileUrl;
  }

  setDiagnoticRecord() {
    if (this.report as any) {
      (this.reportModel as any) = this.report;
      this.reportModel.conclusion = (this.report as any).conclusion;
      this.collectedResults = (this.report as any).result;
    }
  }

  get payload() {
    return {
      status: this.reportModel.status
        ? this.reportModel.status.toLocaleLowerCase()
        : "final",
      patientId: this.findePatientId(this.reportModel?.patientId),
      // practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      // specimenId: this.reportModel.specimenId,
      basedOn: this.reportModel.basedOn,
      category: this.reportModel.category,
      code: this.reportModel.code,
      effective:
        this.type == "date-time"
          ? { date: this.effective.date }
          : {
              period: {
                startTime: this.effective.period.startTime,
                endTime: this.effective.period.endTime,
              },
            },
      issueDate:
        this.reportModel?.issued?.date + this.reportModel?.issued?.time,
      performerId: this.reportModel.performerId,
      interpreterId: this.reportModel.interpreterId,
      result: this.collectedResults,
      conclusion: {
        conclusion: this.reportModel?.conclusion?.conclusion,
        conclusionCode: this.reportModel?.conclusion?.conclusionCode,
      },
    };
  }

  submit() {
    this.loading = true;
    this.createDReport(this.payload);
    this.loading = false;
  }

  async ceated() {
    await this.fetchPatients().then(async () => {
      await this.fetchObservations();
    });
    if (this.reportId) {
      this.setDiagnoticRecord();
    }
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
