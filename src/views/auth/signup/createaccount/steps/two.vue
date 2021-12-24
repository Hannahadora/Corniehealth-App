<template>
  <div class="w-10/12 mx-auto">
    <h1 class="text-primary font-bold text-4xl mb-8">Create an account</h1>
    <div class="bg-light_gray p-4 text-jet_black my-4 mb-12">
      You must be 18 or older to create a CornieCare Patient Online account.
      Parents must create dependent accounts for patients under 18.
    </div>

    <div class="w-full mt-4 grid grid-cols-1 gap-6">
      <cornie-select
        v-model="PatientType"
        required
        class="w-full mb-3"
        placeholder="--Select--"
        label="Patient Type"
      />
    </div>

    <div class="w-full mt-4 grid grid-cols-2 gap-6">
      <cornie-input
        :rules="requiredString"
        v-model="firstName"
        required
        class="w-full mb-3"
        placeholder="--Enter--"
        label="First Name"
      />
      <cornie-input
        v-model="lastName"
        :rules="requiredString"
        class="w-full mb-3"
        placeholder="--Enter--"
        label="Last Name"
      />
      <phone-input
        v-model:code="dialCode"
        v-model="phone"
        :rules="phoneRule"
        class="w-full mb-4"
        label="Phone number"
      />
      <cornie-input
        v-model="email"
        :rules="emailRule"
        class="w-full mb-3"
        placeholder="--Enter--"
        label="Email Address"
      />

            <cornie-input
        :rules="requiredString"
        v-model="practiceName"
        required
        class="w-full mb-3"
        placeholder="--Enter--"
        label="Practice Name"
      />
      <cornie-input
        v-model="domainName"
        :rules="requiredString"
        class="w-full mb-3"
        placeholder="--Enter--"
        label="Domain Name"
      />
    </div>

    <label for="terms" class="mt-1 mb-2 flex items-center">
      <input id="terms" type="checkbox" required />
      <span class="ml-1 text-xs">
        I agree to CornieHealth’s
        <a href="#" class="text-danger"> Terms of service</a> and
        <a href="#" class="text-danger"> Privacy policy</a>
      </span>
    </label>
    <cornie-btn
      class="font-semibold rounded-full bg-gray-500 mt-3 w-full text-white p-2"
      @click="next()"
      :loading="loading"
    >
      Continue
    </cornie-btn>
  </div>
</template>

<script>
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import PhoneInput from "@/components/phone-input.vue";
import { string } from "yup";
import {ref, emit} from 'vue'

export default {
  name: "step two",
  components: { CornieInput, CornieSelect, CornieRadio, PhoneInput },
  props:["loading", ""],

  setup(props, context) {
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const practiceName = ref('')
      const domainName = ref('')

      const next = ()=>{
          
          context.emit('next', 
          {
              firstName, lastName, email,
              practiceName, domainName
          }
          )
      }
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
      firstName, lastName, email,practiceName,domainName,
      required, requiredString, phoneRule,
      emailRule, next
    };
  },
};
</script>

<style></style>
select