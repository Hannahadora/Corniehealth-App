<template>
<div class="mt-10">

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
        <div class="px-4 py-8 border-t-2 mb-3 border-gray-100" v-for="(item, index) in monthCalendar" :key="index">
            {{ new Date(index).toLocaleDateString('en-US',options) }}  
            <div v-for="(value, valueindex) in item"  :key="valueindex" class="mb-1">
                <actors-section  :items="item"  :range="valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'" :range2="valueindex  >= 9 ? (parseInt(valueindex) + 1) +':00' : '0' + (parseInt(valueindex) + 1) +':00'" @set-oneId="setoneId" />
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
import ActorsSection from "./monthactor.vue";

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

 @Prop({ type: String, default: "" })
  practitionersId!: string;

  @Prop({ type: Array })
  schedules!: ISchedule[];

     options = {
        // weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: "numeric",
        // month: "short", //to display the full name of the month
    } 

   options2 = {
         weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: "numeric",
        // month: "short", //to display the full name of the month
    } 

  @Prop({ type: String, default: "" })
  startDate!: string;

  @user.State
  currentLocation!: string;



  @locationsStore.Action
  fetchDevices!: () => Promise<void>;


  query = "";
  monthCalendar = [];

  showFilter = false;


async fetchMonthCalendar() {
  //  const date = this.start as any;
    const AllCalendarWeek = cornieClient().get(
       '/api/v1/calendar/organization/25bc0c8e-bec8-401d-a1a3-bb74fee9dc4a/month-view?date=2021-10-01',
    );
    const response = await Promise.all([AllCalendarWeek]);
    this.monthCalendar = response[0].data;
  }


  async created() {
    this.fetchMonthCalendar()
    // if (!this.currentLocation) await this.fetchMonthCalendar();
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
