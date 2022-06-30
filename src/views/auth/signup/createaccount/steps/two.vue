<template>
  <!-- <div class="grid grid-cols-1 w-full" v-if="account == 'Patient'">
    <cornie-select
      v-model="PatientType"
      :items="['Private', 'Employer']"
      class="w-full"
      placeholder="--Select--"
      label="Patient Type"
    />
  </div> -->
  <div class="w-full grid grid-cols-2 gap-3">
    <!-- <cornie-select
      v-if="account !== 'Patient'"
      v-model="practiceType"
      :items="[
        'Hospital/Clinic',
        'Solo Practice',
        'Community Pharmacy',
        'Diagnostics Services',
      ]"
      class="w-full"
      placeholder="--Select--"
      label="Practice Type"
    /> -->
    <!-- <div v-if="practiceType == 'Hospital/Clinic'">
      <cornie-select
        v-if="account !== 'Patient' || practiceType == 'Hospital/Clinic'"
        v-model="subType"
        :items="['Primary Care', 'Specialist (ophthalmology)','Specialist (ENT)','Specialist (Dentistry)','Specialist (Others)','Community','Rural','Retail']"
        class="w-full"
        placeholder="--Select--"
        label="Select your practice sub-type      "
      />
    </div> -->
    <!-- <div v-if="practiceType == 'Solo Practice'">
      <cornie-select
        v-if="account !== 'Patient'"
        v-model="subType"
        :items="['Family Practice', 'General Practice','Pediatrics','Sexual & Reproductive','ObGyn','Dermatology','Ophthalmology','Mental Health','Occupational Therapist','Physical Therapist','Speech-Language Pathologists','Applied Behavior Analysts']"
        class="w-full"
        placeholder="--Select--"
        label="Select your practice sub-type"
      />
    </div> -->
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
    <phone-input
      v-model:code="dialCode"
      v-model="phone"
      :rules="phoneRule"
      class="w-full"
      required
      label="Phone number"
    />
    <cornie-input
      v-model="email"
      :rules="emailRule"
      class="w-full"
      placeholder="--Enter--"
      required
      label="Email Address"
    />
    <!-- 
    <cornie-input
      v-if="account === 'Provider'"
      :rules="requiredString"
      v-model="practiceName"
      required
      class="w-full"
      placeholder="--Enter--"
      label="Practice Name"
    /> -->
    <!-- <cornie-input
      v-if="account === 'Payer'"
      :rules="requiredString"
      v-model="organisationName"
      required
      class="w-full"
      placeholder="--Enter--"
      label="Organisation Name"
    /> -->
    <!-- <cornie-input
       v-if="account !== 'Patient'"
        v-model="domainName"
        :rules="requiredString"
        class="w-full"
        placeholder="--Enter--"
        label="Domain Name"
      /> -->
    <!-- <domain-input
      v-if="account !== 'Patient'"
      label="Domain Name"
      placeholder="--Enter--"
      v-model="domainName"
      v-on:input="checkDomain"
    /> -->
    <cornie-select
      v-if="account === 'Patient'"
      v-model="subType"
      :items="['Private', 'Employer']"
      class="w-full col-span-2"
      placeholder="--Select--"
      label="Patient Profile"
      required
    />
    <cornie-select
      v-if="account === 'Provider'"
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
import PhoneInput from "@/components/phone-input.vue";
import { string } from "yup";
import { ref, emit, reactive, toRefs } from "vue";
import DomainInput from "@/components/domain-input.vue";

export default {
  name: "step two",
  components: {
    CornieInput,
    CornieSelect,
    CornieRadio,
    PhoneInput,
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
