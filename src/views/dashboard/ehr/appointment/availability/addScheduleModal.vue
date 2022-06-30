<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newaction }} Availability
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="flex space-x-2 w-full pb-2 mb-5 border-gray-300">
            <select-option v-model="availableForOnlineBooking" />
            <span class="text-dark text-sm font-medium mt-2"
              >Make available for online appointment booking.</span
            >
          </div>
          <div class="border-b-2 border-dashed border-gray-100">
            <cornie-input
              label="Name"
              class="w-full mb-5"
              placeholder="--Enter--"
              v-model="name"
            />
            <cornie-input
              label="Description"
              class="w-full mb-5"
              placeholder="--Enter--"
              v-model="description"
            />
            <cornie-select
              :label="'Location'"
              placeholder="--Select--"
              class="w-full mt-4"
              v-model="locationId"
              :items="allLocations"
            />
          </div>
          <accordion-component
            :title="'Group'"
            class="mt-5"
            :addborder="true"
            :opened="false"
          >
            <template v-slot:default>
              <div class="mt-5">
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/service-category"
                  :label="'Category'"
                  placeholder="--Select--"
                  class="w-full"
                  v-model="serviceCategory"
                />
                <div>
                  <span class="text-sm font-semibold mb-1">Specialty(s)</span>
                  <Multiselect
                    v-model="specialties"
                    mode="multiple"
                    :searchable="true"
                    :options="allSpecialities"
                    :clear-on-select="false"
                    label-prop="display"
                    value-prop="code"
                    trackBy="display"
                    label="display"
                    placeholder="--Select--"
                    class="w-full"
                  >
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
                      <div class="multiselect-tag is-user">
                        {{ option.display }}
                        <span
                          v-if="!disabled"
                          class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)"
                        >
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </div>
                    </template>
                    <template v-slot:option="{ option }">
                      <select-option
                        :value="option.display"
                        :label="option.display"
                      />
                    </template>
                  </Multiselect>
                </div>
                <div class="-mt-7">
                  <span class="text-sm font-semibold mb-1"
                    >Sub-Specialtys(s)</span
                  >
                  <Multiselect
                    v-model="subspecialties"
                    mode="multiple"
                    :searchable="true"
                    :options="allSpecialities"
                    :clear-on-select="false"
                    label-prop="display"
                    value-prop="code"
                    trackBy="display"
                    label="display"
                    placeholder="--Select--"
                    class="w-full"
                  >
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
                      <div class="multiselect-tag is-user">
                        {{ option.display }}
                        <span
                          v-if="!disabled"
                          class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)"
                        >
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </div>
                    </template>
                    <template v-slot:option="{ option }">
                      <select-option
                        :value="option.display"
                        :label="option.display"
                      />
                    </template>
                  </Multiselect>
                </div>
              </div>
            </template>
          </accordion-component>
          <accordion-component
            :title="'Period'"
            :addborder="true"
            :opened="false"
          >
            <template v-slot:default>
              <div class="mt-4">
                <date-picker
                  label="Start Date"
                  placeholder="--/04/2021"
                  class="w-full"
                  v-model="startDate"
                />
                <div class="grid mt-5 grid-cols-2 gap-4">
                  <input
                    type="time"
                    label="Start Time"
                    placeholder="00:00"
                    class="w-full border-1 border-gray-300 rounded-lg px-2 py-2"
                    v-model="startTime"
                  />
                   <input
                    type="time"
                    label="End Time"
                    placeholder="00:00"
                    class="w-full border-1 border-gray-300 rounded-lg px-2 py-2"
                    v-model="endTime"
                  />
                </div>
                <div class=" my-3">
                  <span
                    class="font-bold text-blue-700 text-sm cursor-pointer"
                    @click="showRepeat = !showRepeat"
                    >Repeat</span
                  >
                </div>
                <div class="flex space-x-2" v-if="showRepeat">
                  <cornie-input
                    :rules="required"
                    placeholder="Every"
                    class="grow w-full"
                    v-model="repeat.interval"
                    :setfull="true"
                  />
                  <cornie-select
                    :items="['day', 'week', 'month', 'year']"
                    placeholder="Days"
                    class="w-32 mt-0.5 flex-none"
                    :setPrimary="true"
                    v-model="repeat.intervalUnit"
                  />
                </div>
                <div
                  class="italic text-xs -mt-4 mb-5"
                  v-if="showRepeat && repeat.intervalUnit == 'day'"
                >
                  Event will occur every {{ repeat.interval }}
                  {{ repeat.intervalUnit }}
                </div>
                <div
                  class="col-span-12"
                  v-if="showRepeat && repeat.intervalUnit == 'week'"
                >
                  <span class="text-primary text-xs font-semibold mb-2">
                    Select Days
                  </span>
                  <div class="grid grid-cols-7 gap-4 w-full mt-4">
                    <div
                      :class="{ active: isActiveMon }"
                      @click="setActive('monday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Mon
                    </div>
                    <div
                      :class="{ active: isActiveTue }"
                      @click="setActive('tuesday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Tue
                    </div>
                    <div
                      :class="{ active: isActiveWed }"
                      @click="setActive('wednesday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Wed
                    </div>
                    <div
                      :class="{ active: isActiveThu }"
                      @click="setActive('thursday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Thu
                    </div>
                    <div
                      :class="{ active: isActiveFri }"
                      @click="setActive('friday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Fri
                    </div>
                    <div
                      :class="{ active: isActiveSat }"
                      @click="setActive('saturday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Sat
                    </div>
                    <div
                      :class="{ active: isActiveSun }"
                      @click="setActive('sunday')"
                      class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                    >
                      Sun
                    </div>
                  </div>
                </div>
                <div class="w-full mt-4" v-if="showRepeat">
                  <div class="text-primary font-semibold mt-5 text-xs">
                    End Repeat
                  </div>
                  <div class="w-full flex flex-wrap items-center py-5">
                    <div class="-mb-2">
                      <cornie-radio
                        :label="'Never'"
                        :value="'Never'"
                        name="repeat"
                        v-model="repeattype"
                      />
                    </div>
                    <div class="ml-4 -mb-2">
                      <cornie-radio
                        :label="'On'"
                        :value="'On'"
                        name="repeat"
                        v-model="repeattype"
                      />
                    </div>
                    <div class="-mb-2 ml-4">
                      <cornie-radio
                        :label="'After'"
                        :value="'After'"
                        name="repeat"
                        v-model="repeattype"
                      />
                    </div>
                    
                  </div>
                </div>
                <div  v-if="showRepeat">
                  <div class="flex space-x-2" v-if="repeattype == 'After'">
                    <cornie-input
                      :rules="required"
                      placeholder="0"
                      class="grow"
                      v-model="repeat.end.value"
                      :setfull="true"
                    />
                    <div class="bg-primary h-11 text-white rounded-lg py-2 px-3 mt-0.5 flex-none">
                      Events
                    </div>
                    <!-- <cornie-select
                      placeholder="Events"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                     
                      v-model="repeat.end.type"
                    /> -->
                  </div>
                </div>
                <div class="italic text-xs -mt-4 mb-5" v-if="showRepeat && repeattype == 'After'">
                  Event will end after {{ repeat.end.value }} events
                </div>
                <div class="mt-5" v-if="showRepeat && repeattype == 'On'">
                  <date-picker
                    placeholder="--/04/2021"
                    class="w-full"
                    v-model="endDate"
                  />
                  <span class="text-xs">Event will end on {{ endDate }}</span>
                </div>
              </div>
            </template>
          </accordion-component>
          <div class="w-full mt-2">
            <div class="flex w-full border-dashed border-b border-gray-100">
              <div class="w-full">
                <span class="text-sm font-bold">Actors</span>
              </div>
              <add-icon
                class="flex justify-end float-right cursor-pointer"
                @click="showActorModal = true"
              />
            </div>
            <div
              class="w-full flex space-x-7 my-5"
              v-for="(item, index) in practitoners"
              :key="index"
            >
              <div class="w-full dflex space-x-4 mb-3">
                <div class="w-10 h-10">
                  <avatar class="mr-2" v-if="item.image" :src="item.image" />
                  <avatar class="mr-2" v-else :src="localSrc" />
                </div>
                <div class="w-full">
                  <p class="text-xs text-dark font-medium">
                    {{ item.firstName }}
                    {{ item.lastName }}
                  </p>
                  <p class="text-xs text-gray-500 font-meduim">
                    {{ item.jobDesignation }}
                    {{ item.department }}
                  </p>
                </div>
              </div>
              <delete-icon
                class="fill-current text-danger cursor-pointer"
                @click="deletePractitionerItem(item.id, index)"
              />
            </div>
            <!-- <div
              class="w-full flex space-x-7 my-5"
              v-for="(item, index) in patients"
              :key="index"
            >
              <div class="w-full dflex space-x-4 mb-3">
                <div class="w-10 h-10">
                  <avatar
                    class="mr-2"
                    v-if="item.profilePhoto"
                    :src="item.profilePhoto"
                  />
                  <avatar class="mr-2" v-else :src="localSrc" />
                </div>
                <div class="w-full">
                  <p class="text-xs text-dark font-medium">
                    {{ item.firstname }}
                    {{ item.lastname }}
                  </p>
                  <p class="text-xs text-gray-500 font-meduim">
                    {{ item.mrn }}
                  </p>
                </div>
              </div>
              <delete-icon
                class="fill-current text-danger cursor-pointer"
                @click="deletePractitionerItem(item.id, index)"
              />
            </div> -->
          </div>
          <div class="w-full mt-3 mb-2">
            <div class="flex w-full border-dashed border-b border-gray-100">
              <div class="w-full">
                <span class="text-sm font-bold"
                  >Service
                  <span class="text-gray-400 text-xs">(Optional)</span></span
                >
              </div>
              <add-icon
                class="flex justify-end float-right cursor-pointer"
                @click="showServiceModal = true"
              />
            </div>
            <div
              class="w-full flex space-x-7 mt-4"
              v-for="(item, index) in services"
              :key="index"
            >
              <div class="w-full dflex space-x-4 mb-3">
                <div class="w-full">
                  <p class="text-xs text-dark font-medium">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-gray-500 font-meduim">
                    ₦ {{ item.cost }}
                  </p>
                </div>
              </div>
              <delete-icon
                class="fill-current text-danger cursor-pointer"
                @click="deleteServiceItem(item.id, index)"
              />
            </div>
          </div>
          <accordion-component
            :title="'Break'"
            :addborder="true"
            :grayCaption="true"
            :opened="false"
          >
            <template v-slot:default>
              <div class="mt-5 border-b-2 border-dashed pb-5">
                <cornie-select
                  :items="[
                    'breakfast',
                    'lunch',
                    'coffee',
                    'half-hour',
                    'unpaid',
                  ]"
                  placeholder="Select"
                  class="w-full"
                  :label="'Break Type'"
                  v-model="type"
                />
                <cornie-input
                  :rules="required"
                  placeholder="Enter"
                  class="w-full"
                  :label="'Description'"
                  v-model="breakdescription"
                />
                <div class="grid grid-cols-2 gap-4">
                   <input
                    type="time"
                    label="Start Time"
                    placeholder="00:00"
                    class="w-full mt-5 border-1 border-gray-300 rounded-lg px-2 py-2"
                    v-model="startTime"
                  />
                   <input
                    type="time"
                    label="End Time"
                    placeholder="00:00"
                    class="w-full mt-5 border-1 border-gray-300 rounded-lg px-2 py-2"
                    v-model="endTime"
                  />
                </div>
                <span
                  class="text-sm text-danger font-semibold my-5 cursor-pointer"
                  @click="addBreak"
                  ><span class="text-lg">+</span> Add</span
                >
              </div>
              <div
                class="w-full flex space-x-7 mt-4"
                v-for="(item, index) in breaks"
                :key="index"
              >
                <div class="w-full dflex space-x-4 mb-3">
                  <div class="w-full">
                    <p class="text-sm text-dark font-medium">
                      {{ item.type }}
                      <span class="text-xs text-gray-300"
                        >. {{ item.breakstartTime }} {{ item.breakendTime }}</span
                      >
                    </p>
                    <p class="text-sm text-gray-500 font-meduim">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
                <delete-icon
                  class="fill-current text-danger cursor-pointer"
                  @click="deleteBreakItem(item.id, index)"
                />
              </div>
            </template>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
          v-if="!id"
            @click="cancel"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
           <cornie-btn
           v-else
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>

      <actor-modal
        v-model="showActorModal"
        @practitioner-data="practitionerdata"
        @push-data="exisitingpractitionerdata"
        :id="id"
      />
      <services-mdoal
        v-model="showServiceModal"
        @service-data="servicedata"
        :id="id"
      />
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string, date } from "yup";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "../components/accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import SelectOption from "@/components/custom-checkbox.vue";
import TimePicker from "@/components/pickerTime.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import ILocation from "@/types/ILocation";
import ISchedule, { Break, Repeat } from "@/types/ISchedule";
import PhoneInput from "@/components/phone-input.vue";
import Multiselect from "@vueform/multiselect";
import DeleteIcon from "@/components/icons/delete.vue";
import ActorModal from "./actors.vue";
import ServicesMdoal from "./services.vue";
import FhirInput from "@/components/fhir-input.vue";
import { Codeable } from "@/types/misc";
import { getDropdown } from "@/plugins/definitions";
import IPractitioner from "@/types/IPractitioner";
import ICatalogueService from "@/types/ICatalogue";
import Avatar from "@/components/avatar.vue";
import ISpecial from "@/types/ISpecial";

const special = namespace("special");
const location = namespace("location");
const schedulesStore = namespace("schedules");
const user = namespace("user");

@Options({
  name: "scheduleModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    Multiselect,
    AddIcon,
    ServicesMdoal,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TimePicker,
    CornieDialog,
    ActorModal,
    SearchIcon,
    CornieRadio,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    FhirInput,
    SelectOption,
    Avatar,
  },
})
export default class scheduleModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @schedulesStore.Action
  removeBreak!: (id: string) => Promise<boolean>;

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  @schedulesStore.Action
  getScheduleById!: (id: string) => Promise<ISchedule>;

  @user.Getter
  authPractitioner!: IPractitioner;

  loading = false;
  showActorModal = false;
  showServiceModal = false;
  showRepeat = false;
  Specilaitems: Codeable[] = [];
  isActiveMon = false;
  isActiveTue = false;
  isActiveWed = false;
  isActiveThu = false;
  isActiveFri = false;
  isActiveSat = false;
  isActiveSun = false;
  breakType = "";
  breakDescription = "";
  breakStartTime = "";
  breakEndTime = "";
  repeattype = "Never";

  newbreak = {} as any;

  description = "";
  breakdescription = "";
  breakendTime = "";
  breakstartTime = "";
  type = "";

  practitoners: IPractitioner[] = [];
  services: ICatalogueService[] = [];
  breaks: Break[] = [] as any;

  endTime = "";
  startTime = "";

  availableForOnlineBooking = false;
  name = "";
  locationId = "";
  serviceCategory = "";
  specialties = [] as any;
  newspecialties = [] as any;
  subspecialties = [] as any;
  startDate = "";
  endDate = "";
  repeat = {
    days:[],
    end: {
      type: 'events',
      value: '0',
   }
  } as any;

  serviceType = "serviceType";
  serviceName = [] as any;
  slotSize = 0;
  practitonerId = [] as any;
  localSrc = require("../../../../../assets/img/placeholder.png");

  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();

  @Watch("id")
  idChanged() {
    this.setSchedule();
  }

  async setSchedule() {
    const schedule = await this.getScheduleById(this.id);
    if (!schedule) return;
    this.availableForOnlineBooking = schedule.availableForOnlineBooking;
    this.name = schedule.name;
    this.description = schedule.description;
    this.locationId = schedule.locationId;
    this.serviceCategory = schedule.serviceCategory;
    this.specialties = this.mappedSpeciality(schedule.specialties);
    this.subspecialties = schedule.subspecialties;
    this.startDate = schedule.startDate;
    this.startTime = schedule.startTime;
    this.endTime = schedule.endTime;
    this.endDate = schedule.endDate;
    this.practitoners = schedule.practitioners;
    this.breaks = schedule.breaks;
    this.repeat = schedule.repeat;
    this.serviceType = "serviceType";
    this.slotSize = schedule.slotSize;
  }
  mappedSpeciality(special: any) {
    return special.map((c: any) => c.id);
  }

  get newaction() {
    return this.id ? "Update" : "New";
  }

  get payload() {
    return {
      availableForOnlineBooking: this.availableForOnlineBooking,
      name: this.name,
      description: this.description,
      locationId: this.locationId,
      serviceCategory: this.serviceCategory,
      specialties: this.specialties,
      subspecialties: this.subspecialties,
      startDate: this.startDate,
      startTime: this.startTime,
      endTime: this.endTime,
      endDate: this.endDate,
      practitioners: this.practitonerId,
      services: this.serviceName,
      breaks: this.breaks,
      repeat: this.repeat.interval ? this.repeat : undefined,
      serviceType: this.serviceType,
      slotSize: this.slotSize,
      organizationId: this.authPractitioner.organizationId,
    };
  }

cancel(){
  this.availableForOnlineBooking = false;
    this.name = "";
    this.description = "";
    this.locationId = "";
    this.serviceCategory = "";
    this.specialties = [];
    this.subspecialties = [];
    this.startDate = "";
    this.startTime = "";
    this.endTime = "";
    this.endDate = "";
    this.practitoners = [];
    this.breaks = [];
    this.repeat = "";
    this.serviceType = "";
    this.slotSize = 0;
}
  async submit() {
    this.loading = true;
    if (this.id) await this.updateSchedule();
    else await this.createSchedule();
    this.loading = false;
  }

  async createSchedule() {
    try {
      const response = await cornieClient().post(
        "/api/v1/schedule",
        this.payload
      );
      if (response.success) {
        this.done();
        window.notify({ msg: "Availability created", status: "success" });
      }
    } catch (error: any) {
      window.notify({ msg: "Availability not created", status: "error" });
    }
  }

  async updateSchedule() {
    this.payload.startTime = this.payload.startTime.substring(0, 5);
    this.payload.endTime = this.payload.endTime.substring(0, 5);

    const url = `/api/v1/schedule/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Availability updated", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async addBreak() {
    const brekPayload = {
      type: this.type,
      description: this.breakdescription,
      startTime: this.breakstartTime,
      endTime: this.breakendTime,
      status: "active",
    } as any;
   // this.breaks.push(brekPayload);

    if (this.id) {
      try {
        const response = await cornieClient().post(
          `/api/v1/schedule/break/${this.id}`,
          brekPayload
        );
        if (response.success) {
          window.notify({ msg: "Break added successfully", status: "success" });
        }
      } catch (error) {
        window.notify({ msg: "Break not added", status: "error" });
      }
    } else {
      this.breaks.push({
        id:"",
        description: this.description,
        endTime: this.endTime,
        startTime: this.startTime,
        type: this.type,
      });
    }
  }

  setActive(item: string) {
    if (item === "monday") {
      this.isActiveMon = !this.isActiveMon;
      this.repeat.days.push("monday");
    } else if (item === "tuesday") {
      this.repeat.days.push("tuesday");
      this.isActiveTue = !this.isActiveTue;
    } else if (item == "wednesday") {
      this.repeat.days.push("wednesday");
      this.isActiveWed = !this.isActiveWed;
    } else if (item == "thursday") {
      this.repeat.days.push("thursday");
      this.isActiveThu = !this.isActiveThu;
    } else if (item == "friday") {
      this.repeat.days.push("friday");
      this.isActiveFri = !this.isActiveFri;
    } else if (item == "saturday") {
      this.repeat.days.push("saturday");
      this.isActiveSat = !this.isActiveSat;
    } else {
      this.repeat.days.push("sunday");
      this.isActiveSun = !this.isActiveSun;
    }
  }

  get allLocations() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get allSpecialities() {
    if (!this.specials || this.specials.length === 0) return [];
    return this.specials.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  async setRefs() {
    const reference = "http://hl7.org/fhir/ValueSet/c80-practice-codes";
    const ref = reference.trim();
    const defs = await getDropdown(ref);
    if (defs && Array.isArray(defs)) {
      this.Specilaitems = defs;
    } else {
      window.notify({
        status: "error",
        msg: `Cannot get definitions for ${reference}`,
      });
    }
  }

 exisitingpractitionerdata(value: any, valueId: any) {
    this.practitoners = value;
    this.practitonerId = valueId;
  }
  practitionerdata(value: any, valueId: any) {
    this.practitoners.push(value);
    this.practitonerId = valueId;
  }
  servicedata(value: any, namevalue: string) {
    this.services = value;
    this.serviceName = namevalue;
  }
  async deletePractitionerItem(value: string, index: number) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practitioner details",
      title: "Delete practitioner details",
    });
    if (!confirmed) return;
    if (this.id) {
      try {
        const response = await cornieClient().delete(
          `/api/v1/schedule/remove-practitioners/${this.id}`,
          [value]
        );
        if (response.success) {
          // this.done();
          window.notify({
            msg: "practitioner details deleted",
            status: "success",
          });
        }
      } catch (error) {
        window.notify({
          msg: "practitioner details not deleted",
          status: "error",
        });
      }
    } else {
      this.practitoners.splice(index, 1);
    }
  }
  async deleteServiceItem(value: string, index: number) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this service",
      title: "Delete service",
    });
    if (!confirmed) return;
    if (this.id) {
      try {
        const response = await cornieClient().delete(
          `/api/v1/schedule/remove-services/${this.id}`,
          [value]
        );
        if (response.success) {
          this.done();
          window.notify({ msg: "Service deleted", status: "success" });
        }
      } catch (error) {
        window.notify({ msg: "Service not deleted", status: "error" });
      }
    } else {
      this.services.splice(index, 1);
    }
  }

  async deleteBreakItem(id: string, index: number) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this break",
      title: "Delete break",
    });
    if (!confirmed) return;
    if (this.id) {
      if (await this.removeBreak(id))
        window.notify({ msg: "Break deleted", status: "success" });
      else window.notify({ msg: "Break not deleted", status: "error" });
    } else {
      this.breaks.splice(index, 1);
    }
  }
  done() {
    this.$emit("schedule-added");
    this.show = false;
    this.cancel();
  }

  async created() {
    await this.setRefs();
    await this.fetchLocations();
    await this.fetchSpecials();
    //this.setImpression();
  }
}
</script>

<style scoped>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
.active {
  background: #080056;
  border: 1px solid #080056;
  color: #fff;
}
</style>
