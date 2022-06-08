<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="" v-if="encounters.length > 0">
      <exisiting-state
        @view_encounter="setView"
        @new_encounter="() => (showNewEncounterModal = true)"
      />
    </div>
    <div class="w-full" v-else>
      <empty-state @new_encounter="() => (showNewEncounterModal = true)" />
    </div>

    <new-encounter v-model="showNewEncounterModal" />
    <view-encounter
      :encounterDetails="encounterDetails"
      v-model="showViewEncounterModal"
    />

    <!-- <side-modal
      :visible="showNewEpisodeModal"
      :width="990"
      @closesidemodal="() => (showNewEpisodeModal = false)"
      :header="'New Episode'"
    >
      <new-episode :items="practitioners" />
    </side-modal> -->

    <!-- <side-modal
      :visible="showUpdateStatusModal"
      :width="590"
      :header="'Update Status'"
      @closesidemodal="closeUpdateModal"
    >
      <update-status
        :updateData="updateData"
        @changed="newStatusSelected"
        @closesidemodal="closeUpdateModal"
      >
        <template #submit>
          <cornie-btn
            :loading="loading"
            class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
            @click="updateEncounterStatus"
          >
            <span class="text-white font-semibold">Update</span>
          </cornie-btn>
        </template>
      </update-status>
    </side-modal> -->
  </div>
</template>
<script lang="ts">
  import Avatar from "@/components/avatar.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
  import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import AddIcon from "@/components/icons/add.vue";
  import CancelIcon from "@/components/icons/cancel.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewviewIcon from "@/components/icons/newview.vue";
  import SettingsIcon from "@/components/icons/settings.vue";
  import Modal from "@/components/modal.vue";
  import SearchInput from "@/components/search-input.vue";
  import TableAction from "@/components/table-action.vue";
  import User from "@/types/user";
  import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import AdvancedFilter from "../../patientexp/patients/dialogs/advanced-filter.vue";
  import SearchDropdown from "../careteam/components/search-dropdown.vue";
  import EmptyState from "./components/empty-state.vue";
  // import CornieBtn from "@/components/CornieBtn.vue";
  import ExisitingState from "./components/existing-state.vue";
  import NewEncounter from "./components/new-encounter.vue";
  import ViewEncounter from "./components/view-encounter.vue";

  const userStore = namespace("user");
  const patients = namespace("patients");
  const visitsStore = namespace("visits");
  const practitioner = namespace("practitioner");
  const vital = namespace("vitals");
  const encounter = namespace("encounter");

  @Options({
    name: "EHRPatients",
    components: {
      ...CornieCard,
      TableAction,
      SettingsIcon,
      EditIcon,
      NewviewIcon,
      CancelIcon,
      Avatar,
      CornieCardTitle,
      CornieCardText,
      CornieBtn,
      CornieTable,
      AdvancedFilter,
      Modal,
      SearchInput,
      SearchDropdown,
      EmptyState,
      CornieSelect,
      SideModal,
      UpdateIcon,
      AddIcon,
      NewEncounter,
      ExisitingState,
      ViewEncounter,
    },
  })
  export default class ExistingState extends Vue {
    empty = true;
    showw = false;
    showNewEncounterModal = false;
    showViewEncounterModal = false;
    encounterDetails: any = {};

    @encounter.State
    encounters!: any[];

    @visitsStore.State
    visits!: any;

    @userStore.State
    user!: User;

    @practitioner.State
    practitioners!: User;

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    @userStore.State
    practitionerAuthenticated!: User;

    @encounter.Action
    getEncounters!: (id: any) => Promise<void>;

    patientId = "";
    setView(e: any) {
      console.log("view", e);
      this.encounterDetails = e;
      this.showViewEncounterModal = true;
    }

    async created() {
      this.patientId = this.$route.params.id as string;
      await this.getEncounters(this.patientId);
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

  .content-con {
    max-width: 30.65rem;
    min-width: 590px;
  }

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
