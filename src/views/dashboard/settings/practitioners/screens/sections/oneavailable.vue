<template>
  <div class="container">
    <div class="w-full">
      <div class="container-fluid">
        <!-- <div class="container-fluid" v-if="filterOptions.byPractitioners?.length === 0"> -->
        <div class="w-full flex space-x-4 py-4"  v-for="(input, index) in singlePractitioner" :key="index">
            <div class="flex space-x-4">
                    <div class="w-10 h-10">
                    <avatar
                        class="mr-2"
                        v-if="input.user?.image"
                        :src="input.user?.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div>
                    <p class="text-xs text-dark font-semibold">
                        {{ input.user?.firstName }}
                        {{ input.user?.lastName }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                        {{ input?.jobDesignation }}
                        {{ input?.department }}
                    </p>
                    </div>
            </div>
            <filter-icon class="-mt-2 shadow rounded-full" @click="showFilterPane"/>
        </div>
        <cornie-table
          :columns="headers"
          v-model="items"
          @filter="showFilterPane"
        >
          <template #actions>
            <!-- <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              style="width: 200px"
            >
              <add-icon class="mr-3 mt-1" />
              <span class="ml-3 text-xs" @click="goToCreateSlot()"
                >Create slot</span
              >
            </div> -->
            <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" 
            @click="goToAppoimment(item)">
              <calendar-icon />
              <span class="ml-3 text-xs">Book Appointment</span>
            </div> -->
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

          <template #monday="{item}">
           <color-section :items="item.monday"/>
          </template>
           <template #tuesday="{item}">
            <color-section :items="item.tuesday"/>
          </template>
           <template #wednesday="{item}">
             <color-section :items="item.wednesday"/>
          </template>
           <template #thursday="{item}">
             <color-section :items="item.thursday"/>
          </template>
           <template #friday="{item}">
              <color-section :items="item.friday"/>
          </template>
           <template #saturday="{item}">
             <color-section :items="item.saturday"/>
          </template> 
          <template #sunday="{item}">
             <color-section :items="item.sunday"/>
          </template>


        </cornie-table>
        <div class="flex space-x-4 mt-5">
            <span class="text-xs flex space-x-2">
                <dot-1-icon class="mt-1"/> 
                <span>Available</span> 
            </span>
            <span class="text-xs flex">
                <dot-2-icon /> 
                <span>Booked</span>
            </span>
            <span class="text-xs flex space-x-2">
                <dot-3-icon class="mt-1"/> 
                <span>Not Available</span>
            </span>

        </div>
      </div>

  
      <!-- <side-modal
        :visible="showFilter"
        @closesidemodal="() => (showFilter = false)"
      >
      </side-modal> -->
        <advanced-filter v-model="showFilter"  @applyfilter="applyFilter" />
      
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
import {Slot} from '@/types/ISchedule';
import ColorSection from './color.vue'
import Dot1Icon from '@/components/icons/dot1.vue';
import Dot2Icon from '@/components/icons/dot2.vue';
import Dot3Icon from '@/components/icons/dot3.vue';


import actorsSection from './newActors.vue';
import search from "@/plugins/search";
import Avatar from "@/components/avatar.vue";
import FilterIcon from "@/components/icons/circleFilter.vue";

const practitionersStore = namespace("practitioner");
const locationsStore = namespace("location");
const devicesStore = namespace("devices");
const visitsStore = namespace("visits");
const slot = namespace("schedules");

interface Time {
  hour: number;
  minute: number;
}

@Options({
  name: "SingleAvailability",
  components: {
    AddIcon,
    FilterIcon,
    Actors,
    CornieTable,
    ColorSection,
    SideModal,
    Avatar,
    Dot1Icon,
    Dot2Icon,
    Dot3Icon,
    AdvancedFilter,
    actorsSection,
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
export default class SingleAvailability extends Vue {
 @Prop({ type: String, default: "" })
  id!: string;

  @Prop({type: Array, default: []})
  singlePractitioner!:object;

//   @Prop({ type: Object })
//   items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  actorsValue = [] as any;

  @slot.State
  slots!: Slot[];

  @slot.Action
  singlePractitonerSlot!: (slotId: string) => Promise<void>;

  /// Start

  get items() {
    const slots = this.slots || [];
    const hourly = this.groupHourly(slots);
    const items: { range: any; [state: string]: IPractitioner[] }[] = [];
    Object.entries(hourly).map(([key, value]) => {
      const item = this.groupDaily(value);
      this.actorsValue = item;
      items.push({ ...item, range: this.printRange(Number(key)) as any });
    });
    return items;
  }

groupDaily(slots: Slot[]) {
    const weekDays = new Map<string, Slot[]>();
    slots.forEach((slot) => {
      this.insertWeekDays(weekDays, slot);
    });
    const group: { [state: string]: Slot[] } = {};
    weekDays.forEach((value, key) => {
      group[key] = value;
    });
    return group;
}
insertWeekDays(map: Map<string, Slot[]>, slot: any) {
    const  date = new Date(slot.date) as any;
    const weekday = printWeekday(date)
    const slots = map.get(weekday) ?? [];
    slots.push(slot)
    map.set(weekday, slots);
    // this.filterPractitioners([... practitioners, ..._practitioners])

  }
  getWeekDates(start: Date) {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const current = start.getDate();
      const date = new Date(start);
      date.setDate(current + i);
      dates.push(date);
    }
    return dates;
  }

  get headers() {
    const now = new Date(); // sun jan 23, 2022 //
    const start = getWeekStart(now);
    const dates = this.getWeekDates(start);
    const headers = dates.map((date) => ({
      key: printWeekday(date),
      title: date.toDateString(),
      show:true
    }));

    return [{ key: "range", title: "Time", show:true },...headers];
  }

  groupHourly(slots: Slot[]) {
    const groups: { [state: number]: Slot[] } = {};
    slots.forEach((slot:any) => {
      const start = this.buildTime(slot.startTime);
      const end = this.buildTime(slot.endTime);
      const hours = this.getHoursBetween(start, end);
      this.insertMatchingHours(groups, hours, slot);
    });
    this.padHourlyGrouping(groups);
    return groups;
  }

  padHourlyGrouping(groups: { [state: number]: Slot[] }) {
    const hoursPerDay = 23;
    for (let i = 0; i < hoursPerDay; i++) {
      const schedules = groups[i];
      if (!schedules) groups[i] = [];
    }
  }


  insertMatchingHours(
    groups: { [state: number]: Slot[] },
    hours: number[],
    slot: Slot
  ) {
    hours.forEach((hour) => {
      const slots = groups[hour] ?? [];
      slots.push(slot);
      groups[hour] = slots;
    });
  }
  buildTime(time: string) {
    const [hour, min, ...rest] = time.split(":");
    return {
      hour: Number(hour),
      minute: Number(min),
    };
  }
  getHoursBetween(start: Time, end: Time) {
    const hours = [];
    for (let i = start.hour; i < end.hour; i++) {
      hours.push(i);
    }
    if (end.minute) hours.push(end.hour + 1);
    return hours;
  }
  pad(x: number) {
    if (x < 10) return `0${x}:00`;
    return `${x}:00`;
  }

 

  printRange(start: number) {
    const min = this.pad(start);
    const max = this.pad(start + 1);
    return `${min}-${max}`;
  }


  filterPractitioners(practitioners:IPractitioner[]) {
    console.log(search.searchObjectArray(practitioners, this.query),"FILTER");
      return search.searchObjectArray(practitioners, this.query);
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

  query = "";

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
//   get availabilityDates() {
//     let arr = [];
//     for (let i = 0; i < 7; i++) {
//       // let sunday = new Date();
//       let sunday = new Date(
//         new Date().setDate(
//           new Date().getDate() - ((new Date().getDay() + 6) % 6)
//         )
//       );
//       arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
//     }

//     return arr;
//   }

  

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

//   get availabilityHeaders() {
//     if (!this.availabilityDates) return [];
//     let arr = this.availabilityDates.map((i: any, index: number) => {
//       return {
//         title: i,
//         key: index.toString(),
//         show: true,
//         // show: index > 4 ? false : true
//       };
//     });
//     arr.unshift({ title: "Time", key: "time", show: true });
//     return arr;
//   }

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
    await this.singlePractitonerSlot(this.id);
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
