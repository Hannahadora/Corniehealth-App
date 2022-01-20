<template>
  <div class="w-full bg-white shadow p-5 rounded">
    <span class="text-sm text-black font-bold"> Patient Information </span>
    <div class="flex mt-3">
      <avatar class="mr-2 h-12 w-12" v-bind:src="PatientName.profilePhoto" />
    </div>
    <div class="grid grid-cols-2 gap-1 mt-5">
      <span class="flex space-x-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.33333 10.8889C2.33333 9.33333 5.44444 8.47778 7 8.47778C8.55556 8.47778 11.6667 9.33333 11.6667 10.8889V11.6667H2.33333V10.8889ZM9.33333 4.66667C9.33333 5.28551 9.0875 5.879 8.64992 6.31658C8.21233 6.75417 7.61884 7 7 7C6.38116 7 5.78767 6.75417 5.35008 6.31658C4.9125 5.879 4.66667 5.28551 4.66667 4.66667C4.66667 4.04783 4.9125 3.45434 5.35008 3.01675C5.78767 2.57917 6.38116 2.33333 7 2.33333C7.61884 2.33333 8.21233 2.57917 8.64992 3.01675C9.0875 3.45434 9.33333 4.04783 9.33333 4.66667ZM0 1.55556V12.4444C0 12.857 0.163888 13.2527 0.455612 13.5444C0.747335 13.8361 1.143 14 1.55556 14H12.4444C12.857 14 13.2527 13.8361 13.5444 13.5444C13.8361 13.2527 14 12.857 14 12.4444V1.55556C14 1.143 13.8361 0.747335 13.5444 0.455612C13.2527 0.163888 12.857 0 12.4444 0H1.55556C1.143 0 0.747335 0.163888 0.455612 0.455612C0.163888 0.747335 0 1.143 0 1.55556Z"
            fill="#080056"
          />
        </svg>
        <span class="text-black text-sm">
          {{ PatientName.firstname + " " + PatientName.lastname }}
        </span>
      </span>
      <span class="flex space-x-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.25H9.75V2C9.75 1.175 9.075 0.5 8.25 0.5H6.75C5.925 0.5 5.25 1.175 5.25 2V4.25H1.5C0.675 4.25 0 4.925 0 5.75V14C0 14.825 0.675 15.5 1.5 15.5H13.5C14.325 15.5 15 14.825 15 14V5.75C15 4.925 14.325 4.25 13.5 4.25ZM5.25 8C5.8725 8 6.375 8.5025 6.375 9.125C6.375 9.7475 5.8725 10.25 5.25 10.25C4.6275 10.25 4.125 9.7475 4.125 9.125C4.125 8.5025 4.6275 8 5.25 8ZM7.5 12.5H3V11.9375C3 11.1875 4.5 10.8125 5.25 10.8125C6 10.8125 7.5 11.1875 7.5 11.9375V12.5ZM8.25 5.75H6.75V2H8.25V5.75ZM12 11.375H9V10.25H12V11.375ZM12 9.125H9V8H12V9.125Z"
            fill="#080056"
          />
        </svg>
        <span class="text-gray-500 font-light text-sm">
          {{ PatientName.mrn }}
        </span>
      </span>
      <span class="flex space-x-2 mt-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H14C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V4Z"
            fill="white"
          />
          <path
            d="M15.3 5.4C15.804 5.4 16.2 5.787 16.2 6.3C16.2 6.53869 16.1052 6.76761 15.9364 6.9364C15.7676 7.10518 15.5387 7.2 15.3 7.2C14.787 7.2 14.4 6.795 14.4 6.3C14.4 5.787 14.787 5.4 15.3 5.4ZM0 0V8.1C0 10.764 1.971 13.05 4.626 13.419C5.184 16.128 7.578 18 10.35 18C11.1182 18 11.8789 17.8487 12.5887 17.5547C13.2985 17.2607 13.9434 16.8298 14.4866 16.2866C15.0298 15.7434 15.4607 15.0985 15.7547 14.3887C16.0487 13.6789 16.2 12.9182 16.2 12.15V8.829C17.244 8.451 18 7.461 18 6.3C18 5.58392 17.7155 4.89716 17.2092 4.39081C16.7028 3.88446 16.0161 3.6 15.3 3.6C14.5839 3.6 13.8972 3.88446 13.3908 4.39081C12.8845 4.89716 12.6 5.58392 12.6 6.3C12.6 7.461 13.356 8.46 14.4 8.829V12.069C14.4 14.319 12.6 16.119 10.35 16.119C8.55 16.119 7.038 15.03 6.498 13.41C9 12.87 10.8 10.62 10.8 8.1V0H7.2V2.7H9V8.1C9 9.05478 8.62072 9.97045 7.94558 10.6456C7.27045 11.3207 6.35478 11.7 5.4 11.7C4.44522 11.7 3.52955 11.3207 2.85442 10.6456C2.17928 9.97045 1.8 9.05478 1.8 8.1V2.7H3.6V0H0Z"
            fill="#080056"
          />
        </svg>

        <span class="text-gray-500 font-light text-sm"> Dr. Obi Nduka </span>
      </span>
      <span class="flex space-x-2 mt-2">
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H14.5C16.7091 0 18.5 1.79086 18.5 4V14C18.5 16.2091 16.7091 18 14.5 18H4.5C2.29086 18 0.5 16.2091 0.5 14V4Z"
            fill="white"
          />
          <path
            d="M5.465 8.0925C6.545 10.215 8.285 11.9475 10.4075 13.035L12.0575 11.385C12.26 11.1825 12.56 11.115 12.8225 11.205C13.6625 11.4825 14.57 11.6325 15.5 11.6325C15.9125 11.6325 16.25 11.97 16.25 12.3825V15C16.25 15.4125 15.9125 15.75 15.5 15.75C8.4575 15.75 2.75 10.0425 2.75 3C2.75 2.5875 3.0875 2.25 3.5 2.25H6.125C6.5375 2.25 6.875 2.5875 6.875 3C6.875 3.9375 7.025 4.8375 7.3025 5.6775C7.385 5.94 7.325 6.2325 7.115 6.4425L5.465 8.0925Z"
            fill="#080056"
          />
        </svg>

        <span class="text-gray-500 font-light text-sm">
          {{
            PatientName.contactInfo[0].phone.dialCode +
            " " +
            PatientName.contactInfo[0].phone.number
          }}
        </span>
      </span>
      <span class="flex space-x-2 mt-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H14C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V4Z"
            fill="white"
          />
          <path
            d="M15 3H3C2.175 3 1.5075 3.675 1.5075 4.5L1.5 13.5C1.5 14.325 2.175 15 3 15H15C15.825 15 16.5 14.325 16.5 13.5V4.5C16.5 3.675 15.825 3 15 3ZM15 6L9 9.75L3 6V4.5L9 8.25L15 4.5V6Z"
            fill="#080056"
          />
        </svg>

        <span class="text-gray-500 font-light text-sm">
          {{ PatientName.contactInfo[0].email }}
        </span>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";
import ChevronDownIcon from "@/components/icons/dialogchevrondown.vue";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import Avatar from "@/components/avatar.vue";
import IPractitioner from "@/types/IPractitioner";

const patients = namespace("patients");
const practitioner = namespace("practitioner");

@Options({
  name: "PatientCard",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    Avatar,
  },
})
export default class AccordionComponent extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  practitionerId!: string;

  @patients.State
  patients!: IPatient[];

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @Prop({ type: Boolean, default: false })
  first!: boolean;

  expand = false;

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  @Watch("opened")
  toggled() {
    this.expand = this.opened;
  }

  @Prop({ type: String, default: "" })
  titledescription!: string;

  get patientId() {
    return this.$route.params.id;
  }
  get PatientName() {
    var id = this.$route.params.id;
    const pt = this.patients.find((i: any) => i.id === id);
    return {
      ...pt,
    };
  }

  get PractitionerInfo() {
    const id = this.practitionerId;
    const pt = this.practitioners.find(
      (practitioner) => practitioner.id === id
    );
    return {
      ...practitioner,
    };
  }

  mounted() {
    this.expand = this.opened;
  }
  created() {
    this.fetchPractitioners();
  }
}
</script>
