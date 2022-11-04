<template>
  <div class="w-full pb-80">
    <span class="flex justify-end space-x-4 w-full mb-8 mt-5">
      <button
        class="rounded-lg text-primary border-2 border-primary py-3 px-4 font-semibold focus:outline-none hover:opacity-90"
        @click="deliverypreferenceModal = true"
      >
        Delivery preferences
      </button>
      <button
        class="bg-danger rounded-lg text-white py-3 px-4 font-semibold focus:outline-none hover:opacity-90"
        @click="$emit('openModal')"
      >
        Upload Prescription
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="viewItem(item)"
        >
          <newview-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">View Rx</span>
        </div>
        <div
          @click="openRequestRefill(item.id)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <check-yellow-bg class="text-danger fill-current" />
          <span class="ml-3 text-xs">Request Refill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="cancelItem(item)"
        >
          <cancel-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
      <template #status="{ item }">
        <div class="flex items-center">
          <p
            class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
            v-if="item.status == 'Pending'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-200 text-green-500 p-1 rounded"
            v-if="item.status == 'Active'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-red-300 text-red-600 p-1 rounded"
            v-if="item.status == 'Cancelled'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-gray-300 text-black p-1 rounded"
            v-if="item.status == 'Inactive'"
          >
            {{ item.status }}
          </p>
        </div>
      </template>
    </cornie-table>

    <pop-up-modal
      v-model="requestRefillModal"
      title="Request Refill"
      message="Confirm you want to send a refill request to your doctor."
      @confirm="requestRefill"
    />
    <pop-up-modal
      v-model="cancelOrderModal"
      :terms="true"
      title="Cancel"
      message="Confirm you want to cancel this pescription."
      @confirm="confirmCancel"
    />
    <prescription-modal v-model="addPrescription" />
    <details-modal v-model="itemDetailsModal" :request="selectedItem" :id="itemId" :organization="selectedItemOrg" title="View Prescription" />
    <delivery-preference v-model="deliverypreferenceModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import search from "@/plugins/search";

import { IPatient } from "@/types/IPatient";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
//import CloseIcon from "@/components/icons/CloseIcon.vue";
import CancelIcon from "@/components/icons/cancel-red-bg.vue";
import CheckYellowBg from "@/components/icons/check-yellow-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";

import PopUpModal from "../components/PopUpModal.vue";
import DetailsModal from "../components/DetailsModal.vue";
import PrescriptionModal from "./PrescriptionModal.vue";
import DeliveryPreference from '../../medications/prescription/DeliveryPeference.vue'

@Options({
  components: {
    CancelIcon,
    SortIcon,
    NewviewIcon,
    CheckYellowBg,
    ThreeDotIcon,
    PlusIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
    PopUpModal,
    PrescriptionModal,
    DeliveryPreference,
    DetailsModal,
  },
})
export default class PrescriptionExistingPage extends Vue {
  loading = false;
  query = "";
  requestRefillModal = false;
  itemId = "";
  selectedItem: any ={};
  addPrescription = false;
  deliverypreferenceModal = false;
  itemDetailsModal = false;
  cancelOrderModal = false;
  medPrescriptions = [] as any;
  selectedItemOrg = {} as any;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Date",
      key: "date",
      show: true,
    },
    {
      title: "RX ID",
      key: "rxId",
      show: true,
    },
    {
      title: "Medication",
      key: "medication",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "Amount",
      key: "amount",
      show: true,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  openRequestRefill(id: string) {
    this.itemId = id;
    this.requestRefillModal = true;
  }

  async viewItem(item:any) {
    this.itemId = item.id;
    await this.viewAPrescription(item.id)
    this.fetchMedicationOrg(item)
    this.itemDetailsModal = true
  }

  cancelItem(item:any) {
    this.selectedItem = item;
    this.itemId = item.id;
    this.cancelOrderModal = true
  }

  fetchMedicationOrg(item: any) {
    const orgId = item.organizationId
    const org = this.selectedItem.prescribedMedications.find((el: any) => el.organization.id === orgId)
    this.selectedItemOrg = org?.organization
  }

  async confirmCancel() {
    try {
      await cornieClient().patch(
      `/api/v1/patient-portal/prescription/${this.itemId}/cancel`, {}
    );
    window.notify({
      msg: "Successfully cancelled",
      status: "success",
    });
    } catch(error: any) {
      console.log('error', error.response)
    }
    this.cancelOrderModal = false;
    this.fetchPrescription()
  }

  async requestRefill() {
    try {
      await cornieClient().patch(
      `/api/v1/patient-portal/prescription/request-refill`, {prescriptionId: this.itemId}
    );
    window.notify({
      msg: "Successful",
      status: "success",
    });
    } catch(error: any) {
      console.log('error', error.response)
    }
    this.cancelOrderModal = false;
    this.fetchPrescription()
  }

  get items() {
    const combined = this.medPrescriptions.map(this.medicationRequests);
    const medicationRequest = combined.flatMap((value: any) => value);

    if (!this.query) return medicationRequest;
    return search.searchObjectArray(medicationRequest, this.query);
  }

  medicationRequests(request: any) {
    const { prescribedMedications, ...rest } = request;
    return prescribedMedications.map((medication: any) => {
      return {
        ...prescribedMedications,
        ...rest,
        medicationId: medication.id,
        organizationId: medication.organizationId,
        requestId: request.id,
        date: new Date(request.createdAt).toLocaleDateString(),
        rxId: request.orderId,
        medication: request.name,
        amount: request.amount || 0,
        dispenser: request.prescriber_name,
      };
    });
  }

  async fetchPrescription() {
    try {
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/prescription/get-all"
      );
      this.medPrescriptions = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }
  async viewAPrescription(prescriptionId: any) {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/prescription/view/${prescriptionId}`
      );
      this.selectedItem = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching prescription details",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchPrescription();
  }
}
</script>
<style scoped>
.outline-primary {
  border: 2px solid #080056;
}
</style>
