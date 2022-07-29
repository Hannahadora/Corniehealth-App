<template>
<div class="w-full pb-7">
    <span class="flex justify-end">
        <button
          class="bg-danger rounded-lg text-sm text-white mb-5 mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex"
          @click="showLocationAccount = true"
        >
          <span class="text-xl -mt-1.5 mr-2">+ </span>
          New Location
        </button>
      </span>
    <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showModal(item.id)"
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
        </template>
        <template #collection="{ item }">
          <div class="flex space-x-2 w-full">
              <div
                class=""
                v-for="(input, index) in item.collectionCenter"
                :key="index"
              >
                <span
                  class="bg-green-100 text-green-700 p-2 rounded-md"
                  v-if="input == 'Diagnostics'"
                  >{{ input }}</span
                >
                <span
                  class="bg-red-100 text-red-700 p-2 rounded-md"
                  v-if="input == 'In-Patient'"
                  >{{ input }}</span
                >
                <span
                  class="bg-yellow-100 text-yellow-500 p-2 rounded-md"
                  v-if="input == 'Pharmacy'"
                  >{{ input }}</span
                >
              </div>
          </div>
        </template>
        <template #account="{ item }">
        <div class="flex space-x-2">
          <span>{{ item.associatedAccounts.length }}</span>
          <eye-icon class="fill-current text-danger cursor-pointer -mt-1" @click="showAccounts(item.associatedAccounts)"/>
        </div>
        </template>
    </cornie-table>
</div>
  <location-modal
    v-model="showLocationAccount"
    @accountAdded="accountAdded"
    :id="associationId"
  />
  <accounts-modal v-model="showAccountsModal" :accounts="associateAccounts"/>
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
import EyeIcon from "@/components/icons/eye.vue";
import PayIcon from "@/components/icons/pay.vue";
import ICollection from "@/types/ICollection";
import IAssociate from "@/types/IAssociate";
import LocationModal from "./associateModal.vue";
import AccountsModal from "./accountModal.vue";

const collections = namespace("collections");
const association = namespace("association");

@Options({
  components: {
    InfoIcon,
    Select,
    CornieRadio,
    DEdit,
    CornieCheckbox,
    LocationModal,
    CornieInput,
    AuthorizeIcon,
    CornieSelect,
    AccordionComponent,
    AccountsModal,
    // NubanModal,
    TransactIcon,
    EyeIcon,
    CloseIcon,
    CornieTable,
    PayIcon,
    CardText,
    NewviewIcon,
    DeleteIcon,
  },
})
export default class Payments extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  showLocationAccount = false;
  showAccountModal = false;

  selected = 1;
  query = "";
  orgId = "";
  orgInfo = [] as any;
  AllBanks = [] as any;
  accountId = "";
  associationId = "";
  orgLocation = [] as any;
  associateAccounts = [];
  showAccountsModal = false;

 

  @collections.Action
  fetchCollectionAccounts!: (orgId: string) => Promise<void>;

  @collections.State
  collectionAccounts!: ICollection[];

  @association.Action
  fetchAssociations!: (orgId: string) => Promise<void>;

  @association.State
  associations!: IAssociate[];

  @association.Action
  deleteAssociation!: (id: string) => Promise<boolean>;

  get empty() {
    return this.associations.length < 1;
  }
  select(i: number) {
    this.selected = i;
  }
  showModal(id: string) {
    this.showLocationAccount = true;
    this.associationId = id;
  }

  rawHeaders = [
    { title: "Location Name", key: "location", show: true },
    { title: "Collection Center", key: "collection", show: true },
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
    const associations = this.associations.map((association) => {
      (association as any).createdAt = new Date(
        (association as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...association,
        action: association.id,
        keydisplay: "XXXXXXX",
        default: this.getBankName(association.defaultAccount),
        location: this.getLocation(association.location),
        //account: association.associatedAccounts.length
      
      };
    });
    if (!this.query) return associations;
    return search.searchObjectArray(associations, this.query);
  }
   showAccounts(accounts:any){
    this.associateAccounts = accounts;
    this.showAccountsModal = true;
  }
  getPaymentCategoreis(value: any) {
    return value;
  }
  getLocation(id: string) {
    const pt = this.orgLocation.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  getBankName(id: string) {
    const pt = this.collectionAccounts.find((i: any) => i.id === id);
    return pt ? `${pt.accountName}` : "";
  }
  showAccount(id: string) {
    this.showAccountModal = true;
    this.accountId = id;
  }
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
  async fetchDropDown() {
    try {
      const response = await cornieClient().get("https://api.paystack.co/bank");
      this.AllBanks = response.data || {};
    } catch (error) {
      window.notify({ msg: "Could not fetch banks", status: "error" });
    }
  }
  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.orgLocation = response[0].data;
  }
  accountAdded() {
    this.fetchAssociations(this.orgId);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this collection association",
      title: "Delete collection association",
    });
    if (!confirmed) return;

    if (await this.deleteAssociation(id))
      window.notify({
        msg: "Collection association deleted",
        status: "success",
      });
    else
      window.notify({
        msg: "Collection association not deleted",
        status: "error",
      });
  }

  async created() {
    await this.fetchOrgInfo();
    await this.fetchAssociations(this.orgId);
    await this.fetchDropDown();
    await this.fetchCollectionAccounts(this.orgId);
    await this.fetchLocation();
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
.multiselect-option.is-selected.is-pointed {
  background: #d3d6d5;
  color: var(--ms-option-color-selected-pointed, #fff);
}
</style>
