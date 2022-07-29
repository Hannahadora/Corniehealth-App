<template>
  <div class="h-screen">
    <div class="w-full h-full pb-7 mt-5">
      <!-- <div class="flex justify-end items-center mb-6">
        <cornie-btn
          class="bg-danger px-3 rounded-lg text-white m-5"
          @click="registerNew = true"
        >
          Add New
        </cornie-btn>
      </div> -->

      <cornie-table :columns="rawHeaders" v-model="items" :check="false">
        <template #actions>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <eye-icon class="text-blue-400 fill-current" />
            <span class="ml-3 text-xs">View Availability</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <edit-icon class="text-purple-500 fill-current" />
            <span class="ml-3 text-xs">Edit Service</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showConfirmModal = true"
          >
            <calendar-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Confirm Appointment</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <link-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Link Form</span>
          </div>

          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <copy-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Copy Site Link </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <share-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Share Site Link</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <deactivate-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </template>
      </cornie-table>
    </div>
  </div>
  <appointmentconfirm-modal v-model="showConfirmModal" />
  <appointment-modal
    :id="typeId"
    v-model="registerNew"
    @type-added="typeadded"
    @closesidemodal="closeModal"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import search from "@/plugins/search";
import { namespace } from "vuex-class";

import { IDesignation } from "@/types/IDesignation";
import IAppointmentTypes from "@/types/IAppointmentTypes";
import ICatalogueService from "@/types/ICatalogue";
import IPractitioner from "@/types/IPractitioner";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";

import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CalendarIcon from "@/components/icons/newcalendar.vue";
import LinkIcon from "@/components/icons/link.vue";
import CopyIcon from "@/components/icons/copy.vue";
import ShareIcon from "@/components/icons/shareIcon.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";

import AppointmentModal from "./Appointmentdialog.vue";
import AppointmentconfirmModal from "./confrimModal.vue";
import ISpecial from "@/types/ISpecial";

const userStore = namespace("user");

const designation = namespace("designation");
const appointmentType = namespace("appointmentType");
const catalogues = namespace("catalogues");
const special = namespace("special");

@Options({
  name: "AppoitmentTypesExistingState",
  components: {
    SortIcon,
    ThreeDotIcon,
    CornieTable,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,
    AppointmentModal,
    SideModal,
    EyeIcon,
    CalendarIcon,
    LinkIcon,
    CopyIcon,
    ShareIcon,
    DeactivateIcon,
    AppointmentconfirmModal,
  },
})
export default class AppointmentTypes extends Vue {
  @Prop({ type: Array, required: true })
  designations!: IDesignation[];

  registerNew = false;
  query = "";
  practitioner = [] as any;
  typeId = "";
  showConfirmModal = false;
  bookingServices: Array<any> = [];

  @appointmentType.State
  appointmentTypes!: IAppointmentTypes[];

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  @appointmentType.Action
  fetchappointmentTypes!: () => Promise<void>;

  @appointmentType.Action
  deleteAppointmentType!: (id: string) => Promise<boolean>;

  @catalogues.Action
  getServices!: () => Promise<void>;

  @catalogues.State
  services!: ICatalogueService[];

  @userStore.Getter
  authPractitioner!: IPractitioner;

  // appointmentId ="";
  rawHeaders = [
    {
      title: "Specialty",
      key: "specialty",
      show: true,
    },
    {
      title: "service name",
      key: "service",
      show: true,
    },
    {
      title: "Duration",
      key: "duration",
      show: true,
    },
    {
      title: "Practitioners",
      key: "practitioners",
      show: true,
    },
    {
      title: "Booking site links",
      key: "booking",
      show: true,
    },
    {
      title: "Link forms",
      key: "forms",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  closeModal() {
    this.registerNew = false;
    // this.selectedTeamId = "";
  }
  get empty() {
    return this.appointmentTypes.length < 1;
  }
  async typeadded() {
    await this.fetchServices();
  }
  get items() {
    const bookingServices = this.bookingServices.map((service) => {
      (service as any).createdAt = new Date(
        (service as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...service,
        action: service.id,
        keydisplay: "XXXXXXX",
        service: service.name,
        duration: service.serviceUOM,
        forms: "-----",
        practitioners:
          this.authPractitioner.firstName +
          " " +
          this.authPractitioner.lastName,
        booking: "-----",
        specialty: this.findSpecialty(service.specialtyId),
        status: service.status,
      };
    });
    if (!this.query) return bookingServices;
    return search.searchObjectArray(bookingServices, this.query);
  }

  showTypeModal(value: string) {
    this.registerNew = true;
    this.typeId = value;
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this appointment type",
      title: "Delete request",
    });
    if (!confirmed) return;

    if (await this.deleteAppointmentType(id))
      window.notify({ msg: "Appoinment type deleted", status: "success" });
    else window.notify({ msg: "Appoinment type not deleted", status: "error" });
  }
  getDuration(id: string) {
    const pt = this.services.find((i: any) => i.id === id);
    return pt ? `${pt.serviceUOM}` : "";
  }

  getServiceName(id: string) {
    const pt = this.services.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  getPractitionerName(id: string) {
    const pt = this.practitioner.find((i: any) => i.id === id);
    return pt ? `${pt.firstName}  ${pt.lastName}` : "";
  }

  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  findSpecialty(id: string) {
    const el = this.services.find((i: any) => i.id === id);
    return el ? `${el.name}` : "";
  }

  async fetchServices() {
    const url = "/api/v1/booking-site/services";
    const payload = {};
    try {
      const response = await cornieClient().get(url, payload);
      if (response.success) {
        this.bookingServices = response.data;
      }
    } catch (error) {
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchSpecials();
    await this.fetchServices();
    if (this.bookingServices.length < 1) {
      await this.fetchServices();
    }
  }
}
</script>
