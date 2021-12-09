<template>
  <div class="w-full p-4 overflow-y-scroll h-scrren">
    <div class="container-fluid">
      <div class="w-full">
        <PatientDetail :id="item.patientId" />
      </div>
      <div class="w-full flex items-center">
        <div class="w-4/12">
          <div class="w-11/12">
            <label class="block uppercase mb-1 text-xs font-bold">
              <span class="mb-2">Time</span>
              <input
                type="time"
                name=""
                class="p-3 mt-2 border rounded-md w-full"
                id=""
                v-model="item.checkInTime"
              />
            </label>
          </div>
        </div>
        <div class="w-8/12 flex">
          <div class="container">
            <div class="w-12/12">
              <DatePicker
                color="red"
                class="w-full"
                :label="'Date'"
                style="width: 100%"
                v-model="data.date"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full my-5 image_area p-2">
        <div
          class="container"
          v-for="(actor, index) in appment ? appment.Practitioners : []"
          :key="index"
        >
          <ActorView :id="actor.id" />
        </div>
      </div>

      <div class="w-full" style="border-bottom: 1px dashed #c2c7d6"></div>

      <div class="w-full my-5">
        <label class="block uppercase mb-1 text-xs font-bold">
          <span class="flex justify-between">
            <span class="uppercase font-semibold">Total Bill</span>
            <span class="uppercase text-success">paid</span>
          </span>
          <input
            type="text"
            name=""
            class="p-3 border rounded-md w-full mt-1"
            id=""
            v-model="data.paidBill"
          />
        </label>
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="rooms"
          :label="'Room'"
          v-model="checkoutData.roomId"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <DatePicker
          :items="[1, 2, 3]"
          :label="'Follow up Appointment'"
          class="w-full"
          v-model="data.date"
          style="width: 100%"
        />
      </div>
    </div>

    <div class="w-full mb-3 mt-8">
      <div class="container-fluid flex justify-end items-center">
        <corniebtn>
          <router-link
            to=""
            style="border: 1px solid #080056"
            class="cursor-pointer bg-white focus:outline-none text-primary border mr-6 font-bold py-3 px-8 rounded-full"
          >
            Cancel
          </router-link>
        </corniebtn>
        <!-- <button  style="background: #FE4D3C;border-radius: 124px;" class="flex items-center">
                    <a @click="setSession" class="hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save 
                    </a>
                    <p style="height: 48px" class="px-4 border-l-2 flex items-center">A</p>
                </button> -->
        <SplitButton>
          <template #main>
            <span @click="endSession">Check-Out</span>
          </template>
          <template #dropdown>
            <span><ChevronDown class="stroke-current white dd" /></span>
          </template>
        </SplitButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import CustomDropdown from "@/components/cornieselect.vue";
import Button from "@/components/globals/corniebtn.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import DatePicker from "@/components/datepicker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieSelect from "@/components/cornieselect.vue";
import TextArea from "@/components/textarea.vue";
import ILocation from "@/types/ILocation";
import { Prop, Watch } from "vue-property-decorator";
import PatientDetail from "./patient-details.vue";
import SplitButton from "@/components/split-button.vue";
import ActorView from "./practitioner.vue";
import CornieBtn from "@/components/CornieBtn.vue";

const visitsStore = namespace("visits");
const locationsStore = namespace("location");
const appointment = namespace("appointment");

@Options({
  components: {
    ActorView,
    SplitButton,
    Accordion,
    CornieInput,
    CustomDropdown,
    Button,
    DeleteIcon,
    ChevronDown,
    DatePicker,
    ToggleCheck,
    CornieSelect,
    TextArea,
    PatientDetail,
    CornieBtn,
  },
})
export default class CheckIn extends Vue {
  showDetails = true;
  showBreaks = false;
  showPlanning = false;
  loading = false;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  @Prop()
  item!: any;

  @locationsStore.State
  locations!: ILocation[];

  @locationsStore.Action
  fetchLocations!: () => Promise<void>;

  @visitsStore.Action
  checkout!: (id: string) => Promise<boolean>;

  data: any = { paidBill: "72,630", roomId: "", date: new Date(Date.now()) };
  checkoutData: any = { paidBill: "72,630", roomId: this.item.roomId };

  activeStates: any = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
  ];

  waitList: any = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
  ];

  slotOccurence: any = [
    { display: "Do not repeat", code: "do not repeat" },
    { display: "Every day", code: "every day" },
    { display: "Every week", code: "every week" },
    { display: "Every month", code: "every month" },
    { display: "Every forever", code: "every forever" },
    { display: "Custom", code: "Custom" },
  ];

  ends: any = [
    { display: "Never", code: "never" },
    { display: "On", code: "" },
    { display: "After", code: "" },
  ];

  days: any = [
    { display: "Monday", code: true },
    { display: "Tuesday", code: false },
    { display: "Wednesday", code: false },
    { display: "Thursday", code: false },
    { display: "Friday", code: false },
    { display: "Saturday", code: false },
    { display: "Sunday", code: false },
  ];

  @Watch("item", { immediate: true, deep: true })
  onGetSlots() {
    const room = this.rooms.find((i: any) => i.code === this.item.roomId);
    this.checkoutData.roomId = room ? room.code : "";
    console.log(room, "room");
  }

  get rooms() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i) => {
      return { code: i.id, display: i.name };
    });
  }

  get appment() {
    if (!this.appointments || this.appointments.length === 0) return {};
    return this.appointments.find((i: any) => i.id === this.item.appointmentId);
  }

  get updates() {
    if (!this.item) return {};
    this.data.checkInTime = this.item.checkInTime;
    this.data.room = {
      code: this.item.room ? this.item.roomId : "",
      display: this.item.room ? this.item.room.name : "",
    };
  }

  async endSession() {
    this.loading = true;
    const response = await this.checkout(this.item.id);
    this.loading = false;
    if (response) window.notify({ msg: "Checked Out", status: "success" });
    this.$emit("close");
  }

  async created() {
    if (!this.locations || this.locations.length === 0)
      await this.fetchLocations();
    if (!this.appointments || this.appointments.length === 0)
      await this.fetchAppointments();
    console.log(this.appointments, "WWWW");
  }
}
</script>
<style>
.dashed-bottom {
  border-bottom: 1px dashed #667499;
}

.h-scrren {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-scrren::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-scrren {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.image_area {
  background: #ffffff;

  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 5px;
}
</style>
