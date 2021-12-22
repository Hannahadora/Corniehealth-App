<template>
  <div class="container-fluid border rounded">
    <div title="Shift Breaks" class="bg-white shadow-xl">
      <div
        class="w-full px-4 breaks-area"
        :class="{ 'breaks-area-full': showBreaks }"
      >
        <div class="w-full border-b-2 curved py-2 my-2">
          <h2 class="flex w-full justify-between">
            <span>
              <span class="font-bold">Add Breaks</span>
              <span class="primary-text mx-3 text-xs"
                >(This section is optional and can be added if desired)</span
              >
            </span>
            <span @click="toggleBreaksDisplay" class="cursor-pointer mt-2"
              ><ChevronDown
            /></span>
          </h2>
        </div>

        <div class="container-fluid">
          <div class="w-full flex mt-3 flex-wrap">
            <div
              class="mr-6"
              v-for="(state, index) in activeStates"
              :key="index"
            >
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-4 w-4"
                  :value="state.code"
                  v-model="scheduleData.status"
                />
                <span class="ml-2">{{ state.display }}</span>
              </label>
            </div>
          </div>

          <div class="w-full mt-3">
            <label for="" class="text-sm font-semibold">Break type</label>
            <div class="w-full flex-wrap flex mt-1">
              <div
                class="mr-6"
                v-for="(type, index) in breakTypes"
                :key="index"
                style="width"
              >
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    @change="selectBreakType(type.code)"
                    v-model="type.code"
                    name="break"
                  />
                  <span class="ml-2">{{ type.display }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid pb-3 pt-3">
          <div class="w-12/12">
            <CornieInput
              v-model="data.location"
              label="Description"
              placeholder="--Enter--"
              style="width: 100%"
            />
          </div>
          <div class="w-full flex items-center justify-between">
            <div class="w-6/12">
              <label for="" class="w-95">
                <span class="uppercase font-bold text-xs">Start Time</span>
                <div class="w-10/12">
                  <input
                    type="time"
                    v-model="shift.timeFrom"
                    class="w-full border rounded-lg p-2"
                    id="appt"
                    required
                  />
                </div>
              </label>
            </div>
            <div class="w-6/12">
              <label for="">
                <span class="uppercase font-bold text-xs">End Time</span>
                <div class="w-12/12">
                  <input
                    type="time"
                    v-model="shift.timeFrom"
                    class="w-full border rounded-lg p-2"
                    id="appt"
                    required
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="container-fluid pb-3 pt-3">
          <div class="w-12/12">
            <CornieInput
              v-model="data.location"
              label="duration (MINUTES)"
              placeholder=""
              :disable="true"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import IHealthcare from "@/types/IHealthcare";
import CustomDropdown from "@/components/cornieselect.vue";
import Button from "@/components/globals/corniebtn.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import DatePicker from "@/components/datepicker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import { Prop } from "vue-property-decorator";

const healthcare = namespace("healthcare");
const shifts = namespace("shifts");

@Options({
  components: {
    Accordion,
    CornieInput,
    CustomDropdown,
    Button,
    DeleteIcon,
    ChevronDown,
    DatePicker,
    ToggleCheck,
  },
})
export default class EditDetail extends Vue {
  showDetails = true;
  showBreaks = false;
  showPlanning = false;
  loading = false;

  data: any = {};

  shift: any = {
    healthcareServices: [],
  };

  @Prop()
  schedule!: any;

  @healthcare.State
  healthcares!: IHealthcare[];

  @healthcare.Action
  fetchHealthcares!: () => Promise<void>;

  @shifts.State
  shifts!: any[];

  @shifts.Action
  createShift!: (shift: any) => Promise<boolean>;

  @shifts.Action
  updateShift!: (shift: any) => Promise<boolean>;

  @shifts.Action
  getShifts!: () => Promise<void>;

  timeZones = [
    "Africa/Lagos",
    "Africa/Algiers",
    "Europe/Amsterdam",
    "Europe/Berlin",
    "Europe/Rome",
    "WAT: West Africa Time",
    "WEST: Western European Summer Time",
    "MET: Middle European Time",
    "CET: Central European Time",
  ];

  schedules: any = [
    { text: "Daily", value: false, actual: "daily" },
    { text: "Weekly", value: false, actual: "weekly" },
    { text: "Monthly", value: false, actual: "monthly" },
  ];

  activeStates: any = [
    { display: "Active", code: "active" },
    { display: "Inactive", code: "inactive" },
  ];

  breakTypes = [
    { display: "Breakfast", code: "breakfast" },
    { display: "Lunch", code: "lunch" },
    { display: "Coffee", code: "coffee" },
    { display: "1/2 Hours", code: "1/2 hours" },
    { display: "Unpaid", code: "unpaid" },
  ];

  toggleBreaksDisplay() {
    this.showBreaks = !this.showBreaks;
  }

  healthServiceSelected(data: any) {
    this.shift.healthcareServices.push(data);
  }

  zoneSelected(data: any) {
    this.shift.timeZone = data;
  }

  get items() {
    return this.healthcares.map((i) => {
      return { id: i.id, name: i.name };
    });
  }

  get scheduleData() {
    if (!this.schedule) return {};
    return this.schedule;
  }

  mounted() {
    if (this.shift.schedule) this.selectSchedule(this.shift.schedule);
  }

  selectShiftType(type: string) {
    this.shift.type = type;
  }

  selectSchedule(type: string) {
    this.schedules = this.schedules.map((i: any) => {
      if (i.actual === type) {
        i.value = true;
        this.shift.schedule = type;
      } else {
        i.value = false;
      }
      return i;
    });
  }

  selectBreakType(type: string) {
    this.shift.breakType = type;
  }

  async saveShift() {
    const body = {
      ...this.shift,
      id: this.$route.query.shiftId,
    };
    this.loading = true;
    if (!this.$route.query.shiftId) {
      try {
        await this.createShift(body);
        this.$router.push({ name: "Patient Experience Management" });
      } catch (error) {}
    } else {
      try {
        this.loading = true;
        await this.updateShift(body);
        this.$router.push({ name: "Patient Experience Management" });
      } catch (error) {}
    }
    this.loading = false;
  }
}
</script>

<style scoped>
.breaks-area {
  height: 48px;
  transition: all 0.4s ease-in-out;
  overflow-y: hidden;
}

.breaks-area-full {
  height: 440px;
  transition: all 0.4s ease-in-out;
  overflow-y: hidden;
}
</style>
