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
      <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push(`add-careteam/${item.id}`)"
        >
          <edit-icon class="mr-3 text-yellow-300 fill-current" /> 
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        
              @click="deactivateCareteam(item.id)"
        >
           <close-icon class="mr-3" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
         
              @click="activateCareteam(item.id)"
        >
           <close-icon class="mr-3" />
          <span class="ml-3 text-xs">Activate</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <cancel-icon class="text-danger fill-current"/>
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    
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
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/cancel.vue";
import EditIcon from "@/components/icons/edit.vue";

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
    CornieTable,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EditIcon,
    EyeIcon,
    CloseIcon,
    CancelIcon
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
      show: false,
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
     // const allparticipant = careteam.participants;
      return {
        ...careteam,
        action: careteam.id,
      //  participants: allparticipant,
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
          const response = await cornieClient().post(`/api/v1/care-teams/deactivate/${id}`,{});
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
          const response = await cornieClient().post(`/api/v1/care-teams/activate/${id}`,{});
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
    border: 2px solid #080056;
}
</style>
