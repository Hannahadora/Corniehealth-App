<template>
  <div
    class="w-full"
  >
     <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-md text-white mt-5 py-3 text-sm px-4 focus:outline-none hover:opacity-90"
        @click="showNewModal = true"
      >
       New Care Plan
      </button>
    </span>
    <cornie-table
          v-model="items"
          :columns="headers"
          @filter="filterAdvanced = true"
        >
          <template #title-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Intent | Title
            </div>
          </template>
          <template #actions="{ item }">
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
                <newview-icon class="mr-3 text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
                 <update-icon class="text-primary fill-current" />
                 <span class="ml-3 text-xs">Edit care plan</span>
              </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showStatusModal(item)">
                <edit-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Update Status</span>
              </div>

               <!-- <table-action>
              <add-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Add Subject</span>
            </table-action>
            <table-action>
              <add-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Add Contributor</span>
            </table-action>
            <table-action>
              <doc-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Assign CareTeam</span>
            </table-action>
            <table-action>
              <doc-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Attach Forms/Questionaire</span>
            </table-action>

            <table-action>
              <feedback-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Request Feedback</span>
            </table-action> -->
          </template>
    </cornie-table>

   
  </div>
  <status-modal v-model="showStatus" :selectedItem="selectedItem" @careplan-added="careplanadded"/>
  <careplan-modal v-model="showNewModal" @careplan-added="careplanadded" :id="carePlanId"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

import IPractitioner from "@/types/IPractitioner";
import ICarePlan from "@/types/ICarePlan";

import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/newupdate.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import Modal from "@/components/modal.vue";
import SearchInput from "@/components/search-input.vue";
import CornieSelect from "@/components/cornieselect.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import UpdateIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add.vue";
import NewPlan from "./components/new-plan.vue";
import DocIcon from "@/components/icons/assign-careteam.vue";
import FeedbackIcon from "@/components/icons/feedback.vue";


import CareplanModal from "./PlanModal.vue";
import StatusModal from "./status.vue";
import EmptyState from "./components/empty-state.vue";

const careplan = namespace("careplan");
const practitioner = namespace("practitioner");

@Options({
  name: "EHRPatients",
  components: {
    CornieInput,
    DatePicker,
    TableAction,
    SettingsIcon,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    CornieBtn,
    CornieTable,
    Modal,
    SearchInput,
    EmptyState,
    CareplanModal,
    StatusModal,
    CornieSelect,
    SideModal,
    UpdateIcon,
    AddIcon,
    NewPlan,
    DocIcon,
    FeedbackIcon,
  },
})
export default class ExistingState extends Vue {
  @careplan.Action
  getPatientCarePlans!: (patientId: string) => Promise<void>;

  @careplan.State
  patientCarePlans!: ICarePlan[];

  
    @practitioner.State
    practitioners!: IPractitioner[];


    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

  headers = [
    {
      title: "Identifier",
      key: "id",
      show: true,
    },
    {
      title: "Recorded",
      key: "startDate",
      show: true,
    },
    {
      title: "Intent | Title",
      key: "title",
      show: true,
    },
    {
      title: "Intent",
      key: "intent",
      show: true,
    },
    {
      title: "Author",
      key: "author",
      show: true,
    },
    {
      title: "Schedule",
      key: "schedule",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
  ];

  showNewModal = false;
  filterAdvanced = false;
  showStatus = false;
  selectedItem = {};
  carePlanId = "";
  query = "";


 get items() {
    let careplans = this.patientCarePlans.map((careplan:any) => {
        (careplan as any).startDate = new Date(
        (careplan as any).startDate
      ).toLocaleDateString("en-US");
      return {
        ...careplan,
        action: careplan.id,
        address: careplan.practitioner.firstName +' '+ careplan.practitioner.lastName,
        author: this.getPractitionerName(careplan.author) ,
        schedule: new Date (careplan?.scheduleTiming?.date)?.toLocaleDateString("en-US") ||
         new Date (careplan?.scheduleTiming?.period?.start)?.toLocaleDateString("en-US") +'-'+
          new Date (careplan?.scheduleTiming?.period?.end)?.toLocaleDateString("en-US"),
        performer: this.getPractitionerName(careplan.scheduleTiming.performer) 
      };
    });
    if (!this.query) return careplans;
    return search.searchObjectArray(careplans, this.query);
  }
   getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  // get items() {
  //   return [
  //     {
  //       id: "1",
  //       identifier: "XXXXX",
  //       recorded: "1/2/3000",
  //       title: "title",
  //       address: "address",
  //       author: `Author`,
  //       schedule: "Schedule",
  //       performer: "Performer",
  //     },
  //   ];
  // }

  closeNewModal() {
    this.showNewModal = false;
  }

  showStatusModal(value:any){
    this.selectedItem = value;
    this.showStatus = true; 

  }

  showModal(value:string){
    this.showNewModal = true;
    this.carePlanId = value;
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async careplanadded(){
    await this.getPatientCarePlans(this.$route.params.id.toString());
  }

  async created() {
    await this.getPatientCarePlans(this.$route.params.id.toString());
    await this.fetchPractitioners();
  }
}
</script>

<style scoped>
.active-tab {
  border-bottom-width: 4px;
  margin-bottom: -0.22rem;
}

.active-color {
  border-color: #fe4d3c;
}

.status-active {
  background: #f3fcf8;
  color: #35ba83;
}

.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}

.border-b-4 {
  border-bottom: 4px solid #f0f4fe;
}

/* .content-con {
  max-width: 30.65rem;
  min-width: 500px;
} */

.cancel-btn {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
  color: #080056;
}

.primary-border {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
}
</style>
