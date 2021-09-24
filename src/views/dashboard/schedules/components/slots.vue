<template>
    <div class="container">
        <div class="w-full">
              <div class="container-fluid">
                <cornie-table :columns="headers" v-model="items" @filter="showFilterPane">
                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <eye-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="() => $router.push({ name: 'Edit Slot', query: { slotId: item.id } })">View </span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <edit-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="() => $router.push({ name: 'Edit Slot', query: { slotId: item.id } })">Update </span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <share-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs">Share </span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <delete-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="removeSlot(item.id)">Delete </span>
                  </div>
                  
                </template>
                  
              </cornie-table>
              </div>

              <side-modal :visible="showFilter" @closesidemodal="() => showFilter = false">
                <advanced-filter @applyfilter="applyFilter" />
              </side-modal>
              </div>
    </div>
</template>

<script lang="ts">
import utilservice from '../helper/util'
import dateHelper from '../helper/date-helper'
import AddIcon from '@/components/icons/add.vue'
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import slotService from '../../visits/helper/slot-service';
import AdvancedFilter from './advanced-filter.vue'
import SideModal from '../components/side-modal.vue';
import CornieSelect from "@/components/cornieselect.vue"
import { namespace } from 'vuex-class';
import ISchedule from '@/types/ISchedule';
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from '@/components/icons/edit.vue'
import ShareIcon from '@/components/icons/share.vue'
import DeleteIcon from '@/components/icons/delete.vue'

const practitionersStore = namespace('practitioner')
const schedulesStore = namespace('schedules')

@Options({
  components: {
    AddIcon,
    CornieTable,
    SideModal,
    AdvancedFilter,
    CornieSelect,
    EyeIcon,
    EditIcon,
    ShareIcon,
    DeleteIcon,
  },
})

export default class Availability extends Vue {
    @schedulesStore.State
    schedules!: ISchedule[]

    @schedulesStore.Action
    getSchedules!: () => Promise<void>;
    

    @schedulesStore.Action
    deleteSlot!: (id: string) => Promise<boolean>;
    
    headers = [
    {
      title: "Identifier",
      key: "id",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Date",
      key: "date",
      show: true,
    },
    { title: "Time", key: "time", show: true },
    
    {
      title: "Booking CutOff",
      key: "bookingCutOff",
      show: true,
    },
    {
      title: "Participants",
      key: "participants",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    
  ];

  slots: any = [ ]

  get items() {
    if (!this.slots || this.slots.length === 0) return [ ];
    // if (!this.schedules || this.schedules.length === 0) return [ ];
    // const slots = slotService.getFixedSlots(this.schedules).map((slot: any) => {      
    //   return {
    //     ...slot,
    //     time: `${slot.startTime} - ${slot.endTime}`
    //   }
    // })
    const slots = this.slots.map((slot: any) => {
      return {
        ...slot,
        time: `${slot.startTime.substring(0, 5)} - ${slot.endTime.substring(0, 5)}`
      }
    })
    console.log(slots, "SLLLTS");
    return slots;
    
  }

  async removeSlot(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to delete this slot?",
    });
    if (!confirmed) return;

    try {
      const deleted = await this.deleteSlot(id);
      if (deleted) {
        window.notify({ msg: "Slot deleted", status: "success" });
      } else {
        window.notify({ msg: "Slot not deleted", status: "error" });
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Error deleting slot", status: "error" });
    }
  }

  async created() {
    if (!this.schedules) await this.getSchedules();
    console.log(this.schedules, "SChedules");
    const res = await slotService.getPractitionersSlots("87e846a3-bac0-43b9-a4db-0b2605426c42");
    this.slots = res.data ?? [];
    console.log(this.slots, "this slots");
    
  }
}
</script>

<style scoped>
.book-bg {
  background-color: #FFF0F1 !important;
}

.selected {
  background-color: lightgreen !important;
}
</style>