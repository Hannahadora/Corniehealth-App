<template>
  <div class="w-full grid grid-cols-2 gap-3">
   
    <cornie-input
      :rules="requiredString"
      v-model="firstName"
      required
      class="w-full"
      placeholder="--Enter--"
      label="First Name"
    />
    <cornie-input
      v-model="lastName"
      :rules="requiredString"
      class="w-full"
      placeholder="--Enter--"
      required
      label="Last Name"
    />
    <cornie-phone-input
      label="Phone Number"
      class="w-full mb-4"
      placeholder="--Enter--"
      v-model:code="dialCode"
      v-model="phone"
      :rules="phoneRule"
      :requiredText="true"
    />
    <cornie-input
      v-model="email"
      :rules="emailRule"
      class="w-full"
      placeholder="--Enter--"
      required
      label="Email Address"
    />
    <cornie-select
      v-if="account === 'patient'"
      v-model="subType"
      :items="['Private', 'Employer']"
      class="w-full col-span-2"
      placeholder="--Select--"
      label="Patient Profile"
      required
    />
    <cornie-select
      v-if="account === 'provider'"
      v-model="subType"
      :items="[
        'Hospital/Clinic',
        'Solo Practice',
        'Community Pharmacy',
        'Diagnostics Center',
      ]"
      class="w-full col-span-2"
      placeholder="--Select--"
      label="Provider Profile"
    />
  </div>
  <label for="terms" class="mt-1 flex items-center">
    <input id="terms" type="checkbox" v-model="checkRequire" required />
    <span class="ml-3 text-xs">
      I agree to CornieHealth’s
      <a href="javascript:void(0)" class="text-danger"> Terms of service</a> and
      <a href="javascript:void(0)" class="text-danger"> Privacy policy</a>
    </span>
  </label>
  <div class="my-10">
    <cornie-btn
      class="font-semibold w-full p-2"
      @click="next()"
      :loading="loading"
      :class="[
        checkRequire == true && firstName !== ''
          ? 'bg-danger text-white'
          : 'text-gray-400 bg-gray-200',
      ]"
      :disabled="checkRequire != true && firstName == ''"
    >
      Submit
    </cornie-btn>
  </div>
</template>

<script>
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import { string } from "yup";
import { ref, emit, reactive, toRefs } from "vue";
import DomainInput from "@/components/domain-input.vue";

export default {
  name: "step two",
  components: {
    CornieInput,
    CornieSelect,
    CornieRadio,
    CorniePhoneInput,
    DomainInput,
  },
  props: ["loading", "account"],

  setup(props, context) {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const phone = ref("");
    const dialCode = ref("+234");
    const practiceName = ref("");
    const domainName = ref("");
    const organisationName = ref("");
    const PatientType = ref("");
    const practiceType = toRefs(props).account;
    const subType = ref("");
    const checkRequire = ref(false);
    const next = () => {
      context.emit("next", {
        firstName,
        lastName,
        email,
        practiceName,
        domainName,
        organisationName,
        phone,
        dialCode,
        PatientType,
        practiceType,
        subType,
      });
    };
    const phoneRegex =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const required = string().required();
    const requiredString = string().required().trim();
    const phoneRule = string().matches(
      phoneRegex,
      "A valid phone number is required"
    );
    const emailRule = string().email("A valid email is required").required();
    return {
      firstName,
      lastName,
      email,
      practiceName,
      domainName,
      organisationName,
      phone,
      dialCode,
      required,
      requiredString,
      phoneRule,
      PatientType,
      subType,
      // practiceType,
      emailRule,
      next,
      checkRequire,
    };
  },
};
</script>

<style></style>
select
