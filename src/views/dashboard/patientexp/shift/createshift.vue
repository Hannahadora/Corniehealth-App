<template>
  <div class="w-full bg-white p-4 overflow-y-scroll">
    <div class="container-fluid">
      <div class="w-full border-b-2 curved flex py-2">
        <div class="container-fluid flex font-semibold text-xl py-2">
          <h2>Create Shift</h2>
        </div>
      </div>

      <div class="w-full my-6 border">
        <div class="container-fluid">
          <Accordion
            title="Shift Details"
            v-model="showDetails"
            class=""
            :opened="true"
          >
            <div class="w-full px-4">
              <div class="container-fluid py-6 flex justify-around">
                <div class="w-4/12">
                  <CornieInput
                    v-model="shift.name"
                    label="Name"
                    placeholder="--Enter--"
                  />
                </div>
                <div class="w-4/12">
                  <CornieInput
                    label="Shift Description"
                    v-model="shift.description"
                    placeholder="--Enter--"
                  />
                </div>
                <div class="w-4/12">
                  <CustomDropdown
                    label="Healthcare Services"
                    @itemSelected="healthServiceSelected"
                    class="w-95"
                    :items="items"
                    :optionLabel="'name'"
                    placeholder="--Enter--"
                  />
                </div>
              </div>

              <div class="container-fluid">
                <label for="">Schedule</label>

                <div class="w-full flex mt-2">
                  <div
                    class="mr-6"
                    v-for="(schedule, index) in schedules"
                    :key="index"
                  >
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-6 w-6"
                        @change="selectSchedule(schedule.actual)"
                        :checked="schedule.value"
                        name="schedule"
                      />
                      <span class="ml-2">{{ schedule.text }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="container-fluid my-3">
                <div class="w-4/12">
                  <CustomDropdown
                    label="Time Zone"
                    @itemSelected="zoneSelected"
                    class="w-95"
                    :items="timeZones"
                    placeholder="--Enter--"
                  />
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="Shift Timing" v-model="showTiming" class="my-6">
            <div class="w-full px-4">
              <div class="container-fluid py-4">
                <label for="">Shift type</label>

                <div class="w-full flex mt-2">
                  <div
                    class="mr-6"
                    v-for="(type, index) in shiftTypes"
                    :key="index"
                  >
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-6 w-6"
                        @change="selectShiftType(type.actual)"
                        v-model="type.value"
                        name="shift"
                      />
                      <span class="ml-2">{{ type.text }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="container-fluid py-3 flex">
                <div class="w-4/12 mr-4">
                  <label for="">
                    <span class="uppercase font-bold text-xs">Time (From)</span>
                    <input
                      type="time"
                      v-model="shift.timeFrom"
                      class="w-full border rounded-lg p-2"
                      id="appt"
                      name="appt"
                      required
                    />
                  </label>
                  <!-- <CornieInput v-model="shift.timeTo" label="Time (From)" /> -->
                </div>
                <div class="w-4/12">
                  <!-- <CornieInput label="Time (To)" v-model="shift.timeFrom" /> -->
                  <label for="">
                    <span class="uppercase font-bold text-xs">Time (To)</span>
                    <input
                      type="time"
                      v-model="shift.timeTo"
                      class="w-full border rounded-lg p-2"
                      id="appt"
                      name="appt"
                      required
                    />
                  </label>
                </div>
              </div>

              <div class="container-fluid my-2">
                <label class="my-2" for="">Select days this applies to</label
                ><br />
                <div class="my-3">
                  <span
                    class="mt-1 mr-6"
                    v-for="(day, index) in days"
                    :key="index"
                  >
                    <span class="inline-flex flex items-center">
                      <input
                        type="checkbox"
                        v-model="day.value"
                        class="form-checkbox h-6 w-6"
                      />
                      <span class="ml-2 text-lg">{{ day.text }}</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="Shift Breaks" v-model="showBreaks" class="mt-6">
            <div class="w-full px-4">
              <div class="container-fluid py-4">
                <label for="">Break type</label>

                <div class="w-full flex mt-2">
                  <div
                    class="mr-6"
                    v-for="(type, index) in breakTypes"
                    :key="index"
                  >
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-6 w-6"
                        @change="selectBreakType(type.actual)"
                        v-model="type.value"
                        name="break"
                      />
                      <span class="ml-2">{{ type.text }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="container-fluid py-3 flex">
                <div class="w-4/12 mr-4">
                  <!-- <CornieInput label="Time (From)" placeholder="--Enter--" /> -->
                  <label for="">
                    <span class="uppercase font-bold text-xs">Time (To)</span>
                    <input
                      type="time"
                      class="w-full border rounded-lg p-2"
                      id="appt"
                      name="appt"
                      required
                    />
                  </label>
                </div>
                <div class="w-4/12">
                  <!-- <CornieInput label="Time (To)"  placeholder="--Enter--" /> -->
                  <label for="">
                    <span class="uppercase font-bold text-xs">Time (From)</span>
                    <input
                      type="time"
                      class="w-full border rounded-lg p-2"
                      id="appt"
                      name="appt"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
    <div class="w-full mb-12">
      <div class="container-fluid mb-8 flex justify-end items-center">
        <corniebtn :loading="false">
          <router-link
            :to="{ name: 'Patient Experience Management' }"
            class="cursor-pointer focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full"
          >
            Cancel
          </router-link>
        </corniebtn>
        <Button :loading="loading">
          <a
            @click="saveShift"
            style="background: #fe4d3c"
            class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
          >
            Save
          </a>
        </Button>
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
import CustomDropdown from "@/components/custom-dropdown.vue";
import Button from "@/components/globals/corniebtn.vue";

const healthcare = namespace("healthcare");
const shifts = namespace("shifts");

@Options({
  components: {
    Accordion,
    CornieInput,
    CustomDropdown,
    Button,
  },
})
export default class Shift extends Vue {
  showDetails = true;
  showBreaks = false;
  showTiming = false;
  loading = false;
  shift: any = {
    healthcareServices: [],
  };

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

  breakTypes = [
    { text: "Snack", value: "snack", actual: "snack" },
    { text: "Lunch", value: "", actual: "lunch" },
    { text: "Stretch", value: "", actual: "stretch" },
  ];

  shiftTypes = [
    { text: "Full Day Shift", value: "full-day", actual: "full-day" },
    { text: "Half Day Shift", value: "", actual: "half-day" },
  ];

  days: any = [
    { text: "Monday", value: true },
    { text: "Tuesday", value: false },
    { text: "Wednesday", value: false },
    { text: "Thursday", value: false },
    { text: "Friday", value: false },
    { text: "Saturday", value: false },
  ];

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

  async created() {
    await this.fetchHealthcares();
    if (!this.shifts || this.shifts.length === 0) await this.getShifts();
    if (this.$route.query.shiftId) {
      const shift = this.shifts.find(
        (i: any) => i.id === this.$route.query.shiftId
      );
      if (shift) {
        if (this.shift.schedule) this.selectSchedule(this.shift.schedule);
        this.shift = shift;
        if (this.shift.days) {
          this.days = this.days.map((i: any) => {
            return {
              ...i,
              value:
                this.shift.days.indexOf(i.text.toLowerCase()) >= 0
                  ? true
                  : false,
            };
          });
        }
      }
    }
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
      days: this.days
        .filter((i: any) => {
          if (i.value) return i.text;
        })
        .map((i: any) => i.text),
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
<style></style>
