<template>
  <div class="w-full p-4 overflow-y-scroll h-screen">
    <div class="container-fluid">
      <div class="w-full my-4">
        <main-cornie-select
          class="w-full"
          :items="appointmentItems"
          v-model="appointmentItem"
          label="Appointment Types"
        >
        </main-cornie-select>
      </div>
      <div class="w-full mt-5">
        <date-time-picker
          v-model:time="data.dateTime"
          label="Duration"
          width="full"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input label="Appointment Fee" class="mb-5 w-full" />
      </div>

      <div class="w-full my-5">
        <label class="block uppercase mb-1 text-xs font-bold">
          <span class="">
            <span class="uppercase font-semibold">Practioner</span>
          </span>
          <span>
            <practioner-select class="w-full mb-2" label="Author">
            </practioner-select>
          </span>
        </label>
      </div>
      <div class="w-full my-4">
        <main-cornie-select
          class="w-full"
          v-model="appointmentItem"
          label="Link forms"
        >
        </main-cornie-select>
      </div>
      <domain-input
        label="Domain Name"
        placeholder="--Enter--"
        :rules="requiredRule"
        :modelValue="orgValue"
      />
    </div>

    <div class="w-full mb-3 mt-8">
      <div class="flex justify-end items-center">
        <cornie-btn
          @click="$emit('close')"
          class="border-primary border-2 px-2 mr-2 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="setSession"
          type="submit"
          class="text-white bg-danger px-3 rounded-xl"
        >
          Save
        </cornie-btn>
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
import DeleteIcon from "@/components/icons/delete.vue";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import PlusIcon from "@/components/icons/plus.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import TextArea from "@/components/textarea.vue";
import ILocation from "@/types/ILocation";
import { appointmentItems } from "./dropdown";
// import slotService from "../helper/slot-service";
import IPractitioner from "@/types/IPractitioner";
import PractionerSelect from "@/components/practitioner-select.vue";
import DomainInput from "@/components/newdomaininput.vue";
import { Prop, Watch } from "vue-property-decorator";

const visitsStore = namespace("visits");
const actors = namespace("practitioner");
const locationsStore = namespace("location");
const organization = namespace("organization");
const appointments = namespace("appointments");

@Options({
  components: {
    Accordion,
    CornieInput,
    CustomDropdown,
    DeleteIcon,
    ChevronDown,
    DomainInput,
    DateTimePicker,
    ToggleCheck,
    MainCornieSelect,
    TextArea,
    PlusIcon,
    PractionerSelect,
  },
})
export default class CheckIn extends Vue {
  @Prop()
  patientId!: any;

  @locationsStore.Action
  fetchLocations!: () => Promise<void>;

  @locationsStore.State
  locations!: ILocation[];

  @actors.Action
  fetchPractitioners!: () => Promise<void>;

  @actors.State
  practitioners!: IPractitioner[];

  @visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<any>;

  @appointments.Action
  getappointmentTypes!: () => Promise<void>;

  @visitsStore.Action
  checkin!: (body: any) => Promise<any>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @organization.State
  organizationInfo: any;

  appointmentItems = appointmentItems;
  appointmentItem = "";
  showDetails = true;
  orgValue = "";
  showBreaks = false;
  showPlanning = false;
  loading = false;
  date = new Date();

  arr = [] as any[];

  data: any = {};
  selectedActors: any[] = [];
  availableSlots: any[] = [];

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

  checkinData: any = { time: new Date().toTimeString().substring(0, 5) };

  selectPractitioner(actor: any, index: number) {
    if (this.selectedActors.findIndex((i: any) => i.code === actor.code) < 0) {
      // this.getSlots(actor.code);
      this.selectedActors.push(actor);
    } else {
      this.selectedActors.splice(index, 1);
    }
  }

  refreshSlots() {
    if (this.selectedActors.length > 0) {
      // this.getSlots(this.selectedActors[0].id);
    }
  }

  // getSlots(id: string) {
  //   this.schedulesByPractitioner(id).then((res) => {
  //     const todaySlots = res.filter((i: any) =>
  //       // slotService.matchDates(this.visitDate.toString(), i.startDate)
  //     );
  //     this.checkinData.scheduleId =
  //       todaySlots.length > 0 ? todaySlots[0].id : "";
  //     this.availableSlots = todaySlots.map((schedule: any) => schedule.slots);
  //     ;
  //   });
  // }

  async setSession() {
    try {
      this.loading = true;
      const slot = this.checkinData.slot;
      this.loading = false;
      ;
      if (slot) {
        const checkedIn = await this.checkin({
          patientId: this.patientId,
          type: this.checkinData.type,
          status: "In-progress",
          roomId: this.checkinData.room,
          notes: this.checkinData.notes,
          slotId: slot,
          // "practitioners": this.selectedActors.map(i => i.id)
        });
        // const orgValue = this.organizationInfo.domainValue;
        if (checkedIn && checkedIn) {
          window.notify({ msg: "Patient Check-in", status: "success" });
          this.$emit("close");
        } else {
          window.notify({ msg: "Patient check-in failed", status: "error" });
        }
      } else {
        window.notify({ msg: "Error checking-in patient", status: "error" });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  get selectedPractitioners() {
    if (!this.selectedActors || this.selectedActors.length === 0)
      return "Select";
    let str = this.selectedActors[0].display;
    if (this.selectedActors.length > 1) return `${str}...`;
    return str;
  }

  get allActors() {
    if (!this.practitioners || this.practitioners.length === 0) return [];
    return this.practitioners.map((i) => {
      return {
        code: i.id,
        display: `${i.firstName} ${i.lastName}`,
        type: i.type,
      };
    });
  }

  get rooms() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i) => {
      return { code: i.id, display: i.name };
    });
  }

  get slots() {
    const slot = {
      endTime: "07:40:00",
      hasWaitList: false,
      id: "da503880-26b3-4bc7-bc64-87b36ab569d4",
      lastReset: null,
      scheduleId: "130f9ef7-a8e5-4471-994f-62cf6df912d5",
      startTime: "07:10:00",
    };
    return [
      {
        code: slot.id,
        display: `${slot.startTime} - ${slot.endTime}`,
      },
    ];
  }

  get visitDate() {
    if (!this.date) return new Date(Date.now());
    const x = new Date(`${new Date(this.date).toISOString()}`);
    return x;
  }

  async created() {
    if (!this.locations || this.locations.length === 0)
      await this.fetchLocations();
    if (!this.practitioners || this.practitioners.length === 0)
      await this.fetchPractitioners();
    if (!this.organizationInfo || this.organizationInfo.length === 0)
      await this.fetchOrgInfo();
    this.orgValue = this.organizationInfo.domainName;
    this.getappointmentTypes();
    ;
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
</style>
