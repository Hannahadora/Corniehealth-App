<template>
  <span
    class="flex flex-col w-full justify-center border-b border-grays font-bold mb-5 text-xl text-primary m-2 pb-2"
  >
    Markup & Discount Settings
  </span>

  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full overflow-auto"
  >
    <div class="w-full mt-4 grid grid-cols-3 gap-5">
      <cornie-input
        class="w-full mb-6"
        label="Sample Unit Cost (NGN)"
        placeholder="--Autoloaded--"
        v-model="SUC"
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Percentage Markup (%)"
        placeholder="--Autoloaded--"
        v-model="PercentageMarkup"
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Maximum Allowable Discount (%)"
        v-model="MaxDiscount"
        placeholder="--Autoloaded--"
        disabled
      >
      </cornie-input>

      <cornie-input
        class="w-full mb-6"
        label="Recommended Sales Price (NGN)"
        placeholder="--Autoloaded--"
        v-model="CDM"
        disabled
        :readonly="readonly"
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Margin (NGN)"
        placeholder="--Autoloaded--"
        v-model="margin"
        disabled
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Margin (%)"
        placeholder="--Autoloaded--"
        v-model="percentageMargin"
        disabled
      >
      </cornie-input>

      <cornie-input
        class="w-full mb-6"
        label="Discounted Sales Price (NGN)"
        placeholder="--Autoloaded--"
        v-model="minimumPrice"
        disabled
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Discounted Margin (NGN)"
        v-model="discountMargin"
        placeholder="--Autoloaded--"
        disabled
      >
      </cornie-input>
      <cornie-input
        class="w-full mb-6"
        label="Discounted Margin (%)"
        placeholder="--Autoloaded--"
        v-model="discountMarginPercentage"
        disabled
      >
      </cornie-input>
    </div>
    <div class="w-full">
      <span class="flex justify-end w-full mb-1">
        <cornie-btn
          class="text-primary border border-primary m-5 px-9 font-bold"
          @click="$router.push(`/dashboard/provider/settings/markup`)"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="submitMarkup"
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

import AddFunction from "../add-function.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";

const patients = namespace("patients");

@Options({
  name: "MarkupSettings",
  components: {
    ...CornieCard,
    CheckInDialog,
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
})
export default class MarkupSettings extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  deletePatient!: (id: string) => Promise<boolean>;

  filterAdvanced = false;
  filteredPatients: IPatient[] = [];
  checkInPatient!: IPatient;
  checkingIn = false;
  registerNew = false;

  SUC = 1000;
  PercentageMarkup = 200;
  MaxDiscount = 10 / 100;

  get CDM() {
    return this.SUC * (this.PercentageMarkup / 100);
  }

  get margin() {
    return this.CDM - this.SUC;
  }
  get percentageMargin() {
    return (this.margin / this.CDM) * 100;
  }

  get minimumPrice() {
    return this.CDM * (1 - this.MaxDiscount);
  }
  get discountMargin() {
    return this.minimumPrice - this.SUC;
  }
  get discountMarginPercentage() {
    return Math.floor((this.discountMargin / this.minimumPrice) * 100);
  }

  headers = [
    {
      title: "MARKUP (%)",
      key: "markup",
      show: true,
    },
    {
      title: "MARGIN (NGN)",
      key: "margin",
      show: true,
    },
    {
      title: "MARGIN (%)",
      key: "marginPercent",
      show: true,
    },
    {
      title: "MAX. DISCOUNT (%)",
      key: "maxDiscount",
      show: true,
    },
    {
      title: "DISCOUNTED MARGIN (NGN)",
      key: "discountMargin",
      show: true,
    },
    {
      title: "DISCOUNTED MARGIN (%)",
      key: "discountMarginPercent",
      show: true,
    },
  ];

  get items() {
    const patients = this.filteredPatients;
    return patients.map((patient) => ({
      name: `${patient.firstname} ${patient.lastname}`,
      dob: this.printDOB(patient.dateOfBirth),
      email: this.printEmail(patient),
      phone: this.printPhone(patient),
      mrn: this.printMRN(patient.mrn),
      gender: patient.gender,
      photo: patient.profilePhoto,
      id: patient.id,
    }));
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

  async submitMarkup() {
    try {
      const { data } = await cornieClient().post(
        `/api/v1/markup-discount/createEditForOrganizationAdmin`,
        {
          sampleUnitCost: this.SUC,
          markupPercentage: this.PercentageMarkup,
          locationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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

      this.$router.push(`/dashboard/provider/settings/markup`);
    } catch (error) {
      window.notify({
        msg: "There was an error when Submittin markup details",
        status: "error",
      });
    }
  }

  async removePatient(id: string) {
    const confirmed = await window.confirmAction({
      message: `Are you sure you want to delete this patient?
       Removing patient from your register means patient
      will no longer be associated with this provider`,
      title: "Remove Patient",
    });
    if (!confirmed) return;
    const deleted = await this.deletePatient(id);
    if (deleted) window.notify({ msg: "Patient deleted", status: "success" });
    else window.notify({ msg: "Patient not deleted", status: "error" });
  }
}
</script>
