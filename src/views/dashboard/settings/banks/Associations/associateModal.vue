<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <icon-btn @click="show = false" class="mr-2 cursor-pointer">
          <arrow-left-icon stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Associate Account
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full">
          <div class="container content-con">
            <div class="w-full py-3">
              <cornie-select
                label="Location"
                class="mb-4 w-full"
                v-model="location"
                :items="allLocation"
                placeholder="--Select Location--"
              />
              <div>
                <span class="text-sm font-semibold mb-1">Collection Center</span>
                <Multiselect
                  v-model="paymentCategories"
                  mode="tags"
                  :closeOnSelect="true"
                  :searchable="true"
                  :createTag="true"
                  :options="['Pharmacy', 'Diagnostics', 'In-Patient']"
                  label="value"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.value }}
                      <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                      >
                        <span class="multiselect-tag-remove-icon"></span>
                      </span>
                    </div>
                  </template>
                </Multiselect>
              </div>
              <div>
                <span class="text-sm font-semibold mb-1">Account</span>
                <Multiselect
                  v-model="accounts"
                  mode="tags"
                  :hide-selected="false"
                  id="field-id"
                  :options="allAccounts"
                  value-prop="code"
                  trackBy="code"
                  label="display"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <!-- <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.display }}
                      <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                      >
                        <span class="multiselect-tag-remove-icon"></span>
                      </span>
                    </div>
                  </template> -->

                  <template v-slot:option="{ option }">
                    <select-option @click="setDefault(option.code)" />
                    <span class="w-full text-sm">{{ option.display }}</span>
                    <span
                      class="text-xs text-success flex justify-end float-right w-full"
                      v-if="option.code === defaultAccount && defaultText"
                      >Default</span
                    >
                    <span
                      v-else
                      class="text-xs text-danger flex justify-end float-right w-full"
                      @click="setDefault(option.code)"
                      >Set as default</span
                    >
                  </template>
                </Multiselect>
              </div>
              <!-- <div
                class="flex space-x-4 justify-between w-full mt-8 border-gray-200 pb-8 border-b-2"
                v-for="(input, index) in accounts"
                :key="`${index}`"
              >
                {{ getAccount(input) }}
                <p class="float-left text-sm">{{ input.name }}</p>
                <correct-icon class="float-right" />
              </div> -->
            </div>
            <div>
              <p
                class="mt-4 text-sm text-danger font-semibold cursor-pointer"
                v-if="accountName"
                @click="addAccount"
              >
                <span class="text-danger text-lg">+</span> Add Location
              </p>
            </div>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-3 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
  import CornieSelect from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import SelectOption from "@/components/custom-checkbox.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import BluecheckIcon from "@/components/icons/bluecheck.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import FailIcon from "@/components/icons/fail.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import CornieMultiselect from "@/components/multiselect.vue";
  import CorniePhoneInput from "@/components/phone-input.vue";
  import { cornieClient } from "@/plugins/http";
  import IAssociate from "@/types/IAssociate";
  import ICollection from "@/types/ICollection";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  const associations = namespace("associations");
  const collections = namespace("collections");

  @Options({
    name: "associationModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      Multiselect,
      ArrowLeftIcon,
      FailIcon,
      BluecheckIcon,
      CancelIcon,
      SelectOption,
      InfoIcon,
      CornieDialog,
      SearchIcon,
      IconInput,
      CornieInput,
      CornieSelect,
      CorniePhoneInput,
      CornieRadio,
      CornieBtn,
      CornieMultiselect,
    },
  })
  export default class AssociaitonModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: Boolean, default: false })
    displayNubanTable!: boolean;

    status = "";
    loading = false;
    expand = false;
    isVisible = "";
    value = null;
    value2 = null;
    accountoption = false;

    location = "";
    paymentCategories = [];
    accounts = [];
    defaultAccount = "";
    actualaccounts = [] as any;
    accountName = "";

    orgLocation = [];
    PaymentOptions = [];
    allBanks = [] as any;
    orgId = "";
    orgInfo = [] as any;
    indexid = "";
    error = false;
    defaultText = false;

    required = string().required();

    @collections.Action
    fetchCollectionAccounts!: (orgId: string) => Promise<void>;

    @collections.State
    collectionAccounts!: ICollection[];

    @associations.Action
    getAssociationById!: (id: string) => IAssociate;

    @Watch("id")
    idChanged() {
      this.setAccount();
    }
    get newaccounts() {
      return {
        name: this.accountName,
      };
    }
    addAccount() {
      this.actualaccounts.push(this.newaccounts);
    }
    setDefault(index: any) {
      for (var i = 0; i < this.allAccounts.length; i++) {
        if (this.accounts[i] == index) {
          this.defaultAccount = index;
          this.defaultText = true;
        }
      }
      // if(this.accounts == index){

      //   this.defaultAccount = index;
      //   this.defaultText = true;
      // }
    }
    async setAccount() {
      const assoication = await this.getAssociationById(this.id);
      if (!assoication) return;
      this.location = assoication.location;
      this.paymentCategories = assoication.paymentCategories;
      this.accounts = assoication.accounts;
      this.defaultAccount = assoication.defaultAccount;
    }

    get payload() {
      return {
        location: this.location,
        paymentCategories: this.paymentCategories,
        accounts: this.accounts,
        defaultAccount: this.defaultAccount,
      };
    }

    get allLocation() {
      if (!this.orgLocation || this.orgLocation.length === 0) return [];
      return this.orgLocation.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }
    get allAccounts() {
      if (!this.collectionAccounts || this.collectionAccounts.length === 0)
        return [];
      return this.collectionAccounts.map((i: any) => {
        return {
          code: i.id,
          display: this.getBankName(i?.bank) +' | ' + i.accountNumber,
          bank: this.getBankName(i.bank)
        };
      });
    }

    getBankName(code:string){
        const pt = this.allBanks.find((x:any) => x.code == code);
        return pt ? `${pt?.name}` : ''
    }



    getAccount(code: string) {
      return this.allAccounts.find((x) => x.code == code)?.display;
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
    async fetchLocation() {
      const AllLocation = cornieClient().get(
        "/api/v1/location/myOrg/getMyOrgLocations"
      );
      const response = await Promise.all([AllLocation]);
      this.orgLocation = response[0].data;
    }
    async fetchDropDown() {
      try {
        const response = await cornieClient().get(
          "https://api.paystack.co/bank"
        );
        this.allBanks = response.data || {};
      } catch (error) {
        window.notify({ msg: "Could not fetch banks", status: "error" });
      }
    }
    // async fetchDropDown() {
    //   try {
    //     const response = await cornieClient().get(
    //       "/api/v1/payments/getPaymentsCategories/all"
    //     );
    //     const response2 = await cornieClient().get(
    //       "/api/v1/payments/getAllBanks/all"
    //     );
    //     this.PaymentOptions = response.data || {};
    //     this.allBanks = response2.data || {};
    //   } catch (error) {
    //     window.notify({
    //       msg: "Could not fetch payment dropdowns",
    //       status: "error",
    //     });
    //   }
    // }
    async createAccount() {
      try {
        const response = await cornieClient().post(
          "/api/v1/collection/associations",
          this.payload
        );
        if (response.success) {
          window.notify({
            msg: "Collection Associations Created",
            status: "success",
          });
          this.done();
        } else {
          window.notify({ msg: response.errors!.summary, status: "error" });
          // this.$router.push("/dashboard/provider/settings/practice-templates");
        }
      } catch (error: any) {
        window.notify({ msg: error.response.data.message, status: "error" });
        //window.notify({ msg: "Collection Associations Created", status: "success" });
        //this.done();
      }
    }
    async updateAccount() {
      const id = this.id;
      const url = `/api/v1/collection/associations/${id}`;
      try {
        const response = await cornieClient().put(url, this.payload);
        if (response.success) {
          window.notify({
            msg: "Collection Associations Updated",
            status: "success",
          });
          this.done();
        }
      } catch (error: any) {
        window.notify({ msg: error.response.message, status: "error" });
        this.loading = false;
      }
    }

    done() {
      this.$emit("accountAdded");
      this.show = false;
    }
    async apply() {
      if (!this.location) {
        window.notify({ msg: "Choose a location", status: "error" });
        return;
      }

      if (this.paymentCategories.length == 0) {
        window.notify({ msg: "Choose a payment category", status: "error" });
        return;
      }

      if (this.accounts.length == 0) {
        window.notify({ msg: "Choose an account", status: "error" });
        return;
      }

      if (!this.defaultAccount) {
        window.notify({ msg: "Select a default account", status: "error" });
        return;
      }

      this.loading = true;
      if (this.id) await this.updateAccount();
      else await this.createAccount();
      this.loading = false;
    }

    async created() {
      await this.fetchLocation();
      await this.fetchDropDown();
      await this.fetchOrgInfo();
      await this.fetchCollectionAccounts(this.orgId);
    }
  }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .bg-gray {
    background-color: #f6f8f9;
  }
  .icon-wrap {
    content: counter(step);
    counter-increment: step;
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #fe4d3c;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: -54em;
    right: 0;
    position: absolute;
    width: 1.4em;
  }
  .icon-wrap2 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #fe4d3c;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: -7.5em;
    right: 0;
    position: absolute;
    width: 1.4em;
  }
  .icon-wrap3 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: -1;
    color: #fff;
    border: 2px solid #fe4d3c;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 52em;
    right: 0;
    position: absolute;
    width: 1.4em;
  }
  .icon-wrap4 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #fe4d3c;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 42em;
    right: 0;
    position: absolute;
    width: 1.4em;
  }
  .icon-check-mark {
    top: 1.3em;
    z-index: 1;
    left: 5em;
    right: 0;
    position: absolute;
  }
  .icon-check-mark2 {
    top: 1.3em;
    z-index: 1;
    left: 23em;
    right: 0;
    position: absolute;
  }
  .icon-check-mark3 {
    top: 1.3em;
    z-index: 1;
    left: 45.5em;
    right: 0;
    position: absolute;
  }
  .bg-danger-100 {
    background-color: #fe4d3c;
  }
  .multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}
.multiselect-tag {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}
</style>
