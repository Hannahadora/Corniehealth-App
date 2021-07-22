<template>
  <div class="w-full">
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
        @click="$router.push('add-careteam')"
      >
        Create a Care Team
      </button>
      
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`add-careteam/${getKeyValue(item).value}`)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                my-1
                py-3
              "
            >
              
              <span class="mr-3 text-2xl bold text-primary">+</span> Add Member
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <delete-icon class="mr-3" /> Delete
            </li>
            <li
              @click="deactivateCareteam(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
               <close-icon class="mr-3" /> Deactivate Account
            </li>
          </table-options>
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import ICareteam from "@/types/ICareteam";
import CloseIcon from "@/components/icons/close.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const careteam = namespace("careteam");

@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    CloseIcon
  },
  
})
export default class CareteamExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";

  @careteam.State
  careteams!: ICareteam[];

  @careteam.Action
  deleteCareteam!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identfier", value: "identifier", show: true },
    { title: "Status", value: "status", show: true },
    {
      title: "Category",
      value: "category",
      show: true,
    },
    {
      title: "Name",
      value: "name",
      show: true,
    },
    {
      title: "Subject",
      value: "subject",
      show: false,
    },
    {
      title: "Period",
      value: "period",
      show: false,
    },
    {
      title: "Participants",
      value: "participants",
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
    const careteams = this.careteams.map((careteam) => {
      const allparticipant = careteam.participants;
      return {
        ...careteam,
        action: careteam.id,
        participants: allparticipant,
      };
    });
    if (!this.query) return careteams;
    return search.searchObjectArray(careteams, this.query);
  }
 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this care team",
      title: "Delete Care Team"
    });
    if (!confirmed) return;

    if (await this.deleteCareteam(id)) window.notify({ msg: "Care team deleted", status: "success" });
    else window.notify({ msg: "Care team not deleted", status: "error" });
  }

 async deactivateCareteam(id:string) {
   const confirmed = await window.confirmAction({
      message: "You are about to deactivate this care team",
      title: "Deactivate Care Team"
    });
    if (!confirmed) {
      return;
    }else{
        try {
          const response = await cornieClient().post("/api/v1/care-team/deactivate",{id});
          if (response.success) {
            window.notify({ msg: "Care team deactivated", status: "success" });
          } 
        } catch (error) {
          window.notify({ msg: "Care team not deactivated", status: "error" });
          console.error(error);
        }
      }
    }
 async activateCareteam(id:string) {
   const confirmed = await window.confirmAction({
      message: "You are about to activate this care team",
      title: "Activate Care Team"
    });
    if (!confirmed) {
      return;
    }else{
        try {
          const response = await cornieClient().post("/api/v1/care-team/activate",{id});
          if (response.success) {
            window.notify({ msg: "Care team activated", status: "success" });
          } 
        } catch (error) {
          window.notify({ msg: "Care team not activated", status: "error" });
          console.error(error);
        }
      }
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>
