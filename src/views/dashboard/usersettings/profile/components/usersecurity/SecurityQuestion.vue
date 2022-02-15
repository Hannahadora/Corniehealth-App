<template>
  <div class="border-t border-gray-300">
    <div class="flex my-2 items-center">
      <ToogleCheck
        v-model="twoFA"
        class="mx-4"
        checkedText="Enabled"
        uncheckedText="Disabled"
      />
    </div>
    <div class="">
      <div class="border-t-2 border-dashed">
        <h2 class="text-primary text-lg my-3 font-bold">Questions & Answers</h2>
      </div>
      <div>
        <div class="w-full border-b-2 pb-5 border-dashed">
          <cornie-select
            :rules="required"
            class="w-full mb-0"
            v-model="securityQuestion.question"
            :items="[
              ' What is the name of your best teacher in primary school?',
              'What is your grandmother name?',
            ]"
            placeholder="Security Question"
          >
          </cornie-select>
          <cornie-input
            class="w-full -mt-4"
            placeholder="Answer here"
            v-model="securityQuestion.answer"
          />
          <div
            class="cursor-pointer text-danger mt-5 text-sm font-semibold"
            @click="addQuestion"
          >
            Add
          </div>
        </div>
        <div
          class="grid grid-cols-1 grid-flow-col gap-4 mt-5"
          v-for="(input, index) in securityQuestions"
          :key="`-${index}`"
        >
          <div class="w-full">
            <div class="w-full flex items-center mb-2">
              <div
                class="bg-blue-50 py-1 px-2 rounded-md font-bold flex-1 mr-5"
              >
                {{ input.question }}
              </div>
              <button
                class="cursor-pointer"
                @click="removeQuestion(index, securityQuestions)"
              >
                <delete-icon />
              </button>
            </div>
            <div class="border border-grey-200 py-3 px-2 mb-5 rounded-md">
              {{ `Answer ${index + 1}: ${input.answer}` }}
              <span
                class="text-danger float-right mr-2 cursor-pointer"
                @click="editQuestion(index, securityQuestions)"
                >Edit</span
              >
            </div>
          </div>
        </div>
        <div class="grid mb-2 grid-cols-12 gap-4">
          <div class="col-span-4">
            <label for="Password" class="text-sm mb-0">
              Enter password to confirm
            </label>
            <password-input
              id="ConfirmPassword"
              required
              class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="Confirm New Password"
              v-model="ConfirmPassword"
            />
          </div>
        </div>
        <div class="flex my-5 items-center">
          <ToogleCheck
            v-model="randomSQ"
            class="mx-4"
            checkedText="Answer all questions during sign in."
            uncheckedText="Random question during sign in."
          />
        </div>
      </div>
    </div>
    <span class="flex justify-end">
      <button
        type="submit"
        @click="saveTwoFactor()"
        class="px-10 py-2 flex justify-end text-white appearance-none bg-danger rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
import DeleteIcon from "@/components/icons/delete-red.vue";

export default {
  name: "TwoFactorAuth",
  components: {
    ListBoxes,
    ToogleCheck,
    NotificationIcon,
    PasswordInput,
    CornieSelect,
    CornieInput,
    DeleteIcon,
  },
  data() {
    return {
      value: "",
      password: "",
      userId: "",
      token: "",
      twoFA: false,
      randomSQ: false,
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
      let firstXter = this.securityQuestion.answer[0];
      let lastXter = this.securityQuestion.answer.substr(-2);
      let maskLength = this.securityQuestion.answer.length - 3;
      let maskXter = "";
      for (let i = 1; i <= maskLength; i++) maskXter = maskXter + "*";

      let mask = `${firstXter}${maskXter}${lastXter}`;

      let maskedAns = {
        question: this.securityQuestion.question,
        answer: mask,
      };

      this.securityQuestions.push({ ...maskedAns });
    },
    editQuestion(index) {
      this.securityQuestion = this.securityQuestions[index];
    },
    removeQuestion(index) {
      this.securityQuestions.splice(index, 1);
    },
    saveTwoFactor() {},
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
