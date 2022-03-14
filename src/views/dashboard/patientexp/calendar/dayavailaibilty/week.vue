<template>
 <div class="mt-12">
    <cornie-card class="mt-3 block table-card pb-2" flat>
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
            <td class="p-2 border-r-2 text-xs text-gray-500 border-gray-100" >{{ valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'  }}</td>
              <template v-for="(item, index) in weekCalendar" :key="index">
                <td class="p-3 text-sm capitalize border-r-2  border-gray-100">
                     <actors-section :items="value" :range="valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'" :range2="valueindex  >= 9 ? (parseInt(valueindex) + 1) +':00' : '0' + (parseInt(valueindex) + 1) +':00'"/>
                </td>
              </template>
              <td class="p-2 text-xs text-gray-500">{{ valueindex > 9 ? valueindex +':00' : '0' + valueindex +':00'    }}</td>
          </tr>
      </table>
    </cornie-card>

    <column-filter
      :columns="columns"
      v-model:preferred="preferredColumns"
      v-model:visible="showColumnFilter"
    />
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
import ActorsSection from './weekactor.vue';


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

@Prop({ type: String, default: "" })
  practitionersId!: string;

  @Prop({ type: Array })
  schedules!: ISchedule[];

  @Prop({ type: String, default: "" })
  startDate!: any;


@Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @user.State
  currentLocation!: string;

  actorsValue = [] as any;


   @Watch("startDate")
  idChanged() {
    this.fetchweekCalendar();
  }



  query = "";
  weekCalendar = [];
  showFilter = false;
  orderBy: Sorter = () => 1;

 get filteredItems() {
    for (var key in this.weekCalendar) {
        var obj = this.weekCalendar[key];
        return obj
    }
  }


 async fetchweekCalendar() {
  //  const date = this.start as any;
    const AllCalendarWeek = cornieClient().get(
       '/api/v1/calendar/organization/25bc0c8e-bec8-401d-a1a3-bb74fee9dc4a/week-view?date=2021-10-12',
    );
    const response = await Promise.all([AllCalendarWeek]);
    this.weekCalendar = response[0].data;
  }


  async created() {
      if(!this.currentLocation) await this.fetchweekCalendar();

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
