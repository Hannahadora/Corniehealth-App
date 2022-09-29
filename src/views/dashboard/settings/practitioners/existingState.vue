<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="rounded-lg font-semibold mt-5 mb-5 py-3 px-5 text-primary border border-primary mr-3 text-sm focus:outline-none hover:opacity-90"
        @click="showInviteModal = true"
      >
        Invite Practitioner
      </button>
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-3 px-5 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="$router.push('add-practitioner')"
      >
        Add a Practitioner
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`view-practitioner/${item.id}`)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-practitioner/${item.id}`)"
        >
          <edit-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showModal(item.id)"
        >
          <update-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Update Work</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showModal(item)"
        >
          <update-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Update Location & Privileges</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <revoke-icon />
          <span class="ml-3 text-xs">Revoke Invitation</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
    </cornie-table>
  </div>

  <location-role
    v-model:locationRoles="selectedLocation"
    v-model:show="showLocationModal"
    :id="locationId"
  />
  <invitation-modal v-model="showInviteModal" />
</template>
<script lang="ts">
  import ColumnFilter from "@/components/columnfilter.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import IconInput from "@/components/IconInput.vue";
  import DeleteIcon from "@/components/icons/deactivate.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import FilterIcon from "@/components/icons/filter.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import EyeIcon from "@/components/icons/newview.vue";
  import PrintIcon from "@/components/icons/print.vue";
  import RevokeIcon from "@/components/icons/revoke.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import SortIcon from "@/components/icons/sort.vue";
  import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
  import ThreeDotIcon from "@/components/icons/threedot.vue";
  import TableOptions from "@/components/table-options.vue";
  import { mapDisplay } from "@/plugins/definitions";
  import search from "@/plugins/search";
  import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
  import locationRole from "@/views/dashboard/settings/practitioners/LocationRoles.vue";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";

  import InvitationModal from "./inviteModal.vue";

  const practitioner = namespace("practitioner");

  @Options({
    components: {
      RevokeIcon,
      CornieTable,
      SortIcon,
      ThreeDotIcon,
      SearchIcon,
      PrintIcon,
      TableRefreshIcon,
      FilterIcon,
      InvitationModal,
      IconInput,
      DeleteIcon,
      EyeIcon,
      ColumnFilter,
      TableOptions,
      EditIcon,
      locationRole,
      UpdateIcon,
    },
  })
  export default class PractitionerExistingState extends Vue {
    showColumnFilter = false;
    selectedLocation = null;
    query = "";
    showLocationModal = false;
    showInviteModal = false;
    locationId = "";

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    deletePractitioner!: (id: string) => Promise<boolean>;

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    rawHeaders = [
      {
        title: "IDENTIFIER",
        key: "identifier",
        show: true,
      },
      {
        title: "Name",
        key: "name",
        show: true,
      },
      { title: "department", key: "department", show: true },
      { title: "Job Designation", key: "jobDesignation", show: true },
      {
        title: "Status",
        key: "activeState",
        show: true,
      },
      {
        title: "Code",
        key: "qualificationIssuer",
        show: false,
      },
      {
        title: "Address",
        key: "address",
        show: false,
      },
      {
        title: "Access Role",
        key: "accessRole",
        show: false,
      },
      {
        title: "Gender",
        key: "gender",
        show: false,
      },
      {
        title: "Description",
        key: "description",
        show: false,
      },
      {
        title: "Physical Type",
        key: "physicalType",
        show: false,
      },
    ];

    jobMapper = (code: string) => "";
    get items() {
      const practitioners = this.practitioners.map((practitioner) => {
        // const opHours = this.stringifyOperationHours(
        //   practitioner?.hoursOfOperation
        // );
        // console.log(
        //   "jobb",
        //   practitioner.jobDesignation,
        //   this.jobMapper(practitioner.jobDesignation)
        // );
        return {
          ...practitioner,
          action: practitioner.id,
          //hoursOfOperation: opHours,
          name: `${practitioner.firstName} ${practitioner.lastName}`,
          jobDesignation:
            practitioner.jobDesignation !== null
              ? this.jobMapper(practitioner.jobDesignation)
              : practitioner.jobDesignation,
        };
      });
      if (!this.query) return practitioners;
      return search.searchObjectArray(practitioners, this.query);
    }

    stringifyOperationHours(opHours: HoursOfOperation[]) {
      const [opHour, ...rest] = opHours;
      if (!opHour) return "All Day";
      return `${opHour.openTime} - ${opHour.closeTime}`;
    }

    async createMapper() {
      this.jobMapper = await mapDisplay(
        "http://hl7.org/fhir/ValueSet/performer-role"
      );
    }

    async remove(id: string) {
      const confirmed = await window.confirmAction({
        message: "You are about to delete this practitioner",
      });
      if (!confirmed) return;
      if (await this.deletePractitioner(id))
        window.notify({ msg: "Practitioner deleted", status: "success" });
      else window.notify({ msg: "Practitioner not deleted", status: "error" });
    }
    async updateLocation() {
      await this.fetchPractitioners();
    }

    showModal(value: any) {
      this.showLocationModal = true;
      this.locationId = value?.id;
      this.selectedLocation = value?.locationRoles;
    }

    async created() {
      await this.createMapper();
    }
  }
</script>
