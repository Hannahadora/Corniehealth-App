<template>
<div>

    <div class="grid grid-cols-7 gap-4 bg-accent p-4 text-primary font-bold">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
    </div>
    <div class="grid grid-cols-7 text-gray-500 divide-x border-2 border-gray-100 font-bold">
        <div class="px-4 py-8 border-b-2 flex space-x-5 border-gray-300" v-for="(item, index) in _items" :key="index">
            {{ item?.date.toLocaleDateString('en',options) }}  
            <actors-section v-for="(cal, index) in item?.schedules"  :key="index" :items="cal.practitioners" @set-oneId="setoneId" />
        </div>
    </div>
</div>

</template>

<script lang="ts">
import AddIcon from "@/components/icons/add.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import { Practitioner } from "@/types/IPatient";
import ILocation from "@/types/ILocation";
import ISchedule from "@/types/ISchedule";
import CalendarIcon from "@/components/icons/bcalendar.vue"
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CancelIcon from "@/components/icons/cancel.vue"
import ShareIcon from "@/components/icons/share.vue"
import { dateBetween } from "@/plugins/utils";
import group from "@/store/group";
import IPractitioner from "@/types/IPractitioner";
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
  name: "Monthly",
  components: {
    AddIcon,
    CornieTable,
    CopyIcon,
    CornieSelect,
    EditIcon,
    CalendarIcon,
    CancelIcon,
    ShareIcon,
    Tabs,
  },
})
export default class Monthly extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

     options = {
        // weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: "numeric",
        // month: "short", //to display the full name of the month
    } 


@Prop({ type: String, default: "" })
  startDate!: string

  actorsValue = [] as any;

@visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<ISchedule[]>;

  /// Start

  start  = new Date();

 
 getMonthDates(start: Date) {
    const dates: Date[] = [];
    for (let i = 0; i < 30; i++) {
      const current = start.getMonth();
      const date = new Date(start);
      date.setDate(current + i);
      dates.push(date);
    }
    return dates;
  }
  get Calendar(){
     const dates = this.CalendarDates;
     const [first, ...rest] = dates;
     const pad = first.getDay();
    const allDates = dates.map((date:any) =>  date.toLocaleDateString('en',this.options))
     return [...Array(pad).fill(null), ...allDates];
  }
  get CalendarDates(){
     const dates = this.getMonthDates(new Date(this.startDate));
     return dates;
  }
   get ActiveSchedules(){
       const dates = this.getMonthDates(new Date(this.startDate)).map((date) =>{
         const newdate = new Date(date).toISOString().split('T')[0];
         return newdate
       })
       const dateSet = new Set(dates);
       return this.schedules.filter((c) => dateSet.has(c.startDate as string));
   }
  get _items() {

  const item =  this.CalendarDates.map( date => ({
      date, 
      schedules: this.getMatchingSchedules(date) ,
      practitioners: this.getMatchingSchedules(date).map(schedule => schedule.practitioners )
    }));
     
  const [first, ..._] = item;
  const pad = first.date.getDay();
  return [...Array(pad).fill(null), ...item];

  }

  getMatchingSchedules(date: Date){
      return this.ActiveSchedules.filter((schedule) =>{
          console.log(schedule,"MAPP")
          return dateBetween(
              date.toISOString(),
              schedule.startDate as string,
              schedule.endDate as string
          )
      })

  }
   setoneId(practitioner:any,value:string){
     console.log(practitioner,value,"HELLO ThIRD")
    this.$emit('set-oneId', practitioner,value)
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
