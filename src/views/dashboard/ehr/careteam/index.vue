<template>
  <div class="w-full" v-if="false">
    <empty-state />
  </div>
  <div
    v-if="true"
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        Care Team
      </span>
      <registration-chart class="w-full" :height="100" />
      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            @click="registerNew = true"
            class="text-primary m-5"
            style="border: 1px solid #080056"
          >
            Create New
          </cornie-btn>
          <cornie-btn
            @click="addToExisting = true"
            class="bg-danger text-white m-5"
          >
            Add to existing
          </cornie-btn>
        </span>
      </span>
    </div>
    <div class="p-2">
      <cornie-table
        v-model="items"
        :columns="headers"
        @filter="filterAdvanced = true"
      >
        <template #name="{ item }">
          <div class="flex items-center">
            <!-- <avatar class="w-5 h-5" :src="item.photo" /> -->
            <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
          </div>
        </template>
        <template #actions="{ item }">
          <table-action @click="viewTeam(item.id)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs pr-4">View</span>
          </table-action>
          <table-action @click="viewTeam(item.id)">
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs pr-4">Edit</span>
          </table-action>
          <!-- <table-action
            
          >
            <share-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs pr-4">Share</span>
          </table-action> -->
        </template>
      </cornie-table>

      <modal :visible="addToExisting">
        <template #title>
          <div class="w-full">
            <div class="container p-6 content-con" style="min-width: 450px">
              <p class="text-primary text-2xl font-semibold pb-3">
                Add to existing care team
              </p>
              <span style="color: #667499" class="text-secondary text-base"
                >Search a care team
              </span>

              <div class="w-full py-6">
                <search-dropdown
                  :results="careTeamSearchList"
                  @selected="onSelect"
                />
                <!-- <cornie-input :placehode="'Search'" style="width: 100%;border-radius:50%" placeholder="Enter">
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </cornie-input> -->
              </div>
              <div class="w-full flex flex justify-end">
                <corniebtn
                  class="bg-white p-2 cancel-btn rounded-full px-8 mx-4 cursor-pointer"
                  style="border: 1px solid #080056"
                >
                  <span class="font-semibold" @click="addToExisting = false"
                    >Cancel</span
                  >
                </corniebtn>

                <CornieBtn
                  :loading="loading"
                  class="bg-red-500 p-2 rounded-full px-8 mx-4 cursor-pointer"
                >
                  <span class="text-white font-semibold" @click="addToCareTeam"
                    >Add</span
                  >
                </CornieBtn>
              </div>
            </div>
          </div>
        </template>
      </modal>

      <side-modal
        :visible="registerNew"
        @closesidemodal="closeModal"
        :header="'New Care Team'"
      >
        <CareTeamForm
          :careTeam="selectedTeam"
          @closesidemodal="closeModal"
          @refreshteams="refreshTeams"
        />
      </side-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CareTeamForm from "./components/careteam-form.vue";
import Modal from "@/components/modal.vue";
import CornieInput from "@/components/cornieinput.vue";
import SearchIcon from "@/components/icons/search.vue";
import ShareIcon from "@/components/icons/share.vue";
import EmptyState from "./components/empty-state.vue";
import { namespace } from "vuex-class";
import ICareteam from "@/types/ICareteam";
import careteamHelper from "./helper/careteam-helper";
import SearchDropdown from "./components/search-dropdown.vue";
import { IItem } from "../../schedules/components/selected-location.vue";
import User from "@/types/user";
import IPractitioner from "@/types/IPractitioner";

const careteam = namespace("careteam");
const userStore = namespace("user");
const practitionerStore = namespace("practitioner");

@Options({
  name: "EHRCareTeam",
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
    SideModal,
    CareTeamForm,
    Modal,
    CornieInput,
    SearchIcon,
    ShareIcon,
    EmptyState,
    SearchDropdown,
  },
})
export default class EHRCareTeam extends Vue {
  @userStore.State
  user!: User;

  @careteam.State
  careteams!: ICareteam[];

  @careteam.Action
  fetchCareteams!: () => Promise<void>;

  @practitionerStore.State
  practitioners!: IPractitioner[];

  @practitionerStore.Action
  fetchPractitioners!: () => Promise<void>;

  registerNew = false;
  addToExisting = false;
  loading = false;

  headers = [
    { title: "Identfier", key: "identifier", show: true },
    { title: "Status", key: "status", show: true },
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Name",
      key: "name",
      show: true,
    },
    {
      title: "Subject",
      key: "subject",
      show: true,
    },
    {
      title: "Period",
      key: "period",
      show: false,
    },
    {
      title: "Participants",
      key: "participants",
      show: false,
    },
  ];

  selectedTeamId = "";
  query = "";
  existingCareTeamToAddTo: any = {};

  get careTeamSearchList() {
    if (this.careteams?.length === 0) return [];
    return this.careteams.map((careteam) => {
      return {
        code: careteam.id,
        display: careteam.name,
      };
    });
  }

  get items() {
    if (this.careteams?.length === 0) return [];
    return this.careteams.map((careteam) => {
      return {
        ...careteam,
        period: `${careteam.period?.start} ${careteam.period?.end}`,
        participants: careteam.participants
          ?.map((participant) => participant.name)
          .join(", "),
      };
    });
  }

  get selectedTeam() {
    if (!this.selectedTeamId) return {};
    const team = this.careteams.find(
      (careteam) => careteam.id === this.selectedTeamId
    );
    console.log(team, "selected team");
    console.log(this.selectedTeamId, "selected team");
    return team;
  }

  async addToCareTeam() {
    try {
      this.loading = true;
      const practitioner = this.practitioners.find(
        (practitioner: any) => practitioner?.user?.id === this.user.id
      );
      const added = await careteamHelper.addToTeam(
        this.existingCareTeamToAddTo,
        {
          code: practitioner?.id ?? "",
          display: `${practitioner?.firstName} ${practitioner?.lastName}`,
        }
      );
      this.loading = false;
      if (added?.id) this.addToExisting = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  onSelect(data: IItem) {
    console.log(data, "IITEM");
    this.existingCareTeamToAddTo = this.careteams.find(
      (careteam) => careteam.id === data.code
    );
  }

  viewTeam(id: string) {
    this.registerNew = true;
    // const team = this.careteams.find(careteam => careteam.id === id);
    // if (!team) return;
    this.selectedTeamId = id;
  }

  async refreshTeams() {
    await this.fetchCareteams();
  }

  closeModal() {
    this.registerNew = false;
    // this.selectedTeamId = "";
  }

  async searchCareTeam() {
    try {
      const data = await careteamHelper.searchForCareTeam({ q: this.query });
    } catch (error) {
      console.log();
    }
  }

  async created() {
    if (!this.careteams || this.careteams.length === 0)
      await this.fetchCareteams();
    if (!this.practitioners || this.practitioners.length === 0)
      await this.fetchPractitioners();
    console.log(this.practitioners, "IONERS");
    console.log(this.careteams, "USER");

    const data = await careteamHelper.searchForCareTeam({ query: "Adult" });
    console.log(data, "DDDDD");
  }
}
</script>
