<template>
  <cornie-dialog v-model="show" right class="xl:w-1/2 lg:w-10/12 w-full h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            Pay Bill
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-1">
        <v-form>
          <div>
            <div class="flex justify-between">
              <p class="font-semibold text-sm">Amount Due (NGN)</p>
              <p>
                {{ totalAmount }}
                <span
                  @click="$emit('viewAppointment')"
                  class="underline text-blue-400 text-xs"
                  >View Details</span
                >
              </p>
            </div>

            <cornie-input
              label="Amount to Pay"
              v-model="totalAmount"
              placeholder="Autoloaded"
              class="mt-4"
              disabled
            />

            <!-- <label class="text-left block text-xs mb-1 font-bold" for=""
              >Payment Type</label
            > -->
            <cornie-select
              label="Payment Type"
              v-model="paymentType"
              placeholder="Select a payment account type"
              :readonly="false"
              :items="paymentAccounts"
              required
              class="mt-4"
            >
            </cornie-select>

            <div class="w-full">
              <textarea
                label="Note"
                v-model="note"
                placeholder="Type here..."
                class="w-full mt-4 border p-3"
              />
            </div>
          </div>
        </v-form>

        <div class="absolute bottom-6 right-6">
          <div class="w-full mx-auto mt-12 flex items-center justify-end">
            <cornie-btn
              class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
              @click="show = false"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
              @click="submit"
              :loading="loading"
            >
              Submit
            </cornie-btn>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import Textarea from "@/components/textarea.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "PayBillModal",
  components: {
    ...CornieCard,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
    ArrowLeft,
    CornieCheckbox,
    ChevronRightIcon,
    ChevronLeftIcon,
    EditIcon,
    Textarea,
  },
})
export default class PayBillModal extends Vue {
  search: any = {};
  loading: Boolean = false;
  note = "";
  paymentType = "";
  accTypes: any = [];
  paymentAccountId = "";
  locations = [];
  paymentAccounts: any = [];

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: {} })
  appointment!: any;

  @Prop({ type: Object, default: {} })
  bill!: any;

  @Watch("paymentType")
  handler() {
    const n = this.paymentType.split("-");
    const x = n[n.length - 1];
    const el = this.accTypes.find((el: any) => el.accountNo === x);
    this.paymentAccountId =
      el?.patient_accounts?.PatientPaymentAccountId || undefined;
  }

  get totalAmount() {
    return this.bill?.total;
  }

  async submit() {
    const data = {
      accountId: this.paymentAccountId,
      billId: this.bill.id,
    };
    try {
      this.loading = true;
      await cornieClient().post(
        "/api/v1/patient-portal/billing",
        {
          ...data,
        }
      );
      this.$emit("bill-payed");
      window.notify({
        msg: "Bill has been payed",
        status: "success",
      });
    } catch (error: any) {
      window.notify({
        msg: error.message,
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async fetchPaymentAccount() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/payment"
      );
      this.accTypes = data;
      this.paymentAccounts = this.accTypes.map(
        (el: any) => `${el.type}-${el.accountNo}`
      );
    } catch (error: any) {
      window.notify({
        msg: error.message,
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  created() {
    this.fetchPaymentAccount();
  }
}
</script>

<style scoped>
.text-grey-eth {
  color: #c2c7d6;
}

.text-grey-blue {
  color: #667499;
}

tr {
  /* border-bottom: 1px solid rgb(95, 94, 94); */
  line-break: normal;
}
td {
  font-size: 16px;
  padding: 16px;
}
tr:nth-child(even) {
  background: #f0f4fe;
}

@media screen and (max-width: 768px) {
  tr {
    line-break: auto;
  }
  td {
    font-size: 14px;
  }
}
.border-sect {
  border: 1px solid #c2c7d6;
  border-radius: 4px;
}
</style>
