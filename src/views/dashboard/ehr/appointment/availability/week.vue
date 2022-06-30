<template>
 <div class="mt-12">
     
       <div v-if="!authCurrentLocation">
         <p class="text-center text-lg font-bold py-5">Set a default location to view calendar</p>
          <!-- <div v-if="loading">
            <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
              <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
              <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this modal.</p>
            </div>
        </div>  -->
    </div>
    <cornie-card class="mt-3 block table-card pb-2" v-else>
      <table class="w-full h-full my-5" style="border-radius: 5px">
        <thead class="border-b-2 border-gray-100  text-black font-semibold" style="height: 3.5rem;">

          <template v-for="(item, index) in weekCalendar" :key="index">
            <th class="text-right">
             <div class="w-full flex float-right">

              <div class="flex pr-2 float-right justify-end border-r-2 border-gray-100  w-full h-full">
                  <span class="uppercase text-xs font-semibold text-gray-400">
                    {{ new Date(index).toLocaleDateString('en-US',{  weekday: "short",}) }}
                    <p class="uppercase  text-lg text-black font-bold">
                        {{ new Date(index).toLocaleDateString('en-US',{ day: "numeric",}) }}
                      </p>
                  </span>
              </div>
             </div>
            </th>
          </template>

        </thead>
      
          <tr
        
            v-for="(value, valueindex) in filteredItems"
            :key="valueindex"
            class="border-t-2"
            style="height: 3.5rem;"
          >
            <td    class="p-2 border-r-2 text-xs text-gray-500 border-gray-100" >{{ valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'  }}</td>
              <template v-for="(item, index) in weekCalendar" :key="index">
                <td class="p-3 text-sm capitalize border-r-2  border-gray-100">
                     <actors-section :singletime="valueindex" :items="value[index]" :range="valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'" :range2="valueindex  >= 9 ? (parseInt(valueindex) + 1) +':00' : '0' + (parseInt(valueindex) + 1) +':00'"/>
                </td>
              </template>
            <td class="p-2 text-xs text-gray-500">{{ valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'    }}</td>
            
           
          </tr>
       
      </table>
    </cornie-card>

  </div>
</template>

<script lang="ts">
import AddIcon from "@/components/icons/add.vue";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import CornieTable from "@/components/calendar-table/CornieTable.vue";
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
import search from "@/plugins/search";
import Tabs from "@/components/smalltab.vue";
import { cornieClient } from "@/plugins/http";
import ActorsSection from './weeksActors.vue';


const user = namespace("user");

interface Time {
  hour: number;
  minute: number;
}
type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "Weekly",
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
export default class Weekly extends Vue {
  @Prop({ type: Object })
  items!: any;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  @Prop({ type: String, default: "" })
  startDate!: any;


@Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;


  @user.Getter
  authCurrentLocation!: string;

  actorsValue = [] as any;


  @Watch("startDate")
  idChanged() {
    this.fetchweekCalendar();
  }

  get IdPract(){
    if(this.$route.query.practitioner){
      return this.$route.query.practitioner;
    }
}


  query = "";
  weekCalendar = [];
  showFilter = false;
  orderBy: Sorter = () => 1;
  loading = false;

 get filteredItems() {
    for (var key in this.weekCalendar) {
        var obj = this.weekCalendar[key];
        return obj
    }
  }


 async fetchweekCalendar() {
    const [splitDate] = this.startDate.toISOString().split('T');
   const date = splitDate;
    const AllCalendarDay = cornieClient().get(`/api/v1/calendar/organization/${this.authCurrentLocation}/week-view?date=${date}`,);  
     const response = await Promise.all([AllCalendarDay]);
     if(response){
        this.loading = false;
       this.weekCalendar = response[0].data;
     }
  }


  async created() {
   if(this.authCurrentLocation)await this.fetchweekCalendar();

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
