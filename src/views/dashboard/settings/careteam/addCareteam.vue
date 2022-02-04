<template>
  <div>
    <div
      class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-aut mb-4"
    >
      Create a Care Team
    </div>
    <form class="w-full" @submit.prevent="submit">
      <div class="w-full h-auto bg-white rounded-lg p-5">
        <accordion-component
          title="Basic Info"
          :modelValue="true"
          :first="true"
        >
          <div class="w-full grid grid-cols-12 gap-5 mt-4">
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="['Active', 'Inactive']"
                v-model="activityDefinition"
                label="Activity Definition"
                aria-selected="--Select--"
              >
              </cornie-select>
            </div>
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="['Active', 'Inactive']"
                v-model="basedOn"
                label="Based on"
                aria-selected="--Select--"
              >
                <p class="text-xs text-dark font-semibold">{{ input.name }}</p>
                <p class="text-xs text-dark font-semibold">{{ input.role }}</p>
                <p class="text-xs text-dark font-semibold">
                  {{ input.managingOrganization }}
                </p>
                <p class="text-xs text-dark font-semibold">
                  {{ input.phone.dialCode + input.phone.number }}
                </p>
                <p class="text-xs text-dark font-semibold">{{ input.email }}</p>
                <d-edit
                  class="ml-20 cursor-pointer"
                  @click="
                    editParticipant(input.careTeamId, index, participants)"/>
                <c-delete
                  @click="removeParticipant(index, participants)"
                  class="cursor-pointer"
                />
              </div>
           
            <div class="col-span-4">
              <div class="font-bold">Start date & time</div>
              <date-time-picker
                title="Start date & time"
                v-model="startDateTime"
              ></date-time-picker>
            </div>
            <div class="col-span-4">
              <div class="font-bold">End date & time</div>
              <date-time-picker
                title="End date & time"
                v-model="endDateTime"
              ></date-time-picker>
            </div>
          </div>
        </accordion-component>

        <accordion-component title="Participants">
          <div class="w-full grid grid-cols-12 gap-5 mt-4">
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="dropdowns.role"
                label="Role"
                v-model="role"
                aria-selected="--Select--"
              >
              </cornie-select>
            </div>
            <div class="col-span-4">
              <div class="flex flex-row justify-center items-center w-full">
                <div class="mr-3">
                  <cornie-select
                    :rules="required"
                    :items="dropdowns.member"
                    label="Member"
                    v-model="member"
                    aria-selected="--Select--"
                  >
                  </cornie-select>
                </div>
                <!-- Replace with search input -->
                <div>
                  <cornie-input-team v-model="search" placeholder="--Search--">
                    <template #prepend>
                      <search-icon />
                    </template>
                  </cornie-input-team>
                </div>
              </div>
            </div>
            <div class="col-span-4">
              <cornie-input
                v-model="onBehalfOf"
                placeholder="--Enter--"
                :rules="required"
              >
                <template #label>On behalf of</template>
                <template #labelicon>
                  <info-blue-bg class="w-4" />
                </template>
              </cornie-input>
            </div>
          </div>
          <div class="w-full font-bold text-red-400 text-xs mt-5 mb-3">
            PERIOD
          </div>
          <div class="w-full grid grid-cols-12 gap-5">
            <div class="col-span-2">
              <div class="font-bold">Start date & time</div>
              <date-time-picker
                title="Start date & time"
                v-model="startDateTimePeriod"
              ></date-time-picker>
            </div>
            <div class="col-span-2">
              <div class="font-bold">End date & time</div>
              <date-time-picker
                title="End date & time"
                v-model="endDateTimePeriod"
              ></date-time-picker>
            </div>
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="dropdowns.reasonCode"
                label="Reason Code"
                v-model="participant.reasonCode"
                aria-selected="Select one"
              >
              </cornie-select>
            </div>
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="dropdowns.reasonReference"
                label="Reason Reference"
                v-model="reasonReference"
                aria-selected="Select one"
              >
              </cornie-select>
            </div>
          </div>
        </accordion-component>

          <!-- <cornie-input label="Phone"  v-model="participants.phone" placeholder="--Enter--" :rules="required"/>-->
          <cornie-input
            label="Email"
            v-model="participant.email"
            placeholder="--Enter--"
           :rules="emailRule"
          />
          <Textarea
            label="Notes"
            v-model="participant.notes"
            placeholder="--Enter--"
            :rules="required"
          />
          <span></span>
          <span
            ><c-add
              class="float-right cursor-pointer mb-2 mt-8 mr-5"
              @click="checkParticipant"
          /></span>
        </div>
        <span class="flex justify-end w-full border-t-2 h-full">
          <button
            @click="$router.push('care-teams')"
            type="button"
            class="outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
          >
            Revert Changes
          </button>

        <cornie-btn
          :loading="loading"
          type="submit"
          class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
        >
          Save
        </cornie-btn>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieInputTeam from "@/components/cornieinput-team.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import ICareteam, { Participants } from "@/types/ICareteam";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import DEdit from "@/components/icons/dedit.vue";
import CDelete from "@/components/icons/cdelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import DatePicker from "@/components/daterangepicker.vue";
import AccordionComponent from "@/components/accordion-component-care-team.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import InfoBlueBg from "@/components/icons/info-blue-bg.vue";
import SearchIcon from "@/components/icons/search.vue";
import SystemButtonGroup from "./components/systembtngroup.vue";
import FaxIcon from "@/components/icons/fax.vue";
import DotHorIcon from "@/components/icons/dot-hor.vue";
import SmsIcon from "@/components/icons/sms.vue";
import UrlIcon from "@/components/icons/url.vue";
import PagerIcon from "@/components/icons/pager.vue";
import MailIcon from "@/components/icons/mail.vue";
import MobileIcon from "@/components/icons/mobile.vue";

const careteam = namespace("careteam");
const dropdown = namespace("dropdown");

const emptyParticipant: Participants = {
  name: "",
  role: "",
  onBehalfOf: "",
  period: { start: "2011/12/15", end: "2017/12/19" },
  reasonCode: "",
  reasonReference: "",
  managingOrganization: "",
  phone: { number: "", dialCode: "" },
  email: "",
  notes: "",
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    OrgSelect,
    ColumnFilter,
    Textarea,
    DEdit,
    CDelete,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    DateTimePicker,
    CornieRadio,
    InfoBlueBg,
    CornieInputTeam,
    SearchIcon,
    SystemButtonGroup,
    FaxIcon,
    MobileIcon,
    SmsIcon,
    DotHorIcon,
    UrlIcon,
    PagerIcon,
    MailIcon,
  },
})
export default class AddCareteam extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @careteam.Action
  getCareteamById!: (id: string) => ICareteam;

  loading = false;

  identifier = "";
  activityDefinition = "";
  basedOn = "";
  replaces = "";
  startDateTime = "";
  endDateTime = "";
  startDateTimePeriod = "";
  endDateTimePeriod = "";
  startDateTimeCom = "";
  endDateTimeCom = "";
  value = "";
  reasonCode = "";
  reasonReference = "";
  use = "Home";
  system = "Phone";
  subject = "Patient";
  search = "";
  onBehalfOf = "";
  role = "";
  member = "";
  notes = "";

  communication = [] as IIndexableObject[];

  status = "";
  category = "";
  name = "";
  participant = { ...emptyParticipant };
  participants: Participants[] = [];
  period = { start: "2011/09/12", end: "2011/12/19" };
  required = string().required();
  phone = "";
  fax = "";

  dropdowns = {} as IIndexableObject;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  emailRule = string().email("A valid email is required").required();

  @Watch("id")
  idChanged() {
    this.setCareteam();
  }

  async addCommunication() {
    if (
      this.system === "" ||
      this.value === "" ||
      this.use === "" ||
      this.startDateTimeCom === "" ||
      this.endDateTimeCom === ""
    )
      return;

    let info = {
      system: this.system,
      value: this.value,
      use: this.use,
      startDate: new Date(this.startDateTimeCom).toLocaleString(),
      endDate: new Date(this.endDateTimeCom).toLocaleString(),
    } as IIndexableObject;

    this.communication = [info, ...this.communication];
    this.system = "Phone";
    this.use = "Home";

    this.value = this.startDateTimeCom = this.endDateTimeCom = "";
  }

  async setCareteam() {
    const careteam = await this.getCareteamById(this.id);
    if (!careteam) return;
    this.identifier = careteam.identifier;
    this.status = careteam.status;
    this.category = careteam.category;
    this.name = careteam.name;
    this.subject = careteam.subject;
    this.period = careteam.period;
    this.participants = careteam.participants;
  }

  async handleSystemChange(val: string) {
    this.system = val;
    console.log(val);
  }
  get payload() {
    return {
      identifier: this.identifier,
      status: this.status,
      category: this.category,
      name: this.name,
      subject: this.subject,
      period: this.period,
      participants: this.participants,
    };
  }

  async checkParticipant() {
    this.loading = true;
    if (this.id) await this.updateParticipant();
    else await this.addParticipant();
    this.loading = false;
  }
  async editParticipant(id: string, index: number, fieldType: object) {
    this.participant = this.participants[index];
  }
  async updateParticipant() {
    const url = `/api/v1/participants/${this.id}`;
    const payload = { ...this.participant };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Participant updated", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Participant not updated", status: "error" });
    }
  }
  async addParticipant() {
    if (!this.id) {
      this.participants.push({ ...this.participant });
      this.reset();
      window.notify({ msg: "Participant added", status: "success" });
      return;
    }
    //  this.participant.careTeamId = this.id;
    try {
      const response = await cornieClient().post(
        "/api/v1/participants",
        this.participant
      );
      if (response.success) {
        this.participants.push(response.data);
        window.notify({ msg: "Participant added", status: "success" });
        this.reset();
      }
    } catch (error) {
      window.notify({ msg: "Participant  not added", status: "error" });
    }
  }

  async reset() {
    this.participant = { ...emptyParticipant };
  }
  async removeParticipant(id: string, index: number, fieldType: object) {
    this.participants.splice(index, 1);
    window.notify({ msg: "Participant deleted", status: "success" });
    //  try {
    // const response = await cornieClient().delete(`/api/v1/participants/${id}`);
    // if (response.success) {
    //     this.participants.splice(index, 1);
    //     window.notify({ msg: "Participant deleted", status: "success" });
    // }
    // } catch (error) {
    //   window.notify({ msg: "Participant not deleted", status: "error" });
    // }
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateCareteam();
    else await this.createCareteam();
    this.loading = false;
  }

  async createCareteam() {
    this.payload.period.start = new Date(
      this.payload.period.start
    ).toISOString();
    this.payload.period.end = new Date(this.payload.period.end).toISOString();
    this.participant.period.start = new Date(
      this.participant.period.start
    ).toISOString();
    this.participant.period.end = new Date(
      this.participant.period.end
    ).toISOString();
    try {
      const response = await cornieClient().post(
        "/api/v1/care-teams",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Care team added", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Care team  not added", status: "error" });
    }
  }

  async updateCareteam() {
    const url = `/api/v1/care-teams/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Care team updated", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Care team not updated", status: "error" });
    }
  }
  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.identifier = response.data.identifier;
      this.participant.managingOrganization = response.data.name;
    } catch (error) {
      alert("Could not fetch organization");
    }
  }

  async created() {
    this.setCareteam();
    this.fetchOrgInfo();
    const data = await this.getDropdowns("careTeam");
    console.log(data);
    this.dropdowns = data;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
