<template>
  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <template v-if="isRoot">
      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="w-full" v-if="editing">
          <span class="font-bold text-sm text-jet_black"
            >Override all item based modifications</span
          >
          <div class="flex space-x-4 mt-1">
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
        <div v-if="editing">
          <span class="text-sm font-semibold mb-1">Override location based modifications</span>
          <Multiselect
            v-model="locationOverrides"
            mode="tags"
            :hide-selected="false"
            id="field-id"
            :options="allLocation"
            value-prop="code"
            trackBy="code"
            label="code"
            placeholder="--Select--"
            class="w-full"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div class="multiselect-tag is-user">
                {{ option.display }}
                <span
                  v-if="!disabled"
                  class="multiselect-tag-remove"
                  @mousedown.prevent="handleTagRemove(option, $event)"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
            <template v-slot:option="{ option }">
              <select-option @click="setDefault(option.code)" />
              <span class="w-full text-sm">{{ option.display }}</span>
            </template>
          </Multiselect>
        </div>
        <!-- <div class="flex flex-col gap-4 mt-8 col-span-6">
          <span class="font-bold text-sm text-jet_black"
            >Override location based modifications</span
          >
          <div class="w-full">
            <cornie-search-input
              :items="allLocation"
              :placeholder="'--Select--'"
              v-model="selectedLocation"
              @handleSelectedItems="handleSelectedItems"
            >
            </cornie-search-input>
          </div>
        </div> -->
      </div>
    </template>
    <div class="w-full  grid grid-cols-12 gap-2">
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Sample Unit Cost (NGN)"
          placeholder="--Autoloaded--"
          v-model="SUC"
          disabled
        >
        </cornie-input>
      </div>
      <div class="col-span-6">
        <cornie-input
          class="w-full mb-6"
          label="Markup (%)"
          placeholder="--Enter--"
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
          placeholder="--Enter--"
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
      <span class="font-bold text-sm text-jet_black">Allow location admins to modify 
        <tooltip-section :text="'An update in one location applies only to that location and will not impact on other locations settings.'">
          <template>
            <info-icon/>
          </template>
        </tooltip-section> 
      </span>
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
import search from "@/plugins/search";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";

import { AuthorizedLocation } from "@/types/ILocation";
import { IOrganization } from "@/types/IOrganization";
import { IPatient } from "@/types/IPatient";
import IMarkup from "@/types/IMarkup";

import Multiselect from "@vueform/multiselect";

import CornieCard from "@/components/cornie-card";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CornieInput from "@/components/cornieinput.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSearchInput from "@/components/autocomplete-multiple.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TooltipSection from "@/components/tooltip.vue";
import InfoIcon  from "@/components/icons/info.vue";


import RegistrationDialog from "../registration-dialog.vue";
import RegistrationChart from "../registration-chart.vue";
import CheckInDialog from "../dialogs/checkin-dialog.vue";
import AdvancedFilter from "../dialogs/advanced-filter.vue";
import AddFunction from "../add-function.vue";


const patients = namespace("patients");
const markup = namespace("markup");
const account = namespace("user");
const org = namespace("organization");

@Options({
  name: "MarkupSettings",
  components: {
    ...CornieCard,
    Multiselect,
    CornieSearchInput,
    CheckInDialog,
    CornieRadio,
    CheckinIcon,
    RegistrationChart,
    RegistrationDialog,
    TableAction,
    SettingsIcon,
    EditIcon,
    InfoIcon,
    SelectOption,
    NewviewIcon,
    CancelIcon,
    TooltipSection,
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

  @Prop({ type: String, default: false })
  markupId!: String;

  loading = false;
  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;
  locations = [];
  selectedLocation = {};
  selectedLocations = [] as any;
  locationOverrides = [];

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
    this.selectedLocations = items;
  }

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

  @account.Getter
  cornieUser!: any;

   @account.State
  authCurrentLocation!: string;

  @Prop({ default: "" })
  locationId!: string;

  @Prop({ type: Boolean, default: false })
  editing!: Boolean;

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
    return this.authCurrentLocation;
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

  markups = [] as any;

  async fetchMarkups() {
    if (this.isRoot) {
      const markups = await cornieClient().get("/api/v1/markup-discount");
      const response = await Promise.all([markups]);
      this.markups = response[0].data as any;

      this.MaxDiscount = this.markups[0]?.maxAllowedDiscount;
      this.PercentageMarkup = this.markups[0]?.markupPercentage;
    } else {
      if (!this.authCurrentLocation) return [];
      const markups = await cornieClient().get(
        `/api/v1/markup-discount/location/${this.authCurrentLocation}`
      );
      const response = await Promise.all([markups]);

      this.markups = response[0].data;

      this.MaxDiscount = this.markups[0]?.maxAllowedDiscount;
      this.PercentageMarkup = this.markups[0]?.markupPercentage;
    }
  }

  get isRoot() {
    let isRoot = Boolean(
      this.organizationInfo?.rootUserId === this.cornieUser?.id
    );
    this.$emit("isRoot", isRoot);
    return isRoot;
  }

  // get items() {
  //   const markups = this.markups.map((markup) => {
  //     const markupId = markup.id;
  //     return {
  //       ...markup,
  //     };
  //   });
  //   if (!this.query) return markups;
  //   return search.searchObjectArray(markups, this.query);
  // }

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

  async setDefault(id:string){
     try {
        const { data } = await cornieClient().post(
          `/api/v1/markup-discount/location/${id}`,
          {
            markupPercentage: this.PercentageMarkup,
            marginPercentage: this.percentageMargin,
            maxAllowedDiscount: this.MaxDiscount,
            locationId:
              this.locationId,
            locationOverrides: this.locationOverrides,
          }
        );
      
      window.notify({
        msg: "Markup updated successfully",
        status: "success",
      });
      this.$emit("markup-saved");

      this.$router.push(`/dashboard/provider/settings/markup`);
    } catch (error: any) {
      window.notify({
        msg: `Error: ${error.response.data.message}`,
        status: "error",
      });
    }
  }

  async submitMarkup() {
    try {
      if (this.authCurrentLocation) {
        const { data } = await cornieClient().post(
          `/api/v1/markup-discount/location/${this.authCurrentLocation}`,
          {
            markupPercentage: this.PercentageMarkup,
            marginPercentage: this.percentageMargin,
            maxAllowedDiscount: this.MaxDiscount,
            locationId:
              this.authCurrentLocation,
            locationOverrides: this.locationOverrides,
          }
        );
      } else {
        if (this.editing) {
          const { data } = await cornieClient().put(
            `/api/v1/markup-discount/${this.markupId}`,
            {
              id: this.markupId,
              markupPercentage: this.PercentageMarkup,
              marginPercentage: this.percentageMargin,
              maxAllowedDiscount: this.MaxDiscount,
              locationId:
                this.authCurrentLocation,
              locationOverrides: this.locationOverrides,
            }
          );
        } else {
          const { data } = await cornieClient().post(
            `/api/v1/markup-discount`,
            {
              markupPercentage: this.PercentageMarkup,
              marginPercentage: this.percentageMargin,
              maxAllowedDiscount: this.MaxDiscount,
              locationId:
                this.authCurrentLocation,
              locationOverrides: this.locationOverrides,
            }
          );
        }
      }

      window.notify({
        msg: "Markup updated successfully",
        status: "success",
      });
      this.$emit("markup-saved");

      this.$router.push(`/dashboard/provider/settings/markup`);
    } catch (error: any) {
      window.notify({
        msg: `Error: ${error.response.data.message}`,
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
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../assets/img/Chevron.png");
  mask-image: url("../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>
