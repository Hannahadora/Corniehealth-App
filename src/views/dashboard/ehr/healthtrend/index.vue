<template>
  <main>
      <div class="mb-5 p-3 border-l-none -mt-6 w-full ">
        <span
            class="
            flex
            border-b-2
            w-full
            font-bold
            text-xl text-primary
            py-2
            mb-5
            mx-auto
            "
        >
        Health Trend
        </span>
        <div class="w-full h-full">
            <div class="w-full grid grid-cols-2 gap-4">
              <!-- <registration-chart class="w-full" /> -->
                <blood-chart class="w-full h-full"/>
                <blood-chart title="Weight"/>
            </div>
            <div class="w-full grid grid-cols-3 gap-4">
                <blood-chart/>
                    <blood-chart/>
                    <blood-chart/>
            </div>
        </div>
      </div>
  </main>
</template>

<script>
import { cornieClient } from "@/plugins/http";
import Avatar from "@/components/avatar.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import PhoneInput from "@/components/phone-input.vue";
import { reactive } from "@vue/reactivity";
import { string } from "yup";
import AvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import { mapActions, mapState } from "vuex";
import BloodChart from "./bloodChart.vue";

import RegistrationChart from "./registration-chart.vue";
import ChartCard from "./chart-card.vue";
import AppointmentChart from "./appointment-chart.vue";
import VisitsChart from "./visits-chart.vue";
import BillingsChart from "./billings-chart.vue";
import MedicationChart from "./medication-chart.vue";
import ReferralChart from "./referral-chart.vue";
// import ResourceChart from "./resource-chart.vue";
import MessagesChart from "./messages-chart.vue";
import InpatientChart from "./inpatient-chart.vue";
import QuestionnaireChart from "./questionnaire-chart.vue";

export default {
  name: "HealthIndex",
  components: {
    Avatar,
    CornieInput,
    CornieSelect,
    PhoneInput,
    AvatarField,
    BloodChart,

    RegistrationChart
  },
  setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  },
  data() {
    return {
      OrganizationName: "",
      image: "",
    };
  },
  computed: {
    ...mapState("organization", {
      organizationInfo: (state) => state.organizationInfo,
    }),
    payload() {
      return {
        name: this.OrganizationName,
      };
    },
  },
  async created() {
   
  },
  methods: {
    
  },
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
