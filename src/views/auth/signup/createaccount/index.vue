<template>
  <div class="2xl:h-3/6 w-2/3 block rounded-lg bg-white" v-if="!createaccount">
    <div class="w-full block p-12">
      <div>
        <h2 class="font-bold text-2xl mb-5">Join Corniehealth</h2>
        <p class="text-black mb-10">Create a corniehealth account</p>
        <cornie-btn
          @click="createaccount = true"
          class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2"
          type="button"
        >
          Sign up with Email
        </cornie-btn>
        <span class="w-full text-center block my-1">or</span>
        <cornie-btn
          class="font-semibold rounded-full mb-5 border-primary border-2 py-1 px-3 hover:bg-primary hover:text-white mt-2 w-full text-primary p-2"
        >
          <span class="inline-flex justify-center pb-1"
            ><quantum-icon class="mr-2 pt-1" /></span
          >Quantum
        </cornie-btn>
        <span class="w-full flex text-sm mt-2">
          Already have an account?
          <router-link class="ml-1 text-danger" to="/login">
            Login
          </router-link>
        </span>
      </div>
    </div>
  </div>

  <div
    class="h-5/6 2xl:h-3/6 w-full flex flex-col justify-center rounded-lg bg-white -mt-12"
    v-else
  >
    <v-form class="w-full p-6" @submit="submit">
      <div v-if="step == 1">
        <One
          :checked="checked"
          :checked2="checked2"
          :checked3="checked3"
          :isVisible="isVisible"
          @next="next()"
          @selected="checkedType($event)"
        />
      </div>

      <div v-if="step == 2">
        <Two 
        :loading="loading"
        @next="updateData($event)"
        />
      </div>

      <div class="" :user="user" v-if="step == 3 && userCreated">
        <!-- component -->
        <h1 class="text-primary font-bold text-4xl mb-8">Create an account</h1>
        <div class="relative pt-1 mb-8">
          <div
            class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
            @click="back"
          >
            <div
              :style="{ width: `${width}%` }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              class="cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
            >
              <div class="icon-wrap3"></div>
            </div>
          </div>
        </div>
        <verify-email-code
          v-model:code="code"
          :user="user"
          :next="next"
          v-model:verified="emailVerified"
        />
      </div>
      <!-- component -->
      <div class="" :user="user" v-if="step == 4 && userCreated">
        <div class="relative pt-1">
          <div
            class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
            @click="back"
          >
            <div
              :style="{ width: `${width}%` }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              class="cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
            >
              <div class="icon-wrap4"></div>
            </div>
          </div>
        </div>
        <activate-account
          :userId="user.id"
          :code="code"
          :emailVerified="emailVerified"
        />
      </div>
    </v-form>

    <span
      class="w-full flex justify-center items-center text-sm text-center mt-2"
    >
      Already have an account?
      <router-link class="ml-1 text-danger" to="/login"> Sign In </router-link>
    </span>

    <span class="text-center mt-6" v-if="step == 2">
      Terms of use | Privacy Policy | Help | 2021 Cornie Health Ltd.
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
  phone = "";
  dialCode = "+234";
  fullName = "";
  accountType = "Provider";
  loading = false;
  createaccount = false;
  checked = false;
  checked2 = false;
  checked3 = false;
  active = false;
  isVisible = false;
  isVisible2 = false;
  step = 1;
  width_percent = 25;
  width = 25;

  @user.Mutation
  setCornieData!: (data: any) => void;

  updateData(data:any){
    console.log(data);
  }

  get payload() {
    const { firstName, lastName, middleName } = this.splitName();
    return {
      lname: lastName,
      fname: firstName,
      mname: middleName,
      dialCode: this.dialCode,
      phoneNo: this.phone,
      email: this.email,
    };
  }
  next() {
    this.step = this.step + 1;
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
    this.width -= this.width_percent;
  }
  splitName() {
    const names = this.fullName.split(" ");
    if (names.length < 3)
      return { firstName: names[0], middleName: "", lastName: names[1] };
    else
      return { firstName: names[0], middleName: names[3], lastName: names[2] };
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
    this.accountType = "Patient";
  }
  checkValue2() {
    this.isVisible2 = true;
    this.checked2 = true;
    this.checked = false;
    this.checked3 = false;
    this.accountType = "Provider";
  }
  checkValue3() {
    this.checked2 = false;
    this.checked = false;
    this.checked3 = true;
    this.accountType = "Payer";
  }

  async submit() {
    const errMsg = "Account not created";
    this.loading = true;
    try {
      const data = await quantumClient().post("/auth/signup/", this.payload);
      if (data.success) {
        this.setUser(data);
        this.setCornieData({ accountType: this.accountType });
        this.next();
      } else {
        window.notify({ msg: errMsg, status: "error" });
        this.back();
      }
    } catch (error) {
      if (error instanceof ErrorResponse && error.response.status == 422) {
        window.notify({
          msg: error.response.data.errors[0].msg,
          status: "error",
        });
        this.back();
      } else if (
        error instanceof ErrorResponse &&
        error.response.status == 400
      ) {
        window.notify({ msg: error.response.errors!.summary, status: "error" });
        this.back();
      } else {
        window.notify({ msg: errMsg });
      }
    }
    this.loading = false;
  }
}
</script>
<style scoped>
.text-xs {
  font-size: 0.65rem;
  line-height: 1rem;
}
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
.icon-wrap {
  content: counter(step);
  counter-increment: step;
  background: #fff;
  border-radius: 50%;
  top: -0.3em;

  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -22em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap2 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 0.5em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap3 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 20em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap4 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 42em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-check-mark {
  top: 8.8em;
  z-index: 1;
  left: 9em;
  right: 0;
  position: absolute;
}
.icon-check-mark2 {
  top: 8.8em;
  z-index: 1;
  left: 17em;
  right: 0;
  position: absolute;
}
.icon-check-mark3 {
  top: 8.8em;
  z-index: 1;
  left: 25.5em;
  right: 0;
  position: absolute;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
input[type="radio"]:checked {
  background-color: #fe4d3c;
}
</style>
