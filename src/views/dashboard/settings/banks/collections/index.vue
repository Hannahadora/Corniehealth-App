<template>
  <div class="bg-white rounded mb-56 p-5 mt-5">
    <div class="-mt-10">
      <ul class="nav nav-tabs nav-tabs-bottom widget_categories mt-8">
        <li class="nav-item cursor-pointer">
          <a
            class="nav-link"
            @click="select(1)"
            :class="{ active: selected === 1 }"
            :aria-selected="selected === 1"
            >Accounts</a
          >
        </li>
        <li class="nav-item cursor-pointer">
          <a
            class="nav-link"
            @click="select(2)"
            :class="{ active: selected === 2 }"
            :aria-selected="selected === 2"
            >Associations</a
          >
        </li>
      </ul>
      <div class="tab-content">
        <div
          class="tab-pane"
          v-if="selected == 1"
          :class="{ active: selected === 1 }"
          id="Accounts"
        >
          <div
            class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
            v-if="empty"
          >
            <img src="@/assets/img/nobank.svg" class="mb-2" />
            <h4 class="text-black text-center">Add new account</h4>
            <button
              class="bg-danger rounded-full text-white text-sm mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex space-x-2"
              @click="showAccountModal = true"
            >
              <span class="text-xl -mt-0.5">+ </span>
              <span class="mt-1"> New Account</span>
            </button>
          </div>
          <div class="w-full pb-80" v-else>
            <div class="w-full mt-5">
              <span class="flex justify-end">
                <button
                  class="bg-danger rounded-full text-sm text-white mb-5 mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex space-x-2"
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
              <new-exchange-rate
                v-model="showNewExchangeRateModal"
                @currency-added="currencyadded"
                :id="currencyId"
              />
            </div>
          </div>
        </div>
        <div
          class="tab-pane"
          v-if="selected == 2"
          :class="{ active: selected === 2 }"
          id="Associations"
        >
          <div
            class="w-full h-2/3 mt-8 flex flex-col justify-center items-center"
            v-if="empty2"
          >
            <img src="@/assets/img/tracking.svg" />
            <h3 class="text-center text-black mt-5">
              You have not associated accounts with your locations (Warehouse |
              Outlets | Stores | <br />
              etc.). To associate accounts, click on New Location to start.
            </h3>
            <button
              class="bg-danger rounded-full text-white text-sm mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex space-x-2"
              @click="showLocationAccount = true"
            >
              <span class="text-xl -mt-0.5">+ </span>
              <span class="mt-1"> New Location</span>
            </button>
          </div>
          <div class="w-full pb-80" v-else>
            <div class="w-full mt-5">
              <span class="flex justify-end">
                <button
                  class="bg-danger rounded-full text-sm text-white mb-5 mt-5 py-2 px-8 focus:outline-none hover:opacity-90 flex"
                  @click="showLocationAccount = true"
                >
                  <span class="text-xl -mt-1.5 mr-2">+ </span>
                  New Location
                </button>
              </span>
              <cornie-table
                :columns="rawHeaders2"
                v-model="items2"
                :check="false"
              >
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
                    @click="deleteItem2(item.id)"
                  >
                    <delete-icon class="text-yellow-500 fill-current" />
                    <span class="ml-3 text-xs">Delete</span>
                  </div>
                  <div
                    class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                  >
                    <close-icon class="text-yellow-500 fill-current" />
                    <span class="ml-3 text-xs">Deactivate Account</span>
                  </div>
                </template>
                <template #pay="{ item }">
                  <div>
                    <span
                      class="bg-green-100 text-green-500 p-1 rounded mr-3 text-xs"
                      v-if="item.paymentCategories[0] == 'Invoice'"
                      >{{ item.paymentCategories[0] }}
                    </span>
                    <span
                      class="bg-red-100 text-red-500 p-1 rounded text-xs"
                      v-if="item.paymentCategories[1] == 'Credit Notes'"
                      >{{ item.paymentCategories[1] }}</span
                    >
                    <span
                      class="bg-yellow-100 text-yellow-500 p-1 rounded text-xs"
                      v-if="item.paymentCategories[2] == 'Quotes'"
                      >{{ item.paymentCategories[2] }}</span
                    >
                  </div>
                </template>
                <template #account="{ item }">
                  <div class="flex space-x-2">
                    <span class="">
                      {{ item.defaultAccountDetails.length }}
                    </span>
                    <eye-icon class="text-yellow-500 fill-current" />
                  </div>
                </template>
                <template #location="{ item }">
                  <span class=""> {{ item.locationDetails.name }} </span>
                </template>
                <template #default="{ item }">
                  <div>
                    <p class="text-black text-sm">
                      {{ item.defaultAccountDetails.accountNumber }}
                    </p>
                    <p class="text-gray-400">
                      {{ getBankName(item.defaultAccountDetails.bank) }}
                    </p>
                  </div>
                </template>
              </cornie-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <account-modal
    v-model="showAccountModal"
    @accountAdded="accountAdded"
    :id="accountId"
  />
  <location-modal
    v-model="showLocationAccount"
    @accountAdded="accountAdded"
    :id="associationId"
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
import IAssociate from "@/types/IAssociate";
import AccountModal from "./accountModal.vue";
import LocationModal from "./locationModal.vue";

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

  get empty2() {
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
  get items2() {
    const associations = this.associations.map((association) => {
      (association as any).createdAt = new Date(
        (association as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...association,
        action: association.id,
        keydisplay: "XXXXXXX",
      };
    });
    if (!this.query) return associations;
    return search.searchObjectArray(associations, this.query);
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
