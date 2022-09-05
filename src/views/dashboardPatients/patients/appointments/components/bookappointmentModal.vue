<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full">
    <cornie-card
      v-if="valueType === 'specialty'"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="$emit('close')">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            Search {{ selectedTab }}
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="$emit('close')"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-1">
        <div class="flex items-center">
          <div
            :class="{ activetab: selectedTab === 'doctors' }"
            class="mr-6 pb-4 cursor-pointer flex items-center"
            @click="selectTab('doctors')"
          >
            <img
              class="mr-2"
              src="@/assets/book-appointment/icon-doctor-black.png"
              alt=""
            />
            <span class="text-lg text-grey-eth font-bold">Doctors</span>
          </div>
          <div
            :class="{ activetab: selectedTab === 'hospitals' }"
            class="mr-6 pb-4 cursor-pointer flex items-center"
            @click="selectTab('hospitals')"
          >
            <!-- <img
            class="mr-2"
            src="@/assets/book-appointment/Icon-hospital-black.png"
            alt=""
          /> -->
            <span class="text-lg text-grey-eth font-bold">Hospital/Clinic</span>
          </div>
        </div>

        <search-filter @getSelectedInput="getSelectedInput" />

        <select-group
          :tab="selectedTab"
          :locations="shownLocations"
          :selectedSpecialty="search.specialty"
          :selectedLocation="search.location"
          @searchQuery="getSearchQuery"
          @loadingState="getLoadingState"
        />

        <div>
          <div v-if="selectedTab === 'doctors'">
            <doctors :practitioners="doctors" />
          </div>
          <div v-if="selectedTab === 'hospitals'">
            <hospitals :hospitals="hospitals" />
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>

    <doctors-profile-modal
      :practitioner="selectedPractitioner"
      :locations="shownLocations"
      v-model="showDoctorsprofile"
      @close="closeDosctorsProfile"
    />
    <hospital-info-modal
      :hospital="selectedProvider"
      :locations="shownLocations"
      :practitioners="providerPractitioners"
      v-model="showHospitalsprofile"
      @close="closeHospitalsProfile"
    />
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
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import Doctors from "./Doctors.vue";
import Hospitals from "./Hospitals.vue";
import SelectGroup from "./SelectGroup.vue";
import SearchFilter from "./SearchFilter.vue";
import DoctorsProfileModal from "./DoctorsProfileModal.vue";
import HospitalInfoModal from "./HospitalInfoModal.vue"
// import LinearLoader from "~/components/LinearLoader.vue"

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "BookAppointmentModal",
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
    SelectGroup,
    SearchFilter,
    Doctors,
    Hospitals,
    DoctorsProfileModal,
    HospitalInfoModal,
  },
})
export default class BookAppointmentModal extends Vue {
  selectedTab: String = "doctors";
  search: any = {};
  loading: Boolean = false;
  showAppointmentModal: Boolean = false;
  showDoctorsprofile: Boolean = false;
  showHospitalsprofile: Boolean = false;
  show = false;
  shownLocations: any = [];
  doctors: any = [];
  hospitals: any = [];
  valueType: String = "specialty";
  selectedPractitioner: any = {};
  selectedProvider: any = {};
  selectedData: any = {};
  providerPractitioners: any = [];

  @Watch("selectedTab")
  onChange() {
    this.fetchData();
  }

  @Watch("valueType")
  async onUpdate() {
    if (this.valueType === "practitioner") {
      await this.findPractitioner();
      this.showDoctorsprofile = true;
    }
    if (this.valueType === "provider") {
      await this.findProvider();
      await this.fetchProviderPractitioners();
      this.showHospitalsprofile = true;
    }
  }

  closeDosctorsProfile() {
    this.showDoctorsprofile = false
    this.valueType = 'specialty'
  }

  closeHospitalsProfile() {
    this.showHospitalsprofile = false
    this.valueType = 'specialty'
  }

  async findPractitioner() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/get-profile/${this.selectedData.id}`
      );
      this.selectedPractitioner = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching data",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async findProvider() {
    let locationId
    const xlocationId =
      (this.selectedData?.locations?.length &&
        this.selectedData?.locations[0]?.id) ||
      "";
    if (xlocationId) {
      locationId = `locationId=${xlocationId}`;
    }
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/practice/${this.selectedData.id}?${locationId}`
      );
      this.selectedProvider = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching provider data",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async fetchProviderPractitioners() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/search/practitioners?hospital=${this.selectedProvider.id}`
      );
      this.providerPractitioners = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching practitioners for this organization",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  openAppointmentModal() {
    this.showAppointmentModal = true;
  }

  getSelectedInput(value: any, vType: any) {
    this.valueType = vType;
    this.selectedData = value;
    this.shownLocations = value.locations;
    this.search.specialty = value.name;
    this.search.location =
      value.locations.length > 0 && value.locations[0].name;
    this.fetchData();
  }

  getSearchQuery(values: any) {
    this.search = values;
  }

  getLoadingState(value: Boolean) {
    this.loading = value;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  get payload() {
    return {
      ...this.search,
    };
  }

  get queryString() {
    return Object.keys(this.payload)
      .map((filter) => {
        if (this.payload[filter] || Number.isInteger(this.payload[filter])) {
          return `${filter}=${this.payload[filter]}`;
        }
        return null;
      })
      .filter((item) => item)
      .join("&");
  }

  async fetchPractitioners() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/search/practitioners?${this.queryString}`
      );
      this.doctors = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching doctors",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async fetchHospitals() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/practice/search?${this.queryString}`
      );
      this.hospitals = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching hospitals",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async fetchData() {
    if (this.selectedTab === "doctors") {
      await this.fetchPractitioners();
    } else if (this.selectedTab === "hospitals") {
      await this.fetchHospitals();
    }
  }

  created() {
    this.fetchData();
  }
}
</script>

<style scoped>
img {
  filter: brightness(8.5);
}
.activetab {
  border-bottom: 3px solid #fe4d3c;
}
.activetab span {
  color: #14171f !important;
}
.activetab img {
  filter: brightness(1);
}

.text-grey-eth {
  color: #c2c7d6;
}
</style>
