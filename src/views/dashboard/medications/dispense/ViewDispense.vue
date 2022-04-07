<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="pb-6 flex items-center space-x-4">
          <img src="" alt="" />
          <p class="text-3xl font-bold">Medication Request</p>

          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text>
        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Dispense ID #:</span>
            <span class="font-semi-bold text-white">{{
              dispense.dispenserId
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Status:</span>
            <span class="font-semi-bold text-white">{{ dispense.status }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Dispense Date:</span>
            <span class="font-semi-bold text-white">{{
              dispense.createdAt
            }}</span>
          </div>
        </div>

        <div class="p-4 bg-white h-20"></div>

        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Safety Cap Request</span>
            <span class="font-semi-bold">{{
              dispense.safetyCapRequest ? dispense.safetyCapRequest : ""
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Delivery Instruction:</span>
            <span class="font-semi-bold">{{
              dispense.deliveryInstruction ? dispense.deliveryInstruction : ""
            }}</span>
          </div>
        </div>

        <div class="p-4 grid grid-cols-3 gap-4">
          <div class="blue-bg1">
            <p class="font-bold mb-4">Request Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Date Reqested</span>
              <span class="">{{ dispense?.dateRequested }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Encounter ID</span>
              <span class="">{{ dispense?.dateRequested }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">ICD-11 Code</span>
              <span class="">{{ dispense?.dateRequested }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Priority</span>
              <span class="">{{ dispense?.priority }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Requester ID</span>
              <span class="">{{ dispense?.requesterId }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Practitioner ID</span>
              <span class="">{{ dispense?.dispenserId }}</span>
            </div>
          </div>
          <div class="w-bg1">
            <p class="font-bold mb-4">Patient Information</p>
            <!-- <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class="">{{ dispense?.patient.firstname }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="">{{ dispense?.patient.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="">{{ dispense?.patient.paymentInfo }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="">{{ dispense?.patient?.contactInfo[0]?.phone?.dialCode }}{{ dispense?.patient?.contactInfo[0]?.phone?.number }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="">{{ dispense?.patient.contactInfo[0].email }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="">{{ dispense?.patient.contactInfo[0].primaryAddress }}</span>
            </div> -->
          </div>
          <div class="blue-bg1">
            <p class="font-bold mb-4">Performer Information</p>
            <!-- <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class="">{{ dispense?.patient?.firstname }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="">{{ dispense?.patient?.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="">{{ dispense?.patient?.paymentInfo }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="">{{ dispense?.patient?.contactInfo[0]?.phone?.dialCode }}{{ dispense?.patient?.contactInfo[0]?.phone?.number }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="">{{ dispense?.patient?.contactInfo[0]?.email }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="">{{ dispense?.patient?.contactInfo[0]?.primaryAddress }}</span>
            </div> -->
          </div>
        </div>

        <cornie-table :columns="rawHeaders" v-model="items" class="mt-7">
          <template #actions="{ item }">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              @click="showItem(item.id)"
            >
              <edit-icon class="text-danger fill-current" />
              <span class="ml-3 text-xs">Modify</span>
            </div>
          </template>
        </cornie-table>

        <div class="mt-8 flex items-start justify-between">
          <div
            class="p-4 border rounded-md flex items-center justify-between w-1/4"
          >
            <span class="w-2/3 text-sm">Coupon | Promo Code</span>
            <input
              class="w-1/3 self-end"
              type="text"
              v-model="coupon"
              placeholder="----"
            />
          </div>

          <div class="w-1/3">
            <table class="w-full">
              <tbody>
                <tr>
                  <td>Total Discount</td>
                  <td>----</td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>----</td>
                </tr>
                <tr>
                  <td class="font-bold">Shipping Cost</td>
                  <td>----</td>
                </tr>
                <tr class="">
                  <td class="font-bold">Grand Total</td>
                  <td>----</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            View History
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Update
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
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import search from "@/plugins/search";
import IMedicationReq from "@/types/ImedicationReq";

const dispense = namespace("dispense");
const request = namespace("request");

@Options({
  name: "AppointmentRoomDialog",
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
    CancelIcon,
  },
})
export default class ViewRequest extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  required = string().required();

  query = "";

  loading = false;
  activeTab = "Full Payment";

  reference = "";
  salesDate = 0;
  customers = "";
  types = "";

  location = [];

  @dispense.State
  dispense!: IMedicationReq;

  @dispense.Action
  viewDispense!: (requestId: string, locationId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "MEDICATION",
      key: "medication",
      show: true,
    },
    {
      title: "UNIT PRICE",
      key: "unitPrice",
      show: true,
    },
    {
      title: "QUANTITY",
      key: "quantity",
      show: true,
    },
    {
      title: "Amount",
      key: "amount",
      show: true,
    },
  ];

  // get items() {
  //   const medications = this.dispense && this.dispense?.medications.map((med) => {
  //     (med as any).createdAt = new Date(
  //       (med as any).createdAt
  //     ).toLocaleDateString("en-US");
  //     return {
  //       ...med,
  //       action: med.code,
  //       keydisplay: "XXXXXXX",
  //       medication: med.name,
  //       unitPrice: med.unitPrice,
  //       quantity: med.quantity,
  //       amount: med.amount,
  //     };
  //   });
  //   if (!this.query) return medications;
  //   return search.searchObjectArray(medications, this.query);
  // }

  get statuses() {
    return ["Active", "Substituted", "On-Hold", "Dispensed"];
  }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }

  getLocationId(id: string) {
    const pt: any = this.location.find((i: any) => i.id === id);
    return pt ? `${pt.id}` : "";
  }

  async created() {
    this.fetchLocation()
    // this.viewDispense(this.id, this.getLocationId(this.id));
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}

.blue-bg1 {
  background: #f0f4fe;
  box-shadow: 0px 0px 1px rgba(46, 41, 78, 0.02),
    0px 2px 4px rgba(46, 41, 78, 0.08);
  border-radius: 8px;
  padding: 16px;
}

.w-bg1 {
  border: 0.3px solid #080056;
  filter: drop-shadow(0px 0px 1px rgba(46, 41, 78, 0.02))
    drop-shadow(0px 2px 4px rgba(46, 41, 78, 0.08));
  border-radius: 8px;
  padding: 16px;
}
.c-667499 {
  color: #667499;
}
</style>
