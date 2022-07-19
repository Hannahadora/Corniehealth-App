<template>
  <cornie-dialog v-model="show" right class="w-1/3 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add New Customer
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <div class="">
        <cornie-card-text class="flex-grow scrollable h-96">
          <v-form class="flex-grow flex flex-col">
            <cornie-input
              class="w-full"
              label="Name"
              placeholder="--Enter--"
              v-model="name"
            />
            <cornie-input
              class="w-full"
              label="Email"
              placeholder="--Email--"
              v-model="email"
            />

            <cornie-phone-input
              label="Phone Number"
              class="mb-5"
              placeholder="Enter"
              v-model="phoneNumber"
              v-model:code="dialCode"
            />
          </v-form>
        </cornie-card-text>
      </div>

      <div class="flex items-center justify-end mt-14 absolute right-6 bottom-6">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
            @click="addCustomer"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";

import DatePicker from "@/components/datepicker.vue";
import SearchInput from "@/components/search-input.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import FullPayment from "./components/FullPayment.vue";
import SplitPayment from "./components/SplitPayment.vue";

import search from "@/plugins/search";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "POSDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DatePicker,
    SearchInput,
    CornieTable,
    TableOptions,
    FullPayment,
    SplitPayment,
    CancelRedBg,
    CorniePhoneInput,
  },
})
export default class AppointmentRoomDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  required = string().required();

  query = "";

  loading = false;
  name = "";
  email = "";
  phoneNumber = "";
  dialCode = "";

  async addCustomer() {
    const newData = {
      name: this.name,
      email: this.email,
      phone: {
        number: this.phoneNumber,
        dialCode: this.dialCode,
      },
    };
    try {
      const { data } = await cornieClient().post(
        "/api/v1/pharmacy/add-customer",
        { ...newData }
      );
      this.show = false;
    } catch (error: any) {
      console.log(error)
      window.notify({
        msg: error.message,
        status: "error",
      });
    }
  }

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
