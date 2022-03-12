<template>
  <screen-header :properties="properties"> Availability </screen-header>
  <div class="container">
    <div class="w-full">
      <div class="container-fluid">
        <!-- <div class="container-fluid" v-if="filterOptions.byPractitioners?.length === 0"> -->
        <tabs
          :items="tabLinks"
          v-model="currentTab"
          :dDate="start"
          @filter="showFilterPane"
          @left="setLeft"
          @right="setRight"
        >
          <div>
            <day-section
              @set-oneId="setoneId"
              :schedules="schedules"
              :startDate="start"
            />
          </div>
          <div>
            <week-section
              @set-oneId="setoneId"
              :schedules="schedules"
              :startDate="start"
            ></week-section>
          </div>
          <div>
            <month-section
              @set-oneId="setoneId"
              :schedules="schedules"
              :startDate="start"
            />
          </div>
        </tabs>
      </div>

      <advanced-filter v-model="showFilter" @applyfilter="applyFilter" />
    </div>
  </div>
</template>

<script lang="ts">
import utilservice from "./helper/util";
import dateHelper from "./helper/date-helper";
import AddIcon from "@/components/icons/add.vue";
// import Actors from "./actors.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import slotService from "./helper/slot-service";
import AdvancedFilter from "./sections/advanced-filter.vue";
// import SideModal from "../components/side-modal.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import { Practitioner } from "@/types/IPatient";
import SelectedPractitioner from "./sections/selected-practitioner.vue";
import SelectedLocation, { IItem } from "./sections/selected-location.vue";
import ILocation from "@/types/ILocation";
import IDevice from "@/types/IDevice";
import ISchedule from "@/types/ISchedule";
import CalendarIcon from "@/components/icons/bcalendar.vue";
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import ShareIcon from "@/components/icons/share.vue";
import { getWeekStart, printWeekday, addDays } from "@/plugins/utils";
import group from "@/store/group";
import IPractitioner from "@/types/IPractitioner";
import actorsSection from "./sections/newActors.vue";
import search from "@/plugins/search";
import Tabs from "@/components/smalltab.vue";
import WeekSection from "./sections/weekly.vue";
import DaySection from "./sections/daily.vue";
import MonthSection from "./sections/monthly.vue";
import ScreenHeader from "./Header.vue";

const practitionersStore = namespace("practitioner");
const locationsStore = namespace("location");
const visitsStore = namespace("visits");

interface Time {
  hour: number;
  minute: number;
}

@Options({
  name: "Availability",
  components: {
    AddIcon,
    // Actors,
    CornieTable,
    // SideModal,
    AdvancedFilter,
    WeekSection,
    actorsSection,
    CopyIcon,
    MonthSection,
    DaySection,
    CornieSelect,
    EditIcon,
    SelectedPractitioner,
    SelectedLocation,
    CalendarIcon,
    CancelIcon,
    ShareIcon,
    Tabs,
    ScreenHeader,
  },
})
export default class AvailabilityScreen extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ default: {} })
  properties!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  actorsValue = [] as any;

  /// Start

  tabLinks = ["Day", "Week", "Month"];
  currentTab = 0;

  start = new Date();

  setLeft(value: any) {
    const now = this.start ?? new Date();
    if (value == 0) {
      this.start = addDays(now, -1);
    } else if (value == 1) {
      this.start = addDays(now, -7);
    } else {
      this.start = addDays(now, -30);
    }
  }
  setRight(value: any) {
    const now = this.start ?? new Date();
    if (value == 0) {
      this.start = addDays(now, 1);
    } else if (value == 1) {
      this.start = addDays(now, 7);
    } else {
      this.start = addDays(now, 30);
    }
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
    // const now = new Date(); // sun jan 23, 2022 //
    const startDate = this.start;
    const now = this.start;
    const start = getWeekStart(now);
    const dates = this.getWeekDates(start);
    const headers = dates.map((date: any) => ({
      key: printWeekday(date),
      title: date.toDateString(),
      show: true,
    }));

    return [{ key: "range", title: "Time", show: true }, ...headers];
  }

  groupHourly(schedules: ISchedule[]) {
    const groups: { [state: number]: ISchedule[] } = {};
    schedules.forEach((schedule) => {
      const start = this.buildTime(schedule.startTime);
      const end = this.buildTime(schedule.endTime);
      const hours = this.getHoursBetween(start, end);
      this.insertMatchingHours(groups, hours, schedule);
    });
    this.padHourlyGrouping(groups);
    return groups;
  }

  padHourlyGrouping(groups: { [state: number]: ISchedule[] }) {
    const hoursPerDay = 23;
    for (let i = 0; i < hoursPerDay; i++) {
      const schedules = groups[i];
      if (!schedules) groups[i] = [];
    }
  }
  groupDaily(schedules: ISchedule[]) {
    const weekDays = new Map<string, IPractitioner[]>();
    schedules.forEach((schedule) => {
      this.insertWeekDays(weekDays, schedule);
    });
    const group: { [state: string]: IPractitioner[] } = {};
    weekDays.forEach((value, key) => {
      group[key] = value;
    });
    return group;
  }

  insertMatchingHours(
    groups: { [state: number]: ISchedule[] },
    hours: number[],
    schedule: ISchedule
  ) {
    hours.forEach((hour) => {
      const schedules = groups[hour] ?? [];
      schedules.push(schedule);
      groups[hour] = schedules;
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

  get _items() {
    const schedules = this.schedules || [];
    const hourly = this.groupHourly(schedules);
    const items: { range: any; [state: string]: IPractitioner[] }[] = [];
    Object.entries(hourly).map(([key, value]) => {
      const item = this.groupDaily(value);
      this.actorsValue = item;
      items.push({ ...item, range: this.printRange(Number(key)) as any });
    });
    return items;
  }

  printRange(start: number) {
    const min = this.pad(start);
    const max = this.pad(start + 1);
    return `${min}-${max}`;
  }

  insertWeekDays(map: Map<string, IPractitioner[]>, schedule: ISchedule) {
    const { days } = schedule;
    days.forEach((day) => {
      const _practitioners = map.get(day) ?? [];
      const practitioners = schedule.practitioners ?? [];
      map.set(
        day,
        this.filterPractitioners([...practitioners, ..._practitioners]) as any
      );
      // this.filterPractitioners([... practitioners, ..._practitioners])
    });
  }
  filterPractitioners(practitioners: IPractitioner[]) {
    return search.searchObjectArray(practitioners, this.query);
  }

  goToAppoimment(item: any) {
    console.log(item, "FDJKFD");
    // const [practitioner, ...rest] = item
    // const id = practitioner?.id;
    // console.log(item,"FDJKFD");
    // if(id == null){
    //   return
    // }else{
    //   this.$router.push(`/dashboard/experience/add-appointment/${id}`)
    // }
  }

  setoneId(practitioner: any, value: string) {
    console.log(practitioner, value, "HELLO Fourth");
    this.$emit("set-oneId", practitioner, value);
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
