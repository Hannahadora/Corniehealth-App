<template>
  <div class="border-t border-b border-gray-300">
    <div class="flex mt-10 mb-6 items-center">
      <ToogleCheck
        v-model="twoFA"
        class="mx-4"
        checkedText="Enabled"
        uncheckedText="Disabled"
      />
    </div>
    <div class="flex items-center">
      <list-boxes types="checkbox" class="mt-2" />
      <span class="ml-2"
        >Enforce security questions during sign in for all users within your
        domain.</span
      >
      <div class="cursor-pointer ml-2 my-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
            fill="#080056"
          />
        </svg>
      </div>
    </div>
    <div class="my-10">
      <div class="border-t-2 border-dashed">
        <h2 class="text-primary text-xl mt-5 font-bold">Questions & Answers</h2>
      </div>
      <div>
        <div
          class="grid grid-cols-1 grid-flow-col gap-4"
          v-for="(input, index) in securityQuestions"
          :key="`-${index}`"
        >
          <div>
            <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
              {{ input.question }}
            </div>
            <div class="border border-grey-200 py-3 px-2 mb-5 rounded-md">
              {{ input.answer }}
              <span
                class="text-danger float-right mr-2 cursor-pointer"
                @click="editQuestion(index, securityQuestions)"
                >Edit</span
              >
            </div>
          </div>
          <div
            class="cursor-pointer"
            @click="removeQuestion(index, securityQuestions)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.28571 1.64307H17.7143C18.4244 1.64307 19 2.2187 19 2.92878V3.57164C19 4.28172 18.4244 4.85735 17.7143 4.85735H2.28571C1.57563 4.85735 1 4.28172 1 3.57164V2.92878C1 2.2187 1.57563 1.64307 2.28571 1.64307ZM2.57441 6.1703C2.61575 6.15211 2.66046 6.14283 2.70563 6.14307H17.2917C17.3368 6.14283 17.3815 6.15211 17.4229 6.1703C17.4642 6.1885 17.5013 6.21521 17.5316 6.24868C17.5619 6.28216 17.5849 6.32165 17.5989 6.36458C17.6129 6.40751 17.6178 6.45292 17.6131 6.49785L16.5576 16.6457V16.6542C16.5024 17.1234 16.2768 17.556 15.9238 17.87C15.5707 18.1839 15.1147 18.3573 14.6423 18.3574H5.35742C4.88483 18.3575 4.42862 18.1842 4.0754 17.8702C3.72218 17.5563 3.49654 17.1235 3.4413 16.6542C3.44109 16.6512 3.44109 16.6483 3.4413 16.6453L2.3842 6.49785C2.37952 6.45292 2.38435 6.40751 2.39839 6.36458C2.41243 6.32165 2.43536 6.28216 2.46569 6.24868C2.49602 6.21521 2.53306 6.1885 2.57441 6.1703ZM12.8477 13.6116C12.8143 13.5333 12.7656 13.4623 12.7045 13.4029L10.9089 11.6074L12.7045 9.81178C12.8221 9.69061 12.8873 9.52803 12.886 9.35916C12.8848 9.1903 12.8171 9.02871 12.6977 8.90933C12.5782 8.78995 12.4166 8.72236 12.2478 8.72116C12.0789 8.71996 11.9163 8.78526 11.7952 8.90294L10.0001 10.6981L8.20447 8.90294C8.08336 8.78526 7.9208 8.71996 7.75194 8.72116C7.58307 8.72236 7.42146 8.78995 7.30202 8.90933C7.18259 9.02871 7.11492 9.1903 7.11365 9.35916C7.11238 9.52803 7.17761 9.69061 7.29523 9.81178L9.09081 11.6074L7.29523 13.4029C7.17761 13.5241 7.11238 13.6867 7.11365 13.8556C7.11492 14.0244 7.18259 14.186 7.30202 14.3054C7.42146 14.4248 7.58307 14.4924 7.75194 14.4936C7.9208 14.4948 8.08336 14.4295 8.20447 14.3118L10.0001 12.5166L11.7952 14.3118C11.8546 14.3729 11.9255 14.4216 12.0039 14.4551C12.0822 14.4886 12.1664 14.5062 12.2517 14.5068C12.3369 14.5075 12.4213 14.4912 12.5002 14.4589C12.5791 14.4266 12.6507 14.3789 12.711 14.3187C12.7712 14.2584 12.8189 14.1868 12.8513 14.108C12.8836 14.0291 12.8999 13.9447 12.8993 13.8594C12.8987 13.7742 12.8812 13.69 12.8477 13.6116Z"
                fill="#FF5964"
              />
            </svg>
          </div>
        </div>
        <div class="my-10 w-full">
          <cornie-select
            :rules="required"
            v-model="securityQuestion.question"
            :items="[
              ' What is the name of your best teacher in primary school?',
              'What is your grandmother name?',
            ]"
            placeholder="Security Question"
          >
          </cornie-select>
          <cornie-input
            placeholder="Answer here"
            v-model="securityQuestion.answer"
          />
          <div
            class="cursor-pointer text-danger mt-8 font-bold"
            @click="addQuestion"
          >
            Add Question
          </div>
        </div>

        <div class="my-10 w-3/4 mt-5 border-t-2 border-dashed">
          <label for="Password" class="text-primary text-xl mt-5 font-bold">
            Confirm Password
          </label>
          <password-input
            id="ConfirmPassword"
            required
            class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 mb-8"
            placeholder="Confirm New Password"
            v-model="ConfirmPassword"
          />
          <div class="flex mb-5">
            <list-boxes types="radio" class="mt-2" checked />
            <span class="ml-2 mt-2">Answer all questions during sign in.</span>
          </div>

          <div class="flex">
            <list-boxes types="radio" class="mt-2" />
            <span class="ml-2 mt-2">Random question during sign in.</span>
          </div>
        </div>
      </div>
    </div>
    <span class="flex justify-end">
      <button
        type="submit"
        @click="saveTwoFactor()"
        class="my-10 px-6 py-2 pl-6 pr-6 flex justify-end text-white appearance-none border-none bg-danger rounded-3xl placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      >
        Save
      </button>
    </span>
  </div>
</template>

<script>
import ListBoxes from "@/components/ListBoxes.vue";
import ToogleCheck from "@/components/ToogleCheck.vue";
import CornieInput from "@/components/cornieinput.vue";
import NotificationIcon from "@/components/icons/notification.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";

export default {
  name: "TwoFactorAuth",
  components: {
    ListBoxes,
    ToogleCheck,
    NotificationIcon,
    PasswordInput,
    CornieSelect,
    CornieInput,
  },
  data() {
    return {
      value: "",
      password: "",
      userId: "",
      token: "",
      twoFA: false,
      securityQuestions: [],
      securityQuestion: { question: "", answer: "" },
    };
  },
  created() {
    this.twoFA = this.requiresTwoFactorAuth;
  },
  watch: {
    requiresTwoFactorAuth() {
      this.twoFA = this.requiresTwoFactorAuth;
    },
  },
  computed: {
    requiresTwoFactorAuth() {
      return store.state.user.requiresTwoFactorAuth;
    },
    payloadOff() {
      return {
        password: store.state.user.password,
        userId: store.state.user.Id,
      };
    },
    payloadOn() {
      return {
        // token not yet given
        token: this.token,
        userId: store.state.user.user.id,
      };
    },
  },
  methods: {
    addQuestion() {
      this.securityQuestions.push({ ...this.securityQuestion });
    },
    editQuestion(index) {
      this.securityQuestion = this.securityQuestions[index];
    },
    removeQuestion(index) {
      this.securityQuestions.splice(index, 1);
    },
    saveTwoFactor() {
      ;
    },
    async sendCode() {
      const payload = {
        userId: store.state.user.user.id,
        email: store.state.user.user.email,
      };
      try {
        await quantumClient().post("/org/security/2fa/setup/otp", payload);
        window.notify({
          msg: "Code has been sent to your email " + payload.email,
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Code not sent please try again",
          status: "error",
        });
      }
    },
    async turnOn() {
      try {
        await quantumClient().post("/org/security/2fa/setup", this.payloadOn);
        window.notify({
          msg: "Turned ON Two-Factor Suceesfully",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Not turned on please try again",
          status: "error",
        });
      }
    },
    async turnOff() {
      try {
        await quantumClient().post(
          "/org/security/2fa/status/off",
          this.payloadOff
        );
        window.notify({
          msg: "Turned OFF Two-Factor Succesfully",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Not turned off please try again",
          status: "error",
        });
      }
    },
  },
};
</script>

<style scoped></style>
