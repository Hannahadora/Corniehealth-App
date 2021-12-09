<template>
  <big-dialog v-model="show" :title="allaction + ' ' + 'Allergys'" class="">
    <v-form ref="form">
      <cornie-input
        label="Identifier"
        class="mb-5 w-full"
        v-model="identifier"
      />
      <main-cornie-select
        class="w-full"
        :items="['Active', 'Inactive', 'Resolved']"
        v-model="clinicalStatus"
        label="status"
      >
      </main-cornie-select>
      <main-cornie-select
        class="w-full"
        :items="['Active', 'Inactive', 'Resolved']"
        v-model="clinicalStatus"
        label="code"
      >
      </main-cornie-select>
      <main-cornie-select
        class="w-full"
        :items="['Active', 'Inactive', 'Resolved']"
        v-model="clinicalStatus"
        label="severity"
      >
      </main-cornie-select>
      <main-cornie-select
        class="w-full"
        :items="['Active', 'Inactive', 'Resolved']"
        v-model="clinicalStatus"
        label="patient"
      >
      </main-cornie-select>

      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Identified"
        v-model="openedS"
      >
        <!-- <div class="w-full mt-5 pb-5"> -->

        <div class="mb-5">
          <!-- <span class="uppercase text-danger mt-4 font-bold text-xs"
              >Identified Date</span -->
          >
          <div class="grid grid-cols-2 gap-4 w-full">
            <div class="w-full mt-5">
              <DateTimePicker :label="'Identified Date'" class="z-10 w-full">
                <template v-slot:labelicon>
                  <question-icon />
                </template>
                <template #date>
                  <span>
                    <span>
                      {{
                        new Date(
                          data.startDate ?? Date.now()
                        ).toLocaleDateString()
                      }}
                    </span>
                  </span>
                </template>
                <template #time>
                  <span>
                    <span>{{ data.startTime }}</span>
                  </span>
                </template>
                <template #input>
                  <v-date-picker
                    v-model="data.startDate"
                    style="position: relative; z-index: 9000; width: 100%"
                  ></v-date-picker>
                  <label class="block uppercase my-1 text-xs font-bold">
                    Time
                  </label>
                  <input
                    v-model="data.startTime"
                    type="time"
                    class="w-full border rounded-md p-2"
                  />
                </template>
              </DateTimePicker>
            </div>
            <div class="w-full mt-5">
              <DateTimePicker :label="'Identified Period'" class="w-full">
                <template v-slot:labelicon>
                  <question-icon />
                </template>
                <template #date>
                  <span>
                    {{
                      new Date(data.endDate ?? Date.now()).toLocaleDateString()
                    }}
                  </span>
                </template>
                <template #time>
                  <span>{{ data.endTime }}</span>
                </template>
                <template #input>
                  <v-date-picker
                    name="eeee"
                    v-model="data.endDate"
                    style="z-index: 9000; width: 100%"
                  ></v-date-picker>
                  <label class="block uppercase my-1 text-xs font-bold">
                    Time
                  </label>
                  <input
                    v-model="data.endTime"
                    type="time"
                    class="w-full border rounded-md p-2"
                  />
                </template>
              </DateTimePicker>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <main-cornie-select
            class="w-full"
            :items="['Active', 'Inactive', 'Resolved']"
            v-model="clinicalStatus"
            label="Author"
          >
          </main-cornie-select>
          <main-cornie-select
            class="w-full"
            :items="['Active', 'Inactive', 'Resolved']"
            v-model="clinicalStatus"
            label="Implicated"
          >
          </main-cornie-select>
        </div>
      </accordion-component>

      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Evidence"
        v-model="openedS"
      >
        <div class="grid grid-cols-1 gap-4 w-full mt-5 pb-5">
          <main-cornie-select
            class="w-full"
            :items="['Active', 'Inactive', 'Resolved']"
            v-model="clinicalStatus"
            label="Code"
          >
          </main-cornie-select>
          <cornie-select
            class="w-full"
            :items="[
              'Unconfirmed',
              'Presumed',
              'Confirmed',
              'Refuted',
              'Entered in Error',
            ]"
            label="Item"
            v-model="verificationStatus"
            placeholder="Select"
          >
          </cornie-select>

          <div></div>
        </div>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Mitigation"
        v-model="openedS"
      >
        <div class="w-full mt-5 pb-5">
          <div class="">
            <main-cornie-select
              class="w-full"
              :items="['Active', 'Inactive', 'Resolved']"
              v-model="clinicalStatus"
              label="Action"
            >
            </main-cornie-select>
            <div class="w-full mb-5">
              <DateTimePicker :label="'Date'" class="z-10 w-full">
                <template v-slot:labelicon>
                  <question-icon />
                </template>
                <template #date>
                  <span>
                    <span>
                      {{
                        new Date(
                          data.onsetDate ?? Date.now()
                        ).toLocaleDateString()
                      }}
                    </span>
                  </span>
                </template>
                <template #time>
                  <span>
                    <span>{{ data.onsetTime }}</span>
                  </span>
                </template>
                <template #input>
                  <v-date-picker
                    v-model="data.onsetDate"
                    style="position: relative; z-index: 9000; width: 100%"
                  ></v-date-picker>
                  <label class="block uppercase my-1 text-xs font-bold">
                    Time
                  </label>
                  <input
                    v-model="data.onsetTime"
                    type="time"
                    class="w-full border rounded-md p-2"
                  />
                </template>
              </DateTimePicker>
            </div>

            <main-cornie-select
              class="w-full"
              :items="['Active', 'Inactive', 'Resolved']"
              v-model="clinicalStatus"
              label="Action"
            >
            </main-cornie-select>
          </div>
        </div>
      </accordion-component>
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn
        :loading="loading"
        @click="apply"
        class="text-white bg-danger px-3 rounded-xl"
      >
        Save
      </cornie-btn>
    </template>
  </big-dialog>
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
import BigDialog from "@/components/bigdialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import EncounterSelect from "./encounter-select.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import Period from "@/types/IPeriod";
import { IPatient, Practitioner, Provider } from "@/types/IPatient";
import { IOrganization } from "@/types/IOrganization";
import IAllergy, { OnSet, Reaction } from "@/types/IAllergy";
import IPractitioner from "@/types/IPractitioner";
import DateTimePicker from "./components/datetime-picker.vue";
import { namespace } from "vuex-class";

const allergy = namespace("allergy");
const organization = namespace("organization");

const emptyOnSet: OnSet = {
  onsetDateTime: "",
  onsetAge: "",
  onsetPeriod: {} as Period,
  onsetRange: [20, 50],
  onsetString: "",
  recordedDate: "",
  recorder: "",
  asserter: "",
  lastOccurence: "",
  note: "",
};

const emptyReaction: Reaction = {
  substance: "",
  manifestation: "",
  description: "",
  onset: "",
  severity: "",
  exposureRoute: "",
  note: "",
};

@Options({
  name: "allergyDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    BigDialog,
    CDelete,
    EncounterSelect,
    InfoIcon,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @PropSync("modelValue")
  show!: boolean;

  @allergy.Action
  getAllergyById!: (id: string) => IAllergy;

  @Prop({ type: Array, default: () => [] })
  available!: object;

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @allergy.State
  practitioners!: any[];

  @allergy.Action
  getPractitioners!: () => Promise<void>;

  @Watch("id")
  idChanged() {
    this.setAllergy();
  }

  practitioner!: IPractitioner;
  asserterName = "";
  clinicalStatus = "";
  verificationStatus = "";
  type = "";
  category = "";
  criticality = "";
  code = "";
  onSet = { ...emptyOnSet };
  reaction = { ...emptyReaction };
  switchshow = false;
  value = [20, 40];
  data: any = {
    days: [],
  };
  get format() {
    return `${this.onSet.onsetRange}`;
  }

  loading = false;
  notes = "";
  availableFilter = false;
  profileFilter = false;

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async apply() {
    //   this.$emit("update:preferred",  [...this.medications]);
    this.loading = true;
    if (this.id) await this.updateAllergy();
    else await this.createAllergy();
    this.loading = false;
  }
  async setAllergy() {
    const allergy = await this.getAllergyById(this.id);
    if (!allergy) return;
    this.clinicalStatus = allergy.clinicalStatus;
    this.verificationStatus = allergy.verificationStatus;
    this.type = allergy.type;
    this.category = allergy.category;
    this.criticality = allergy.criticality;
    this.code = allergy.code;
    this.onSet = allergy.onSet;
    this.reaction = allergy.reaction;
  }
  get payload() {
    return {
      patientId: this.activePatientId,
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      type: this.type,
      category: this.category,
      criticality: this.criticality,
      code: this.code,
      onSet: this.onSet,
      reaction: this.reaction,
    };
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }

  get newaction() {
    return this.id ? "Update" : "Save";
  }
  async selected() {
    const orgId = this.organizationInfo.id;
    this.getPractitionerName(orgId);
  }
  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    this.onSet.asserter = pt.id;
    this.onSet.recorder = `${pt.firstName} ${pt.lastName}`;
    this.asserterName = `${pt.firstName} ${pt.lastName}`;
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  done() {
    this.$emit("allergy-added");
    this.show = false;
  }

  async createAllergy() {
    this.payload.onSet.recordedDate = new Date(
      this.payload.onSet.recordedDate
    ).toISOString();
    this.payload.onSet.onsetDateTime = new Date(
      this.data.onsetDate
    ).toISOString();
    this.payload.onSet.onsetPeriod.start = new Date(
      this.data.startDate
    ).toISOString();
    this.payload.onSet.onsetPeriod.end = new Date(
      this.data.endDate
    ).toISOString();
    this.payload.onSet.lastOccurence = new Date(
      this.data.occurenceDate
    ).toISOString();
    this.payload.reaction.onset = new Date(
      this.data.reactionDate
    ).toISOString();

    try {
      const response = await cornieClient().post(
        "/api/v1/allergy",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Allergy created", status: "success" });
        this.done();
        // this.show = false;
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Allergy not created", status: "error" });
      // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

  async updateAllergy() {
    const url = `/api/v1/allergy/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Allergy updated", status: "success" });
        this.$router.push("/dashboard/provider/clinical/allergy");
        this.show = false;
      }
    } catch (error) {
      window.notify({ msg: "Allergy not updated", status: "error" });
    }
  }
  created() {
    this.setAllergy();
    this.getPractitioners();
    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style></style>
