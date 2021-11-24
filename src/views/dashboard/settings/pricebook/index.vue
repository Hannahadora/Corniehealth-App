<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
      h-screen
      overflow-auto
    "
  >
    <div class="container-fluid">
      <div class="w-full p-2">
        <span
          class="
            flex flex-col
            w-full
            justify-center
            font-bold
            text-xl text-primary
            py-2
          "
        >
          Pricebook
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
        
      </div>

      <div class="w- border-b-4 py-4 mx-2">
          <a class="mr-4 p-4 cursor-pointer " @click="() => activeTab = 0" :class="{ 'active-color active-tab': activeTab === 0, 'inactive': activeTab !== 0 }">Products</a>
          <a class=" cursor-pointer p-4" @click="() => activeTab = 1" :class="{ 'active-color active-tab': activeTab === 1, 'inactive': activeTab !== 1 }">Services</a>
      </div>

      <div class=" mx-2 my-8 flex justify-between">
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
              <p class="inactive">Total Number of Items</p>
              <p class="card-number">80</p>
            </div>
            <total-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
              <p class="inactive">Total Number of Items</p>
              <p class="card-number">40</p>
            </div>
            <products-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
              <p class="inactive">Total Number of Items</p>
              <p class="card-number">40</p>
            </div>
            <services-icon />
          </div>
        </div>
      </div>

      <span class="w-full bg-danger">
          <span class="flex justify-end w-full m4-5">
            <cornie-btn
              class="m-5 rounded-full px-12 font-semibold"
              style="color: #080056;border: 1px solid #080056"
            >
              Export
            </cornie-btn>

            <cornie-btn
              class="bg-danger px-10 text-white my-5 mx-4 py-1 rounded-full font-semibold"
              @click="createNew"
            >
              Create New
            </cornie-btn>
          </span>
        </span>

        <div class="p-2" v-if="activeTab === 0">
          <products-table />
        </div>

        <div class="p-2" v-if="activeTab === 1">
          <services-table :items="serviceItems" />
        </div>
    </div>

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
import Modal from "@/components/modal.vue"
import SearchInput from "@/components/search-input.vue"
import CornieSelect from "@/components/cornieselect.vue"
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue"
import CornieInput from "@/components/cornieinput.vue"
import DatePicker from "@/components/datepicker.vue"
import UpdateIcon from "@/components/icons/edit.vue"
import AddIcon from "@/components/icons/add.vue"
import DocIcon from "@/components/icons/assign-careteam.vue"
import FeedbackIcon from "@/components/icons/feedback.vue"
import { namespace } from "vuex-class";
import ICarePlan from "@/types/ICarePlan";
import TotalIcon from "./componnts/total-icon.vue"
import ProductsIcon from "./componnts/products-icon.vue"
import ServicesIcon from "./componnts/services-icon.vue"
import ProductsTable from "./componnts/products-table.vue"
import ServicesTable from "./componnts/services-table.vue"
import ICatalogueService from "@/types/ICatalogue";

const catalogue = namespace('catalogues')

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
    CornieSelect,
    SideModal,
    UpdateIcon,
    AddIcon,
    DocIcon,
    FeedbackIcon,
    TotalIcon,
    ProductsIcon,
    ServicesIcon,
    ProductsTable,
    ServicesTable,
  },
})
export default class ExistingState extends Vue {
  @catalogue.Action
  getServices!: () => Promise<void>;

  @catalogue.State
  services!: ICatalogueService[];


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

  activeTab = 0;

  get serviceItems() {
    if (this.services?.length <= 0) return [ ];
    return this.services?.map(service => {
      return {
        id: service.id,
        name: service.name,
        itemCode: service.itemCode,
        category: service.category,
        description: service.description,
        subCategory: service.subcategory,
        status: service.status,
        lastUpdated: new Date(service.updatedAt || Date.now()).toLocaleDateString(),
        discountLimit: service.discountLimit,
        unitOfSales: 'Drum',
        unitPrice: service.cost,
      }
    })
  }

  get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }

  createNew() {
    if (this.activeTab === 0) this.$router.push({ name: 'New Product'})
    if (this.activeTab === 1) this.$router.push({ name: 'New Service'})
  }

  async created() {
    if (this.services?.length <= 0) await this.getServices(); 
    
  }

}
</script>

<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.active-tab {
    border-bottom-width: 4px;
    margin-bottom: -0.22rem;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #14171F;
}

.active-color {
    border-color: #FE4D3C;
}

.status-active {
    background: #F3FCF8;
    color: #35BA83;

}

.status-inactive {
    background: #FFF1F0;
    color: #FE4D3C;
}

.border-b-4 {
    border-bottom: 4px solid #F0F4FE;
}

.inactive {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667499;
}

.card {
  background: #FFFFFF;
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
  border-radius: 16px;
}

.card-number {
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #141F15;
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
