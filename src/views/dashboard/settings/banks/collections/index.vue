<template>
  <div class="bg-white rounded mb-56 p-5 mt-5">
   <div class="-mt-10">
      <ul class="nav nav-tabs nav-tabs-bottom widget_categories mt-8">
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Accounts</a></li>    
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Associations</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Accounts">   
              <div class="w-full h-2/3 mt-8 flex flex-col justify-center items-center" v-if="empty3">
             <img src="@/assets/img/nobank.svg" class="" />
              <h4 class="text-black text-center">Add new account</h4>
              <button
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  py-2
                  px-3
                  focus:outline-none
                  hover:opacity-90
                "
                 @click="showAccountModal = true"
              >
                <span class="text-xl -mt-1.5 mr-2">+ </span> 
                            New  Account
              </button>
        </div>
             <div class="w-full pb-80" >
                <div class="w-full mt-5">
                        <span class="flex justify-end">
                        <button
                            class="
                            bg-danger
                            rounded-full
                            text-sm
                            text-white
                            mb-5
                            mt-5
                            py-2
                            pl-6
                            pr-6
                            px-4
                            pb-1
                            focus:outline-none
                            hover:opacity-90
                            flex
                            "
                            @click="showAccountModal = true"
                        >
                            <span class="text-xl -mt-1.5 mr-2">+ </span> 
                            New  Account
                        </button>
                        </span>
                        <cornie-table :columns="rawHeaders" v-model="items" :check="false">
                        <template #actions="{ item }">
                            <div
                            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                            @click="showRateModal(item.id)"
                            >
                            <d-edit class="text-primary fill-current" />
                            <span class="ml-3 text-xs">View & Edit</span>
                            </div>
                             <div
                            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                            @click="deleteItem(item.id)"
                            >
                            <close-icon class="text-yellow-500 fill-current" />
                            <span class="ml-3 text-xs">Deactivate</span>
                            </div>
                            <div
                            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                            @click="deleteItem(item.id)"
                            >
                            <delete-icon class="text-yellow-500 fill-current" />
                            <span class="ml-3 text-xs">Delete Account</span>
                            </div>
                        </template>
                        <template #status>
                            <span class="bg-green-400 rounded-xl text-sm"></span>
                        </template>
                        </cornie-table>

                    
                        <default-currency v-model="showDefaultCurrencyModal" />
                    <new-exchange-rate v-model="showNewExchangeRateModal" @currency-added="currencyadded" :id="currencyId"/>
                </div>
             </div>
        </div>
        <div class="tab-pane" v-if="selected == 2"  :class="{'active' :  selected === 2  }" id="Associations">
          <div class="w-full h-2/3 mt-8 flex flex-col justify-center items-center" v-if="empty">
            <img src="@/assets/img/tracking.svg" />
            <h3 class="text-center text-black mt-5">You have not associated accounts with your locations (Warehouse | Outlets | Stores | <br> etc.). To associate accounts, click on New Location to start.</h3>
            <button
                class="
                bg-danger
                rounded-full
                text-sm
                text-white
                mb-5
                mt-5
                py-2
                pl-6
                pr-6
                px-4
                pb-2
                focus:outline-none
                hover:opacity-90
                flex
                "
                @click="showLocationAccount = true"
            >
                <span class="text-xl -mt-1.5 mr-2">+ </span> 
                New Location
            </button>
    </div>
  <div class="w-full pb-80"  v-else>
        <div class="w-full mt-5">
            <span class="flex justify-end">
            <button
                class="
                bg-danger
                rounded-full
                text-sm
                text-white
                mb-5
                mt-5
                py-2
                pl-6
                pr-6
                px-4
                pb-1
                focus:outline-none
                hover:opacity-90
                flex
                "
                @click="showLocationAccount = true"
            >
                <span class="text-xl -mt-1.5 mr-2">+ </span> 
                New Location
            </button>
            </span>
            <cornie-table :columns="rawHeaders2" v-model="items2" :check="false">
            <template #actions="{ item }">
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showRateModal(item.id)"
                >
                <d-edit class="text-primary fill-current" />
                <span class="ml-3 text-xs">View & Edit</span>
                </div>
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.id)"
                >
                <delete-icon class="text-yellow-500 fill-current" />
                <span class="ml-3 text-xs">Delete</span>
                </div>
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.id)"
                >
                <close-icon class="text-yellow-500 fill-current" />
                <span class="ml-3 text-xs">Deactivate Account</span>
                </div>
            </template>
            <template #pay>
                <div>
                    <span class="bg-green-100 text-green-500 p-1 rounded mr-3 text-xs">Invoice</span>
                    <span class="bg-red-100 text-red-500 p-1 rounded text-xs">Credit Notes</span>
                </div>
            </template>
            <template #account>
                <div class="flex space-x-2">
                    <span class="">3 
                    </span>
                     <eye-icon class="text-yellow-500 fill-current" />
                </div>
            </template>
               <template #default>
                <div>
                    <p class="text-black text-sm">
                       0222315465
                    </p>
                        <p class="text-gray-400">WEMA Bank</p>  
                </div>
            </template>
            </cornie-table>

        
            <default-currency v-model="showDefaultCurrencyModal" />
        <new-exchange-rate v-model="showNewExchangeRateModal" @currency-added="currencyadded" :id="currencyId"/>
    </div>
  </div>
        </div>
    </div>
   </div>
  </div>
  <account-modal v-model="showAccountModal"/>
  <location-modal v-model="showLocationAccount"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import InfoIcon from "@/components/icons/info.vue";
import Select from "@/components/newautocomplete.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import DEdit from "@/components/icons/aedit.vue";
import { Prop, Watch, PropSync } from "vue-property-decorator";
// import NubanModal from './nubanmodal.vue'
import search from "@/plugins/search";
import CloseIcon from "@/components/icons/danger.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import AuthorizeIcon from "@/components/icons/authorize.vue";
import TransactIcon from "@/components/icons/transact.vue";
import EyeIcon from "@/components/icons/eye-yellow.vue";
import PayIcon from "@/components/icons/pay.vue";
import ICollection from "@/types/ICollection";
import AccountModal from "./accountModal.vue"
import LocationModal from "./locationModal.vue"

const collections = namespace("collections");

@Options({
  components: {
    InfoIcon,
    Select,
    CornieRadio,
    DEdit,
    CornieCheckbox,
    LocationModal,
    AccountModal,
    CornieInput,
    AuthorizeIcon,
    CornieSelect,
    AccordionComponent,
   // NubanModal,
    TransactIcon,
    EyeIcon,
    CloseIcon,
    CornieTable,
    PayIcon,
    CardText,
    NewviewIcon,
    DeleteIcon
  },
})
export default class Payments extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  showLocationAccount = false;
  showAccountModal = false;
  
  selected = 1;
  query = "";
  orgId="";
  orgInfo = [] as any;

  @collections.Action
  fetchCollectionAccounts!: (orgId: string) => Promise<void>;

  @collections.State
  collectionAccounts!: ICollection[];

  @collections.Action
  deleteCollectionAccount!: (id: string) => Promise<boolean>;

get empty() {
    return  this.collectionAccounts.length < 1;
  }

  select(i:number) {
      this.selected = i;
    }
    showModal(){
      this.showLocationAccount = true;
    }
 rawHeaders = [
     { title: "", key: "status", show: true },
    { title: "ACCOUNT NAME", key: "name", show: true },
    {
      title: "Virtual NUBAN Account Number",
      key: "nuban",
      show: true,
    },
    {
      title: "Bank Name",
      key: "bankname",
      show: true,
    },
    {
      title: "ACCOUNT NUMBER",
      key: "balance",
      show: true,
    },
  ];
  rawHeaders2 = [
     { title: "Location Name", key: "location", show: true },
    { title: "Pay Categories", key: "pay", show: true },
    {
      title: "Accounts",
      key: "account",
      show: true,
    },
    {
      title: "Default",
      key: "default",
      show: true,
    },
  ];

  get items() {
    const collectionAccounts = this.collectionAccounts.map((collectionAccount) => {
         (collectionAccount as any).createdAt= new Date(
         (collectionAccount as any).createdAt
       ).toLocaleDateString("en-US");
        return {
        ...collectionAccount,
         action: collectionAccount.id,
         keydisplay: "XXXXXXX",
         name:"Paystack Cloudenly/XYZ Co.Ltd.",
         nuban:"100023567",
         bankname:"Wema Bank",
         balance:"0222315465",

        };
    });
    if (!this.query) return collectionAccounts;
    return search.searchObjectArray(collectionAccounts, this.query);
  }
  //  get items2() {
  //   const tasks = this.tasks.map((task) => {
  //      (task as any).excecutionPeriod.start = new Date(
  //        (task as any).excecutionPeriod.start 
  //      ).toLocaleDateString("en-US");
  //        (task as any).excecutionPeriod.end = new Date(
  //        (task as any).excecutionPeriod.end 
  //      ).toLocaleDateString("en-US");
  //        (task as any).createdAt= new Date(
  //        (task as any).createdAt
  //      ).toLocaleDateString("en-US");
  //       return {
  //       ...task,
  //        action: task.id,
  //        keydisplay: "XXXXXXX",
  //        location:"Apapa Center",
  //       };
  //   });
  //   if (!this.query) return tasks;
  //   return search.searchObjectArray(tasks, this.query);
  // }
   async fetchOrgInfo() {
      try {
        const response = await cornieClient().get(
          "/api/v1/organization/myOrg/get"
        );
        this.orgInfo = response.data || {};
        this.orgId = response.data.id;
      } catch (error) {
        window.notify({ msg: "Could not fetch organization", status: "error" });
      }
    }
 async created() {
   await this.fetchOrgInfo();
   await this.fetchCollectionAccounts(this.orgId);
 }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
:focus-visible {
  outline: none;
}
::placeholder {
  color: #000;
}
.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 9px;
  border-radius: 4px;
  width: 150px;
  bottom: 100%;
  opacity: 0;
  transition: opacity 1s;
  position: absolute;
  z-index: 1;
  background-color: #080056;
}
</style>
