<template>
<div v-if="!hiderating">
    <div class="grid grid-cols-4 gap-1 w-full justify-center">
            <img src="../../../../assets/1.svg" alt="image">
            <img src="../../../../assets/2.svg" alt="image">
            <img src="../../../../assets/3.svg" alt="image">
            <div class="border border-gray-300 rounded-md w-60 h-52 cursor-pointer" @click="showUplaod">
                        <span class="text-xxl text-gray-300 top-40 right-65 font-normal relative">+</span>
            </div>
    </div>
</div>
   <rating-section :show-rating="shownew" :shownewupladmodal="true" v-else/>
   <uplaoder-modal v-model="showUplaodModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "./new-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { flatten, getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import Textarea from "@/components/textarea.vue";
import EditIcon from "@/components/icons/aedit.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import UplaoderModal from "./uploader.vue"
import RatingSection from "./rating.vue";
const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    CornieSelect,
    PhoneInput,
    OperationHours,
    Textarea,
    EditIcon,
    CalendarIcon,
    DateTimePicker,
    RatingSection,
    CornieTextArea,
    UplaoderModal,
  },
})
export default class AddLocationn extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @location.Action
  getLocationById!: (id: string) => Promise<ILocation>;

  loading = false;

  name = "";
  locationStatus = "";
  operationalStatus = "";
  description = "";
  alias = "";
  mode = "";
  type = "";
  phone = "";
  email = "";
  address = "";
  country = "";
  state = "";
  physicalType = "";
  latitude = "";
  longitude = "";
  altitude = "321";
  managingOrg = "";
  partOf = "";
  availabilityExceptions = "";
  careOptions = "";
  openTo = "";
  hoursOfOperation: HoursOfOperation[] = [];
showImage = false;
showUplaodModal= false;

  dropdowns = {} as IIndexableObject;

  required = string().required();
  requiredEmail = string().required().email();

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  get identifier() {
    return this.id || "System generated";
  }
  @Watch("id")
  idChanged() {
    this.setLocation();
  }
  hiderating= false;
shownew(){
    this.hiderating = true;
}
  get coordinatesCB() {
    const address = `${this.address}, ${this.state} ${this.country}`;
    return () => getCoordinates(address);
  }

  @Watch("coordinatesCB")
  async coordinatesFetched(cb: () => Promise<any>) {
    const data = await cb();
    this.longitude = String(data.longitude);
    this.latitude = String(data.latitude);
  }

  states = [] as any;
  countries = countries;

  @Watch("country")
  async countryPicked(country: string) {
    const states = await getStates(country);
    this.states = states;
  }
showImageSection(){
  this.showImage = true;
}
showUplaod(){
    this.showUplaodModal  = true;
}
  async setLocation() {
    const location = await this.getLocationById(this.id);
    if (!location) return;
    this.name = location.name;
    this.locationStatus = location.locationStatus;
    this.operationalStatus = location.operationalStatus;
    this.description = location.description;
    this.alias = location.alias;
    this.mode = location.mode;

    this.type = location.type;
    this.phone = location.phone;
    this.email = location.email;
    this.address = location.address;
    this.country = location.country;
    this.state = location.state;
    this.physicalType = location.physicalType;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.altitude = location.altitude;
    this.managingOrg = location.managingOrg;
    this.partOf = location.partOf;
    this.availabilityExceptions = location.availabilityExceptions;
    this.careOptions = location.careOptions;
    this.openTo = location.openTo;
    this.hoursOfOperation = location.hoursOfOperation;
  }
  get payload() {
    return {
      name: this.name,
      locationStatus: this.locationStatus,
      operationalStatus: this.operationalStatus,
      description: this.description,
      alias: this.alias,
      mode: this.mode,

      type: this.type,
      phone: this.phone,
      email: this.email,
      address: this.address,
      country: this.country,
      state: this.state,
      physicalType: this.physicalType,
      latitude: this.latitude,
      longitude: this.longitude,
      altitude: this.altitude,
      managingOrg: this.managingOrg,
      partOf: this.partOf,
      availabilityExceptions: this.availabilityExceptions,
      careOptions: this.careOptions,
      openTo: this.openTo,
      hoursOfOperation: this.hoursOfOperation,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateLocation();
    else await this.createLocation();
    this.loading = false;
  }

  async createLocation() {
    try {
      const response = await cornieClient().post(
        "/api/v1/location",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Location Created", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Location not Created", status: "error" });
    }
  }

  async updateLocation() {
    const url = `/api/v1/location/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Location Updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Location not Updated", status: "error" });
    }
  }

  async created() {
    this.setLocation();
    const data = await this.getDropdowns("location");
    this.dropdowns = data;
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
.right-65{  
       left: 4.5rem;
    font-size: 150px;
}
.top-40 {
    top: -2rem;
}
</style>
