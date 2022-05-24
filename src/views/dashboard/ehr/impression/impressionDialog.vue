<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">

      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newaction }} Impression
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <p class="text-gray-400 text-xs p-3 -mt-5 -mb-5">
            Fields with <span class="text-danger">*</span> are required
          </p>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Basic Info"
            v-model="openedS"
          >
            <div>
              <label
                for="ecounter"
                class="flex capitalize mb-5 mt-5 text-black text-sm font-bold"
                >status
              </label>
              <div class="w-full flex space-x-4">
                <cornie-radio
                  label="Mild"
                  name="request"
                  id="pickup"
                  v-model="status"
                  @update:modelValue="changeChecked('Mild')"
                />
                <cornie-radio
                  label="Medium"
                  name="request"
                  id="patientadress"
                  checked
                  v-model="status"
                  @update:modelValue="changeChecked('Medium')"
                />
                <cornie-radio
                  label="Severe"
                  name="request"
                  id="homeaddress"
                  v-model="status"
                  @update:modelValue="changeChecked('Severe')"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 w-full mt-5 pb-5">
              <cornie-input
                label="Status Reason"
                class="w-full"
                v-model="impressionModel.statusReason"
              />
              <main-cornie-select
                class="w-full"
                :items="['Active', 'Inactive', 'Resolved']"
                v-model="impressionModel.code"
                label="Code"
              >
              </main-cornie-select>
              <cornie-input
                label="Description"
                class="w-full"
                v-model="impressionModel.description"
              />
              <encounter-select
                class="w-full"
                v-model="impressionModel.encounter"
                :rules="required"
                label="Reference Encounter"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Effective"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <div>
                <div class="w-full mt-5">
                  <date-time-picker
                    v-model:date="data.date"
                    v-model:time="data.dateTime"
                    label="Date/Time"
                    width="w-11/12"
                  />
                </div>
              </div>
              <div>
                <div class="w-full mt-5">
                  <date-time-picker
                    v-model:date="data.startDate"
                    v-model:time="data.startTime"
                    label="Date/Time"
                    width="w-11/12"
                  />
                </div>
              </div>
              <div>
                <div class="w-full mt-5">
                  <date-time-picker
                    v-model:date="data.endDate"
                    v-model:time="data.endTime"
                    label="Date/Time"
                    width="w-11/12"
                  />
                </div>
              </div>
              <div class="mt-5" v-if="assessorItems.length > 0">
                <label
                  for="assessor"
                  @click="showAssessor"
                  class="cursor-pointer flex capitalize text-black text-sm font-bold"
                  >assessor
                </label>
                <cornie-select
                  class="w-full"
                  :items="assessorItems"
                  v-model="impressionModel.effective.assessor"
                >
                </cornie-select>
              </div>
              <div
                class="w-full cursor-pointer mt-6"
                v-else
                @click="showAssessor"
              >
                <label class="flex capitalize mb-1 text-black text-sm font-bold"
                  >assessor</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    disabled
                    type="text"
                    placeholder="Select Assesor"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>

              <main-cornie-select
                class="w-full"
                :items="['Clinical Impression']"
                v-model="impressionModel.effective.previous"
                label="previous"
              >
              </main-cornie-select>
              <!-- <cornie-input
                     v-if="setType == 'Allergy'"
                     @click="showProblem"
                      class="w-full"
                      v-model="impressionModel.effective.problem"
                      :value="problemItems.code"
                      label="Problem"
                      placeholder="Select Problem"
                      >
                      </cornie-input>
                       <cornie-input
                    v-else
                     @click="showProblem"
                      class="w-full"
                      v-model="impressionModel.effective.problem"
                     :value="conditionItems.name"
                      label="Problem"
                      placeholder="Select Problem"
                      >
                      </cornie-input> -->
              <div
                class="w-full cursor-pointer clear-left mt-1"
                v-if="setType == 'Allergy'"
                @click="showProblem($event)"
              >
                <label
                  class="flex normal-case mb-0 text-black text-sm font-bold"
                  >Problem</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    type="text"
                    disabled
                    :value="problemItems.code"
                    placeholder="Select Problem"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <div
                class="w-full cursor-pointer clear-left mt-1"
                v-else
                @click="showProblem($event)"
              >
                <label
                  class="flex normal-case mb-0 text-black text-sm font-bold"
                  >Problem</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    type="text"
                    disabled
                    :value="'Identifier'"
                    placeholder="Select Problem"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Investigation"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-select
                class="w-full"
                label="code"
                :items="['Examination / Signs', 'History / Symptoms']"
                v-model="impressionModel.investigation.code"
              >
              </cornie-select>
              <div
                class="w-full cursor-pointer"
                v-if="investigateItems.length === 0"
                @click="showItem"
              >
                <label class="flex capitalize mb-1 text-black text-sm font-bold"
                  >Item</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    disabled
                    type="text"
                    placeholder="Select Item"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <div class="" v-else>
                <label
                  for="item"
                  @click="showItem"
                  class="cursor-pointer flex capitalize text-black text-sm font-bold"
                  >item
                </label>
                <cornie-select
                  class="w-full"
                  :items="investigateItems"
                  :value="'Identifier'"
                  v-model="impressionModel.investigation.item"
                >
                </cornie-select>
              </div>
            </div>
            <div class="">
              <Textarea
                class="w-full"
                v-model="impressionModel.investigation.summary"
                label="Summary"
                placeholder="Enter sumary"
              />
              <span></span>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Findings"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-4 w-full mt-5">
              <cornie-select
                class="w-full"
                label="item"
                :items="[
                  'Anxiety disorder of childhood OR adolescence',
                  'Choroidal hemorrhage',
                  '	Spontaneous abortion with laceration of cervix',
                  'Homoiothermia',
                  'Decreased hair growth',
                  'Chronic pharyngitis',
                  'Normal peripheral vision',
                ]"
                v-model="impressionModel.findings.item"
              >
              </cornie-select>
              <div
                class="w-full cursor-pointer clear-left -mt-1"
                v-if="setFindingType == 'Condition'"
                @click="showFindings"
              >
                <label
                  class="flex normal-case mb-0 text-black text-sm font-bold"
                  >Item Reference</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    type="text"
                    disabled
                    :value="'Identifier'"
                    placeholder="Select Item Reference"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <div
                class="w-full cursor-pointer clear-left -mt-1"
                v-else-if="setFindingType == 'Observation'"
                @click="showFindings"
              >
                <label
                  class="flex normal-case mb-0 text-black text-sm font-bold"
                  >Item Reference</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    type="text"
                    disabled
                    :value="'Identifier'"
                    placeholder="Select Item Reference"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <div
                class="w-full cursor-pointer clear-left -mt-1"
                v-else
                @click="showFindings"
              >
                <label
                  class="flex normal-case mb-0 text-black text-sm font-bold"
                  >Item Reference</label
                >
                <input-desc-rounded :info="''" class="cursor-pointer">
                  <input
                    type="text"
                    disabled
                    :value="'Identifier'"
                    placeholder="Select Item Reference"
                    class="cursor-pointer p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <cornie-select
                class="w-full"
                label="Prognosis"
                :items="[
                  'Conditional prognosis',
                  'Fair prognosis',
                  'Guarded prognosis',
                  'Good prognosis',
                  'Poor prognosis',
                  'Prognosis uncertain',
                ]"
                v-model="impressionModel.findings.prognosis"
              >
              </cornie-select>
              <cornie-select
                class="w-full"
                label="Prognosis Reference"
                :items="['Prognosis Reference']"
                v-model="impressionModel.findings.prognosisReference"
              >
              </cornie-select>
              <cornie-input
                class="w-full"
                v-model="impressionModel.findings.basis"
                label="Basis"
                placeholder="Enter"
              >
              </cornie-input>
              <cornie-input
                class="w-full"
                label="Supporting Info"
                placeholder="Enter"
                v-model="impressionModel.findings.supportingInfo"
              >
              </cornie-input>
            </div>
            <div class="">
              <Textarea
                class="w-full"
                label="Notes"
                v-model="impressionModel.findings.note"
                placeholder="Enter note"
                :rules="required"
              />
              <span></span>
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">

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

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
    <assesor-modal
      :practitioners="practitioner"
      :roles="role"
      @update:preferred="showAssessor"
      v-model:visible="showAssessorModal"
    />
    <problem-modal
      :conditions="conditions"
      :allergy="allergy"
      @update:preferred="showProblem"
      v-model:visible="showProblemModal"
    />
    <item-modal
      :observations="observations"
      :questions="questions"
      @update:preferred="showItem"
      v-model:visible="showItemModal"
    />
    <reference-modal
      @update:preferred="showFindings"
      v-model:visible="showFindingModal"
    />
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "./components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Period from "@/types/IPeriod";
import IImpression, { Effective } from "@/types/IImpression";
import EncounterSelect from "./encounter-select.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import AssesorModal from "./assesor.vue";
import ProblemModal from "./problem.vue";
import ItemModal from "./itemdailog.vue";
import ReferenceModal from "./reference.vue";
import { namespace } from "vuex-class";

import IPractitioner from "@/types/IPractitioner";

const impression = namespace("impression");
const user = namespace("user");


const emptyImpression: IImpression = {
  status: "",
  statusReason: "",
  updatedAt: "",
  code: "",
  description: "",
  subject: "subject",
  encounter: "",
  effective: {
    effectiveDate: "",
    effectivePeriod: {} as Period,
    date: "2021-10-14T14:42:16.549Z",
    assessor: "",
    previous: "",
    problem: "problem",
  },
  investigation: {
    code: "",
    item: "item",
    protocol: "protocol",
    summary: "",
  },
  findings: {
    item: "",
    itemReference: "",
    basis: "",
    prognosis: "",
    prognosisReference: "",
    supportingInfo: "",
    note: "",
  },
};

@Options({
  name: "impressionDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    AssesorModal,
    ProblemModal,
    CDelete,
    CancelIcon,
    InfoIcon,
    EncounterSelect,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    ItemModal,
    ReferenceModal,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @impression.Action
  getImpressionById!: (id: string) => IImpression;

  @Prop({ type: Array, default: () => [] })
  available!: object;

  impressionModel = {} as IImpression;

   @user.Getter
  authPractitioner!: IPractitioner;

  @Watch("id")
  idChanged() {
    this.setImpression();
  }

  data: any = {
    date: "",
    dateTime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };
  assessorItems = [];
  conditionItems = [];
  problemItems = [];
  investigateItems = [];
  loading = false;
  status = false;
  showAssessorModal = false;
  showProblemModal = false;
  showItemModal = false;
  practitioner = [];
  role = [];
  condtions = [];
  allergy = [];
  setType = "";
  observations = [];
  questions = [];
  setFindingType = "";
  showFindingModal = false;
  findingItems = [];

  async setImpressionModel() {
    this.impressionModel = JSON.parse(JSON.stringify({ ...emptyImpression }));
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateImpression();
    else await this.createImpression();
    this.loading = false;
  }
  async setImpression() {
    const impression = await this.getImpressionById(this.id);
    if (!impression) return;
    this.impressionModel = impression;
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
    return {
      patientId: this.activePatientId,
      status: this.impressionModel.status,
      code: this.impressionModel.code,
      subject: this.impressionModel.subject,
      statusReason: this.impressionModel.statusReason,
      description: this.impressionModel.description,
      encounter: this.authPractitioner.id,
      effective: this.impressionModel.effective,
      investigation: this.impressionModel.investigation,
      findings: this.impressionModel.findings,
    };
  }

  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  done() {
    this.$emit("impression-added");
    this.show = false;
  }

  changeChecked(value: string) {
    if (value == "Mild") {
      this.impressionModel.status = value;
    } else if (value == "Medium") {
      this.impressionModel.status = value;
    } else {
      this.impressionModel.status = value;
    }
  }

  showAssessor(valueforrole: any) {
    this.showAssessorModal = true;
    this.assessorItems = valueforrole;
  }
  showProblem(value: any, type: string) {
    this.showProblemModal = true;
    if (type == "Allergy") {
      this.problemItems = value;
      this.setType = type;
      this.passProblem(this.problemItems);
    } else if (type == "Condition") {
      this.conditionItems = value;
      this.setType = type;
      this.passProblem(this.conditionItems);
    }
  }
  passProblem(e: any) {
    this.impressionModel.effective.problem = e.code;
  }

  passRef(e: any) {
    this.impressionModel.findings.itemReference = "Identifier";
  }
  async showItem(value: any) {
    this.showItemModal = true;
    this.investigateItems = value;
  }

  showFindings(value: any) {
    this.showFindingModal = true;
    this.findingItems = value;
    this.passRef(this.findingItems);
  }
  async createImpression() {
    this.payload.effective.effectiveDate = this.data.date;
    this.payload.effective.effectivePeriod.start = this.data.startDate;
    this.payload.effective.effectivePeriod.end = this.data.endDate;
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
    const payload = {
      ...this.payload,
    };
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
  async fetchCondtions() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }

  async fetchAllergy() {
    const AllAllergy = cornieClient().get(
      `/api/v1/allergy/findAllByPatient/${this.activePatientId}`
    );
    const response = await Promise.all([AllAllergy]);
    this.allergy = response[0].data;
  }
  created() {
    this.setImpression();
    this.fetchRoles();
    this.fetchPractitioners();
    this.fetchAllergy();
    this.setImpressionModel();
  }
}
</script>

<style></style>
