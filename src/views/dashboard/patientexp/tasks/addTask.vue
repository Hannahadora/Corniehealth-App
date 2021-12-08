<template>
  <div class="w-full">
    <span
      class="flex w-full mt-3 -mb-2 font-bold text-lg text-primary py-2 mx-auto"
    >
      {{allaction}} Task
    </span>
    <div>
      <div class="w-full h-screen">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component
              title="Required Field"
              v-model="opened"
              :opened="false"
            >
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input
                    label="activity definition"
                    placeholder="--Enter--"
                    v-model="activityDefinition"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="description"
                    placeholder="--Enter--"
                    v-model="description"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-select
                    :items="[
                      'Proposal',
                      'Plan',
                      'Order',
                      'Original-order',
                      'Reflex-order',
                      'Filler-order',
                      'Instance-order',
                      'Option',
                    ]"
                    v-model="intent"
                    label="intent"
                    placeholder="--Select--"
                  ></cornie-select>
                  <cornie-select
                    :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                    v-model="priority"
                    label="priority"
                    placeholder="--Select--"
                  ></cornie-select>
                  <cornie-select
                    :items="[
                      'Draft',
                      'Requested',
                      'Received',
                      'Accepted',
                      'Rejected',
                      'Ready',
                      'Cancelled',
                      'In Progress',
                      'On Hold',
                      'Failed',
                      'Completed',
                      'Entered in Error',
                    ]"
                    v-model="status"
                    label="status"
                    placeholder="--Select--"
                  ></cornie-select>
                  <cornie-input
                    label="status reason"
                    placeholder="--Enter--"
                    v-model="statusReason"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-select
                    :items="[
                      'Activate/approve the focal resource',
                      'Fulfill the focal request',
                      'Mark the focal resource as no longer active',
                      'Replace the focal resource with the input resource',
                      'Change the focal resource',
                      'Suspend the focal resource',
                      'Re-activate the focal resource',
                    ]"
                    v-model="code"
                    label="code"
                    placeholder="--Select--"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-select>
                  <cornie-input
                    label="for"
                    placeholder="--Enter--"
                    v-model="forType"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="business status"
                    placeholder="--Enter--"
                    v-model="businessStatus"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <date-picker
                    label="excecution period"
                    v-model="excecutionPeriod"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </date-picker>
                  <cornie-select
                    :items="['Specialized surgeon','Obstetrician','Cardiologist','Gerodontist','Thoracic surgeon','Urologist','Orthodontist','Sanitarian',]"
                    v-model="performerType"
                    label="performer type"
                    placeholder="--Select--"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-select>
                  <div>
                    <label
                      for="owner"
                      class="uppercase flex mb-1 text-xs font-semibold"
                    >
                      owner
                      <info-icon class="text-primary fill-current" />
                    </label>
                    <input
                      class="appearance-none w-full border border-gray-100 bg-gray-100 px-3 py-3 rounded-md placeholder-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      disabled
                      :value="orgName"
                    />
                  </div>
                  <cornie-select
                    v-if="allLocation.length === 0"
                  class="required w-full"
                  :rules="required"
                    :items="['No Location Available']"
                    v-model="location"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                v-else
                  class="required w-full"
                  :rules="required"
                    :items="allLocation"
                    v-model="location"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>

                  <!-- <div>
                    <label
                      for="location"
                      class="uppercase flex mb-1 text-xs font-semibold"
                    >
                      location
                      <info-icon class="text-primary fill-current" />   
                   
                    </label>
                    <input
                      class="appearance-none w-full border border-gray-100 bg-gray-100 px-3 py-3 rounded-md placeholder-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      disabled
                      :value="locationInfo.address"
                    />
                  </div> -->

                  <div>
                    <DateTimePicker :label="'start DATE & Time'" :visible="datePickerVissibility.first">
                      <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current" />
                      </template>
                      <template #date>
                        <span>
                          <span>
                            {{
                              new Date(
                                data.startDate ?? Date.now(),
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
                          style="
                            position: relative;
                            z-index: 9000;
                            width: 100%;
                          "
                        ></v-date-picker>
                        <label class="block uppercase my-1 text-xs font-bold">
                          Time
                        </label>
                        <input
                          v-model="data.startTime"
                          @change="dateTimePickerUpdated(data.startDate, 'first')"
                          @input="() => datePickerVissibility.first = true"
                          type="time"
                          class="w-full border rounded-md p-2"
                        />
                      </template>
                    </DateTimePicker>
                  </div>
                  <div>
                    <DateTimePicker :label="'end DATE & Time'" :visible="datePickerVissibility.second">
                      <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current" />
                      </template>
                      <template #date>
                        <span>
                          {{
                            new Date(
                              data.endDate ?? Date.now(),
                            ).toLocaleDateString()
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
                          style="z-index: 9000; width: 100%;"
                        ></v-date-picker>
                        <label class="block uppercase my-1 text-xs font-bold">
                          Time
                        </label>
                        <input
                          v-model="data.endTime"
                          @change="dateTimePickerUpdated(data.startDate, 'second')"
                          @input="() => datePickerVissibility.second = true"
                          type="time"
                          class="w-full border rounded-md p-2"
                        />
                      </template>
                    </DateTimePicker>
                  </div>
                  <cornie-select
                  :items="allReceipients"
                    v-model="recipient"
                    label="recipient"
                    placeholder="--Select--"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Optional Field">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input
                    label="based on"
                    placeholder="--Enter--"
                    v-model="basedOn"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="part of"
                    placeholder="--Enter--"
                    v-model="partOf"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="reason code"
                    placeholder="--Enter--"
                    v-model="reasonCode"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="reason reference"
                    placeholder="--Enter--"
                    v-model="reasonReference"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="note"
                    placeholder="--Enter--"
                    v-model="note"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="focus"
                    placeholder="--Enter--"
                    v-model="focus"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="encounter"
                    placeholder="--Enter--"
                    v-model="encounter"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <div class="block">
                    <label class="flex uppercase mb-2 text-xs font-bold">
                      Repitition
                      <span class="ml-1">
                        <info-icon class="text-primary fill-current" />
                        <!-- <question-icon /> -->
                        </span>
                    </label>
                    <div class="w-full flex space-x-4 mb-3">
                      <cornie-radio
                        v-bind:value="'Days'"
                        label="Days"
                        class="text-xs"
                        name="request"
                        id="pickup"
                        v-model="repitition"
                      />
                      <cornie-radio
                        v-bind:value="'Week'"
                        label="Week"
                        name="request"
                        id="patientadress"
                        checked
                        v-model="repitition"
                      />
                      <cornie-radio
                        v-bind:value="'Month'"
                        label="Month"
                        name="request"
                        id="homeaddress"
                        v-model="repitition"
                      />
                      <cornie-radio
                        v-bind:value="'Years'"
                        label="Years"
                        name="request"
                        id="homeaddress"
                        v-model="repitition"
                      />
                    </div>
                  </div>
                </div>
                <span
                  class="flex border-b-2 border-dark-100 w-full text-sm text-primary py-2 mx-auto font-bold col-span-full mb-4 mt-5"
                >
                  Input
                </span>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input
                    label="type"
                    placeholder="--Enter--"
                    v-model="inputType"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="value"
                    placeholder="--Enter--"
                    v-model="inputValue"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                </div>
                <span
                  class="flex border-b-2 border-dark-100 w-full text-sm text-primary py-2 mx-auto font-bold col-span-full mb-4 mt-5"
                >
                  Output
                </span>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input
                    label="type"
                    placeholder="--Enter--"
                    v-model="outputType"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                  <cornie-input
                    label="value"
                    placeholder="--Enter--"
                    v-model="outputValue"
                  >
                    <template v-slot:labelicon>
                      <info-icon class="text-primary fill-current" />
                    </template>
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
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
                class="bg-danger rounded-full text-white mt-5 pr-14 pl-14 focus:outline-none hover:opacity-90"
              >
                {{newaction}} Task
              </cornie-btn>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AccordionComponent from '@/components/accordion-extended-component.vue'
import CornieInput from '@/components/cornieinput.vue'
import CornieRadio from '@/components/cornieradio.vue'
import CornieSelect from '@/components/cornieselect.vue'
import Textarea from '@/components/textarea.vue'
import PhoneInput from '@/components/phone-input.vue'
import Availability from '@/components/availability.vue'
import ITask from '@/types/ITask'
import { cornieClient } from '@/plugins/http'
import { namespace } from 'vuex-class'
import { string } from 'yup'
import { Prop, Watch } from 'vue-property-decorator'
import PractitionersFilter from '@/components/practitioner.vue'
import PatientsFilter from '@/components/patient.vue'
import DevicesFilter from '@/components/device.vue'
import RolesFilter from '@/components/roles.vue'
import DEdit from '@/components/icons/aedit.vue'
import CDelete from '@/components/icons/adelete.vue'
import CAdd from '@/components/icons/cadd.vue'
import AddIcon from '@/components/icons/add.vue'
import InfoIcon from '@/components/icons/info.vue'
import QuestionIcon from '@/components/icons/question.vue'
import SingleDatePicker from '@/components/datepicker.vue'
import DatePicker from '@/components/daterangepicker.vue'
import Period from '@/types/IPeriod'
import Avatar from '@/components/avatar.vue'
import DateTimePicker from './components/datetime-picker.vue'
import { IOrganization } from "@/types/IOrganization";
import  ILocation  from "@/types/ILocation";
import moment from 'moment'


const task = namespace('task')
const organization = namespace('organization')
const location = namespace('location')
const dropdown = namespace('dropdown')

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PractitionersFilter,
    SingleDatePicker,
    Availability,
    QuestionIcon,
    CornieRadio,
    Textarea,
    DEdit,
    CDelete,
    DateTimePicker,
    Avatar,
    CAdd,
    AddIcon,
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
  @Prop({ type: String, default: '' })
  id!: string

  @task.Action
  getTaskById!: (id: string) => ITask

  loading = false
  expand = false
  isVisible = ''
  status = ''
  startdate = ''
  enddate = ''
  rule = true
  opened = true
  openedR = true
  openedS = true
  openedM = false
  showMedicationModal = false
orgName = "";
orgAddress = "";
locationInfo = [];
  data: any = {
    days: [],
    practitioners: [],
    breaks: [],
    healthcares: [],
    devices: [],
  }
  recipientDropdown = [];

  activityDefinition = ''
  description = ''
  intent = ''
  priority = ''
  statusReason = ''
  businessStatus = ''
  code = ''
  for = ''
  forType = ''
  performerType = ''
  owner = ''
  location = ''
  startDateTime = ''
  endDateTime = ''
  recipient = ''
  excecutionPeriod = {} as Period
  basedOn = ''
  partOf = ''
  reasonCode = ''
  reasonReference = ''
  note = ''
  focus = ''
  encounter = ''
  repitition = ''
  inputType = ''
  inputValue = ''
  outputType = ''
  outputValue = ''

  items = ['Patient', 'Practitioner', 'Practitioner Role', 'Device']

  options = [
    { text: 'Active', value: true },
    { text: 'Inactive', value: false },
  ]

  required = string().required()
  dropdowns = {} as IIndexableObject
  dropdowns2 = {} as IIndexableObject

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>

  @location.State
  locations!: ILocation[];

  @organization.State
  organizationInfo!: IOrganization;

  @location.Action
  fetchLocations!: () => Promise<void>;

   @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @Watch('id')
  idChanged() {
    this.setTask()
  }

  datePickerVissibility: any = {
    first: false,
    second: false,
  }
  dateTimePickerUpdated(date: Date | string, key: string) {
    // alert(date)
    // if (date) {
      this.datePickerVissibility[key] = false;
    // }
  }

  async setTask() {
    const task = await this.getTaskById(this.id)
    if (!task) return
    this.activityDefinition = task.activityDefinition
    this.description = task.description
    this.intent = task.intent
    this.priority = task.priority
    this.statusReason = task.statusReason
    this.businessStatus = task.businessStatus
    this.code = task.code
    this.for = task.for
    this.performerType = task.performerType
    this.owner = task.owner
    this.location = task.location
    this.startDateTime = task.startDateTime
    this.endDateTime = task.endDateTime
    this.recipient = task.recipient
    this.excecutionPeriod = task.excecutionPeriod
    this.basedOn = task.basedOn
    this.partOf = task.partOf
    this.reasonCode = task.reasonCode
    this.reasonReference = task.reasonReference
    this.note = task.note
    this.focus = task.focus
    this.status = task.status
    this.encounter = task.encounter
    this.repitition = task.repitition
    this.inputType = task.inputType
    this.inputValue = task.inputValue
    this.outputType = task.outputType
    this.outputValue = task.outputValue
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
     //  status: this.status,
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
    }
  }
  get allaction() {
    return this.id ? 'Edit' : 'New'
  }

 get newaction() {
    return this.id ? 'Update' : 'Create'
  }
  async submit() {
    this.loading = true
    if (this.id) await this.updateTask()
    else await this.createTask()
    this.loading = false
  }
  async createTask() {
    moment(this.data.startTime).format("YYYY-MM-DD HH:mm Z");
     moment( this.data.endTime).format("YYYY-MM-DD HH:mm Z");
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
      owner: this.organizationInfo.name,
      startDateTime:this.startDateTime,
      endDateTime: this.endDateTime ,
    }
    this.payload.excecutionPeriod.start
    // this.payload.for = this.forType;
    try {
      const response = await cornieClient().post('/api/v1/task', body)
      if (response.success) {
        window.notify({ msg: 'Task created', status: 'success' })
        this.$router.push('/dashboard/provider/experience/tasks')
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: 'Task not created', status: 'error' })
      // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

  async updateTask() {
    const url = `/api/v1/task/${this.id}`
    const payload = {
       ...this.payload,
      }
    try {
      const response = await cornieClient().put(url, payload)
      if (response.success) {
        window.notify({ msg: 'Task updated', status: 'success' })
        this.$router.push('/dashboard/provider/experience/tasks')
      }
    } catch (error) {
      window.notify({ msg: 'Task not updated', status: 'error' })
    }
  }
  get allReceipients() {
     if (!this.recipientDropdown || this.recipientDropdown.length === 0) return [ ];
     return this.recipientDropdown.map((i: any) => {
         return {
             code: i.id,
             display: i.firstName +' '+ i.lastName,
         }
     })
 }
  get allLocation() {
     if (!this.locationInfo || this.locationInfo.length === 0) return [ ];
     return this.locationInfo.map((i: any) => {
         return {
             code: i.id,
             display: i.name,
         }
     })
 }
  async setOrg(){
     this.orgName = this.organizationInfo.name;
    //this.orgAddress = this.organizationInfo.identifier;

  }
   async getLocations() {
    const AllLocations = cornieClient().get("/api/v1/location/myOrg/getMyOrgLocations");
    const response = await Promise.all([AllLocations]);
    this.locationInfo = response[0].data;
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
    const data = await this.getDropdowns('tasks')
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
  content: '*';
  color: #fe4d3c;
  margin-left: 5px;
}

</style>
