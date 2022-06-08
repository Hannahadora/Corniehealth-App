<template>
  <cornie-dialog v-model="show" right class="w-1/3 h-full">
    <cornie-card height="100%" class="flex flex-col ">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Advanced filters
        </span>
      </cornie-card-title>

    <cornie-card-text class="flex-grow scrollable">

        <filter-box
          :items="locationOptions"
          class="mb-3"
          v-model="filters.location"
          title="Filter by Locations"
          :opened="true"
        />
        <filter-box
          class="mb-3"
          title="Filter by Gender"
          :opened="true"
          :searchable="false"
          v-model="filters.gender"
          :items="genderOptions"
        />
        <date-filter
          v-model:start="filters.dob.start"
          v-model:end="filters.dob.stop"
          class="mb-3"
          title="Filter D.O.B"
        />
        <filter-box
          class="mb-3"
          v-model="filters.accountType"
          :items="['Family', 'Corporate', 'Individual']"
          title="Profile Type"
        />
        <filter-box
          v-model="filters.payer"
          :items="payerOptions"
          class="mb-3"
          title="Filter by Payer"
        />
        <filter-box
          class="mb-3"
          :items="providerOptions"
          title="Filter by Provider"
          v-model="filters.provider"
        />
        <filter-box
          v-model="filters.specialty"
          class="mb-3"
          title="Filter by Specialty"
        />
    </cornie-card-text>

      <cornie-card class="px-4">
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-4 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            @click="filter"
            class="text-white bg-danger px-4 rounded-xl"
          >
            Apply
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import SearchInput from "@/components/search-input.vue";
import FilterBox from "./filter-boxes.vue";
import DateFilter from "./date-filter.vue";
import {
  Contact,
  Insurance,
  IPatient,
  Practitioner,
  Provider,
} from "@/types/IPatient";
import { dateBetween } from "@/plugins/utils";

@Options({
  name: "PatientAdvancedFilter",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieBtn,
    ChevronDownIcon,
    SearchInput,
    FilterBox,
    DateFilter,
  },
})
export default class AdvancedFilter extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Array, default: [] })
  patients!: IPatient[];

  @Prop({ type: Array, default: [] })
  filtered!: IPatient[];

  @PropSync("filtered")
  patientSync!: IPatient[];

  genderOptions = ["Male", "Female", "Other"];

  filters = {
    location: [],
    payer: [],
    provider: [],
    gender: [],
    dob: { start: "", stop: "" },
    accountType: [],
    specialty: [],
  };

  get locationOptions() {
    const locations = this.patients.flatMap((patient) =>
      this.getPatientAddresses(patient.contactInfo)
    );
    const locationSet = new Set(locations);
    return [...locationSet];
  }

  getPatientAddresses(contacts?: Contact[]) {
    if (!contacts) return [];
    return contacts.map((contact) => contact.city || "");
  }

  get payerOptions() {
    return this.patients.flatMap((patient) =>
      this.getPatientPayers(patient.insurances)
    );
  }

  getPatientPayers(payers?: Insurance[]) {
    if (!payers) return [];
    return payers.map((payer) => payer.payer);
  }

  get providerOptions() {
    return this.patients.flatMap((patient) =>
      this.getpatientProviders(
        patient.preferredLabs || [],
        patient.preferredPharmacies || []
      )
    );
  }

  getpatientProviders(...allProviders: Provider[][]) {
    const providers = allProviders.flatMap((all) => all);
    const providerNames = new Set<string>([]);
    providers.forEach((p) => providerNames.add(p.name));
    return [...providerNames];
  }

  get specialties() {
    return this.patients.flatMap((patient) => patient.generalPractitioners);
  }

  getPractitionerSpecialties(practitioners: Practitioner[]) {
    const specialtySet = new Set<string>();
    practitioners.forEach((p) => specialtySet.add(p.practice || ""));
    return [...specialtySet];
  }

  filter() {
    let patients = this.patients;
    patients = this.filterByArrayProp(
      patients,
      this.filters.location,
      "contactInfo",
      "city"
    );
    patients = this.filterByArrayProp(
      patients,
      this.filters.payer,
      "insurances",
      "payer"
    );
    patients = this.filterByArrayProp(
      patients,
      this.filters.provider,
      "preferredLabs",
      "name"
    );
    patients = this.filterByArrayProp(
      patients,
      this.filters.provider,
      "preferredPharmacies",
      "name"
    );
    patients = this.filterByArrayProp(
      patients,
      this.filters.specialty,
      "generalPractitioners",
      "practice"
    );
    patients = patients.filter((p) => {
      const genderSet = new Set<string>(
        this.filters.gender.map((g) => (g as string).toLowerCase())
      );
      return genderSet.has(p.gender?.toLowerCase() || "");
    });
    patients = patients.filter((p) =>
      this.filterDOB(this.filters.dob, p.dateOfBirth)
    );
    this.patientSync = patients;
  }

  filterDOB({ start, stop }: { start: string; stop: string }, date?: string) {
    if (!date) return false;
    return dateBetween(date, start, stop);
  }
  filterByArrayProp(
    patients: IPatient[],
    keys: string[],
    prop: string,
    propKey: string
  ) {
    if (!keys.length) return patients;
    const keySet = new Set(keys);
    return patients.filter((patient) =>
      this.filterProp(keySet, propKey, (patient as any)[prop])
    );
  }

  filterProp(keySet: Set<string>, propKey: string, data?: any[]) {
    if (!data) return false;
    for (let member of data) {
      const name = member[propKey] || "";
      if (keySet.has(name)) return true;
    }
    return false;
  }

  mounted() {
    this.patientSync = [...this.patients];
  }
}
</script>
