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
            {{ newaction }} Impression
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form
          class="flex-grow flex flex-col border-b-2 pb-5 border-dashed border-gray-200"
        >
          <!-- <p class="text-gray-400 text-xs p-3 -mt-5 -mb-5">
            Fields with <span class="text-danger">*</span> are required
          </p> -->
          <accordion-component
            class="text-primary"
            title="Basic Info"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full my-3">
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-codes"
                class="w-full"
                label="Code"
                placeholder="Select"
                v-model="basicInfo.code"
              />
              <cornie-input
                label="Description"
                class="w-full"
                v-model="basicInfo.description"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Effective"
            :opened="true"
          >
            <div class="grid grid-cols-3 gap-3 mt-6 w-1/2">
              <cornie-radio
                name="effective"
                v-model="effectiveType"
                label="Date/Time"
                value="date-time"
              />
              <cornie-radio
                name="effective"
                v-model="effectiveType"
                value="period"
                label="Period"
              />
            </div>
            <div
              v-if="effectiveType === 'date-time'"
              class="grid grid-cols-2 gap-4 w-full mt-5"
            >
              <div class="w-full mt-5">
                <date-time-picker
                  v-model:date="data.date"
                  v-model:time="data.dateTime"
                  label="Date/Time"
                  width="w-11/12"
                />
              </div>
            </div>
            <div
              v-else-if="effectiveType === 'period'"
              class="grid grid-cols-2 gap-6"
            >
              <div class="w-full mt-5">
                <date-time-picker
                  v-model:date="data.startDate"
                  v-model:time="data.startTime"
                  label="Start Date/Time"
                  width="w-11/12"
                />
              </div>
              <div class="w-full mt-5">
                <date-time-picker
                  v-model:date="data.endDate"
                  v-model:time="data.endTime"
                  label="End Date/Time"
                  width="w-11/12"
                />
              </div>
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Recorded"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <div class="w-full">
                <date-time-picker
                  v-model:date="recordedDate"
                  v-model:time="recordedTime"
                  label="Recorded Date"
                  width="w-11/12"
                />
              </div>

              <div>
                <div class="w-full relative">
                  <div class="absolute right-4 -top-3">
                    <cornie-checkbox
                      v-model="assertRecord"
                      :label="'Assert this record'"
                    />
                  </div>
                  <div class="flex w-full items-center">
                    <div class="w-11/12">
                      <cornie-input
                        disabled
                        label="assessor"
                        placeholder="Autoloaded"
                        class="w-full mr-2"
                        style="border-radius: 8px"
                        v-model="asessor"
                      />
                    </div>
                    <img
                      src="@/assets/img/asseor-update.svg"
                      class="ml-2 mt-5"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <cornie-select
                class="w-full"
                label="previous"
                :items="previousImpressions"
                v-model="recorded.previous"
              >
              </cornie-select>

              <div
                class="w-full cursor-pointer"
                @click="showProblemModal = true"
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Problem"
                  readonly
                  @click="showProblemModal = true"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
            </div>

            <div v-if="conditionItems.length > 0">
              <div class="w-full flex items-center py-5">
                <div
                  class="w-4/12"
                  v-for="(record, index) in conditionItems"
                  :key="index"
                >
                  <p class="capitalize text-red-500 text-sm font-medium">
                    {{ record?.referenceType }}
                  </p>
                  <div
                    class="w-11/12 mt-4"
                    style="border-right: 1px dashed #878e99"
                  >
                    <div class="w-full flex items-center">
                      <div class="w-8/12 flex flex-col text-sm">
                        <span class="font-semibold">{{
                          record?.description
                        }}</span>
                        <div class="" style="font-size: 10px">
                          <span class=""> {{ record?.practitioner }} - </span>
                          <span class="text-gray-500">{{
                            record?.practitionerSpecialty
                          }}</span>
                        </div>
                      </div>
                      <div class="w-4/12 flex items-center justify-center">
                        <span class="mx-2 cursor-pointer"><edit-icon /></span>
                        <span class="mx-2 cursor-pointer"
                          ><delete-icon
                            @click="removeItem(index, conditionItems)"
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
            title="Investigation"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-input
                class="w-full"
                label="code"
                disabled
                placeholder="Autogenerated"
              >
              </cornie-input>
              <div class="w-full cursor-pointer" @click="showItemModal = true">
                <cornie-input
                  v-bind="$attrs"
                  label="Item"
                  readonly
                  @click="showItemModal = true"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-end">
              <button
                @click="showItemModal = true"
                type="button"
                class="flex items-center border border-blue-900 px-6 py-3 text-primary text-base font-bold rounded-full"
              >
                <plus-icon class="mr-2" />
                Add
              </button>
            </div>

            <div v-if="investigationItems.length > 0">
              <div class="w-full flex items-center py-5">
                <div
                  class="w-4/12"
                  v-for="(record, index) in investigationItems"
                  :key="index"
                >
                  <p class="text-red-500 text-sm font-medium mb-2">
                    {{ record?.item?.type }}
                  </p>
                  <div class="w-11/12" style="border-right: 1px dashed #878e99">
                    <div class="w-full flex items-center">
                      <div class="w-8/12 flex flex-col">
                        <div>
                          <p>
                            {{ record?.item?.details }}
                          </p>
                          <p>{{ record?.code }}</p>
                        </div>
                      </div>
                      <div class="w-4/12 flex items-center justify-center">
                        <span class="mx-2 cursor-pointer"><edit-icon /></span>
                        <span class="mx-2 cursor-pointer"
                          ><delete-icon
                            @click="removeItem(index, investigationItems)"
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
            title="Protocol"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full my-3">
              <main-cornie-select
                class="w-full"
                :items="['Active', 'Inactive', 'Resolved']"
                v-model="protocol.protocol"
                label="Protocol"
              >
              </main-cornie-select>
              <cornie-input
                label="Summary"
                class="w-full"
                v-model="protocol.summary"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Findings"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-input
                class="w-full"
                label="Item code"
                :disabled="true"
                placeholder="Autoloaded"
              >
              </cornie-input>
              <div
                class="w-full cursor-pointer"
                @click="showFindingModal = true"
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Problem"
                  readonly
                  @click="showFindingModal = true"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
              <cornie-input
                class="w-full"
                disabled
                label="Basis"
                placeholder="Autoloaded"
              >
              </cornie-input>
            </div>

            <div class="mt-4 flex items-center justify-end">
              <button
                @click="showFindingModal = true"
                type="button"
                class="flex items-center border border-blue-900 px-6 py-3 text-primary text-base font-bold rounded-full"
              >
                <plus-icon class="mr-2" />
                Add
              </button>
            </div>

            <div v-if="findingItems.length > 0">
              <div class="w-full flex items-center py-5">
                <div
                  class="w-4/12"
                  v-for="(record, index) in findingItems"
                  :key="index"
                >
                  <p class="text-red-500 text-sm font-medium mb-2">
                    {{ record?.itemReference.itemType }}
                  </p>
                  <div class="w-11/12" style="border-right: 1px dashed #878e99">
                    <div class="w-full flex items-center">
                      <div class="w-8/12 flex flex-col">
                        <div>
                          <p>
                            {{ record?.itemReference.description }}
                          </p>
                          <p>
                            {{ record?.itemReference.details }}
                          </p>
                        </div>
                      </div>
                      <div class="w-4/12 flex items-center justify-center">
                        <span class="mx-2 cursor-pointer"><edit-icon /></span>
                        <span class="mx-2 cursor-pointer"
                          ><delete-icon
                            @click="removeItem(index, findingItems)"
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
            title="Prognosis"
            :opened="true"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-input
                class="w-full"
                label="Item Code"
                placeholder="Autogeneated"
                disabled
                v-model="prognosis.itemCode"
              >
              </cornie-input>
              <cornie-select
                class="w-full"
                label="Item Reference"
                :items="mappedObservations"
                v-model="prognosis.itemReference"
              >
              </cornie-select>
              <cornie-input
                class="w-full"
                label="Supporting Info"
                placeholder="Enter"
                v-model="prognosis.supportingInfo"
              >
              </cornie-input>
              <cornie-input
                class="w-full"
                label="Note"
                placeholder="Enter"
                v-model="prognosis.note"
              >
              </cornie-input>
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <cornie-card-text>
        <div class="flex items-center justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
  <assesor-modal
    :practitioners="practitioner"
    @getAssessor="showAssessor"
    v-model="showAssessorModal"
  />
  <problem-modal
    :conditions="conditions"
    :allergys="allergys"
    :practitioners="practitioner"
    @getProblem="showProblem"
    v-model="showProblemModal"
  />
  <item-modal
    :observations="observations"
    :questions="questions"
    :familyHistories="familyHistories"
    :diagnosticReports="diagnosticReports"
    @getItem="showItem"
    v-model="showItemModal"
  />
  <reference-modal
    @update="showFindings"
    v-model="showFindingModal"
    :observations="observations"
    :conditions="conditions"
  />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import PlusIcon from "@/components/icons/plus.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import AccordionComponent from "@/components/form-accordion.vue";
import IImpression from "@/types/IImpression";
import DateTimePicker from "./components/datetime-picker.vue";
import AssesorModal from "./assesor.vue";
import ProblemModal from "./problemdialog.vue";
import ItemModal from "./itemdailog.vue";
import ReferenceModal from "./reference.vue";
import { namespace } from "vuex-class";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import FhirInput from "@/components/fhir-input.vue";
import IAllergy, { OnSet, Reaction } from "@/types/IAllergy";
import IPractitioner from "@/types/IPractitioner";

import ClinicalDialog from "../conditions/clinical-dialog.vue";

const impression = namespace("impression");
const user = namespace("user");
const allergy = namespace("allergy");

@Options({
  name: "impressionDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    AssesorModal,
    ProblemModal,
    DateTimePicker,
    AccordionComponent,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    ItemModal,
    ReferenceModal,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
    PlusIcon,
    DeleteIcon,
    ClinicalDialog,
    CornieCheckbox,
    FhirInput,
    ArrowLeft,
  },
})
export default class Impression extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @impression.Action
  getImpressionById!: (id: string) => IImpression;

  @Prop({ type: Array, default: () => [] })
  available!: object;

  @Prop({ type: Array, default: [] })
  allImpressions!: any[];

  @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  @user.Getter
  authPractitioner!: IPractitioner;

  impressionModel: any = {};

  effectiveType = "date-time";

  patientId = "";
  status = "Completed";
  statusReason = "";
  updatedAt = "";

  basicInfo = {
    code: "",
    description: "",
  };

  effective = {
    effectiveDate: "",
    effectivePeriod: {
      start: "",
      end: "",
    } as any,
  };

  investigation = [] as { item: any }[];

  findings = [] as { itemReference: any; basis: string }[];

  prognosis = {
    itemCode: "",
    itemReference: "",
    supportingInfo: "",
    note: "",
  };
  recorded = {
    recordDate: "",
    previous: "",
    asserterId: "",
    problem: [] as any[],
  };
  protocol = {
    protocol: "",
    summary: "",
  };

  data: any = {
    date: "",
    dateTime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  assertRecord = true;
  assessorItems: any = [];
  conditionItems: any = [];
  problemItems: any = [];
  investigationItems: any = [];
  loading = false;
  showAssessorModal = false;
  showProblemModal = false;
  showItemModal = false;
  practitioner = [];
  role = [];
  conditions = [];
  setType = "";
  observations: any = [];
  familyHistories: any = [];
  questions = [];
  diagnosticReports: any = [];
  setFindingType = "";
  showFindingModal = false;
  findingItems: any = [];

  @Watch("id")
  idChanged() {
    if (this.id) {
      this.setImpression();
    }
  }

  @Watch("effectiveType")
  onChange() {
    if (this.effectiveType === "date-time") {
      (this.data.startDate as any) = undefined;
      (this.data.startTime as any) = undefined;
      (this.data.endDate as any) = undefined;
      (this.data.endTime as any) = undefined;
    } else if (this.effectiveType === "period") {
      this.data.date = undefined;
      this.data.dateTime = undefined;
    }
  }

  get emptyArraySample() {
    return [{ name: "N/A", code: "N/A" }];
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }
  get mappedObservations() {
    if (this.observations.length === 0) {
      return this.emptyArraySample.map((el: any) => el.name);
    } else {
      return this.observations.map((el: any) => `${el.status} - ${el.id}`);
    }
  }
  findItemCode() {
    if (this.observations.length === 0) {
      return "N/A";
    } else {
      const elx = this.observations.find((el: any) =>
        el.id.includes(this.prognosis.itemReference)
      );
      return elx.id
    }
  }
  get previousImpressions() {
    if (this.allImpressions.length === 0) {
      return this.emptyArraySample.map((el: any) => el.name);
    } else {
      return this.allImpressions?.map((el) => el.status) || [];
    }
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateImpression();
    else await this.createImpression();
    this.loading = false;
  }
  async setImpression() {
    const impression = await this.findImpression(this.id);
    if (!impression) return;
    this.basicInfo = impression.basicInfo;
    this.conditionItems = impression?.recorded?.problem;
    this.findingItems = impression?.findings;
    this.investigationItems = impression?.investigation;
  }

  get recordedDate() {
    return new Date().toISOString();
  }

  validateObject(obj: any) {
    return Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
  }

  removeItem(index: number, items: any) {
    items.splice(index, 1);
  }

  get recordedTime() {
    return new Date().getHours() + ":" + new Date().getMinutes();
  }

  buildPeriod(
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) {
    const start = this.buildDateTime(this.data.startDate, this.data.startTime);
    const end = this.buildDateTime(this.data.endDate, this.data.endTime);
    return { start, end };
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }

  get payload() {
    const data: any = {
      patientId: this.activePatientId,
      status: this.status,
      basicInfo: this.basicInfo,
      effective: this.effective,
      investigation: this.investigation,
      findings: this.findings,
      prognosis: this.prognosis,
      recorded: this.recorded,
      protocol: this.protocol,
    };

    (data.effective.effectiveDate as any) = this.data.date;
    if (this.data.startDate && this.data.endDate) {
      (data.effective.effectivePeriod.start as any) = this.data.startDate;
      (data.effective.effectivePeriod.end as any) = this.data.endDate;
    } else (data.effective.effectivePeriod as any) = undefined;
    (data.recorded.asserterId as any) = this.asseterId as string;
    if (this.conditionItems.length > 0) {
      data.recorded.problem = this.conditionItems;
    }

    (data.recorded.recordDate as any) = this.buildDateTime(
      this.recordedDate,
      this.recordedTime
    );

    data.prognosis.itemCode =  this.findItemCode()
    return data;
  }

  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  get asessor() {
    if (this.assessorItems.length === 0) {
      return (
        this.authPractitioner.firstName + " " + this.authPractitioner.lastName
      );
    } else
      return (
        this.assessorItems[0].firstName + " " + this.assessorItems[0].lastName
      );
  }

  get asseterId() {
    if (this.assessorItems.length === 0) {
      return this.authPractitioner.id;
    } else return this.assessorItems[0].id;
  }

  get findingItem() {
    return this.findingItems.map((el: any) => {
      return el.code;
    });
  }

  done() {
    this.$emit("impression-added");
    this.show = false;
  }

  showAssessor(valueforrole: any) {
    this.assessorItems.push(valueforrole);
  }
  showProblem(value: any) {
    this.conditionItems.push(value);
  }

  showItem(value: any) {
    this.investigationItems.push(value);
    (this.investigation as any) = this.investigationItems;
  }

  showFindings(value: any) {
    this.showFindingModal = true;
    this.findingItems.push(value);
    this.findings.push(value);
  }

  async createImpression() {
    try {
      const response = await cornieClient().post(
        "/api/v1/clinical-impressions",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Clinical Impression Created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Clinical Impression not Created",
        status: "error",
      });
    }
  }
  async updateImpression() {
    const url = `/api/v1/clinical-impressions/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Clincial Impression  updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Clincial Impression not  updated",
        status: "error",
      });
    }
  }
  async findImpression(id: any) {
    const url = `/api/v1/clinical-impressions/${id}`;
    try {
      const response: any = await cornieClient().get(url);
      if (response.success) {
        return response.data;
      }
    } catch (e: any) {
      window.notify({
        msg: "There was an error when fetching Impression",
        status: "error",
      });
    }
  }

  async fetchPractitioners() {
    const AllPractitioners = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioners]);
    this.practitioner = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }

  async fetchConditions() {
    const url = `/api/v1/condition/patient/${this.activePatientId}`;
    const response = await cornieClient().get(url);
    if (response.success) {
      this.conditions = response.data;
    }
  }

  async fetchObservations() {
    const url = `/api/v1/observations/patient/${this.activePatientId}`;
    const response = await cornieClient().get(url);
    if (response.success) {
      this.observations = response.data;
    }
  }

  async fetchFamilyHistories() {
    const url = `/api/v1/family-history/get-for-patient/${this.activePatientId}`;
    const response = await cornieClient().get(url);
    if (response.success) {
      this.familyHistories = response.data;
    }
  }

  async created() {
    await this.fetchAllergys(this.activePatientId);
    if (this.id) {
      await this.setImpression();
    }
    this.fetchRoles();
    this.fetchPractitioners();
    this.fetchObservations();
    this.fetchConditions();
    this.fetchFamilyHistories();
  }
}
</script>

<style></style>
