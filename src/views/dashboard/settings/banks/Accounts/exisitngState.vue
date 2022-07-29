<template>
<div class="w-full pb-7">
    <span class="flex justify-end">
        <button
            class="bg-danger rounded-lg text-sm text-white mb-5 mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex space-x-2"
            @click="showAccountModal = true"
        >
            <span class="text-xl -mt-1.5 mr-2">+ </span>
            New Account
        </button>
    </span>
    <cornie-table
        :columns="rawHeaders"
        v-model="items"
        :check="false"
        >
        <template #actions="{ item }">
            <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAccount(item.id)"
            >
            <d-edit class="text-primary fill-current" />
            <span class="ml-3 text-xs">View & Edit</span>
            </div>
            <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
            >
            
            <close-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
            </div>
            <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
            >
            <delete-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Delete Account</span>
            </div>
        </template>
        <template #status>
            <span class="bg-green-400 rounded-xl text-sm"></span>
        </template>
    </cornie-table>
</div>
  <account-modal
    v-model="showAccountModal"
    @accountAdded="accountAdded"
    :id="accountId"
  />

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
// import AssociateSection from "./associateIndex.vue";
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
import IAssociate from "@/types/IAssociate";
import AccountModal from "./accountModal.vue";
// import LocationModal from "./locationModal.vue";

const collections = namespace("collections");
const association = namespace("association");

@Options({
  components: {
    InfoIcon,
    Select,
    CornieRadio,
    DEdit,
    CornieCheckbox,
    //LocationModal,
    //AssociateSection,
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

  @collections.Action
  fetchCollectionAccounts!: (orgId: string) => Promise<void>;

  @collections.State
  collectionAccounts!: ICollection[];

  @collections.Action
  deleteCollectionAccount!: (id: string) => Promise<boolean>;

  @association.Action
  fetchAssociations!: (orgId: string) => Promise<void>;

  @association.State
  associations!: IAssociate[];

  @association.Action
  deleteAssociation!: (id: string) => Promise<boolean>;

  get empty() {
    return this.collectionAccounts.length < 1;
  }

  select(i: number) {
    this.selected = i;
  }
  showModal(id: string) {
    this.showLocationAccount = true;
    this.associationId = id;
  }
  rawHeaders = [
    { title: "", key: "status", show: true },
    { title: "ACCOUNT NAME", key: "accountName", show: true },
    {
      title: "Virtual NUBAN Account Number",
      key: "accountNumber",
      show: true,
    },
    {
      title: "Bank Name",
      key: "bank",
      show: true,
    },
    {
      title: "ACCOUNT NUMBER",
      key: "accountNumber",
      show: true,
    },
  ];

  get items() {
    const collectionAccounts = this.collectionAccounts.map(
      (collectionAccount) => {
        (collectionAccount as any).createdAt = new Date(
          (collectionAccount as any).createdAt
        ).toLocaleDateString("en-US");
        return {
          ...collectionAccount,
          action: collectionAccount.id,
          keydisplay: "XXXXXXX",
          bank: this.getBankName(collectionAccount.bank),
        };
      }
    );
    if (!this.query) return collectionAccounts;
    return search.searchObjectArray(collectionAccounts, this.query);
  }

  getLocation(id: string) {
    const pt = this.AllBanks.find((i: any) => i.code === id);
    return pt ? `${pt.name}` : "";
  }
  getBankName(id: string) {
    const pt = this.AllBanks.find((i: any) => i.code === id);
    return pt ? `${pt.name}` : "";
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
  accountAdded() {
    this.fetchCollectionAccounts(this.orgId);
    this.fetchAssociations(this.orgId);
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this collection account",
      title: "Delete collection account",
    });
    if (!confirmed) return;

    if (await this.deleteCollectionAccount(id))
      window.notify({ msg: "Collection account deleted", status: "success" });
    else
      window.notify({ msg: "Collection account not deleted", status: "error" });
  }
  async deleteItem2(id: string) {
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
    await this.fetchCollectionAccounts(this.orgId);
    await this.fetchAssociations(this.orgId);
    await this.fetchDropDown();
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
