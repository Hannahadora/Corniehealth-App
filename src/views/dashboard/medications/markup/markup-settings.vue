<template>
  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <template v-if="isRoot">
      <div class="grid grid-cols-12 mb-7">
        <div class="flex flex-col gap-4 mt-8 mr-20 col-span-6">
          <span class="font-bold text-sm text-jet_black"
            >Override all item based modifications</span
          >
          <div class="flex gap-4">
            <cornie-radio
              name="item-based"
              :value="'on'"
              v-model="itemBasedModification"
              checked
              label="Yes"
            />
            <cornie-radio
              name="item-based"
              :value="'off'"
              v-model="itemBasedModification"
              label="No"
            />
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-8 col-span-6">
          <span class="font-bold text-sm text-jet_black"
            >Override location based modifications</span
          >
          <div class="w-full">
            <!-- <cornie-radio
              name="location-based"
              :value="'on'"
              v-model="locationBasedModification"
              checked
              label="Yes"
            />
            <cornie-radio
              name="location-based"
              :value="'off'"
              v-model="locationBasedModification"
              label="No"
            /> -->
            <cornie-search-input
              :items="allLocation"
              :placeholder="'--Select--'"
              v-model="selectedLocation"
              @handleSelectedItems="handleSelectedItems"
            >
            </cornie-search-input>
          </div>
        </div>
      </div>
    </template>
    <div class="w-full mt-4 grid grid-cols-12 gap-2">
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Sample Unit Cost (NGN)"
          placeholder="--Autoloaded--"
          v-model="SUC"
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Markup (%)"
          placeholder="--Autoloaded--"
          v-model="PercentageMarkup"
        ></cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="CDM (NGN)"
          placeholder="--Autoloaded--"
          v-model="CDM"
          disabled
          :readonly="readonly"
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Margin (NGN)"
          placeholder="--Autoloaded--"
          v-model="margin"
          disabled
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Margin (%)"
          placeholder="--Autoloaded--"
          v-model="percentageMargin"
          disabled
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Maximum Allowable Discount (%)"
          v-model="MaxDiscount"
          placeholder="--Autoloaded--"
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Minimum Price (NGN)"
          placeholder="--Autoloaded--"
          v-model="minimumPrice"
          disabled
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Discounted Margin (NGN)"
          v-model="discountMargin"
          placeholder="--Autoloaded--"
          disabled
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Discounted Margin (%)"
          placeholder="--Autoloaded--"
          v-model="discountMarginPercentage"
          disabled
        >
        </cornie-input>
      </div>
    </div>
    <div class="flex flex-col gap-4 mt-3">
      <span class="font-bold text-sm text-jet_black"
        >Allow location admins to modify</span
      >
      <div class="flex gap-4">
        <cornie-radio
          name="confirm"
          :value="true"
          v-model="locationAdminsCanSetForLocations"
          checked
          label="Yes"
        />
        <cornie-radio
          name="confirm"
          :value="false"
          v-model="locationAdminsCanSetForLocations"
          label="No"
        />
      </div>
    </div>
    <div class="w-full">
      <span class="flex justify-end w-full mb-1">
        <cornie-btn
          class="text-primary border border-primary m-5 px-9 font-bold"
          @click="$emit('markup-canceled')"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="submit"
          class="bg-danger text-white m-5 px-9 font-bold"
        >
          Save
        </cornie-btn>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import RegistrationDialog from "../registration-dialog.vue";
import RegistrationChart from "../registration-chart.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import CheckInDialog from "../dialogs/checkin-dialog.vue";
import AdvancedFilter from "../dialogs/advanced-filter.vue";
import IMarkup from "@/types/IMarkup";

import AddFunction from "../add-function.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { AuthorizedLocation } from "@/types/ILocation";
import { IOrganization } from "@/types/IOrganization";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSearchInput from "@/components/autocomplete-multiple.vue";

const patients = namespace("patients");
const markup = namespace("markup");
const account = namespace("user");
const org = namespace("organization");

@Options({
  name: "MarkupSettings",
  components: {
    ...CornieCard,
    CornieSearchInput,
    CheckInDialog,
    CornieRadio,
    CheckinIcon,
    RegistrationChart,
    RegistrationDialog,
    TableAction,
    SettingsIcon,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    CornieCardTitle,
    CornieCardText,
    CornieBtn,
    CornieTable,
    AdvancedFilter,

    AddFunction,
    CornieInput,
  },
  emits: ["isRoot"],
})
export default class MarkupSettings extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  loading = false;
  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;
  locations = [];
  selectedLocation = {};
  selectedLocations = [] as any;

  get allLocation() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
        checked: false,
      };
    });
  }

  handleSelectedItems(items: any) {
    this.selectedLocation = items;
  }

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

  @account.State
  currentLocation!: string;

  @account.Getter
  cornieUser!: any;

  @account.Getter
  authorizedLocations!: AuthorizedLocation[];

  SUC = 1000;
  PercentageMarkup = 200;
  MaxDiscount = 10;

  locationBasedModification = "";
  itemBasedModification = "";

  @Watch("locationBasedModification")
  handle() {
    console.log(this.locationBasedModification);
  }

  get location() {
    return this.currentLocation;
  }

  get CDM() {
    return this.SUC * (this.PercentageMarkup / 100);
  }

  get margin() {
    return Math.abs(this.CDM - this.SUC);
  }
  get percentageMargin() {
    return (this.margin / this.CDM) * 100;
  }

  get minimumPrice() {
    return Math.abs(this.CDM * (1 - this.MaxDiscount));
  }
  get discountMargin() {
    return Math.abs(this.minimumPrice - this.SUC);
  }
  get discountMarginPercentage() {
    return Math.floor((this.discountMargin / this.minimumPrice) * 100);
  }

  checkIn(patient: IPatient) {
    this.checkInPatient = patient;
    this.checkingIn = true;
  }
  printPhone(patient: IPatient) {
    if (!patient.contactInfo) return "N/A";
    const phone = patient.contactInfo[0].phone;
    return phone?.number || "N/A";
  }

  printEmail(patient: IPatient) {
    if (!patient.contactInfo) return "N/A";
    return patient.contactInfo[0].email || "N/A";
  }
  printDOB(dateOfBirth?: string) {
    if (!dateOfBirth) return "N/A";
    const date = new Date(dateOfBirth);
    return date.toLocaleDateString("en-NG");
  }
  printMRN(mrn?: string) {
    return `XXXXX${mrn?.substr(31)}`;
  }

  locationAdminsCanSetForLocations = false;
  // locationAdminsCanSetForLocations = "";

  async submit() {
    this.loading = true;
    await this.submitMarkup();
    this.loading = false;
  }
  query = "";
  markupId = "";

  @markup.State
  markups!: IMarkup[];

  @markup.Action
  fetchMarkups!: () => Promise<void>;

  get isRoot() {
    let isRoot = Boolean(
      this.organizationInfo?.rootUserId === this.cornieUser?.id
    );
    this.$emit("isRoot", isRoot);
    return isRoot;
  }

  get items() {
    const markups = this.markups.map((markup) => {
      const markupId = markup.id;
      return {
        ...markup,
      };
    });
    if (!this.query) return markups;
    return search.searchObjectArray(markups, this.query);
  }

  // @Watch("markupId")
  // idChanged() {
  //   this.setServices();
  // }

  //  async setServices() {
  //   const markup = this.markups as any;
  //   if (!markup) return;
  //   this.SUC = markup.sampleUnitCost;
  //   this.PercentageMarkup = markup.markupPercentage;
  //   this.CDM  = markup.cdmPrice;
  //   this.margin = markup.margin;
  //   this.percentageMargin = markup.maxAllowedDiscount;
  //   this.minimumPrice = markup.minPrice;
  //   this.discountMargin = markup.discountedMargin;
  //   this.discountMarginPercentage = markup.discountedMarginPercentage;
  //   this.locationAdminsCanSetForLocations = markup.locationAdminsCanSetForLocations;

  // }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);

    this.locations = response[0].data;
  }

  async submitMarkup() {
    try {
      const { data } = await cornieClient().post(
        `/api/v1/markup-discount/createEditForOrganizationAdmin`,
        {
          sampleUnitCost: this.SUC,
          locationId: this.location,
          markupPercentage: this.PercentageMarkup,
          cdmPrice: this.CDM,
          margin: this.margin,
          marginPercentage: this.percentageMargin,
          maxAllowedDiscount: this.MaxDiscount,
          minPrice: this.minimumPrice,
          discountedMargin: this.discountMargin,
          discountedMarginPercentage: this.discountMarginPercentage,
          locationAdminsCanSetForLocations: true,
        }
      );

      window.notify({
        msg: "Markup updated successfully",
        status: "success",
      });
      this.$emit("markup-saved");

      this.$router.push(`/dashboard/provider/settings/markup`);
    } catch (error) {
      window.notify({
        msg: "There was an error when Submittin markup details",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchMarkups();
    await this.fetchLocation();

    if (!this.organizationInfo) await this.fetchOrgInfo();
  }
}
</script>
