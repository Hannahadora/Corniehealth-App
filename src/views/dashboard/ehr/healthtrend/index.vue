<template>
  <main>
      <div class="mb-5  w-full ">
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
                <blood-chart/>
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

export default {
  name: "HealthIndex",
  components: {
    Avatar,
    CornieInput,
    CornieSelect,
    PhoneInput,
    AvatarField,
    BloodChart
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
