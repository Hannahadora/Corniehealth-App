<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ action }} Collection Account
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
              <!-- <cornie-select
                label="Business Name"
                class="mb-4 w-full"
                :items="['Kuda']"
                placeholder="--Auto-generated from profile--"
                /> -->
              <cornie-input
                disabled
                label="Business Name"
                v-model="BusinessName"
                placeholder="--Auto-generated from profile--"
                class="w-full mb-4"
              />
              <cornie-select
                label="Bank"
                class="mb-4 w-full"
                :items="allTheBanks"
                v-model="bank"
                placeholder="--Select Preferred Bank--"
              />
              <cornie-input
                label="Account Number"
                @change="fetchAccountName"
                v-model="accountNumber"
                placeholder="--Enter Account Numebr--"
                class="w-full mb-4"
              />

              <cornie-input
                disabled
                label="Account Name"
                v-model="accountName"
                :placeholder="placeholder"
                class="w-full mb-4"
              />
              <div
                v-if="error"
                class="flex space-x-4 -mt-2 justify-between w-full"
              >
                <p class="float-left text-xs">Name does not match.</p>
                <fail-icon class="float-right" />
              </div>

              <div
                class="
                  flex
                  space-x-4
                  justify-between
                  w-full
                  mt-8
                  border-gray-200
                  pb-8
                  border-b-2
                "
                v-for="(input, index) in accounts"
                :key="`${index}`"
              >
                <p class="float-left text-sm">{{ input.name }}</p>
                <correct-icon class="float-right" />
              </div>
            </div>
            <div>
              <p
                class="mt-4 text-sm text-danger font-semibold cursor-pointer"
                v-if="accountName"
                @click="addAccount"
              >
                <span class="text-danger text-lg">+</span> Add Account
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
            {{ newaction }}
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CorrectIcon from "@/components/icons/correct.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import FailIcon from "@/components/icons/fail.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/daterangepicker.vue";
import { string } from "yup";
import { namespace } from "vuex-class";
import ICollection from "@/types/ICollection";

const collections = namespace("collections");

@Options({
  name: "accountmodal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CorrectIcon,
    FailIcon,
    RangeSlider,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class accountModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Boolean, default: false })
  displayNubanTable!: boolean;

  @collections.Action
  getCollectionAccountById!: (id: string) => ICollection;

  status = "";
  loading = false;
  expand = false;
  isVisible = "";

  businessName = "";
  bank = "";
  accountNumber = "";
  accountName = "";
  bankname = "";
  AllBanks = [];
  placeholder = "--Autofilled Account Name--";
  accounts = [] as any;

  orgInfo = [] as any;

  error = false;

  required = string().required();

  @Watch("id")
  idChanged() {
    this.setAccount();
  }
  get newaction() {
    return this.id ? "Update" : "Save";
  }
  get action() {
    return this.id ? "Edit" : "Add";
  }
  async setAccount() {
    const collectionAccount = await this.getCollectionAccountById(this.id);
    if (!collectionAccount) return;
    this.businessName = collectionAccount.businessName;
    this.bank = collectionAccount.bank;
    this.accountNumber = collectionAccount.accountNumber;
    this.accountName = collectionAccount.accountName;
  }

  get payload() {
    return {
      businessName: this.BusinessName,
      bank: this.bank,
      accountNumber: this.accountNumber,
      accountName: this.accountName,
    };
  }

  get BusinessName() {
    this.businessName = this.orgInfo.name;
    return (this.businessName = this.orgInfo.name);
  }
  get allTheBanks() {
    if (!this.AllBanks || this.AllBanks.length === 0) return [];
    return this.AllBanks.map((i: any) => {
      return {
        code: i.code,
        display: i.name,
      };
    });
  }

  async updateAccount() {
    const id = this.id;
    const url = `/api/v1/collection/account/${id}`;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({ msg: "Collection account Updated", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.message, status: "error" });
      this.loading = false;
    }
  }
  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.orgInfo = response.data || {};
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
  async fetchAccountName() {
    const body = {
      account: this.accountNumber,
      bank: this.bank,
    };
    try {
      const response = await cornieClient().get(
        "/api/v1/collection/account/bank/resolve-account/",
        body
      );
      this.placeholder = "Loading...";
      if (response.success == true) {
        this.placeholder = "";
        this.accountName = response.data.accountName || {};
      } else {
        window.notify({ msg: response.data.message, status: "error" });
      }
    } catch (error: any) {
      console.log(error);
      window.notify({ msg: error.response.data.message, status: "error" });
      //window.notify({ msg: error.response[0].success, status: "error" });
    }
  }
  get newaccounts() {
    return {
      name: this.accountName,
    };
  }
  addAccount() {
    this.accounts.push(this.newaccounts);
  }

  async createAccount() {
    try {
      const response = await cornieClient().post(
        "/api/v1/collection/account",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Collection Account Created", status: "success" });
        this.done();
      } else {
        window.notify({ msg: response.errors!.summary, status: "error" });
        // this.$router.push("/dashboard/provider/settings/practice-templates");
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
      // window.notify({ msg: "Collection Account not Created", status: "error" });
      // this.$router.push("/dashboard/provider/settings/practice-templates");
    }
  }

  done() {
    this.$emit("accountAdded");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateAccount();
    else await this.createAccount();
    this.loading = false;
  }

  async created() {
    this.fetchOrgInfo();
    this.fetchDropDown();
  }
}
</script>

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
</style>
