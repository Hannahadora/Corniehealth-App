<template>
  <div class="w-full">
    <span class="flex w-full mt-3 font-bold text-lg text-primary py-2 mx-auto">
      {{ allaction }} Requests
      <span class="text-danger text-xs mt-2 ml-2 font-normal">
        (Items with asterisk are required for filling)
      </span>
    </span>
    <div>
      <div class="w-full h-screen">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component
              title="Basic Info"
              v-model="opened"
              :opened="false"
            >
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    :items="dropdowns.serviceCategory"
                    v-model="otherrequestModel.basicInfo.activityDefinition"
                    label="activity definition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.serviceType"
                    v-model="otherrequestModel.basicInfo.basedOn"
                    label="based on"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.specialty"
                    v-model="otherrequestModel.basicInfo.replaces"
                    label="replaces"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="[
                      'proposal',
                      'plan',
                      'order',
                      'original-order',
                      'reflex-order',
                      'filler-order',
                      'instance-order',
                      'option',
                    ]"
                    v-model="otherrequestModel.basicInfo.intent"
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="[
                      'Inpatient',
                      'Outpatient',
                      'Community',
                      'Discharge',
                    ]"
                    v-model="otherrequestModel.basicInfo.category"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                    v-model="otherrequestModel.basicInfo.priority"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['reason reference']"
                    v-model="otherrequestModel.basicInfo.doNotPerform"
                    label="do not perform"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>

            <accordion-component
              title="Request Info"
              v-model="opened"
              :opened="false"
            >
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.requestInfo.requester"
                  label="requester"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.specialty"
                  v-model="otherrequestModel.requestInfo.encounter"
                  label="encounter"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <accordion-component
              title="Subject"
              v-model="opened"
              :opened="false"
            >
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.subject.subject"
                  label="subject"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.subject.paymentOption"
                  label="payment option"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>

            <accordion-component title="Request">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                  v-model="otherrequestModel.request.requestCode"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceCategory"
                  v-model="otherrequestModel.request.orderDetail"
                  label="order detail"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preCondition"
                  label="precondition?"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preconditionCode"
                  label="precondition code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.reasonCode"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.requestReference"
                  label="request reference"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input
                  label="supporting info"
                  v-model="otherrequestModel.request.supportingInfo"
                  placeholder="--Enter--"
                />
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.specimen"
                  label="specimen"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.bodySite"
                  label="body site"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-numinput
                  label="quantity"
                  type="number"
                  v-model="otherrequestModel.request.quantity"
                  placeholder="--Enter--"
                />
                <div>
                  <label class="block uppercase mb-1 text-xs font-bold"
                    >Ratio</label
                  >
                  <div
                    class="flex h-12 border-gray-100 rounded-lg w-full border-2"
                  >
                    <input
                      contenteditable="true"
                      class="w-10 ml-20 outline-none focus-within:outline-none"
                      type="text"
                      :v-model="otherrequestModel.request.ratio"
                    />
                    <span class="relative left-14 top-2">:</span>
                    <input
                      contenteditable="true"
                      type="text"
                      :value="otherrequestModel.request.ratio"
                      class="ml-32 w-10 outline-none focus-within:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <range-slider v-model="otherrequestModel.request.range" />
                </div>
                <cornie-date-picker
                  v-model="otherrequestModel.request.occurenceDate"
                  class="w-full -mt-3"
                  label="occurence DATE"
                />
                <cornie-date-range-picker
                  v-model="otherrequestModel.request.occurencePeriod"
                  class="w-full"
                  label="occurence Period"
                />
                <div class="w-full">
                  <label for="" class="w-full">
                    <span class="uppercase font-bold text-xs"
                      >occurence timing</span
                    >
                    <div class="w-full mx-auto">
                      <input
                        type="time"
                        v-model="otherrequestModel.request.occurenceTiming"
                        class="w-full border rounded-lg p-2 w-95"
                        id="appt"
                        required
                      />
                    </div>
                  </label>
                </div>

                <cornie-input
                  label="note"
                  placeholder="--Enter--"
                  v-model="otherrequestModel.request.note"
                />
                <cornie-input
                  label="patient instructions"
                  placeholder="--Enter--"
                  v-model="otherrequestModel.request.patientInstructions"
                />
              </div>
            </accordion-component>
            <accordion-component title="Performer">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                  v-model="otherrequestModel.performer.performerType"
                  label="performer type"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allPerformer"
                  v-model="otherrequestModel.performer.performer"
                  label="performer"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.performer.locationCode"
                  label="location code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allLocation"
                  v-model="otherrequestModel.performer.location"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <accordion-component title="Forms">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  :items="allForms"
                  v-model="otherrequestModel.forms.linkForms"
                  label="Link Forms"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <span class="flex justify-end w-full">
              <button
                @click="
                  $router.push('/dashboard/provider/experience/appointments')
                "
                type="button"
                class="
                  outline-primary
                  rounded-full
                  text-black
                  mt-5
                  mr-3
                  py-2
                  pr-14
                  pl-14
                  px-3
                  focus:outline-none
                  hover:bg-primary
                  hover:text-white
                "
              >
                Cancel
              </button>

              <cornie-btn
                :loading="loading"
                type="submit"
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  pr-14
                  pl-14
                  focus:outline-none
                  hover:opacity-90
                "
              >
                Save
              </cornie-btn>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNuminput from "@/components/cornienuminput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IOtherrequest from "@/types/IOtherrequest";
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
import SingleDatePicker from "@/components/datepicker.vue";
import RangeSlider from "@/components/range.vue";
import DatePicker from "@/components/daterangepicker.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieDateRangePicker from "@/components/daterangepicker.vue";
import Avatar from "@/components/avatar.vue";
import TimePicker from "@/components/Timepicker.vue";


const otherrequest = namespace("otherrequest");
const dropdown = namespace("dropdown");

const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
    range: [20, 50],
  },
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    CornieNuminput,
    CornieDatePicker,
    CornieDateRangePicker,
    PractitionersFilter,
    TimePicker,
    SingleDatePicker,
    Availability,
    Textarea,
    DEdit,
    CDelete,
    Avatar,
    RangeSlider,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
  },
})
export default class AddAppointment extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest } })
  otherrequest!: IOtherrequest;

  otherrequestModel = {} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

  @Watch("otherrequest")
  requestUpdated(request: IOtherrequest) {
    this.otherrequestModel = JSON.parse(JSON.stringify({ ...otherrequest }));
  }

  @otherrequest.Mutation
  updatedOtherrequests!: any;

  patient = [];
  practitioner = [];
  practiceform = [];
  location = [];

  subject = "";
  requester = "";
  performer = "";
  requesterobject = "";

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;

  preferredHeaders = [];
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

  get isUpdate() {
    return Boolean(this.id);
  }

  async setRequest() {
    this.otherrequestModel = JSON.parse(
      JSON.stringify({ ...this.otherrequest })
    );
  }
  get payload() {
    const model = JSON.parse(JSON.stringify({ ...this.otherrequestModel }));
    return model;
  }
  get format() {
    return `${this.otherrequestModel.request.range}`;
  }

  get allaction() {
    return this.id ? "Edit" : "New";
  }

  get allRequester() {
    if (!this.patient || this.patient.length === 0) return [];
    return this.patient.map((i: any) => {
      return {
        code: i.id,
        display: i.firstname + " " + i.lastname,
      };
    });
  }
  get allForms() {
    if (!this.practiceform || this.practiceform.length === 0) return [];
    return this.practiceform.map((i: any) => {
      return {
        code: i.id,
        display: i.formTitle,
      };
    });
  }
  get allLocation() {
    if (!this.location || this.location.length === 0) return [];
    return this.location.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get allPerformer() {
    if (!this.practitioner || this.practitioner.length === 0) return [];
    return this.practitioner.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  async submit() {
    this.loading = true;
    await this.createOtherrequest();
    this.loading = false;
  }
  async createOtherrequest() {
    this.payload.request.occurenceDate = new Date(
      this.payload.request.occurenceDate
    ).toISOString();
    try {
      const response = await cornieClient().post(
        "/api/v1/other-requests",
        this.payload
      );
      if (response.success) {
        this.updatedOtherrequests([response.data]);
        window.notify({ msg: "Other Request Created", status: "success" });
        this.$router.push("/dashboard/provider/experience/requests");
        //this.selected = 1;
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: error, status: "error" });
    }
  }

  async fetchPateints() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }
  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }
  async fetchPracticeForms() {
    const AllForms = cornieClient().get("/api/v1/practice-form");
    const response = await Promise.all([AllForms]);
    this.practiceform = response[0].data;
  }

  async created() {
    this.setRequest();
    this.fetchPateints();
    this.fetchPractitioner();
    this.fetchLocation();
    this.fetchPracticeForms();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
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
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
}

</style>
