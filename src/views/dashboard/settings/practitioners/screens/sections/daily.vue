<template>
  <div class="border-t-2 border-gray-100">
    <div
      class="flex space-x-7 w-full"
      v-for="(item, index) in _items"
      :key="index"
    >
      <div class="border-r-2 border-gray-100 p-3">
        <span class="text-sm">{{
          item?.date.toLocaleTimeString("en-US")
            ? item?.date.toLocaleTimeString("en-US")
            : "0:00:00 PM  "
        }}</span>
      </div>
      <div class="border-t-2 mt-3 border-gray-100 w-full">
        <div
          class="border-t-2 mt-4 w-full col-span-full border-dashed border-gray-100 p-3"
        >
          <actors-section
            v-for="(cal, index) in item?.schedules"
            :key="index"
            :items="cal?.practitioners"
            @set-oneId="setoneId"
            :range="tConvert(cal?.startTime) + ' - ' + tConvert(cal?.endTime)"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- <cornie-table
    :columns="headers"
    v-model="_items"
     :search="false"
    :menu="false"
    @filter="showFilterPane"
    >
    <template #monday="{item}">
    <actors-section :items="item.monday" @set-oneId="setoneId" v-if="item?.monday" :range="item.range"/>
    <span v-else>--</span>
    </template>
    <template #tuesday="{item}">
        <actors-section :items="item.tuesday" @set-oneId="setoneId" v-if="item?.tuesday" :range="item.range"/>
        <span v-else>--</span>
    </template>
    <template #wednesday="{item}">
        <actors-section :items="item.wednesday" @set-oneId="setoneId" v-if="item?.wednesday" :range="item.range"/>
        <span v-else>--</span>
    </template>
    <template #thursday="{item}">
        <actors-section :items="item.thursday" @set-oneId="setoneId" v-if="item?.thursday" :range="item.range"/>
        <span v-else>--</span>
    </template>
    <template #friday="{item}">
        <actors-section :items="item.friday" @set-oneId="setoneId" v-if="item?.friday" :range="item.range"/>
        <span v-else>--</span>
    </template>
    <template #saturday="{item}">
        <actors-section :items="item.saturday" @set-oneId="setoneId" v-if="item?.saturday" :range="item.range"/>
        <span v-else>--</span>
    </template> 
    <template #sunday="{item}">
        <actors-section :items="item.sunday" @set-oneId="setoneId" v-if="item?.sunday" :range="item.range"/>
        <span v-else>--</span>
    </template>
   </cornie-table> -->
</template>

<script lang="ts">
import AddIcon from "@/components/icons/add.vue";
import dateHelper from "../helper/date-helper";
import Actors from "./actors.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
// import AdvancedFilter from "./advanced-filter.vue";
// import SideModal from "../components/side-modal.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import { Practitioner } from "@/types/IPatient";
// import SelectedPractitioner from "./selected-practitioner.vue";
import SelectedLocation, { IItem } from "./selected-location.vue";
import ILocation from "@/types/ILocation";
import ISchedule from "@/types/ISchedule";
import CalendarIcon from "@/components/icons/bcalendar.vue";
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import ShareIcon from "@/components/icons/share.vue";
import { dateBetween, getWeekStart, printWeekday } from "@/plugins/utils";
import group from "@/store/group";
import IPractitioner from "@/types/IPractitioner";
import ActorsSection from "./dayActors.vue";
import search from "@/plugins/search";
import Tabs from "@/components/smalltab.vue";

const practitionersStore = namespace("practitioner");
const locationsStore = namespace("location");
const visitsStore = namespace("visits");

interface Time {
  hour: number;
  minute: number;
}

@Options({
  name: "Daily",
  components: {
    AddIcon,
    Actors,
    CornieTable,
    // SideModal,
    // AdvancedFilter,
    ActorsSection,
    CopyIcon,
    CornieSelect,
    EditIcon,
    // SelectedPractitioner,
    SelectedLocation,
    CalendarIcon,
    CancelIcon,
    ShareIcon,
    Tabs,
  },
})
export default class Daily extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  @Prop({ type: String, default: "" })
  startDate!: string;

  actorsValue = [] as any;

  @visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<ISchedule[]>;

  options = {
    weekday: "long", //to display the full name of the day, you can use short to indicate an abbreviation of the day
    day: "numeric",
    month: "long", //to display the full name of the month
    year: "numeric",
  };

  /// Start

  get ActiveSchedules() {
    const date = new Date(this.startDate).toISOString().split("T")[0];
    return this.schedules.filter((c) => c.startDate === date);
  }

  get CalendarDates() {
    const dates = this.getWeekDates(new Date(this.startDate));
    return dates;
  }

  get _items() {
    const item = this.CalendarDates.map((date) => ({
      date,
      schedules: this.getMatchingSchedules(date),
      practitioners: this.getMatchingSchedules(date).map(
        (schedule) => schedule.practitioners
      ),
    }));

    const [first, ...rest] = item;
    const pad = first.date.getDay();
    return [...Array(pad).fill(null), ...item];
  }

  getMatchingSchedules(date: Date) {
    return this.ActiveSchedules.filter((schedule) => {
      console.log(schedule, "MAPP");
      return dateBetween(
        date.toISOString(),
        schedule.startDate as string,
        schedule.endDate as string
      );
    });
  }

  start = new Date();

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
  tConvert(time: any) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
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

  //   get _items() {
  //     const schedules = this.schedules || [];
  //     const hourly = this.groupHourly(schedules);
  //     const items: { range: any; [state: string]: IPractitioner[] }[] = [];
  //     Object.entries(hourly).map(([key, value]) => {
  //       const item = this.groupDaily(value);
  //       this.actorsValue = item;
  //       items.push({ ...item, range: this.printRange(Number(key)) as any });
  //     });
  //     return items;
  //   }

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

  setoneId(practitioner: any, value: string) {
    console.log(practitioner, value, "HELLO ThIRD");
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
