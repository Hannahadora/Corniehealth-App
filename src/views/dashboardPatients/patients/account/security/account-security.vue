<template>
  <div
    class="bg-white mb-32 h-full overflow-x-hidden overflow-y-scroll shadow-lg p-3 mt-2 rounded-lg w-full"
  >
    <div class="flex font-semibold text-xl py-2">
      <h2>Account Security</h2>
    </div>

    <div class="w-full my-5">
      <div class="w-full curved py-2">
        <div
          class="w-full py-2 flex justify-between items-center"
        >
          <div class="w-8/12">
            <h2 class="mb-2 font-semibold text-lg">Password</h2>
            <p>
              <span
                >The same password strength are enforced for all users across
                the app.</span
              >
              <a class="text-blue-500 uppercase font-semibold text-xs"
                >View Policy</a
              >
            </p>
          </div>
          <div class="w-4/12 flex justify-end">
            <Button
              :loading="false"
              class="focus:outline-none"
              @click="togglePasswordSection"
              v-if="!willUpdatePassword"
            >
              <span
                class="curved border-primary text-primary border cursor-pointer focus:outline-none font-bold py-3 px-8 rounded-full"
              >
                Update Password
              </span>
            </Button>
          </div>
        </div>

        <v-form
          class="w-full mt-3 password-section"
          @submit="resetPassword"
          :class="{ 'update-password border-b-2 pb-6': willUpdatePassword }"
        >
          <div class="container-fluid w-full flex items-center justify-between">
            <div class="border-b-2 w-11/12"></div>
            <div
              class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer"
              style="height: 24px; width: 24px"
              @click="togglePasswordSection"
            >
              ×
            </div>
          </div>

          <div class="container-fluid">
            <div class="w-full my-3">
              <div class="w-6/12">
                <div class="w-full">
                  <div class="w-11/12">
                    <CornieInput
                      label="Current Password"
                      :rules="required"
                      type="password"
                      v-model="data.previousPassword"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex">
              <div class="w-6/12 my-3">
                <div class="w-full">
                  <div class="w-11/12">
                    <CornieInput
                      label="New Password"
                      :rules="password"
                      type="password"
                      name="newPassword"
                      v-model="newPassword"
                      placeholder="New Password"
                    />
                    <div
                      class="w-full flex justify-between"
                      style="width: 90%"
                      v-if="checkPassword"
                    >
                      <p
                        class="underbar w-2/12 border"
                        :class="{
                          'underbar-green':
                            data.newPassword && data.newPassword.length >= 6,
                        }"
                      ></p>
                      <p
                        class="underbar bg-red-500 w-2/12 border"
                        :class="{
                          'underbar-green':
                            data.newPassword && data.newPassword.length >= 6,
                        }"
                      ></p>
                      <p
                        class="underbar bg-green-500 w-2/12 border"
                        :class="{
                          'underbar-green':
                            data.newPassword && data.newPassword.length >= 6,
                        }"
                      ></p>
                      <p
                        class="underbar bg-green-500 w-2/12 border"
                        :class="{
                          'underbar-green':
                            data.newPassword && data.newPassword.length >= 6,
                        }"
                      ></p>
                      <p
                        class="underbar bg-green-500 w-2/12 border"
                        :class="{
                          'underbar-green':
                            data.newPassword && data.newPassword.length >= 6,
                        }"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-6/12 my-3">
                <CornieInput
                  label="Confirm Password"
                  :rules="required"
                  type="password"
                  v-model="data.confirmPassword"
                  placeholder="Confirm Password"
                />
                <span
                  class="text-xs text-danger"
                  v-if="
                    data.confirmPassword &&
                    data.confirmPassword !== data.newPassword
                  "
                >
                  password does not match
                </span>
              </div>
            </div>

            <div class="w-full mt-6 mb-2 flex justify-end">
              <Button
                :loading="loading"
                class="focus:outline-none"
                :disabled="!validPassword"
              >
                <span
                  style="background: #fe4d3c"
                  class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
                >
                  Save
                </span>
              </Button>
            </div>
          </div>
        </v-form>
      </div>
    </div>

    <div class="w-full my-5">
      <div class="w-full curved flex py-2">
        <div
          class="container-fluid w-full flex justify-between items-center py-2"
        >
          <div class="w-9/12">
            <h2 class="font-semibold text-lg mb-2">
              Two Factor Authentication
            </h2>
            <p class="flex">
              Two factor authentication enforced for all users within your
              domain.
              <span class="ml-3">
                <!-- <Tooltip :text="'This is a test'"> -->
                <Icon :type="2" />
                <!-- </Tooltip> -->
              </span>
            </p>
          </div>
          <div class="w-3/12 flex justify-end">
            <Button
              :loading="false"
              class="focus:outline-none"
              @click="toggle2faSection"
              v-if="!willUpdate2fa"
            >
             <span
                class="curved border-primary text-primary border cursor-pointer focus:outline-none font-bold py-3 px-14 rounded-full"
              >
                Configure
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        class="w-full mt-3 password-section"
        :class="{ 'update-2fa border-b-2 pb-6': willUpdate2fa }"
      >
        <TwoFA @closesection="closeSection" />
      </div>
    </div>

    <div class="w-full my-5">
      <div class="w-full curved flex py-2">
        <div
          class="container-fluid w-full flex justify-between items-center py-2"
        >
          <div class="w-9/12">
            <h2 class="mb-2 font-semibold text-lg">Security Questions</h2>
            <p class="flex">
              Security questions not enforced for all users within your domain.
              <span class="ml-3"><Icon :type="2" /></span>
            </p>
          </div>
          <div class="w-3/12 flex justify-end">
            <Button
              :loading="false"
              class="focus:outline-none"
              @click="toggleQuestionsSection"
              v-if="!willUpdateQuestions"
            >
              <span
                class="text-gray-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-12 rounded-full"
              >
                Configure
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        class="w-full mt-3 password-section"
        :class="{ 'update-questions border-b-2 pb-6': willUpdateQuestions }"
      >
        <SecurityQuestions @closesection="closeSection" />
      </div>
    </div>

    <div class="w-full" style="height: 100px"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Icon from "@/views/dashboard/settings/rolesprivileges/components/icon.vue";
import CornieInput from "@/components/cornieinput.vue";
import TwoFA from "./components/two-fa.vue";
// import SecurityQuestions from "./components/security-questions.vue";
import Tooltip from "@/components/tooltip.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import Button from "@/components/globals/corniebtn.vue";
import { string } from "yup";

const userSettingsStore = namespace("usersettings");
const userStore = namespace("user");

@Options({
  components: {
    Icon,
    CornieInput,
    TwoFA,
    // SecurityQuestions,
    Tooltip,
    Button,
  },
})
export default class UserSecurity extends Vue {
  willUpdatePassword = false;
  willUpdate2fa = false;
  willUpdateQuestions = false;

  loading = false;

  data: any = {};

  oldPassword = "";
  newPassword = "";
  newPasswordConfirmation = "";
  required = string().required();
  password = string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    );

  get validPassword() {
    const inputValid =
      Boolean(this.oldPassword) &&
      Boolean(this.newPassword) &&
      Boolean(this.newPasswordConfirmation);

    return this.checkPassword && inputValid;
  }
  get checkPassword() {
    if (!this.data.newPassword) return false;
    return this.data.newPassword.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
  }

  closeSection(area: string) {
    if (area === "2fa") {
      this.willUpdate2fa = false;
    } else {
      this.willUpdateQuestions = false;
    }
  }

  @userSettingsStore.Action
  changePassword!: (body: any) => Promise<boolean>;

  @userStore.State
  user!: User;

  togglePasswordSection() {
    this.willUpdatePassword = !this.willUpdatePassword;
  }

  toggle2faSection() {
    this.willUpdate2fa = !this.willUpdate2fa;
  }

  toggleQuestionsSection() {
    this.willUpdateQuestions = !this.willUpdateQuestions;
  }

  async resetPassword() {
    try {
      this.loading = true;
      const changed = await this.changePassword({
        previousPassword: this.data.previousPassword,
        newPassword: this.data.newPassword,
        userId: this.user.id,
      });
      this.loading = false;
      if (!changed) {
        notify({
          msg: "There was an error chnging your password",
          status: "error",
        });
      } else {
        notify({
          msg: "Password Changed Successfully",
          status: "success",
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.topest {
  overflow-x: scroll;
  height: 100vh;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.password-section {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.update-password {
  height: 280px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.update-2fa {
  height: 315px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.update-questions {
  height: 480px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.underbar {
  border: 1px solid red !important;
}

.underbar-green {
  border: 1px solid green !important;
}

button:disabled {
  opacity: 0.5 !important;
}
</style>
