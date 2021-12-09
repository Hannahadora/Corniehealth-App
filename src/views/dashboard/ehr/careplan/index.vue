<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="container-fluid" v-if="true">
      <div class="w-full p-2">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
        >
          Care Plan
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
      </div>

      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            class="bg-danger text-white m-5 p-2 font-semibold"
            @click="() => (showNewModal = true)"
          >
            New Care Plan
          </cornie-btn>
        </span>
      </span>

      <div class="p-2">
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
          <template #actions="{}">
            <table-action>
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View</span>
            </table-action>
            <table-action>
              <update-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Edit</span>
            </table-action>
            <table-action>
              <edit-icon class="text-primary fill-current" />
              <span class="ml-3 text-xs">Update</span>
            </table-action>
            <table-action>
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
            </table-action>
          </template>
        </cornie-table>
      </div>
    </div>

    <div class="w-full" v-else>
      <empty-state />
    </div>

    <!-- <side-modal :visible="true" :header="'New Request'" :width="990"  @closesidemodal="closeNewModal"> -->
    <side-modal
      :visible="showNewModal"
      :header="'New Request'"
      :width="990"
      @closesidemodal="closeNewModal"
    >
      <new-plan @closesidemodal="() => (showNewModal = false)" />
    </side-modal>
  </div>
  z
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
import NewPlan from "./components/new-plan.vue";
import DocIcon from "@/components/icons/assign-careteam.vue";
import FeedbackIcon from "@/components/icons/feedback.vue";
import { namespace } from "vuex-class";
import ICarePlan from "@/types/ICarePlan";

const careplan = namespace("careplan");

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
  },
})
export default class ExistingState extends Vue {
  @careplan.Action
  getCarePlans!: (patientId: string) => Promise<void>;

  @careplan.State
  careplans!: ICarePlan[];

  headers = [
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "Intent | Title",
      key: "title",
      show: true,
    },
    {
      title: "Addresses",
      key: "address",
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

  get items() {
    return [
      {
        id: "1",
        identifier: "XXXXX",
        recorded: "1/2/3000",
        title: "title",
        address: "address",
        author: `Author`,
        schedule: "Schedule",
        performer: "Performer",
      },
    ];
  }

  closeNewModal() {
    this.showNewModal = false;
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async created() {
    await this.getCarePlans(this.$route.params.id.toString());
    console.log(this.careplans, "CARE PLANS");
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
