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
          <p class="text-3xl font-bold">Dispense</p>
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

        <div class="p-6 bg-white h-auto">
          <div class="flex items-center justify-between">
            <div></div>

            <div class="flex flex-col text-right">
              <div class="font-bold text-base mb-4">
                {{ organization?.name }}
              </div>
              <div>{{ organization?.address }}</div>
              <div class="flex items-center">
                <span class="mr-2">{{ organization?.phone || "Nil" }}</span>
                <span
                  class="w-2 h-2 rounded-full"
                  style="background: '#C2C7D6'"
                ></span>
                <span>{{ organization?.email }}</span>
                <div>
                  <span style="color: '#C2C7D6'">Patient ID:</span>
                  {{ request?.patient?.id }}
                </div>
              </div>
            </div>
          </div>
        </div>

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
          <!-- <template #actions="{ item }">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              @click="modifyItem(item.brandCode)"
            >
              <edit-icon class="text-danger fill-current" />
              <span class="ml-3 text-xs">Modify</span>
            </div>
          </template> -->
          <template #category="{ item }">
            <div class="flex space-x-3">
              <div>
                <p class="text-gray-400">
                  {{ item.category }}
                </p>
              </div>
            </div>
          </template>
          <template #serviceName="{ item }">
            <span>{{ item.serviceName }}</span>
          </template>
          <template #orderDetail="{ item }">
            <span>{{ item.orderDetail }}</span>
          </template>
          <template #quantity="{ item }">
            <span>{{ item.quantity }}</span>
          </template>
          <template #total="{ item }">
            <span>
              {{ item.total }}
            </span>
          </template>
        </cornie-table>
      </cornie-card-text>

      <div class="w-full flex items-center justify-end mt-6 mb-8">
        <div class="w-1/3 flex items-center justify-end border rounded-lg">
          <div
            class="w-1/2 border-r p-4 rounded-l-lg font-bold text-primary"
          >
           Total Paid
          </div>
          <div
            class="w-1/2 font-bold p-4 rounded-r-lg text-primary" style="background: #F0F4FE"
          >
            ₦ 0
          </div>
        </div>
      </div>

      <div class="detail-footer mb-10">
        <div class="text-center border-dashed border-b">
          <div class="c-667499 text-sm mb-4 text-center">Powered By Cornie Health </div>
          <div class="mb-10">
            This is a system generated document from CornieHealth. CornieHealth
            is a healthtech system solution vendor for healthcare providers and
            patients. Visit
            <a class="text-red-500 font-semibold" href="www.corniehealth.com"
              >www.corniehealth.com</a
            >
            to create your free account.
          </div>
        </div>

        <div class="text-center">
          <div class="mt-10">
            Save Earth, Go Paperless. Join so many other amazing providers and
            patients on CornieHealth.
          </div>
          <div class="mt-4">
            Document Type: Medication Prescription|Rx ID:
            {{ request?.Requester?.RXID }} | Requester:
            {{ request?.Requester?.name }} | DateTime Created:
            {{ request?.Requester?.createdAt }}
          </div>
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
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";
import { IOrganization } from "@/types/IOrganization";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import ModifyRequest from "./ModifyRequest.vue";

import search from "@/plugins/search";
import IMedicationReq from "@/types/ImedicationReq";
import IDispenseInfo from "@/types/IDispenseInfo";
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
  },
})
export default class ViewOrder extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  request!: IDispenseInfo;

  @Prop({ type: Object, default: "" })
  organization!: IOrganization;

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
  dispense!: IDispenseInfo;

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
      title: "CATEGORY",
      key: "category",
      show: true,
    },
    {
      title: "SERVICE NAME",
      key: "serviceName",
      show: true,
    },
    {
      title: "ORDER DETAIL",
      key: "orderDetail",
      show: true,
    },
    {
      title: "QUANTITY",
      key: "quantity",
      show: true,
    },
    {
      title: "TOTAL",
      key: "total",
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
    const requests = this.request?.medications?.map((request: any) => {
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

.detail-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 24px;
  background: #f0f4fe;
}
</style>
