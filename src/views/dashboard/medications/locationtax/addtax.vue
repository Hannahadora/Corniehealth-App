<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <div class="w-full p-2">
      <span
        class="flex w-full mt-3 border-b-2 border-gray-200 -mb-2 font-bold text-lg text-primary py-2 mx-auto"
      >
        Add Tax
      </span>
      <form @submit.prevent="submit">
        <div class="mb-32 pb-72">
          <p class="text-primary font-bold text-sm mt-4">Tax Policy</p>
          <div
            class="bg-blue-100 mt-4 text-black text-xs w-8/12 p-2 rounded-md"
          >
            Health-related products and services are mostly tax exempt, however
            we provide a tax module to ensure that you can comply when the
            product or service is taxable. <br /><br />
            Consequently, in the product and service catalogue, the tax is
            disabled by default, you will be required to enable it if the item
            being created is taxable.
          </div>
          <div>
            <p class="text-primary font-bold text-sm mt-8">Tax Jurisdiction</p>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <cornie-select
                label="Country"
                class="required w-full"
                :items="['Nigeria']"
                placeholder="Select One"
              />
              <cornie-select
                label="State"
                class="required w-full"
                :items="['FCT']"
                placeholder="Select One"
              />
              <authority-select
                label="Tax Authority"
                class="required w-full"
                :items="[
                  'Federal Inland Revenue Service',
                  'Lagos Internal Revenue Service',
                ]"
                lefttext="FIRS"
                placeholder="Select One"
              />
            </div>
          </div>
          <div class="w-full justify-end">
            <div class="flex justify-between mt-8">
              <span class="flex flex-col">
                <p class="text-primary font-bold w-full text-sm float-left">
                  Applicable Tax
                </p>
              </span>
              <span class="flex flex-col">
                <plus-icon
                  @click="showModal"
                  class="float-right w-full cursor-pointer fill-current text-danger"
                />
              </span>
            </div>
            <div class="grid grid-cols-3 gap-4 w-full mt-4">
              <tax-select
                label="Tax Name"
                class="required w-full"
                :items="['Value Added Tax', 'Consumption Tax']"
                placeholder="Select One"
              />
              <cornie-input
                disabled
                label="Name Code"
                placeholder="--Autoloaded--"
                class="w-full mb-4"
              />
              <cornie-input
                label="Tax Rate (%)"
                placeholder="--Autoloaded-- but editable"
                class="w-full mb-4"
              />
            </div>
          </div>
          <span class="flex justify-end w-full">
            <button
              @click="$router.push('/dashboard/provider/experience/tasks')"
              type="button"
              class="outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-14 pl-14 px-3 focus:outline-none hover:bg-primary hover:text-white"
            >
              Cancel
            </button>

            <cornie-btn
              :loading="loading"
              type="submit"
              class="bg-danger rounded-full text-white mt-5 pr-8 pl-8 focus:outline-none hover:opacity-90"
            >
              Save
            </cornie-btn>
          </span>
        </div>
      </form>
    </div>
  </div>
  <tax-modal v-model="showTaxModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import AuthoritySelect from "./components/authorityselect.vue";
import TaxSelect from "./components/taxselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import ITask from "@/types/ITask";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import PatientsFilter from "@/components/patient.vue";
import DevicesFilter from "@/components/device.vue";
import RolesFilter from "@/components/roles.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import InfoIcon from "@/components/icons/info.vue";
import PlusIcon from "@/components/icons/plus.vue";
import QuestionIcon from "@/components/icons/question.vue";
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import { IOrganization } from "@/types/IOrganization";
import ILocation from "@/types/ILocation";
import moment from "moment";

import TaxModal from "./modal.vue";

const task = namespace("task");
const organization = namespace("organization");
const location = namespace("location");
const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PractitionersFilter,
    AuthoritySelect,
    SingleDatePicker,
    Availability,
    TaxSelect,
    QuestionIcon,
    CornieRadio,
    Textarea,
    DEdit,
    TaxModal,
    CDelete,
    DateTimePicker,
    Avatar,
    CAdd,
    AddIcon,
    PlusIcon,
    InfoIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
  },
})
export default class AddTask extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @task.Action
  getTaskById!: (id: string) => ITask;

  showTaxModal = false;

  loading = false;
  expand = false;
  isVisible = "";
  status = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
  showMedicationModal = false;
  orgName = "";
  orgAddress = "";
  locationInfo = [];
  data: any = {
    days: [],
    practitioners: [],
    breaks: [],
    healthcares: [],
    devices: [],
  };
  recipientDropdown = "";

  activityDefinition = "";
  description = "";
  intent = "";
  priority = "";
  statusReason = "";
  businessStatus = "";
  code = "";
  for = "";
  forType = "";
  performerType = "";
  owner = "";
  location = "";
  startDateTime = "";
  endDateTime = "";
  recipient = "";
  excecutionPeriod = {} as Period;
  basedOn = "";
  partOf = "";
  reasonCode = "";
  reasonReference = "";
  note = "";
  focus = "";
  encounter = "";
  repitition = "";
  inputType = "";
  inputValue = "";
  outputType = "";
  outputValue = "";

  items = ["Patient", "Practitioner", "Practitioner Role", "Device"];

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  required = string().required();
  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @location.State
  locations!: ILocation[];

  @organization.State
  organizationInfo!: IOrganization;

  @location.Action
  fetchLocations!: () => Promise<void>;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @Watch("id")
  idChanged() {
    this.setTask();
  }

  datePickerVissibility: any = {
    first: false,
    second: false,
  };
  dateTimePickerUpdated(date: Date | string, key: string) {
    // alert(date)
    // if (date) {
    this.datePickerVissibility[key] = false;
    // }
  }

  async setTask() {
    const task = await this.getTaskById(this.id);
    if (!task) return;
    this.activityDefinition = task.activityDefinition;
    this.description = task.description;
    this.intent = task.intent;
    this.priority = task.priority;
    this.statusReason = task.statusReason;
    this.businessStatus = task.businessStatus;
    this.code = task.code;
    this.for = task.for;
    this.performerType = task.performerType;
    this.owner = task.owner;
    this.location = task.location;
    this.startDateTime = task.startDateTime;
    this.endDateTime = task.endDateTime;
    this.recipient = task.recipient;
    this.excecutionPeriod = task.excecutionPeriod;
    this.basedOn = task.basedOn;
    this.partOf = task.partOf;
    this.reasonCode = task.reasonCode;
    this.reasonReference = task.reasonReference;
    this.note = task.note;
    this.focus = task.focus;
    this.status = task.status;
    this.encounter = task.encounter;
    this.repitition = task.repitition;
    this.inputType = task.inputType;
    this.inputValue = task.inputValue;
    this.outputType = task.outputType;
    this.outputValue = task.outputValue;
  }
  get payload() {
    return {
      activityDefinition: this.activityDefinition,
      description: this.description,
      intent: this.intent,
      priority: this.priority,
      statusReason: this.statusReason,
      businessStatus: this.businessStatus,
      code: this.code,
      status: this.status,
      for: this.for,
      performerType: this.performerType,
      owner: this.owner,
      location: this.location,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      recipient: this.recipient,
      excecutionPeriod: this.excecutionPeriod,
      basedOn: this.basedOn,
      partOf: this.partOf,
      reasonCode: this.reasonCode,
      reasonReference: this.reasonReference,
      note: this.note,
      focus: this.focus,
      encounter: this.encounter,
      repitition: this.repitition,
      inputType: this.inputType,
      inputValue: this.inputValue,
      outputType: this.outputType,
      outputValue: this.outputValue,
    };
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }

  showModal() {
    this.showTaxModal = true;
  }
  get newaction() {
    return this.id ? "Update" : "Create";
  }
  async submit() {
    this.loading = true;
    if (this.id) await this.updateTask();
    else await this.createTask();
    this.loading = false;
  }
  async createTask() {
    moment(this.data.startTime).format("YYYY-MM-DD HH:mm Z");
    moment(this.data.endTime).format("YYYY-MM-DD HH:mm Z");
    this.data.startDate = new Date(this.data.startDate).toISOString();
    this.data.endDate = new Date(this.data.endDate).toISOString();
    this.startDateTime = this.data.startDate;
    this.endDateTime = this.data.endDate;
    //const newstart = new Date(this.startDateTime).toISOString().substr(0,10);
    //const newend = new Date(this.endDateTime).toISOString().substr(0,10);
    // const newstart = new Date(this.startDateTime).toISOString().split('T')[0];
    // const newend = new Date(this.endDateTime).toISOString().split('T')[0];
    const body = {
      ...this.payload,
      for: this.forType,
      location: this.orgAddress,
      owner: this.organizationInfo.name,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
    };
    this.payload.excecutionPeriod.start;
    // this.payload.for = this.forType;
    try {
      const response = await cornieClient().post("/api/v1/task", body);
      if (response.success) {
        window.notify({ msg: "Task created", status: "success" });
        this.$router.push("/dashboard/provider/experience/tasks");
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Task not created", status: "error" });
      // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

  async updateTask() {
    const url = `/api/v1/task/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Task updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/tasks");
      }
    } catch (error) {
      window.notify({ msg: "Task not updated", status: "error" });
    }
  }

  async setOrg() {
    this.orgName = this.organizationInfo.name;
    //this.orgAddress = this.organizationInfo.identifier;
  }
  async getLocations() {
    const AllLocations = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocations]);
    this.locationInfo = response[0].data[0];
    this.orgAddress = response[0].data[0].id;
  }
  async getPractitioners() {
    const AllPractice = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractice]);
    this.recipientDropdown = response[0].data;
  }

  async created() {
    this.getLocations();
    if (!this.locations) await this.fetchLocations();
    if (!this.organizationInfo) await this.fetchOrgInfo();
    this.getPractitioners();
    this.setOrg();
    this.setTask();
    const data = await this.getDropdowns("tasks");
    this.dropdowns = data;
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>
