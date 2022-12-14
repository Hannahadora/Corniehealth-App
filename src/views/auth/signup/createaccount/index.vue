<template>
  <div class="" v-if="!createaccount"></div>

  <!-- <h1 v-if="step == 2" class="text-white font-bold text-left text-5xl mb-6">Create an Account</h1> -->

  <div class="flex items-center">
    <span
      class="px-6 py-4 text-white font-bold cursor-pointer bg-red-500 text-lg"
    >
      Sign Up
    </span>
    <span
      @click="$router.push($route.query.practitioner ? `/signin?practitioner=${$route.query.practitioner}`: '/signin')"
      class="px-6 py-4 text-white font-bold cursor-pointer text-lg"
    >
      Sign In
    </span>
  </div>

  <div class="w-full flex flex-col justify-center bg-white px-9 py-6">
    <div
      class="bg-light_gray text-sm w-full p-4 text-jet_black mb-12"
      v-if="accountType == 'patient'"
    >
      You must be 18 or older to create a CornieCare Patient Online account.
      Parents must create dependent accounts for patients under 18.
    </div>

    <v-form class="w-full" @submit="submit">
      <div class="mb-10" v-if="step == 2 && !userCreated">
        <One
          :checked="checked"
          :checked2="checked2"
          :checked3="checked3"
          :isVisible="isVisible"
          @next="setStep = true"
          @selected="checkedType($event)"
        />
      </div>

      <div v-if="step == 2 && !userCreated">
        <Two
          :loading="loading"
          :account="accountType"
          @next="updateData($event)"
        >
        </Two>
      </div>

      <div class="" :user="user" v-if="step == 3 && userCreated">
        <div class="container flex flex-col flex-wrap">
          <h1 class="text-primary font-bold text-4xl mb-12">
            Create an account
          </h1>

          <verify-email-code
            v-model:code="code"
            :user="user"
            :next="next"
            v-model:verified="emailVerified"
          />
        </div>
      </div>

      <div class="" :user="user" v-if="step == 4 && userCreated">
        <div class="container flex flex-col">
          <h1 class="text-primary font-bold text-4xl mb-12">
            Create an account
          </h1>

          <activate-account
            :userId="user.id"
            :code="code"
            :emailVerified="emailVerified"
          />
        </div>
      </div>
    </v-form>

    <!-- <span
      class="w-full flex justify-center items-center text-sm text-center mt-9 mb-12"
      v-if="step != 4 && step != 3"
    >
      Already have an account?
      <router-link class="ml-1 text-danger" to="/login"> Sign In </router-link>
    </span> -->

    <span class="text-center text-xs" v-if="step == 2">
      <a href="javascript:void(0)" class="text-danger"> Terms of use</a> |
      <a href="javascript:void(0)" class="text-danger"> Privacy Policy</a> |
      <a href="javascript:void(0)" class="text-danger"> Help</a> | 2021 Cornie
      Health Ltd.
    </span>
  </div>
</template>
<script lang="ts">
import { quantumClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import QuantumIcon from "@/components/icons/quantum.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import InfoIcon from "@/components/icons/ainfo.vue";
import PhoneInput from "@/components/phone-input.vue";
import ConditionalInput from "@/components/conditional-input.vue";
import { string } from "yup";
import TableOptions from "@/components/table-options.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { namespace } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { ErrorResponse } from "@/lib/http";
import ActivateAccount from "./activateaccount.vue";
import VerifyEmailCode from "./verifyemailcode.vue";
import Tooltip from "@/components/tooltip.vue";
import One from "./steps/one.vue";
import Two from "./steps/two.vue";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

type CreatedUser = { id: string; email: string };

const user = namespace("user");
@Options({
  components: {
    ActivateAccount,
    VerifyEmailCode,
    CornieInput,
    CornieSelect,
    TableOptions,
    PhoneInput,
    CornieRadio,
    ChevronDownIcon,
    ConditionalInput,
    QuantumIcon,
    CheckIcon,
    InfoIcon,
    Tooltip,
    One,
    Two,
  },
})
export default class CreateAccount extends Vue {
  @PropSync("user", { required: false })
  userSync!: CreatedUser;

  user = {} as CreatedUser;

  userCreated = false;
  code = "";

  emailVerified = false;
  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }

  @Prop({ required: false })
  //user!: CreatedUser;
  required = string().required();
  requiredString = string().required().trim();
  phoneRule = string().matches(phoneRegex, "A valid phone number is required");
  emailRule = string().email("A valid email is required").required();

  promo = false;
  service = false;
  email = "";
  lastName = "";
  firstName = "";
  phone = "";
  dialCode = "+234";
  fullName = "";
  accountType = "patient";
  loading = false;
  createaccount = false;
  checked = true;
  checked2 = false;
  checked3 = false;
  active = false;
  isVisible = false;
  isVisible2 = false;
  step = 2;
  setStep = true;
  width_percent = 33;
  width = 33;

  practiceType = "";
  practiceSubType = "";
  @user.Mutation
  setCornieData!: (data: any) => void;

  updateData(data: any) {
    this.lastName = data.lastName.value;
    this.firstName = data.firstName.value;
    this.phone = data.phone.value;
    this.email = data.email.value;
    this.dialCode = data.dialCode.value;
    this.practiceSubType = data.subType;
    this.practiceType = data.practiceType;
  }

  get payload() {
    return {
      lname: this.lastName,
      fname: this.firstName,
      dialCode: this.dialCode,
      phoneNo: this.phone,
      email: this.email.toLowerCase(),
    };
  }
  next() {
    this.step = this.step + 1;
    this.$emit("set-step", this.step);
    this.width += this.width_percent;
  }
  checkedType(value: any) {
    if (value === "1") {
      this.checkValue();
    } else if (value === "2") {
      this.checkValue2();
    } else {
      this.checkValue3();
    }
  }

  back() {
    this.step >= 0 && (this.step -= 1);
    this.$emit("set-step", this.step);
    this.width -= this.width_percent;
  }

  setUser(payload: any) {
    this.userSync = {
      id: payload.data.userId,
      email: payload.data.email,
    };
  }
  checkValue() {
    this.isVisible = true;
    this.checked = true;
    this.checked2 = false;
    this.checked3 = false;
    this.accountType = "patient";
    this.$emit("check-type", this.accountType);
  }
  checkValue2() {
    this.isVisible2 = true;
    this.checked2 = true;
    this.checked = false;
    this.checked3 = false;
    this.accountType = "provider";
    this.$emit("check-type", this.accountType);
  }
  checkValue3() {
    this.checked2 = false;
    this.checked = false;
    this.checked3 = true;
    this.accountType = "payer";
    this.$emit("check-type", this.accountType);
  }

  get corniePayload() {
    return {
      practiceType: this.practiceType,
      practiceSubType: this.practiceSubType,
      accountType: this.accountType,
    };
  }
  async submit() {
    const errMsg = "Account not created";
    this.loading = true;
    try {
      const data = await quantumClient().post("/auth/signup/", this.payload);
      if (data.success) {
        this.setUser(data);
        this.setCornieData(this.corniePayload);
        this.next();
      } else {
        window.notify({ msg: errMsg, status: "error" });
        // this.back();
      }
    } catch (error) {
      if (error instanceof ErrorResponse && error.response.status == 422) {
        window.notify({
          msg: error.response.data.errors[0].msg,
          status: "error",
        });
        // this.back();
      } else if (
        error instanceof ErrorResponse &&
        error.response.status == 400
      ) {
        window.notify({ msg: error.response.errors!.summary, status: "error" });
        // this.back();
      } else {
        window.notify({ msg: errMsg });
      }
    }
    this.loading = false;
  }

  created() {}
}
</script>
<style scoped>
.bg-gray-500 {
  background-color: #8785ad;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px !important;
  width: 16px !important;
  background-color: #eee;
  border-radius: 50%;
}
.radio-container .checkmark:after {
  top: 4px !important;
  left: 4px !important;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.bg-gray {
  background-color: #f6f8f9;
}
.icon-check-mark {
  z-index: 9;
  position: inherit;
  left: 135px;
  top: 37px;
  color: #fff;
  background: #fff;
}
.icon-check-mark2 {
  z-index: 9;
  position: inherit;
  left: 135px;
  top: 37px;
  color: #fff;
  background: #fff;
}
.icon-wrap::after {
  content: "";
  background: #fff;
  position: inherit;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  right: -32px;
  top: 21px;
}
.icon-wrap2::after {
  content: "";
  background: #fff;
  position: inherit;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  right: -5px;
  top: 29px;
}
.icon-wrap3::after {
  content: "";
  background: #fff;
  position: inherit;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  right: -25px;
  top: 20px;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
input[type="radio"]:checked {
  background-color: #fe4d3c;
}
</style>
