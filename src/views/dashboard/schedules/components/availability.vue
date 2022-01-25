<template>
  <div class="container">
    <div class="w-full">
      <div class="container-fluid">
        <!-- <div class="container-fluid" v-if="filterOptions.byPractitioners?.length === 0"> -->
        <cornie-table
          :columns="headers"
          v-model="_items"
          @filter="showFilterPane"
        >
          <template #actions="{}">
            <!-- <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              style="width: 200px"
            >
              <add-icon class="mr-3 mt-1" />
              <span class="ml-3 text-xs" @click="goToCreateSlot()"
                >Create slot</span
              >
            </div> -->
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <calendar-icon />
              <span class="ml-3 text-xs">Book Appointment</span>
            </div>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <edit-icon class="text-blue-400 fill-current" />
              <span class="ml-3 text-xs">Edit Slot</span>
            </div>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <copy-icon class="text-blue-400 fill-current" />
              <span class="ml-3 text-xs">Copy</span>
            </div>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <cancel-icon class="text-green-600 fill-current" />
              <span class="ml-3 text-xs">Cancel</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <share-icon class="text-indigo-700 fill-current" />
              <span class="ml-3 text-xs">Share</span>
            </div>
          </template>

          <template #range="{ item }">
            <p class="text-xs">{{ item }}</p>
          </template>

          <template #0="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[0]
                  ).length > 0">
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[0]
                    )"
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #1="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[1]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[1]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #2="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[2]
                  ).length > 0
                "
              >
            <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[2]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #3="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[3]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[3]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #4="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[4]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[4]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #5="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[5]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[5]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
        </cornie-table>
      </div>

  
      <side-modal
        :visible="showFilter"
        @closesidemodal="() => (showFilter = false)"
      >
        <advanced-filter @applyfilter="applyFilter" />
      </side-modal>
    </div>
  </div>
</template>

<script lang="ts">
import utilservice from "../helper/util";
import dateHelper from "../helper/date-helper";
import AddIcon from "@/components/icons/add.vue";
import Actors from "./actors.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import slotService from "../../visits/helper/slot-service";
import AdvancedFilter from "./advanced-filter.vue";
import SideModal from "../components/side-modal.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import { Practitioner } from "@/types/IPatient";
import SelectedPractitioner from "./selected-practitioner.vue";
import SelectedLocation, { IItem } from "./selected-location.vue";
import ILocation from "@/types/ILocation";
import IDevice from "@/types/IDevice";
import ISchedule from "@/types/ISchedule";
import CalendarIcon from "@/components/icons/bcalendar.vue"
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CancelIcon from "@/components/icons/cancel.vue"
import ShareIcon from "@/components/icons/share.vue"
import { getWeekStart, printWeekday } from "@/plugins/utils";
import group from "@/store/group";
import IPractitioner from "@/types/IPractitioner";

const practitionersStore = namespace("practitioner");
const locationsStore = namespace("location");
const devicesStore = namespace("devices");
const visitsStore = namespace("visits");

interface Time{
  hour: number
  minute: number
}

@Options({
  components: {
    AddIcon,
    Actors,
    CornieTable,
    SideModal,
    AdvancedFilter,
    CopyIcon,
    CornieSelect,
    EditIcon,
    SelectedPractitioner,
    SelectedLocation,
    CalendarIcon,
    CancelIcon,
    ShareIcon,
  },
})
export default class Availability extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];


  /// Start
  
  getWeekDates(start: Date) {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const current = start.getDate();
      const date = new Date(start);
      date.setDate(current + 1);
      dates.push(date);
    }
    return dates;
  }

  get headers() {
    const now = new Date(); // sun jan 23, 2022 //
    const start = getWeekStart(now)
    const dates = this.getWeekDates(start);
    return dates.map((date) => ({
      key: printWeekday(date),
      title: this.printDate(date),
    }));
  }


  groupHourly(schedules: ISchedule[]){
    const groups: {[state: number]: ISchedule[]} = {} 
    schedules.forEach(schedule => {
      const start = this.buildTime(schedule.startTime)
      const end = this.buildTime(schedule.endTime)
      const hours = this.getHoursBetween(start, end)
      this.insertMatchingHours(groups, hours, schedule)
    })
    return groups
  }

  groupDaily(schedules: ISchedule[]){
    const weekDays = new Map<string, IPractitioner[]>();
    schedules.forEach((schedule) => {
      this.insertWeekDays(weekDays, schedule);
    });
    const group: {[state: string]: IPractitioner[]} = {}
    weekDays.forEach((value, key) => {
      group[key] = value
    })
    return group
  }

  insertMatchingHours(groups: {[state: number]: ISchedule[]}, hours: number[], schedule: ISchedule){
    hours.forEach(hour => {
      const schedules = groups[hour] ?? []
      schedules.push(schedule)
    })
  }
  buildTime(time: string){
    const [hour, min, ...rest] = time.split(":")
    return {
      hour: Number(hour),
      minute: Number(min)
    }
  }
  getHoursBetween(start: Time, end: Time){
    const hours = []
    for (let i = start.hour; i < end.hour; i++) {
      hours.push(i)
    }
    if(end.minute) hours.push(end.hour + 1)
    return hours
  }
  pad(x: number) {
  if (x < 10) return `0${x}:00`;
  return `${x}:00`;
};

 get _items() {
    const schedules = this.schedules || []
    const hourly = this.groupHourly(schedules)
    const items: {range: any, [state: string]: IPractitioner[] }[] = []
     Object.entries(hourly).forEach(([key, value]) => {
      const item = this.groupDaily(value)
      items.push({...item, range: this.printRange(Number(key)) as any})
    })
    console.log(hourly,"hourly");
    return items
  } 


  printRange(start: number){
    const min = this.pad(start)
    const max = this.pad(start + 1)
    return `${min}-${max}`
  }
  
  insertWeekDays(map: Map<string, IPractitioner[]>, schedule: ISchedule) {
    const { days } = schedule;
    days.forEach((day) => {
      const _practitioners = map.get(day) ?? []
      const practitioners = schedule.practitioners ?? []
      map.set(day, [...practitioners, ..._practitioners]);
    });
  }
  
  printDate(date: Date) {
    return "sun jan 23, 2022";
  }

  //// End

  @practitionersStore.Action
  fetchPractitioners!: () => Promise<void>;

  @practitionersStore.State
  practitioners!: Practitioner[];

  @locationsStore.Action
  fetchLocations!: () => Promise<void>;

  @locationsStore.State
  locations!: ILocation[];

  @visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<ISchedule[]>;

  @locationsStore.Action
  fetchDevices!: () => Promise<void>;

  @devicesStore.State
  devices!: IDevice[];

  showFilter = false;
  filterOptions: any = {};
  selectedSlots: string[] = [];
  selectedSlot: any = {};

  filteredSlots: any = [];

  get seletedPractitioner() {
    if (!this.filterOptions || !this.filterOptions.byPractitioners) return {};
    const practitioner = this.practitioners.find(
      (practitioner) =>
        practitioner.id === this.filterOptions?.byPractitioners[0]
    );
    if (!practitioner) return {};
    return practitioner;
  }

  getFirstDayOfWeek(date: Date) {
    return new Date(
      new Date().setDate(date.getDate() - ((new Date().getDay() + 6) % 6))
    );
  }
  get availabilityDates() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      // let sunday = new Date();
      let sunday = new Date(
        new Date().setDate(
          new Date().getDate() - ((new Date().getDay() + 6) % 6)
        )
      );
      arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
    }

    return arr;
  }

  get filteredItems() {
    if (!this.items) return [];
    return this.items.map((timeSlot: string) => {
      return;
    });
  }

  get allLocations() {
    if (!this.locations) return [];
    return this.locations.map((location) => {
      return { code: location.id, display: location.name };
    });
  }

  get allDevices() {
    if (!this.devices) return [];
    return this.devices.map((device) => {
      return { code: device.id, display: location.hostname };
    });
  }

  get availabilityHeaders() {
    if (!this.availabilityDates) return [];
    let arr = this.availabilityDates.map((i: any, index: number) => {
      return {
        title: i,
        key: index.toString(),
        show: true,
        // show: index > 4 ? false : true
      };
    });
    arr.unshift({ title: "Time", key: "time", show: true });
    return arr;
  }

  locaionChanged(newLocation: ILocation) {
    this.locations.unshift(newLocation);
  }

  constructDate(date: string, time: string) {
    return dateHelper.constructDateFromDateAndTime(date, time);
  }

  getPnersForSchedule(startTime: string, endTime: string, date: Date | string) {
    return slotService.getAvailablePractitioners(
      this.schedules,
      startTime,
      endTime,
      date
    );
  }

  getActorsForSchedule(startDate: string | Date, endDate: string | Date) {
    return dateHelper.getPractitionersForSlot(
      this.schedules,
      startDate,
      endDate
    );
  }

  getScheduleIdForSlot(
    startTime: string,
    endTime: string,
    date: Date | string
  ) {
    return slotService.getScheduleIdForSlot(
      this.schedules,
      startTime,
      endTime,
      date
    );
  }

  selectSlot(scheduleId: string, slotTime: any, date: string) {
    this.selectedSlot = {
      startTime: slotService.constructDate(date, slotTime.split(" - ")[0]),
      endTime: slotService.constructDate(date, slotTime.split(" - ")[1]),
      scheduleId,
      id: `${scheduleId}_${slotTime}_${date}`,
    };
    // if (scheduleId) {
    //   const index = this.selectedSlots.findIndex(id => id === `${scheduleId}_${slot}`)
    //   if (index < 0) {
    //     this.selectedSlots.push(`${scheduleId}_${slot}`);
    //   } else {
    //     this.selectedSlots.splice(index, 1)
    //   }
    // }
  }

  get availableSlots() {
    if (this.filteredSlots?.length === 0) return [];
    return this.filteredSlots;
  }

  isSlotTime(slotTime: string, date: string | Date) {
    return slotService.isSlotTime(this.availableSlots, slotTime, date);
  }

  async applyFilter(filterOpions: any) {
    this.showFilter = false;
    this.showFilter = false;
    this.filterOptions = filterOpions;
    const loadedSchedules: any = await this.schedulesByPractitioner(
      filterOpions.byPractitioners[0]
    );

    const response: any = await slotService.getPractitionersSlots(
      filterOpions.byPractitioners[0]
    );
    this.filteredSlots = response?.data;
  }

  viewSchedule(id: string) {}

  goToCreateSlot() {
    this.$router.push({
      name: "Edit Slot",
      query: {
        scheduleId: this.selectedSlot.scheduleId,
        startTime: this.selectedSlot.startTime,
        endTime: this.selectedSlot.endTime,
      },
    });
  }

  showFilterPane() {
    this.showFilter = true;
  }

  async created() {
    if (!this.practitioners) await this.fetchPractitioners();
    if (!this.locations) await this.fetchLocations();
    if (!this.devices) await this.fetchDevices();
  }
}
</script>

<style scoped>
.book-bg {
  background-color: #fff0f1 !important;
}

.selected {
  background-color: lightgreen !important;
}
</style>
