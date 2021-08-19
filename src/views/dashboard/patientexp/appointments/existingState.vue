<template>
  <div class="w-full overflow-auto h-screen">
    <span class="flex justify-end w-full">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          pr-5
          pl-5
          px-3
          focus:outline-none
          hover:opacity-90
        "
         @click="$router.push('/dashboard/provider/experience/add-appointment')"
      >
         Create Appointment
      </button>
      
    </span>
   <cornie-table :columns="rawHeaders" v-model="sortAppointments">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
          <newview-icon />
          <span class="ml-3 text-xs">View</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/provider/experience/add-appointment/${getKeyValue(item).value}`)">
          <update-icon />
          <span class="ml-3 text-xs">Update</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
          <checkin-icon />
          <span class="ml-3 text-xs">Check-In</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
          <note-icon />
          <span class="ml-3 text-xs">Make Notes</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
          <cancel-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
    </cornie-table>

    <cornie-dialog :visible="showAddCarePartners" right class="w-4/12 h-full">
      <add-care-partners @close="showAddCarePartners = false" class="h-full" />
    </cornie-dialog>
      <notes-add
          :appointmentId="appointmentId"
          @update:preferred="makeNotes"
          v-model:visible="showNotes"
        />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/card-text.vue";
import CornieDialog from "@/components/Dialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IAppointment from "@/types/IAppointment";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/close.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const appointment = namespace("appointment");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    SearchIcon,
    CloseIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog
  },
  
})
export default class GroupExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showNotes = false;
appointmentId="";
  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", value: "serviceCategory", show: true },
    {
      title: "Patient",
      value: "patients",
      show: true,
    },
    {
      title: "Appointment Type",
      value: "appointmentType",
      show: true,
    },
    {
      title: "Participants",
      value: "participants",
      show: false,
    },
    {
      title: "Slot",
      value: "slot",
      show: true,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    {
      title: "Code",
      value: "reasonCode",
      show: false,
    },
    {
      title: "Reason Reference",
      value: "reasonRef",
      show: false,
    },
    {
      title: "Period",
      value: "period",
      show: false,
    },
    {
      title: "Priority",
      value: "priority",
      show: false,
    },
    {
      title: "Description",
      value: "description",
      show: false,
    },
    {
      title: "Consultation Medium",
      value: "consultationMedium",
      show: false,
    },
    {
      title: "Member Period",
      value: "memberPeriod",
      show: false,
    },
    {
      title: "Member Status",
      value: "memberStatus",
      show: false,
    },
    {
      title: "Member Entity",
      value: "memberEntity",
      show: false,
    },
    {
      title: "Value Quantity",
      value: "valueQuantity",
      show: false,
    },
    {
      title: "Value Codeable Concept",
      value: "valueCodeableConcept",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  


  get items() {
    const appointments = this.appointments.map((appointment) => {
       (appointment as any).period = new Date(
         (appointment as any).period 
       ).toLocaleDateString("en-US");
       (appointment as any).memberPeriod = new Date(
         (appointment as any).memberPeriod 
       ).toLocaleDateString("en-US");

       
        return {
        ...appointment,
         action: appointment.id,
        };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this group",
      title: "Delete Group"
    });
    if (!confirmed) return;

    if (await this.deleteAppointment(id)) window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }
  async makeNotes(id:string){
    this.appointmentId = id;
    this.showNotes = true;
  }
      get sortAppointments (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
    //  async created() {
    //   console.log(this.items);
    // }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>
