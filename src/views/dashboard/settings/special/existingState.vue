<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-3 px-5 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showSpecialModal = true"
      >
       Add New Specialty
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPractionersModal(item.id)">
          <pract-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Manage Practitioners</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showLocationModal(item.id)"
        >
          <location-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Manage Locations</span>
        </div>
        <div
        v-if="item.status == 'active'"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deactivate(item.id)"
        >
          <deactivate-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
        <div
       v-else
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="activate(item.id,item.status)"
        >
          <approve-icon class="text-green-500 fill-current" />
          <span class="ml-3 text-xs">Activate</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <special-modal
    v-model="showSpecialModal"
    @special-added="specialadded"
    :id="locationId"
  />
  <manage-practitioner  @practitioner-added="specialadded" v-model="showManagePractitioner" :specilatyId="specilatyId"/>
  <manage-location v-model="showManageLocation" :specilatyId="specilatyId"  @location-added="specialadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import PractIcon from "@/components/icons/practicon.vue";
import LocationIcon from "@/components/icons/locicon.vue";
import SpecialModal from './newspecial.vue';
import managePractitioner from './practitioner.vue';
import ManageLocation from './location.vue';
import { cornieClient } from "@/plugins/http";
import ApproveIcon from "@/components/icons/approval.vue";

const special = namespace("special");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    SpecialModal,
    ManageLocation,
    ApproveIcon,
    managePractitioner,
    IconInput,
    DeactivateIcon,
    PractIcon,
    ColumnFilter,
    TableOptions,
    LocationIcon,
  },
})
export default class SpecialExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showSpecialModal = false;
  showManagePractitioner = false;
  locationId = "";
  showManageLocation = false;
  specilatyId = "";



  @special.Action
  deleteSpecial!: (id: string) => Promise<boolean>;

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;


  rawHeaders = [
    {
      title: "code",
      key: "identifier",
      show: true,
       noOrder: true
    },
    {
      title: "specialty",
      key: "name",
      show: true,
       noOrder: true
    },
    { title: "locations", key: "locations", show: true, noOrder: true },
    {
      title: "practitioners",
      key: "practitioners",
      show: true,
       noOrder: true
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },

  ];

  get items() {
    const specials = this.specials?.map((special:any) => {
      return {
        ...special,
        locations: special?.locations?.length,
        practitioners: special?.practitioners?.length
      };
    });
    if (!this.query) return specials;
    return search.searchObjectArray(specials, this.query);
  }



  async deactivate(id: string) {
        const confirmed = await window.confirmAction({
          message: "You are about to deactivate this speciality",
        });
        if (!confirmed) return;
         try {
      const response = await cornieClient().patch(
        `/api/v1/specialty/status/${id}`,
        {status:'inactive'}
       
      );
      if(response.success){
        this.specialadded();
        window.notify({ msg: "Specialty deactivated successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Specialty not deactivated", status: "error" });
    }

   
  }

 async activate(id: string) {
      const confirmed = await window.confirmAction({
          message: "You are about to activate this speciality",
        });
        if (!confirmed) return;
         try {
      const response = await cornieClient().patch(
        `/api/v1/specialty/status/${id}`,
        {status:'active'}
       
      );
      if(response.success){
        this.specialadded();
        window.notify({ msg: "Specialty activated successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Specialty not activated", status: "error" });
    }

   
  }

  async specialadded(){
     await this.fetchSpecials();
  }

    showModal(value: string) {
      this.locationId = value;
    }

  showPractionersModal(value:string){
      this.showManagePractitioner = true
      this.specilatyId = value;
  }
  showLocationModal(value:string){
    this.showManageLocation = true;
    this.specilatyId = value;
  }
  async created(){
    await this.fetchSpecials();
  }
}
</script>
