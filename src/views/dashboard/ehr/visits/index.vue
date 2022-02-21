<template>
  <div class="w-full h-screen">
    <div
      class="containr-fluid"
      v-if="
        items &&
        items.length === 0 &&
        filterByStatus.length === 0 &&
        filterByType.length === 0 &&
        !selectedStatus
      "
    >
      <EmptyState @clicked="() => $emit('gotoappointments')" />
    </div>
    <div v-else class="container-fluid bg-white sm:px-2 h-full">
      <!-- <div class="w-full border-b-2 curved flex py-2">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Active Visits</h2>
            </div>
        </div> -->

      <div class="w-full mt-6">
        <!-- <div class="w-full flex my-6">
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg cursor-pointer" :class="{'light-grey-bg': selectedStatus === 0}"
                  @click="() => selectedStatus = 0"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-primary font-normal text-sm">All Visits</span>
                      <span class="text-primary font-semibold">{{ patientVisits.length }}</span>
                    </span>
                </div>
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg mx-4 cursor-pointer" :class="{'light-grey-bg': selectedStatus === 2}"
                  @click="() => selectedStatus = 2"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-warning font-normal text-sm">In-Progress</span>
                      <span class="text-warning font-semibold ">{{ patientVisits.filter((i) => i.status?.toLowerCase() === "in-progress" || i.status?.toLowerCase() === "active").length }}</span>
                    </span>
                </div>
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg cursor-pointer" :class="{'light-grey-bg': selectedStatus === 3}"
                  @click="() => selectedStatus = 3"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-danger font-normal text-sm text-success">Completed</span>
                      <span class="text-danger font-semibold text-success">{{ patientVisits.filter((i) => i.status?.toLowerCase() !== "in-progress" && i.status?.toLowerCase() !== "queue" && i.status?.toLowerCase() !== "active").length }}</span>
                    </span>
                </div>
            </div> -->

        <div class="w-full curved flex py-2 justify-end mb-4 -mt-2">
          <div class=".w-full flex font-semibold text-xl py-2 justify-end pb-4">
            <Button @click="() => $emit('gotoappointments')">
              <a
                style="background: #fe4d3c"
                class="text-base bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-semibold py-3 px-8 rounded-full"
              >
                Go To Appointments
              </a>
            </Button>
          </div>
        </div>

        <div class="w-full pb-7 mb-8 bg-white">
          <cornie-table :columns="rawHeaders" v-model="items">
            <!-- <template #appointmentType="{ item }">
                    <p>{{ item.appointmentId ? getAppointment(item.appointmentId).appointmentType : '' }}</p>
                </template> -->
            <template #slot="{ item }">
              <div class="container flex justify-between" style="width: 100px">
                <span>{{ item.startTime }}</span>
                <span> - </span>
                <span>{{ item.endTime }}</span>
              </div>
            </template>
            <template #status="{ item }">
              <div class="container">
                <span
                  class="status-border p-1"
                  :class="{
                    'status-inactive': item.status === 'inactive',
                    'status-active': item.status === 'active',
                    'text-success completed': item.status === 'completed',
                    'text-danger queued': item.status === 'queued',
                    'text-dark planned':
                      item.status === 'planned' || item.status === 'no-show',
                    arrived: item.status === 'arrived',
                    waitlisted: item.status === 'waitlisted',
                  }"
                  >{{ item.status }}</span
                >
              </div>
            </template>
            <template #practitioners="{ item }">
              <div
                class="container cursor-pointer flex justify-center"
                @click="viewSchedule(item.id)"
              >
                <span class="rounded-full">
                  <Actors :items="item.practitioners" />
                </span>
              </div>
            </template>
            <template #actions="{ item }">
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                style="width: 200px"
              >
                <eye-icon class="mt-1" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                style="width: 200px"
              >
                <eye-icon class="mt-1" />
                <span class="ml-3 text-xs" @click="showTimeline(item.id)"
                  >View timeline</span
                >
              </div>
              <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <ArrowRight />
                    <span class="ml-3 text-xs" @click="showCheckinPane(item.id)">Check-in</span>
                    </div> -->
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showUpdateModal(item)"
              >
                <UpdateIcon />
                <span class="ml-3 text-xs">Update Status</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showCheckoutPane(item.id)"
              >
                <CheckoutIcon />
                <span class="ml-3 text-xs">Check-out</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <AddIcon />
                <span class="ml-3 text-xs">Add Vitals</span>
              </div>
            </template>
          </cornie-table>

          <column-filter
            :columns="rawHeaders"
            v-model:preferred="preferredHeaders"
            v-model:visible="showColumnFilter"
          />

          <!-- <side-modal :visible="showCheckin" :header="'Check-In'" @closesidemodal="() => showCheckin = false">
                    <CheckIn :item="appointments[0]" @close="() => showCheckin = false"  />
                </side-modal> -->
          <modal :visible="timeLineVissible">
            <!-- <template #title>
                    <p class="md flex items-center justify-between px2" style="width: 440px">
                      <span class="md font-lignt text-primary p-2 text-xl">Timeline</span>
                      <span class="md text-danger cursor-pointer">
                        <a class="md">
                          See all
                        </a>
                      </span>
                    </p>
                  </template> -->
            <ActionLog
              :timeline="selectedVisit.timelines"
              :appointmentId="currentVisit.appointmentId"
              @closetimeline="() => (timeLineVissible = false)"
            />
          </modal>

          <side-modal
            :visible="showCheckNoapp"
            :header="'Check-In'"
            @closesidemodal="() => (showCheckNoapp = false)"
          >
            <CheckinNoapp
              :patientId="patients[0]?.id"
              @close="() => (showCheckNoapp = false)"
            />
          </side-modal>

          <side-modal
            :visible="showCheckout"
            :header="'Check-Out'"
            :width="990"
            @closesidemodal="closeUpdateModal"
          >
            <patient-checkout
              :visit="currentVisit"
              :visitId="currentVisit?.id"
              @closesidemodal="closeUpdateModal"
            />
          </side-modal>

          <side-modal
            :visible="false"
            :header="'Check-In'"
            :width="990"
            @closesidemodal="closeUpdateModal"
          >
            <!-- <side-modal :visible="showCheckin" :header="'Check-In'" :width="990"  @closesidemodal="closeUpdateModal"> -->
            <patient-checkn
              :visit="currentVisit"
              :appointmentId="appointmentId"
              @closesidemodal="() => (showCheckin = false)"
            />
          </side-modal>

          <side-modal
            :visible="showStatusUpdateModal"
            @closesidemodal="closeUpdateModal"
          >
            <update-status
              :updateData="updateData"
              @changed="newStatusSelected"
              @closesidemodal="closeUpdateModal"
            >
              <template #submit>
                <CornieBtn
                  :loading="loading"
                  class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
                  @click="updateStatus"
                >
                  <span class="text-white font-semibold">Update</span>
                </CornieBtn>
              </template>
            </update-status>
          </side-modal>

          <side-modal :visible="showViewPane" :header="'View Stot'">
            <div class="w-full my-3">
              <ViewDetails :schedule="selectedSchedule" />
            </div>
            <div class="w-full my-3">
              <ViewPlan :schedule="selectedSchedule" />
            </div>
            <div class="w-full my-3">
              <ViewBreaks :schedule="selectedSchedule" />
            </div>
          </side-modal>
        </div>

        <!-- <div style="height: 400px">

            </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Actors from "@/views/dashboard/schedules/components/actors.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye-yellow.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add-green.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import Button from "@/components/globals/corniebtn.vue";

import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CheckIn from "./components/checkin.vue";
import CheckOut from "./components/checkout.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from "@/components/modal.vue";
//import Close from '@/components/icons/close.vue'
import CheckinNoapp from "./components/checkin-noappointment.vue";
import ArrowRight from "@/components/icons/arrow-right.vue";
import EncounterIcon from "@/components/icons/encounter.vue";
import MultiSelect from "@/views/dashboard/schedules/components/apply-to.vue";
import CheckoutIcon from "@/components/icons/check-red-bg.vue";

import EmptyState from "./empty-state.vue";
import CancelIcon from "./components/cancel.vue";
import UpdateIcon from "./components/update.vue";
import NoshowIcon from "./components/no-show.vue";
import ManageBillIcon from "./components/manage-bill.vue";
import ActionLog from "./components/timeline-component.vue";
import UpdateStatus from "@/views/dashboard/ehr/encounter/components/update-status.vue";
import IUpdateStatus from "@/types/IUpdateModel";
import PatientCheckout from "./components/patient-checkout.vue";
import PatientCheckn from "./components/patient-checkin.vue";

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    ActionLog,
    MultiSelect,
    CancelIcon,
    //Close,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    EditIcon,
    Button,
    SideModal,
    CheckIn,
    CornieTable,
    AddIcon,
    DeactivateIcon,
    EmptyState,
    CheckOut,
    Modal,
    Actors,
    CheckinNoapp,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
    UpdateIcon,
    NoshowIcon,
    ManageBillIcon,
    UpdateStatus,
    PatientCheckout,
    PatientCheckn,
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  query = "";
  search = "";

  selectedStatus = 0;
  filterByType: any = [];
  filterByStatus: any = [];
  completedStatus: any = [];
  currentVisitId = "";

  activeTab = 0;
  showEditPane = false;
  showViewPane = false;
  showAllActors = false;
  showActorsPane = false;
  showAddActorsPane = false;
  showCheckin = false;
  showCheckNoapp = false;
  selectType = false;
  filterStatus = false;
  showCheckout = false;
  timeLineVissible = false;
  viewDetails = false;

  appointmentId = "";

  selectedSchedule: any = {};
  selectedVisit: any = {};
  selectedPatient: any = {};
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auust",
    "September",
    "October",
    "November",
    "December",
  ];

  // @visitsStore.State
  // visits!: any[];

  @visitsStore.Action
  getPatientVisits!: (patientId: string) => Promise<void>;

  @visitsStore.State
  patientVisits!: any[];

  @visitsStore.State
  patients!: any[];

  @visitsStore.Action
  getPatients!: () => Promise<void>;

  @visitsStore.Action
  updateVisitStatus!: (body: any) => Promise<boolean>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @visitsStore.Action
  schedulesByPractitioner!: () => Promise<any>;

  @visitsStore.Action
  checkin!: (body: any) => Promise<boolean>;

  @visitsStore.Action
  startEncounter!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  cancel!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  noShow!: (id: string) => Promise<boolean>;

  @appointment.State
  patientappointments!: any[];

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    { title: "Slot", key: "slot", show: true },
    {
      title: "Practitioner",
      key: "practitioners",
      show: true,
    },
    {
      title: "Participant Status",
      key: "status",
      show: true,
    },
    {
      title: "Location",
      key: "location",
      show: true,
    },
  ];

  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];
  statuses = ["All", "Completed", "Queue", "In-Progress"];
  availableSlots: any = [];
  showStatusUpdateModal = false;
  updateData = {} as IUpdateStatus;
  newStatus = "";
  loading = false;
  selectedVisitId = "";

  get currentVisit() {
    if (!this.currentVisitId) return {};
    return this.patientVisits.find((i: any) => i.id === this.currentVisitId);
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    if (this.patientVisits?.length === 0) return [];
    return this.patientVisits.map((visit: any) => {
      let data = {
        id: visit.id,
        appointmentId: visit.appointmentId,
        updatedAt: visit?.updatedAt,
        recorded: new Date(visit.createdAt).toLocaleDateString(),
        identifier: "XXXXX",
        appointmentType:
          this.getAppointment(visit.appointmentId).appointmentType ?? "N/A",
        // appointmentType: this.getAppointment(visit.appointmentId).appointmentType ?? "N/A",
        startTime: this.formatSlotTime(visit.slot?.startTime),
        endTime: this.formatSlotTime(visit.slot?.endTime),
        // startTime: `${visit.checkInTime.substring(11, 16)}`,
        // endTime: `${new Date(new Date(visit.checkInTime).getMinutes() + 60).toLocaleTimeString().substring(0, 5)},
        status: visit.status,
        location: visit?.room?.name,
        practitioners:
          !visit.appointmentId || visit.Practitioners?.length <= 0
            ? [
                {
                  firstName: visit.checkedInBy?.firstName,
                  lastName: visit.checkedInBy?.lastName,
                  image: visit.checkedInBy?.image
                    ? visit.checkedInBy?.image
                    : visit.checkedInBy?.user?.image,
                  id: visit.checkedInBy?.id,
                },
              ]
            : visit.Practitioners,
        // practitioners: [
        //   {
        //       "phone": {
        //         "number": "08122463202",
        //         "dialCode": "+1264"
        //       },
        //       "firstName": "Darlington",
        //       "lastName": "Onyemere",
        //       "email": "anselem16m@outlook.com",
        //       "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
        //       "accessRole": null,
        //       "userId": "91197e0d-4425-4bcf-ba84-366010fc29cf",
        //       "department": "Oncology",
        //       "jobDesignation": "Doctor",
        //       "id": "87e846a3-bac0-43b9-a4db-0b2605426c42",
        //       "user": {
        //         "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
        //         "firstName": "Darlington",
        //         "email": "anselem16m@outlook.com",
        //         "middleName": "",
        //         "lastName": "Onyemere",
        //         "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
        //         "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
        //         "accountType": "Provider",
        //         "roleId": null,
        //         "phone": {
        //           "number": "08122463202",
        //           "dialCode": "+1264"
        //         },
        //         "createdAt": "2021-07-23T12:20:34.591Z",
        //         "updatedAt": "2021-07-23T12:20:34.591Z",
        //         "OrganizationId": null
        //       }
        //     }
        // ]
      };

      if (visit.appointmentId) {
        if (visit.Practitioners?.length > 0)
          data.practitioners = visit.Practitioners;
        else
          data.practitioners = [
            {
              firstName: visit.checkedInBy?.firstName,
              lastName: visit.checkedInBy?.lastName,
              image: visit.checkedInBy?.image
                ? visit.checkedInBy?.image
                : visit.checkedInBy?.user?.image,
              id: visit.checkedInBy?.id,
            },
          ];
      } else {
        data.practitioners = [
          {
            firstName: visit.checkedInBy?.firstName,
            lastName: visit.checkedInBy?.lastName,
            image: visit.checkedInBy?.image
              ? visit.checkedInBy?.image
              : visit.checkedInBy?.user?.image,
            id: visit.checkedInBy?.id,
          },
        ];
      }
      return data;
    });
  }

  newStatusSelected(status: any) {
    this.newStatus = status;
  }

  closeUpdateModal() {
    this.showStatusUpdateModal = false;
    this.showCheckout = false;
    this.selectedVisitId = "";
    this.updateData = {} as IUpdateStatus;
  }

  async updateStatus() {
    try {
      this.loading = true;
      const updated = await this.updateVisitStatus({
        id: this.selectedVisitId,
        status: this.newStatus,
      });
      this.loading = false;

      if (updated) {
        notify({
          msg: "Status updated successfully",
          status: "success",
        });
        this.showStatusUpdateModal = false;
        await this.getPatientVisits(this.$route.params.id.toString());
      } else {
        notify({
          msg: "There was an error updating status",
          status: "error",
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  showUpdateModal(item: any) {
    this.selectedVisitId = item?.id;
    this.updateData = {
      currentStatus: item.status,
      lastUpdated: new Date(item?.updatedAt).toLocaleDateString(),
      updatedBy: "",
      statuses: [
        {
          code: "queued",
          display: "Queued",
        },
        {
          code: "no-show",
          display: "No Show",
        },
        {
          code: "cancelled",
          display: "Cancelled",
        },
        {
          code: "completed",
          display: "Completed",
        },
        {
          code: "planned",
          display: "Planned",
        },
        {
          code: "arrived",
          display: "Arrived",
        },
        {
          code: "waitlisted",
          display: "Waitlisted",
        },
      ],
    };
    this.showStatusUpdateModal = true;
  }

  formatSlotTime(timeString: any) {
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  // formatSlotTime (time: any) {
  //   // Check correct time format and split into components
  //   time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  //   if (time.length > 1) { // If time format correct
  //     time = time.slice (1);  // Remove full string match value
  //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
  //     time[0] = +time[0] % 12 || 12; // Adjust hours
  //   }
  //   return time.join (''); // return adjusted time or original string
  // }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  setSelectedVisit(id: string) {
    const pt = this.patientVisits.find((i: any) => i.id === id);
    this.selectedVisit = pt ? pt : {};
  }

  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : {};
  }

  getActors(id: string) {
    const pt = this.patientappointments.find((i: any) => i?.id === id);

    return pt ? pt.Practitioners : [];
  }

  getAppointment(id: string) {
    if (
      this.patientappointments?.length === 0 ||
      this.patientappointments?.length === 0
    )
      return {};
    const pt = this.patientappointments?.find((i: any) => i?.id === id);

    return pt ? pt : {};
  }

  async markAsNoShow(id: string) {
    const marked = await this.noShow(id);
    if (marked) {
      window.notify({ msg: "Visit marked as no-show", status: "success" });
    }
  }

  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return {};
    const data = this.selectedPatient;

    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${
        this.months[new Date(data.dateOfBirth).getMonth()]
      }, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn,
    };
  }

  viewSchedule(id: string) {
    // const schedule = this.schedules.find((i: any) => i.id === id);
    // if (schedule) this.selectedSchedule = schedule;
    // ;
    // this.showActorsPane = true;
    // this.showViewPane = true;
  }

  showCheckoutPane(id: string) {
    this.setSelectedVisit(id);
    this.currentVisitId = id;
    this.selectedVisitId = id;
    this.showCheckout = true;
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id);
    this.viewDetails = true;
  }

  showTimeline(id: string) {
    this.setSelectedVisit(id);
    this.currentVisitId = id;
    this.timeLineVissible = true;
  }

  showCheckinPane(id: string) {
    this.setSelectedVisit(id);
    this.showCheckin = true;
  }

  closeEditPane() {
    this.showEditPane = false;
  }

  async created() {
    setTimeout(() => {
      this.appointmentId = "c4b30067-6d40-4548-b95c-8f2dbc97d0a8";
    }, 5000);
    if (this.patients?.length === 0) await this.getPatients();
    await this.fetchByIdAppointments(this.$route.params.id.toString());
    await this.getPatientVisits(this.$route.params.id.toString());
    window.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("md")) {
        this.selectType = false;
        this.filterStatus = false;
      }
    });
  }
}
</script>

<style scoped>
.active-tab {
  border-bottom-width: 4px;
  margin-bottom: -0.22rem;
}

.active-color {
  border-color: #fe4d3c;
}

.status-active {
  background: #f3fcf8;
  color: #35ba83;
}

.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}

.border-b-4 {
  border-bottom: 4px solid #f0f4fe;
}

.h-screen {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
  padding-bottom: 24px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-screen::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-screen {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.file-picker {
  width: 0;
  height: 0;
  overflow: hidden;
}

.light-grey-bg {
  background: #f0f4fe;
}

.status-border {
  border-radius: 5px;
}

.completed {
  background: rgba(53, 186, 131, 0.08);
}

.queued {
  background: rgba(254, 77, 60, 0.08);
}

.planned {
  background: #14171f26;
}

.arrived {
  background: #54138826;
  color: #541388;
}

.waitlisted {
  background: #f7b53814;
  color: #f7b538;
}
</style>
