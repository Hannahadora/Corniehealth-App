<template>
<div class="mt-12">
        <div v-if="!authCurrentLocation">
         <p class="text-center text-lg font-bold py-5">Set a default location to view calendar</p>
        </div>
          <div class="flex w-full" v-else v-for="(item, index) in dayCalendar" :key="index">
              <span class="text-xs text-gray-500 font-semibold p-3 border-r-2  border-gray-100">{{ index > 9 ? index +':00' : '0' + index +':00'}}</span>
              <div class="border-gray-100 w-full  border-b-2 ">
                <actors-section :date="startDate" :items="item" :singletime="index" :range="index > 9 ? index +':00' : '0' + index +':00'" :range2="index  >= 9 ? (parseInt(index) + 1) +':00' : '0' + (parseInt(index) + 1) +':00'"/>
                      <!-- <actors-section    :items="cal?.practitioners" @set-oneId="setoneId"  :range="tConvert(cal?.startTime) +' - '+ tConvert(cal?.endTime)"/> -->
              </div>
              <span class="text-xs text-gray-500 font-semibold p-3 border-l-2  border-gray-100">{{ index > 9 ? index +':00' : '0' + index +':00'}}</span> 
          </div>
</div>
</template>

<script lang="ts">
import AddIcon from "@/components/icons/add.vue";
import { Options, Vue, } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import ISchedule from "@/types/ISchedule";
import CalendarIcon from "@/components/icons/bcalendar.vue"
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CancelIcon from "@/components/icons/cancel.vue"
import ShareIcon from "@/components/icons/share.vue"
import { cornieClient } from "@/plugins/http";
import IPractitioner from "@/types/IPractitioner";
import search from "@/plugins/search";
import Tabs from "@/components/smalltab.vue";
import { splitDate } from '@/plugins/utils'
import ActorsSection from './daysActors.vue';


const user = namespace("user");

interface Time {
  hour: number;
  minute: number;
}

@Options({
  name: "Daily",
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
    ActorsSection,
  },
})
export default class Daily extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  @Prop({ type: String, default: "" })
  startDate!: any;

  @user.Getter
  cornieData!: IPractitioner;

  dayCalendar = [] as any;

  actorsValue = [] as any;


  @user.Getter
  authCurrentLocation!: string;


  @Watch("startDate")
  idChanged() {
    this.fetchDayCalendar();
  }

  query = "";
  showFilter = false;
  filterOptions: any = {};
  ;

  //// End

  get IdPract(){
    if(this.$route.query.practitioner){
      return this.$route.query.practitioner;
    }
}
  async fetchDayCalendar() {
    const [splitDate] = this.startDate.toISOString().split('T');
   const date = splitDate;
     const AllCalendarDay = cornieClient().get(
        `/api/v1/calendar/organization/${this.authCurrentLocation}/day-view?date=${date}`,);
     
     const response = await Promise.all([AllCalendarDay]);
     this.dayCalendar = response[0].data;
   
  }


  async created() {
    await this.fetchDayCalendar();
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
