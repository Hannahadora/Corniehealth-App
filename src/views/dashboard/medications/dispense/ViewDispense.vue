<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full"> 
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="pb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <icon-btn @click="show = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <p class="text-3xl font-bold">Medication Request</p>
        </div>

        <cancel-icon class="float-right cursor-pointer" @click="show = false" />
      </cornie-card-title>

      <cornie-card-text>
        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Dispense ID #:</span>
            <span class="font-semi-bold text-white">{{
              request.requestrId
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Status:</span>
            <span class="font-semi-bold text-white">{{ request.status }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">request Date:</span>
            <span class="font-semi-bold text-white">{{
              request.createdAt
            }}</span>
          </div>
        </div>

        <div class="p-4 bg-white h-20"></div>

        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Safety Cap Request</span>
            <span class="font-semi-bold">{{
              request?.safetyCapRequest ? request?.safetyCapRequest : ""
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Delivery Instruction:</span>
            <span class="font-semi-bold">{{
              request.deliveryInstruction ? request?.deliveryInstruction : ""
            }}</span>
          </div>
        </div>

        <div class="p-4 grid grid-cols-3 gap-4">
          <div class="blue-bg1">
            <p class="font-bold mb-4">Request Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Date Reqested</span>
              <span class="">{{ request?.requesterId }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Encounter ID</span>
              <span class="">{{ request?.requesterId }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">ICD-11 Code</span>
              <span class="">{{ request?.requesterId }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Priority</span>
              <span class="">{{ request?.priority }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Requester ID</span>
              <span class="">{{ request?.requesterIdentifier }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Practitioner ID</span>
              <span class="">{{ request?.practitonerId }}</span>
            </div>
          </div>
          <div class="w-bg1">
            <p class="font-bold mb-4">Patient Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class="">{{ request?.patient?.name }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="">{{ request?.patient?.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="">{{ request?.patient?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="">{{ request?.patient?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="">{{ request?.patient?.email }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="">{{ request?.patient?.address }}</span>
            </div>
          </div>
          <div class="blue-bg1">
            <p class="font-bold mb-4">Performer Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class="">{{ request?.performer?.name }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="">{{ request?.performer?.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="">{{ request?.performer?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="">{{ request?.performer?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="">{{ request?.performer?.email }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="">{{ request?.performer?.address }}</span>
            </div>
          </div>
        </div>

      
        <cornie-table
          :columns="rawHeaders"
          v-model="items"
          :listmenu="true"
          :check="false"
        >
          <template #actions="{ item }">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              @click="modifyItem(item.brandCode)"
            >
              <edit-icon class="text-danger fill-current" />
              <span class="ml-3 text-xs">Modify</span>
            </div>
          </template>
          <template #medication="{ item }">
            <div class="flex space-x-3">
              <div>
                <p class="text-gray-400">
                  {{ item.brandCode }}
                </p>
              </div>
            </div>
          </template>
          <template #unitPrice="{ item }">
            <span>{{ item.unitPrice }}</span>
          </template>
          <template #quantity="{ item }">
            <span>{{ item.quantity }}</span>
          </template>
          <template #amount="{ item }">
            <span>
              {{ item.amount }}
            </span>
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
                  <td>
                    {{ request.totalDiscount ? request.totalDiscount : "0" }}
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>{{ request.subTotal ? request.subTotal : "0" }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Shipping Cost</td>
                  <td class="font-bold">
                    {{ request.shippingCost ? request.shippingCost : "0" }}
                  </td>
                </tr>
                <tr class="">
                  <td class="font-bold">Grand Total</td>
                  <td class="font-bold">{{ grandTotal }}</td>
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
            Post Bill
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Collect Payment
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>

  <modify-request @medication-modified="medicationModiifed" :id="requestid" :medication="selectedMedication"
      v-model="viewModificationModal"
    />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import EditIcon from "@/components/icons/edit.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient, cornieClient2 } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import ModifyRequest from './ModifyRequest.vue'

import search from "@/plugins/search";
import IMedicationReq from "@/types/ImedicationReq";
import IDispense from "@/types/IDispense";
import IMedication from "@/types/IMedication";
import { AnyObject } from "yup/lib/object";

const dispense = namespace("dispense");
const user = namespace("user");

@Options({
  name: "ViewRequestModal",
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
    CornieTable,
    EditIcon,
    ModifyRequest
  },
})
export default class ViewRequest extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  request!: IDispense;

  viewModificationModal = false;
  requestDetails = true;

  medicationId = "";

  required = string().required();

  query = "";

  loading = false;

  selectedMedication = {} as IMedication;

  reference = "";
  salesDate = 0;
  customers = "";
  types = "";
  coupon = "";

  location = [];

  @user.Getter
  authorizedLocations!: any;

  @user.Getter
  authCurrentLocation!: any;

  @dispense.State
  dispense!: IDispense;

  @dispense.Action
  viewDispense!: (locationId: string, requestId: string) => Promise<void>;

  get statuses() {
    return ["Active", "Substituted", "On-Hold", "Dispensed"];
  }

  get locationId() {
    return this.authCurrentLocation;
  }

  get requestId() {
    return this.id;
  }

  get grandTotal() {
    return (
      this.request?.subTotal +
        this.request?.totalDiscount +
        this.request?.shippingCost || 0
    );
  }

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
      title: "AMOUNT",
      key: "amount",
      show: true,
    },
  ];

  // get refills() {
  //   return this.selectedItem?.refills ?? [];
  // }
  // get medications() {
  //   return [this.selectedItem];
  // }
  get items() {
    const requests =  this.request?.medications?.map((request: any) => {
      const refillses = this.request?.medications?.map(
        (medication: any) => medication.refills
      );
      return { 
        ...request,
        action: request.brandCode,
        refils: refillses[0],
      };
    });

    return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  modifyItem(value: any) {
    this.requestDetails = false
    this.viewModificationModal = true
    this.medicationId = value
    const item: any  = this.request?.medications?.find((el: any) => el.brandCode = value)
    this.selectedMedication = item
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
