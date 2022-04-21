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
              </cornie-select>
            </div>
            <div class="col-span-4">
              <cornie-select
                :rules="required"
                :items="['Active', 'Inactive']"
                v-model="replaces"
                label="Replaces"
                aria-selected="--Select--"
              >
              </cornie-select>
            </div>
            <div class="col-span-4 leading-none">
              <div class="font-bold mb-3 text-black">Subject</div>
              <div class="flex flex-row justify-between items-baseline w-2/3">
                <cornie-radio
                  label="Patient"
                  v-model="subject"
                  name="subject"
                  value="Patient"
                ></cornie-radio>
                <cornie-radio
                  label="Group"
                  v-model="subject"
                  name="subject"
                  value="Group"
                ></cornie-radio>
              </div>
            </div>
            <div class="col-span-4">
              <div class="font-bold">Start date & time</div>
              <date-time-picker
                title="Start date & time"
                  v-model:date="startDateTime"
               v-model:time="data.startdate"
              ></date-time-picker>
            </div>
            <div class="col-span-4">
              <div class="font-bold">End date & time</div>
              <date-time-picker
                title="End date & time"
                  v-model:date="endDateTime"
               v-model:time="data.enddate"
              ></date-time-picker>
            </div>
          </div>
        </accordion-component>

        <accordion-component title="Participants">
          <add-actor />
          <!-- <div class="w-full grid grid-cols-12 gap-5 mt-4">
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
          </div> -->
        </accordion-component>

        <accordion-component title="Communication">
          <div class="w-full font-bold text-sm text-black mt-5 mb-3">
            SYSTEM
          </div>
          <div class="grid grid-cols-12 gap-5 mt-4">
            <div class="col-span-12 mb-16 flex">
              <system-button-group @system-changed="handleSystemChange" />
            </div>
            <div class="col-span-3">
              <cornie-input
                v-model="value"
                placeholder="--Enter--"
                :rules="required"
              >
                <template #label>Value</template>
                <template #labelicon>
                  <info-blue-bg class="w-4" />
                </template>
              </cornie-input>
            </div>
            <div class="col-span-5 flex flex-col">
              <div class="mb-5 flex flex-row">
                <div class="font-bold text-sm mr-2">USE</div>
                <info-blue-bg />
              </div>
              <div class="flex flex-row justify-between items-baseline w-full">
                <div class="mr-2">
                  <cornie-radio
                    label="Home"
                    v-model="use"
                    value="Home"
                    name="use"
                  ></cornie-radio>
                </div>
                <div class="mr-2">
                  <cornie-radio
                    label="Work"
                    v-model="use"
                    value="Work"
                    name="use"
                  ></cornie-radio>
                </div>
                <div class="mr-2">
                  <cornie-radio
                    label="Temp"
                    v-model="use"
                    value="Temp"
                    name="use"
                  ></cornie-radio>
                </div>
                <div class="mr-2">
                  <cornie-radio
                    label="Old"
                    v-model="use"
                    value="Old"
                    name="use"
                  ></cornie-radio>
                </div>
                <div>
                  <cornie-radio
                    label="Mobile"
                    v-model="use"
                    value="Mobile"
                    name="use"
                  ></cornie-radio>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="font-bold">Start date & time</div>
              <date-time-picker
                title="Start date & time"
                 v-model:date="startDateCom"
               v-model:time="startDateTimeCom"
              ></date-time-picker>
            </div>
            <div class="col-span-2">
              <div class="font-bold">End date & time</div>
              <date-time-picker
                title="End date & time"
                  v-model:date="endDateCom"
               v-model:time="endDateTimeCom"
              ></date-time-picker>
            </div>
          </div>
          <div class="w-full flex flex-row justify-end">
            <button
              class="font-bold text-red-500 text-sm border-0 mt-8"
              @click="addCommunication"
              type="button"
            >
              Add
            </button>
          </div>
          <div class="grid grid-cols-12 gap-10 my-10">
            <template v-if="communication.length">
              <div
                class="col-span-4 flex items-start justify-start"
                v-for="(comm, index) in communication"
                :key="index"
              >
                <div class="mr-3 leading-none">
                  <template v-if="comm.system === 'Phone'">
                    <mobile-icon class="fill-current text-red-500 w-4" />
                  </template>
                  <template v-if="comm.system === 'Fax'">
                    <fax-icon class="fill-current text-red-500" />
                  </template>
                  <template v-if="comm.system === 'Url'">
                    <url-icon class="fill-current text-red-500" />
                  </template>
                  <template v-if="comm.system === 'Email'">
                    <mail-icon class="fill-current text-red-500" />
                  </template>
                  <template v-if="comm.system === 'Pager'">
                    <pager-icon class="fill-current text-red-500" />
                  </template>
                  <template v-if="comm.system === 'Sms'">
                    <sms-icon class="fill-current text-red-500" />
                  </template>
                </div>
                <div class="flex-1">
                  <p>
                    {{ comm.value }}
                    <span class="text-xs text-gray-400">({{ comm.use }})</span>
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ comm.startDate }} - {{ comm.endDate }}
                  </p>
                </div>
              </div>
            </template>
          </div>
          <div class="w-full h-auto overflow-y-auto">
            <label class="font-bold block">Notes</label>
            <textarea
              v-model="notes"
              class="w-full h-auto rounded-md border border-gray-400 p-2"
              placeholder="--Enter--"
            />
          </div>
        </accordion-component>
      </div>
      <div class="flex justify-end w-full pb-5">
        <button
          @click="$router.push('care-teams')"
          type="button"
          class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
        >
          Cancel
        </button>

        <cornie-btn
          :loading="loading"
          type="submit"
          class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
        >
          Save
        </cornie-btn>
      </div>
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
import AddActor from "./components/AddActor.vue";

const careteam = namespace("careteam");
const dropdown = namespace("dropdown");


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
    AddActor,
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
    startDateCom = "";
  endDateCom = "";
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
   data: any = {
    days: [],
  };

  communication = [] as IIndexableObject[];

  status = "";
  category = "";
  name = "";
  participants: Participants[] = [];
  period = { start: "2011/09/12", end: "2011/12/19" };
  required = string().required();
  phone = "";
  fax = "";

  dropdowns = {} as IIndexableObject;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("use")
  handleUse() {
    console.log(this.use);
  }

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
    } catch (error) {
      alert("Could not fetch organization");
    }
  }

  async created() {
    this.setCareteam();
    this.fetchOrgInfo();
    const data = await this.getDropdowns("careTeam");
    this.dropdowns = data;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
