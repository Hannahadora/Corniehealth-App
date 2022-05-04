<template>
<div class="mt-10">
    <div v-if="!authCurrentLocation">
         <p class="text-center text-lg font-bold py-5">Set a default location to view calendar</p>
    </div>
<div v-else>
    <div class="grid grid-cols-7 text-gray-400 font-bold" style="height: 4.5rem;">
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Sunday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Monday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Tuesday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Wednesday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Thursday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Friday</span>
        <span class="border-l-2 px-4 border-gray-100 h-full w-full">Saturday</span>
    </div>
    <div class="grid grid-cols-7 text-gray-500 divide-x border-l-2 border-gray-100 font-bold">
        <div class="px-4 py-8 border-t-2 mb-3 border-gray-100" v-for="(item, index) in monthlyData" :key="index">
            {{ new Date(item.month).toLocaleDateString('en-US',options) }}  
            <div class="mb-1">
                <actors-section  :items="item.content" />
            </div>
        </div>
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
import { cornieClient } from "@/plugins/http";
import Tabs from "@/components/smalltab.vue";
import ActorsSection from "./monthActors.vue";

const user = namespace("user");
const locationsStore = namespace("location");

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
    ActorsSection
  },
})
export default class Monthly extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

     options = {
        day: 'numeric',
    } 

   options2 = {
         weekday: 'short', //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: 'numeric',
        // month: "short", //to display the full name of the month
    } 

  @Prop({ type: String, default: "" })
  startDate!: any;
  
  @user.Getter
  authCurrentLocation!: string;



  @locationsStore.Action
  fetchDevices!: () => Promise<void>;


  query = "";
  monthCalendar = [];
  showFilter = false;

  get IdPract(){
    if(this.$route.query.practitioner){
      return this.$route.query.practitioner;
    }
 }


async fetchMonthCalendar() {
   const date = this.startDate.toISOString() as any;
     const AllCalendarDay = cornieClient().get(
      `/api/v1/calendar/organization/${this.authCurrentLocation}/month-view?date=${date}`,);
     
     const response = await Promise.all([AllCalendarDay]);
     this.monthCalendar = response[0].data;
   
  

  }

  // interface MonthCalendar {
  //     [day: string]: string[];
  // }

   getMonthDates(entry: Date) {
    const start = new Date(entry);
    start.setDate(1);
    const month = start.getMonth();
    const dates: Date[] = [];
    while (start.getMonth() === month) {
      dates.push(new Date(start));
      const day = start.getDate();
      start.setDate(day + 1);
    }
    return dates;
  }

   fillDates(start: Date){
    const offset = start.getDay()
    const sunday = new Date(start)
    sunday.setDate(sunday.getDate() - offset)
    const dates = []
    for(let i  = sunday.getDay(); i < offset; i++){
      const date = new Date(sunday)
      date.setDate(sunday.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  padDates(last: Date){
    const lastDay = last.getDay()
    const dates: any[] = []
    const offset = 7 - lastDay
    for (let i = 1; i <= offset; i++ ){
      const date = new Date(last)
      date.setDate(date.getDate() + i)
      dates.push()
    }
    return dates
  }

  toDateString(date: Date) {
    const [dateStr, _] = date.toISOString().split("T");
    return dateStr;
  }

  get report(){
    return this.monthCalendar
  }

  get monthlyData(){
    const monthDates = this.getMonthDates(new Date('2021-10-12'))  // 2022-03-12
    const [firstDay, ..._] = monthDates
    const lastDay = [...monthDates].pop()
    const frontPad = this.fillDates(firstDay)
    const backPad = this.padDates(lastDay as any)
    const paddedMonthDates = [...frontPad, ...monthDates, ...backPad]


    const monthDateStrs =   paddedMonthDates.map(this.toDateString) 
    const views: { month: string; content: string[]; }[] = []

    monthDateStrs.forEach(month => {
      const content = this.monthCalendar[month as any]
      const view = {month, content}
      views.push(view)
    })

    return views

  

  }


  async created() {
    this.fetchMonthCalendar()
    // if (!this.authCurrentLocation) await this.fetchMonthCalendar();
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
