<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Check-In
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div v-if="appoitmentData.length > 0">
            <div
              class="w-full border-b-2 border-gray-200 pb-5 flex space-x-7 mt-4"
              v-for="(item, i) in appoitmentData"
              :key="i"
            >
              <div
                class="w-full flex space-x-4 mb-3"
                :key="index"
                v-for="(value, index) in item.Patients"
              >
                <div class="w-10 h-10">
                  <avatar
                    class="mr-2"
                    v-if="value.patient.profilePhoto"
                    :src="value.patient.profilePhoto"
                  />
                  <avatar class="mr-2" v-else :src="localSrc" />
                </div>
                <div class="w-full mt-2">
                  <p class="text-sm text-dark font-semibold">
                    {{ value.patient.firstname }}
                    {{ value.patient.lastname }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="w-full border-b-2 border-gray-200 pb-5 flex space-x-7 mt-4"
            v-for="(item, i) in patients.slice(0, 1)"
            :key="i"
          >
            <div class="w-full flex space-x-4 mb-3">
              <div class="w-10 h-10">
                <avatar
                  class="mr-2"
                  v-if="item.profilePhoto"
                  :src="item.profilePhoto"
                />
                <avatar class="mr-2" v-else :src="localSrc" />
              </div>
              <div class="w-full mt-2">
                <p class="text-sm text-dark font-semibold">
                  {{ item.firstname }}
                  {{ item.lastname }}
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-5">
            <time-picker :label="'Time'" v-model="startTime" />
            <date-picker :label="'Date'" v-model="date" />
          </div>
          <div class="border-b-2 -mt-9 border-dashed border-gray-200">
             <cornie-input
             v-if="Object.keys(practitionerData).length > 0"
              :label="'Physician'"
              placeholder="--Select--"
              :modelValue="practitionerData.firstName +' '+ practitionerData.lastName"
              class="w-full mt-4"
              :disabled="true"
            />
            <cornie-select
            v-else
              :label="'Physician'"
              placeholder="--Select--"
              v-model="practitioner"
              :items="allPractitioner"
              class="w-full mt-4"
            />
            <cornie-select
              :label="'Room'"
              placeholder="--Select--"
              v-model="roomId"
              :items="rooms"
              class="w-full mt-4"
            />
          </div>
          <div>
            <text-area :label="'Notes'" class="w-full" v-model="notes" />
          </div>
          <div v-if="appoitmentData.length > 0">
            <div>
              <span class="font-bold text-primary text-sm"
                >All patients for Dr. {{ practitionerName }}</span
              >
            </div>
            <div v-for="(item, i) in appoitmentData" :key="i">
              <div
                class="container-fluid my-5 pb-2"
                :key="index"
                v-for="(value, index) in item.Patients"
              >
                <patient-section
                  :patient="value.patient"
                  :time="item.startTime"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <div v-if="practitionerName">
              <span class="font-bold text-primary text-sm"
                >All patients for Dr. {{ practitionerName }}</span
              >
            </div>
            <div>
              <div
                class="container-fluid my-5 pb-2"
                v-for="(patient, index) in onepatient"
                :key="index"
              >
                <patient-section :patient="patient" />
              </div>
              <div v-if="onepatient.length === 0">
                <span class="text-center text-xs"
                  >No patient available for Dr. {{ practitionerName }}</span
                >
              </div>
            </div>
          </div>
        </v-form>
        <div class="flex justify-end overflow-auto">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            v-if="BillStatus.length > 0"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Submit
          </cornie-btn>
          <split-button v-else :showup="true">
            <template #main>
              <span>Check-In</span>
            </template>
            <template #dropdown>
              <span><chevron-down class="stroke-current text-white" /></span>
            </template>
            <template #dropdownoptions>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showPayment = true"
              >
                <span class="ml-3 text-xs">Collect Payment</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="submit"
              >
                <span class="ml-3 text-xs">Check-In</span>
              </div>
            </template>
          </split-button>
        </div>
      </cornie-card-text>

      <cornie-card> </cornie-card>
    </cornie-card>
  </cornie-dialog>
  <payment-modal v-model="showPayment" />
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import Period from "@/types/IPeriod";
import SelectOption from "@/components/custom-checkbox.vue";
import TimePicker from "@/components/pickerTime.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import TextArea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import SplitButton from "@/components/split-button.vue";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import ChevronDown from "@/components/icons/chevrondown.vue";
import PaymentModal from "@/views/dashboard/patientexp/calendar/appointments/collectpayment.vue";
import { useAppointmentRooms } from "../composables/useAppointmentRoom";
import IAppointment from "@/types/IAppointment";


import PatientSection from "./visitor.vue";


const appointment = namespace("appointment");
const location = namespace("location");
const user = namespace("user");
const practitioner = namespace("practitioner");

@Options({
  name: "checkinModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TextArea,
    TimePicker,
    Avatar,
    CornieDialog,
    SearchIcon,
    CornieRadio,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    PatientSection,
    SplitButton,
    SelectOption,
    ChevronDown,
    PaymentModal,
  },
})
export default class checkinModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  appiontmentid!: string;

  @Prop({ type: String, default: "" })
  patientId!: string;

  @Prop({ type: Array, default: [] })
  patients!: object;

  @Prop({ type: Array, default: [] })
  appoitmentData!: any;

  @Prop({ type: Object, default: {} })
  practitionerData!: any;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  
  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  @location.State
  locations!: ILocation[];

  @user.Getter
  authCurrentLocation!: string;

  @location.Action
  fetchLocations!: () => Promise<void>;

  @user.State
  currentLocation!: string;

  room = setup(() => useAppointmentRooms());

  loading = false;
  localSrc = require("../../../../assets/img/placeholder.png");
  practitioner = [];
  onepatient = [] as any;
  date = "";
  showPayment = false;
  bill = [];

  roomId = "";
  notes = "";
  startTime = "";
  today = new Date().toISOString().slice(0, 10);
  patientAppointment = [];


    get rooms() {
    return this.room.locationRooms.map((room) => ({
      code: room.id,
      display: room.roomName,
    }));
  }


  get payload() {
    this.practitioner = this.practitionerData.id
    return {
      roomId: this.roomId,
      notes: this.notes,
      // startTime: this.startTime,
      locationId: this.authCurrentLocation,
      patientId: this.patientId || this.patientIdAppoitment.toString(),
    };
  }

  get allPractitioner() {
    if (this.appoitmentData.length > 0) {
      return this.appoitmentData
        .map((i: any) => i.Practitioners[0])
        .map((k: any) => {
          return {
            code: k.practitionerId,
            display: k.practitioner.firstName + " " + k.practitioner.lastName,
          };
        });
    } else {
      if (!this.practitioners || this.practitioners.length === 0) return [];
      return this.practitioners.map((i: any) => {
        return {
          code: i.id,
          display: i.firstName + " " + i.lastName,
        };
      });
    }
  }
  get allRooms() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get patientAppointemnt() {
    if (!this.practitioner) return {};
    return this.practitioners.find((i: any) => i.id === this.practitioner);
  }

  get practitionerName() {
    const pt = this.practitioners.find((i: any) => i.id === this.practitioner);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  get patientIdAppoitment() {
    if (this.appoitmentData.length > 0) {
      return this.appoitmentData
        .map((i: any) => i.Patients[0])
        .map((k: any) => k.patientId);
    }
  }

  async fetchPatientAppointment() {
    if (this.currentLocation) {
      const newdate = this.date;
      const AllPractitioner = cornieClient().get(
        `/api/v1/appointment/practitioner/get-day/${this.currentLocation}`,
        { date: this.today }
      );
      const response = await Promise.all([AllPractitioner]);
      this.onepatient = response[0].data;
    }
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateCheckin();
    else await this.createCheckin();
    this.loading = false;
  }

  get BillStatus() {
    return this.bill.filter((c: any) => c.status == "paid");
  }

  async createCheckin() {
    try {
      const response = await cornieClient().post(
        "/api/v1/visit/check-in",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Patient checked-in successfully",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async updateCheckin() {
    const url = `/api/v1/visit/check-in/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Checkedin updated", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  done() {
    this.$emit("checkin-added");
    this.show = false;
  }

  async fetchBill() {
    try {
      const response = await cornieClient().post(
        `/api/v1/appointment/bill/generate/${this.appiontmentid}`,
        {}
      );
      if (response.success) {
        this.bill = response.data;
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async created() {
    if (this.appiontmentid) await this.fetchBill();
    this.fetchPatientAppointment();
    await this.fetchPractitioners();
    await this.fetchLocations();
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
