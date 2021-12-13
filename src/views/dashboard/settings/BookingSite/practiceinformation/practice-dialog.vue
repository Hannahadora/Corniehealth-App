<template>
  <div class="w-full p-4 overflow-y-scroll h-screen">
    <div class="container-fluid">
      <div class="w-full flex items-center">
        <div class="w-6/12">
          <div class="w-11/12">
            <label class="block uppercase mb-3 text-xs font-bold">
              Time
              <input
                type="time"
                name=""
                class="p-3 border rounded-md w-full"
                id=""
                v-model="checkinData.time"
              />
            </label>
          </div>
        </div>
        <div class="w-6/12 flex -mt-3">
          <div class="container flex justify-end">
            <div class="w-12/12">
              <DatePicker
                color="red"
                class="w-full"
                :label="'Date'"
                style="width: 100%"
                v-model="date"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="['Follow Up', 'Routine', 'Walk In', 'Check Up', 'Emergency']"
          :label="'Type'"
          v-model="checkinData.type"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-5">
        <label class="block uppercase mb-1 text-xs font-bold">
          <span class="">
            <span class="uppercase font-semibold">Physician</span>
          </span>
          <span>
            <MultiSelect :fullWidth="true">
              <template #selected>
                <span>
                  <span>{{ selectedPractitioners }}</span>
                </span>
              </template>
              <div
                style="max-height: 350px; overflow-y: scroll; z-index: 99999"
                class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1 px-1" role="none">
                  <div
                    class="w-full flex relative items-center my-2"
                    v-for="(actor, index) in allActors"
                    :key="index"
                  >
                    <div class="w-1/12">
                      <input
                        type="checkbox"
                        :checked="
                          selectedActors.findIndex(
                            (i) => i.code === actor.code
                          ) >= 0
                        "
                        name=""
                        @click="selectPractitioner(actor, index)"
                        id=""
                      />
                    </div>
                    <div
                      class="w-5/12"
                      @click="selectPractitioner(actor, index)"
                    >
                      <p class="capitalize font-semibold text-sm">
                        {{ actor.display }}
                      </p>
                      <span
                        class="capitalize text-gray-400 font-normal text-xs"
                        >{{ actor.type }}</span
                      >
                    </div>
                    <div class="w-6/12 flex justify-between ml-1">
                      <span class="text-danger text-xs font-semibold capitalize"
                        >View Avaliability</span
                      >
                      <span class="text-danger text-xs font-semibold capitalize"
                        >View Profile</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </MultiSelect>
          </span>
        </label>
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="slots"
          :label="'Slot'"
          v-model="checkinData.slot"
          style="width: 100%; font-size: 13px"
        />
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="rooms"
          :label="'Room'"
          v-model="checkinData.room"
          style="width: 100%"
        />
      </div>

      <div class="w-full mb-4 mt-8">
        <TextArea
          :label="'Notes'"
          v-model="checkinData.notes"
          style="width: 100%"
        />
      </div>

      <div class="w-full">
        <div class="container-fluid">
          <p class="font-semibold font-normall text-sm">
            All patients for visit
          </p>
        </div>
        <div class="container-fluid my-5 border-b-2 pb-2">
          <div
            class="w-full flex items-center"
            v-for="(patient, index) in []"
            :key="index"
          >
            <div class="w-1/12 rounded-full">
              <img
                src="https://via.placeholder.com/40x40"
                class="rounded-full w-full"
                alt="Image"
              />
            </div>
            <div class="w-11/12 ml-2">
              <div class="w-full">
                <p class="font-semibold text-sm mb-0">Damorola David</p>
              </div>
              <div class="w-full flex justify-between">
                <span class="uppercase text-success">
                  <span class="cursor-pointer text-success font-light text-xs"
                    >Appointment Time</span
                  >
                  <span class="mx-1 font-light text-success">|</span>
                  <span class="cursor-pointer text-success font-light text-xs"
                    >Queue No: 232222</span
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          Check-In
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
import DatePicker from "@/components/datepicker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieSelect from "@/components/cornieselect.vue";
import TextArea from "@/components/textarea.vue";
import ILocation from "@/types/ILocation";
import MultiSelect from "@/views/dashboard/schedules/components/apply-to.vue";
// import slotService from "../helper/slot-service";
import IPractitioner from "@/types/IPractitioner";
import { Prop, Watch } from "vue-property-decorator";

const visitsStore = namespace("visits");
const actors = namespace("practitioner");
const locationsStore = namespace("location");

@Options({
  components: {
    Accordion,
    CornieInput,
    CustomDropdown,
    DeleteIcon,
    ChevronDown,
    DatePicker,
    ToggleCheck,
    CornieSelect,
    TextArea,
    MultiSelect,
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

  @visitsStore.Action
  checkin!: (body: any) => Promise<any>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  showDetails = true;
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
  //     console.log(this.availableSlots);
  //   });
  // }

  async setSession() {
    try {
      this.loading = true;
      const slot = this.checkinData.slot;
      this.loading = false;
      console.log("Slot is ", slot);
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
