<template>
  <cornie-dialog v-model="show" right class="w-3/4 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="pb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <icon-btn @click="show = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <p class="text-3xl font-bold">{{title}}</p>
        </div>

        <cancel-red-bg
          class="float-right cursor-pointer"
          @click="show = false"
        />
      </cornie-card-title>

      <cornie-card-text>
        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Dispense ID #:</span>
            <span class="font-semi-bold text-white">{{
              request.orderId
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Status:</span>
            <span class="font-semi-bold text-white capitalize">{{
              request.status
            }}</span>
          </div>
          <div>
            <span class="text-white text-sm mr-2">Request Date:</span>
            <span class="font-semi-bold text-white">{{
              convertDate(request.createdAt)
            }}</span>
          </div>
        </div>

        <div class="p-6 bg-white h-auto">
          <div class="flex items-center justify-between">
            <div>
              <img class="w-24 h-24" :src="organization.image" alt="" />
            </div>

            <div class="text-right">
              <div class="font-bold text-base mb-4">
                {{ organization?.name }}
              </div>
              <div>{{ organization?.address }}</div>
              <div class="">
                <div class="mr-2">
                  {{
                    organization?.phone
                      ? `${organization?.phone.dialCode}${organization?.phone.number}`
                      : "Nil"
                  }}
                </div>
                <div
                  class="w-2 h-2 rounded-full"
                  style="background: '#C2C7D6';"
                ></div>
                <div>{{ organization.email }}</div>
                <div>
                  <span style="color: '#C2C7D6';">Patient ID: </span>
                  {{ request?.patientId }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-purple-900 flex items-center justify-between">
          <div>
            <span class="text-white text-sm mr-2">Safety Cap Request</span>
            <span class="font-semi-bold text-white capitalize">
              {{ request?.safetyCapRequest ? "Yes" : "No" }}</span
            >
          </div>
          <div>
            <span class="text-white text-sm mr-2">Delivery Instruction:</span>
            <span class="font-semi-bold text-white capitalize">
              {{
                `${request.deliveryPreferences.type} - ${request.deliveryPreferences.city} ${request.deliveryPreferences.state}`
              }}</span
            >
          </div>
        </div>

        <div class="p-4 grid grid-cols-3 gap-4">
          <div class="blue-bg1">
            <p class="font-bold mb-4">Request Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Date Reqested</span>
              <span class="text-right">{{
                convertDate(request.createdAt)
              }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Encounter ID</span>
              <span class="text-right">{{ request?.identifier }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">ICD-11 Code</span>
              <span class="text-right">{{ request?.reasonCode }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Priority</span>
              <span class="text-right">{{ request?.priority }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Requester ID</span>
              <span class="text-right">{{ request?.requester?.id }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Practitioner ID</span>
              <span class="text-right">{{ request?.perfomer }}</span>
            </div>
          </div>
          <div class="w-bg1">
            <p class="font-bold mb-4">Patient Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class=""
                >{{ request?.patient?.firstname }}
                {{ request?.patient?.middlename }}
                {{ request?.patient?.lastname }}</span
              >
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="text-right">{{ request?.patient?.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="text-right">{{
                request?.patient?.paymentInfo
              }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="text-right"
                >{{ request?.patient?.contactInfo[0].phone.dialCode }}
                {{ request?.patient?.contactInfo[0].phone.number }}</span
              >
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="text-right">{{
                request?.patient?.contactInfo[0].email
              }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="text-right">{{
                request?.patient?.contactInfo[0].primaryAddress
              }}</span>
            </div>
          </div>
          <div class="blue-bg1">
            <p class="font-bold mb-4">Performer Information</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Patient Name</span>
              <span class="text-right">{{ request?.perfomer }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">MRN #</span>
              <span class="text-right">{{ request?.performer?.mrn }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Payment Info</span>
              <span class="text-right">{{ request?.performer?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Phone Number</span>
              <span class="text-right">{{ request?.performer?.phone }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Email</span>
              <span class="text-right">{{ request?.performer?.email }}</span>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm mr-2 c-66749">Address</span>
              <span class="text-right">{{ request?.performer?.address }}</span>
            </div>
          </div>
        </div>

        <cornie-table
          :columns="rawHeaders"
          v-model="medications"
          :listmenu="true"
          :check="false"
        >
          <template #actions="{ item }">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              @click="modifyItem(item)"
            >
              <edit-icon class="text-danger fill-current" />
              <span class="ml-3 text-xs">Modify</span>
            </div>
          </template>
          <template #medication="{ item }">
            <div class="flex space-x-3">
              <div>
                <p>{{ item.genericName }}</p>

                <p class="text-gray-400">{{ item.form }} days</p>
              </div>
              <substitution-allowed
                class="mr-2"
                v-if="item.substitutionAllowed"
              />
              <substituted v-else class="mr-2" />
            </div>
          </template>
          <template #unit="{ item }">
            <span>{{ item.unit }}</span>
          </template>
          <template #unitPrice="{ item }">
            <span>{{ item.unitPrice }}</span>
          </template>
          <template #quantity="{ item }">
            <span>{{ item.quantity }}</span>
          </template>
          <template #amount="{ item }">
            <span>
              {{ item.unitPrice * item.quantity || 0 }}
            </span>
          </template>
        </cornie-table>
      </cornie-card-text>

      <div class="detail-footer">
        <div class="text-center border-dashed border-b">
          <div class="c-667499 text-sm mb-4">Powered By Cornie Health</div>
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
            {{ request?.identifier }} | Requester:
            {{ request?.requester?.firstName }}
            {{ request?.requester?.lastName }} | DateTime Created:
            {{ convertDate(request?.createdAt) }}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end mt-20 mb-10">
        <cornie-btn
          :loading="loading"
          type="submit"
          @click="collectPayment"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Close
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>

  <collect-payment
    :id="id"
    :type="postMethod"
    :request="request"
    :bill="bill"
    v-model="completePaymentModal"
  />

  <modify-request
    @medicationSubstituted="medicationSubstituted"
    @medicationModified="medicationModified"
    :id="medicationId"
    :medication="selectedMedication"
    v-model="viewModificationModal"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
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
import SubstitutionAllowed from "@/components/icons/substituted.vue";
import Substituted from "@/components/icons/substitution-allowed.vue";

import TextArea from "@/components/textarea.vue";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import search from "@/plugins/search";
import IMedicationReq from "@/types/ImedicationReq";
import IDispenseInfo from "@/types/IDispenseInfo";
import IMedication from "@/types/IMedication";
import { AnyObject } from "yup/lib/object";
import { IOrganization } from "@/types/IOrganization";

const dispense = namespace("dispense");
const user = namespace("user");
const request = namespace("request");

@Options({
  name: "DetailsModal",
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
    CancelRedBg,
    CornieTable,
    EditIcon,
    TextArea,
    Substituted,
    SubstitutionAllowed,
    ChevronDownIcon,
  },
})
export default class DetailsModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;
  
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Object, default: {} })
  request!: any;

  @Prop({ type: Object, default: "" })
  organization!: IOrganization;

  completePaymentModal = false;
  viewModificationModal = false;
  requestDetails = true;

  viewedRequest = "";

  openPostOptions = false;
  medicationId = "";

  required = string().required();

  query = "";
  bill = "";

  postMethod = "CollectPayment";
  loading = false;
  notes = "";
  selectedMedication = {} as IMedication;
  medicationAdministration = "";

  types = "";

  location = [];

  @user.Getter
  authorizedLocations!: any;

  @user.Getter
  authCurrentLocation!: any;

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  get requestId() {
    return this.id;
  }

  get grandTotal() {
    return this.request?.subTotal + this.request?.shippingCost || 0;
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
      title: "UNIT",
      key: "unit",
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

  get refills() {
    return this.request?.refills ?? [];
  }
  get medications() {
    return [this.request];
  }
  get items() {
    const requests = this.request.map((request: any) => {
      const refillses = request.medications.map(
        (medication: any) => medication.refills
      );
      return {
        ...request,
        action: request.id,
        refils: refillses[0],
      };
    });

    return requests;
    // if (!this.query) return shifts;
    // return search.searchOb  jectArray(shifts, this.query);
  }

  modifyItem(item: any) {
    this.requestDetails = false;
    this.viewModificationModal = true;
    this.medicationId = item.id;
    this.selectedMedication = item;
  }

  convertDate(x?: any) {
    return new Date(x).toLocaleDateString("en-US");
  }

  medicationSubstituted(med: any) {
    this.viewModificationModal = false;
    this.selectedMedication = med;
  }

  medicationModified(med: any) {
    this.viewModificationModal = false;
    this.selectedMedication = med;
    this.selectedMedication.quantity = med.quantity;
  }

  async collectPayment() {
    this.request.filter((el: any) => {
      if (el.id == this.id) {
        this.viewedRequest = el;
      }
    });
    const res: any = await this.dispenseRequest();
    if (res.success) {
      this.completePaymentModal = true;
      await this.generateBill();
    }
  }

  async setRequest() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/pharmacy/dispense-view/${this.locationId}/${this.id}`
      );
      this.viewedRequest = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching request details",
        status: "error",
      });
    }
  }

  async dispenseRequest() {
    const payload = this.medications?.map((product) => {
      return {
        dispensedProductId: product.id,
        reasonforSubstitution: product.reasonForSubstitution,
        quantity: 1,
      };
    });
    try {
      const res = await cornieClient().post(
        `/api/v1/pharmacy/dispense-request/${this.locationId}/${this.id}`,
        payload
      );
      return res;
    } catch (error) {
      window.notify({
        msg: "There was an error dispensing request",
        status: "error",
      });
    }
  }

  async generateBill() {
    try {
      const { data } = await cornieClient().post(
        `/api/v1/pharmacy/bill-request/${this.locationId}/${this.id}`,
        {}
      );
      this.bill = data;
    } catch (error) {
      window.notify({
        msg: "There was an error generating bill",
        status: "error",
      });
    }
  }

  async PostBill() {
    await this.setRequest();
    await this.dispenseRequest();
    await this.generateBill();
  }

  async created() {}
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

.bg-f0f4fe {
  background: #f0f4fe;
}

.detail-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 24px;
  background: #f0f4fe;
}
</style>
