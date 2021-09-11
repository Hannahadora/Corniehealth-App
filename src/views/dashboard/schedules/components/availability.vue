<template>
    <div class="container">
        <div class="w-full">
                  <cornie-table :columns="availabilityHeaders" v-model="items" @filter="showFilterPane">
                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <add-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="goToCreateSlot(item.id)">Create slot</span>
                  </div>
                  
                </template>

                  <template #time="{ item }">
                    <p class="text-xs">{{ item }}</p>
                  </template>
                  <template #0="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[0], item.split('-')[0].trim()),
                          constructDate(availabilityDates[0], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[0], item.split('-')[0].trim()),
                          constructDate(availabilityDates[0], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span class=" 16" v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #1="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[1], item.split('-')[0].trim()),
                          constructDate(availabilityDates[1], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[1], item.split('-')[0].trim()),
                          constructDate(availabilityDates[1], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #2="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[2], item.split('-')[0].trim()),
                          constructDate(availabilityDates[2], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[2], item.split('-')[0].trim()),
                          constructDate(availabilityDates[2], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #3="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[3], item.split('-')[0].trim()),
                          constructDate(availabilityDates[3], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[3], item.split('-')[0].trim()),
                          constructDate(availabilityDates[3], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #4="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[4], item.split('-')[0].trim()),
                          constructDate(availabilityDates[4], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[4], item.split('-')[0].trim()),
                          constructDate(availabilityDates[4], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #5="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[5], item.split('-')[0].trim()),
                          constructDate(availabilityDates[5], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[5], item.split('-')[0].trim()),
                          constructDate(availabilityDates[5], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  
              </cornie-table>
              </div>
    </div>
</template>

<script lang="ts">
import utilservice from '../helper/util'
import dateHelper from '../helper/date-helper'
import AddIcon from '@/components/icons/add.vue'
import Actors from './actors.vue'
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import CornieTable from "@/components/cornie-table/CornieTable.vue";



@Options({
  components: {
    AddIcon,
    Actors,
    CornieTable,
  },
})
export default class CornieInput extends Vue {
  @Prop({ type: Object })
  items!: any;
  @Prop({ type: Object })
  schedules!: any;

  get availabilityDates() {
    let arr = [ ];
    for (let i = 0; i < 7; i++) {
      // let sunday = new Date();
      let sunday = new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 6))
      arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
    }
    
    return arr;
  }

  get availabilityHeaders() {
    if (!this.availabilityDates) return [ ];
    let arr =  this.availabilityDates.map((i: any, index: number) => {
      return {
        title: i,
        key: index.toString(),
        show: true
        // show: index > 4 ? false : true
      }
    })
    arr.unshift({ title: 'Time', key: 'time', show: true});
    return arr;
  }

  constructDate(date: string, time: string) {
    return dateHelper.constructDateFromDateAndTime(date, time);
  }

  getActorsForSchedule(startDate: string | Date, endDate: string | Date) {
    return dateHelper.getPractitionersForSlot(this.schedules, startDate, endDate);
  }

  showFilterPane() {
    alert("Hello")
  }
}
</script>

