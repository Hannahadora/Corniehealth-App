<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="container-fluid" v-if="true">
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Hospitalisation
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
      </div>

      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            class="bg-danger text-white m-5 p-2 font-semibold"
            @click="() => (showNewModal = true)"
          >
            Admit Patient
          </cornie-btn>
        </span>
      </span>

      <div class="p-2">
        <cornie-table
          v-model="items"
          :columns="headers"
          @filter="filterAdvanced = true"
        >
          <template #admitDate-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Admit Date
            </div>
          </template>
          <template #careTeam-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Care Team
            </div>
          </template>
          <template #duration-header>
            <div
              class="text-no-wrap flex uppercase text-xs"
              style="white-space: nowrap"
            >
              Duration Of Stay
            </div>
          </template>
          <template #actions="{ item }">
            <table-action @click="viewHospitalisationDetails(item.id)">
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action @click="() => showUpdateModal(item)">
              <edit-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Update Status</span>
            </table-action>
            <table-action @click="showTimeline(item)">
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View Timeline</span>
            </table-action>

            <table-action>
              <add-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Add Subject</span>
            </table-action>

            <table-action>
              <add-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs" @click="showNotes(item.id)"
                >Administrative Note</span
              >
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
            </table-action>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state />
    </div>

    <side-modal
      :visible="showNewModal"
      :header="'Admit Patient'"
      :width="990"
      @closesidemodal="closeNewModal"
    >
      <new-plan
        @closesidemodal="() => (showNewModal = false)"
        :hospitalisationId="selectedItemId"
        :items="patientHospitalisations"
      />
    </side-modal>

    <side-modal
      :visible="notesVissible"
      :header="'Add Notes'"
      :width="850"
      @closesidemodal="closeNewModal"
    >
      <note-dialog
        :items="patientHospitalisations"
        :hospitalisationId="selectedItemId"
        @closesidemodal="closeNewModal"
      />
    </side-modal>

    <side-modal
      :visible="viewDetails"
      :header="'Details'"
      :width="850"
      @closesidemodal="closeNewModal"
    >
      <view-details
        :items="patientHospitalisations"
        :hospitalisationId="selectedItemId"
        @onedit="goToEdit"
        @closesidemodal="closeNewModal"
      />
    </side-modal>

    <modal :visible="showStatusUpdateModal" @closesidemodal="closeUpdateModal">
      <div class="w-full px-5 mb-6" style="width: 520px">
        <p
          class="flex justify-between items-center w-full justify-center font-bold text-xl text-primary p-2 -mb-5"
        >
          Update Status
          <span class="cursor-pointer" @click="closeUpdateModal"
            ><close-icon />
          </span>
        </p>
        <update-status
          :updateData="updateData"
          @changed="newStatusSelected"
          @closesidemodal="closeUpdateModal"
        >
          <template #submit>
            <CornieBtn
              :loading="false"
              class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
            >
              <span class="text-white font-semibold">Update</span>
            </CornieBtn>
          </template>
        </update-status>
      </div>
    </modal>

    <modal :visible="timelineVissible">
      <div class="p-4">
        <Timeline @closesidemodal="closeUpdateModal" />
      </div>
    </modal>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import EmptyState from "./components/empty-state.vue";
import CornieSelect from "@/components/cornieselect.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import UpdateIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add.vue";
import NewPlan from "./components/admit-patient.vue";
import DocIcon from "@/components/icons/doc.vue";
import FeedbackIcon from "@/components/icons/feedback.vue";
import IUpdateStatus from "@/types/IUpdateModel";
import UpdateStatus from "@/views/dashboard/ehr/encounter/components/update-status.vue";
import NoteDialog from "./components/notes-dialog.vue";
import Timeline from "./components/timeline.vue";
import ViewDetails from "./components/view-details.vue";
import { namespace } from "vuex-class";
import { IHospitalisation } from "@/types/IHospitalisation";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import LocOrg from "./components/location-org.vue";

const hospitalisation = namespace("hospitalisation");

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
    CornieSelect,
    SideModal,
    UpdateIcon,
    AddIcon,
    NewPlan,
    DocIcon,
    FeedbackIcon,
    UpdateStatus,
    NoteDialog,
    Timeline,
    ViewDetails,
    CloseIcon,
    LocOrg,
  },
})
export default class ExistingState extends Vue {
  @hospitalisation.State
  patientHospitalisations!: IHospitalisation[];

  @hospitalisation.Action
  getHospitalisations!: (patientId: string) => Promise<void>;

  headers = [
    {
      title: "Admit Date",
      key: "admitDate",
      show: true,
    },
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Condition",
      key: "condition",
      show: true,
    },
    {
      title: "Duration of Stay",
      key: "duration",
      show: true,
    },
    {
      title: "Room",
      key: "room",
      show: true,
    },
    {
      title: "Beds",
      key: "beds",
      show: true,
    },
    {
      title: "Care Team",
      key: "careTeam",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Ward",
      key: "ward",
      show: false,
    },
    {
      title: "Re-admission",
      key: "reAdmission",
      show: false,
    },
  ];

  showNewModal = false;
  filterAdvanced = false;
  showStatusUpdateModal = false;
  updateData = {} as IUpdateStatus;
  newStatus = "";
  notesVissible = false;
  timelineVissible = false;
  viewDetails = false;
  selectedItemId = "";

  get items() {
    if (this.patientHospitalisations?.length <= 0) return [];
    return this.patientHospitalisations.map((hospitalisation) => {
      return {
        id: hospitalisation.id,
        identifier: "XXXXX",
        condition: "Condition",
        admitDate: new Date(hospitalisation.createdAt).toLocaleDateString(),
        duration: "Ongoing",
        room: hospitalisation.room,
        beds: hospitalisation.bed,
        careTeam: "Care Team",
        status: "Status",
        ward: hospitalisation.ward,
        reAdmission: hospitalisation.reAdmission,
      };
    });
  }

  goToEdit(hospitalisationId: string) {
    this.selectedItemId = hospitalisationId;
    this.viewDetails = false;
    this.showNewModal = true;
  }

  showUpdateModal(item: any) {
    this.updateData = {
      currentStatus: item.status,
      lastUpdated: new Date(item?.updatedAt).toLocaleDateString(),
      updatedBy: "",
      statuses: [
        {
          code: "active",
          display: "Active",
        },
        {
          code: "on-leave",
          display: "On Leave",
        },
        {
          code: "referred",
          display: "Referred",
        },
        {
          code: "discharged",
          display: "Discharged",
        },
        {
          code: "bill processing",
          display: "Planned",
        },
        {
          code: "checked-out",
          display: "Checked-Out",
        },
      ],
    };
    this.showStatusUpdateModal = true;
  }

  get selectedHospitalization() {
    if (!this.selectedItemId) return {};
    return this.patientHospitalisations.find(
      (hospitalisation) => hospitalisation.id === this.selectedItemId
    );
  }

  viewHospitalisationDetails(id: string) {
    this.selectedItemId = id;
    this.viewDetails = true;
  }

  showNotes(id: string) {
    this.selectedItemId = id;
    this.notesVissible = true;
  }

  showTimeline(item: IHospitalisation) {
    this.timelineVissible = true;
  }

  newStatusSelected(status: string) {
    this.newStatus = status;
  }

  closeUpdateModal() {
    this.showStatusUpdateModal = false;
    this.timelineVissible = false;
    this.selectedItemId = "";
  }

  closeNewModal() {
    this.showNewModal = false;
    this.notesVissible = false;
    this.viewDetails = false;
    this.selectedItemId = "";
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async created() {
    await this.getHospitalisations(this.$route.params.id.toString());
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
