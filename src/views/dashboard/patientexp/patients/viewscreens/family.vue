<template>
  <div>
    <div class="mt-5 -mb-5 w-full">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>

    <div class="mt-5 mb-5 pb-2 w-ful border-b-2 border-gray-200">
      <span class="font-bold">Family</span>
    </div>

    <div class="mt-16 mb-16" v-if="properties">
      <span class="flex justify-end w-full mb-8">
        <button
          @click="showHistoryModal = true"
          class="bg-danger rounded-lg text-white mt-5 py-3 px-10 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          Add Dependant
        </button>
      </span>
      <cornie-table
        v-model="items"
        :columns="headers"
        @filter="filterAdvanced = true"
        @refresh="fetchPatients"
        :menushow="true"
      >
        <!-- <template #name="{ item }">
          <div class="flex items-center">
            <span class="text-xs ml-2 font-semibold">{{ item?.firstname +' '+ item?.lastname }}</span>
            <span>{{ item.accountType }}</span>
          </div>
        </template> -->
      </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
  import { countryCodes } from "@/plugins/countrycodes";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  import AccordionComponent from "@/components/accordion-component-care-team.vue";
  import Avatar from "@/components/avatar.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import CalendareIcon from "@/components/icons/calendar.vue";

  import { cornieClient } from "@/plugins/http";
  import { IPatient } from "@/types/IPatient";
  import { namespace } from "vuex-class";
  import ScreenHeader from "./Header.vue";
  import LocationIcon from "./icons/location.vue";
  import MailIcon from "./icons/mail.vue";
  import OrgIcon from "./icons/org.vue";
  import RelationshipIcon from "./icons/relationship.vue";

  const patients = namespace("patients");

  @Options({
    name: "familyInfo",
    components: {
      ScreenHeader,
      CalendareIcon,
      AccordionComponent,
      RelationshipIcon,
      LocationIcon,
      MailIcon,
      OrgIcon,
      Avatar,
      CornieTable,
    },
  })
  export default class familyInfo extends Vue {
    @Prop({ default: {} })
    properties!: any;

    headers = [
      {
        title: "date added",
        key: "date",
        show: true,
      },
      {
        title: "Name",
        key: "name",
        show: true,
      },
      {
        title: "mrn no",
        key: "mrn",
        show: true,
      },
      {
        title: "GENDER",
        key: "gender",
        show: true,
      },
      {
        title: "date of birth",
        key: "dob",
        show: false,
      },
      {
        title: "marital status",
        key: "maritalStatus",
        show: false,
      },
      {
        title: "EMAIL",
        key: "email",
        show: true,
      },
      {
        title: "PHONE NUMBER",
        key: "phone",
        show: true,
      },
      {
        title: "Status",
        key: "status",
        show: false,
      },
    ];

    @patients.Action
    fetchPatients!: () => Promise<void>;

    @patients.State
    patients!: IPatient[];

    familyHistories: any = [];

    get patient() {
      return this.patients.find((p) => p.id === this.$route.params.id);
    }

    get items() {
      return this.patient?.relatedPerson
        ? this.patient?.relatedPerson.map((patient: any) => ({
            date: new Date(patient.createdAt).toLocaleDateString(),
            gender: patient?.gender,
            mrn: patient.mrn,
            name: patient.firstname + " " + patient.lastname,
            email: this.getEmail(patient.contactInfo).toString(),
            phone: this.getPhone(patient.contactInfo).toString(),
          }))
        : [];
    }

    getEmail(value: any) {
      return value.map((one: any) => one.email);
    }
    getPhone(value: any) {
      return value.map(
        (one: any) => one.phone?.dialCode + "" + one.phone?.number
      );
    }

    async fetchFamilyHistories() {
      const url = `/api/v1/family-history/get-for-patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.familyHistories = response.data;
      }
    }

    get codes() {
      return countryCodes
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .map((country) => ({
          ...country,
          display: country.dialCode,
          code: country.dialCode,
          flag: `https://flagcdn.com/60x45/${country.isoCode.toLowerCase()}.png`,
        }));
    }

    get flag() {
      if (!this.codes.length && this.properties.nationality === "") return "";
      return this.codes.find(
        (country: any) =>
          country.name?.toLowerCase() ===
          this.properties.nationality?.toLowerCase()
      )?.flag;
    }

    async mounted() {
      await this.fetchFamilyHistories();
      await this.fetchPatients();

      console.log("family", this.familyHistories);
    }
  }
</script>
