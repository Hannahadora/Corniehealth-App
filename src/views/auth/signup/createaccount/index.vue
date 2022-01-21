<template>
  <div class="2xl:h-3/6 w-2/3 block rounded-lg bg-white" v-if="!createaccount">
    <div class="w-full block p-12">
      <div>
        <h2 class="font-bold text-primary text-3xl mb-5">Join Corniehealth</h2>
        <p class="text-black mb-10">Create a corniehealth account</p>
        <cornie-btn
          @click="createaccount = true"
          class="font-semibold rounded bg-danger mt-3 w-full text-white p-2"
          type="button"
        >
          Sign up with Email
        </cornie-btn>
        <span class="w-full text-center block my-1">or</span>
        <cornie-btn
          class="font-semibold rounded mb-5 border-primary border-2 py-1 px-3 hover:bg-primary hover:text-white mt-2 w-full text-primary p-2"
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
          <div class="container flex flex-col flex-wrap px-5 py-4 w-9/12 mx-20" :class="[accountType == 'Patient' ? 'mt-44' : 'mt-56']">
              <h1 class="text-primary font-bold text-2xl mb-2">Create an account</h1>
               <div class="bg-light_gray text-sm w-full p-4 text-jet_black mb-5" v-if="accountType == 'Patient'">
                You must be 18 or older to create a CornieCare Patient Online account.
                Parents must create dependent accounts for patients under 18.
              </div>

            <div class="flex flex-wrap mb-8" style="width:115vh">
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-auto
                      py-3
                      font-medium
                      leading-none
                      tracking-wider
                      rounded-t
                      text-sm
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      cursor-pointer
                      relative
                    "
                     :class="[
                        step == 2
                          ? 'border-b-4 border-danger text-black icon-wrap'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >
                    Enter Information
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-auto
                      py-3
                      font-medium
                      leading-none
                       text-sm
                      tracking-wider
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                      relative
                    "
                    :class="[
                        step == 3 && userCreated
                          ? 'border-b-2 border-danger text-black'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >

                    Verify Email & Set Password
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                       w-auto
                      py-3
                      font-medium
                      leading-none
                       text-sm
                      tracking-wider
                      border-b-2 border-gray-200
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                      relative
                    "
                     :class="[
                        step == 4 && userCreated
                          ? 'border-b-2 border-danger text-black'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >
                     Access Dashboard
                  </a>
            </div>

            <Two :loading="loading" :account="accountType" @next="updateData($event)">
            </Two>
          </div>

      </div>

      <div class="" :user="user" v-if="step == 3 && userCreated">
        <!-- component -->
        <div class="container flex flex-col flex-wrap px-5 py-4 w-9/12 mx-20 mt-2">
        <h1 class="text-primary font-bold text-2xl mb-2">Create an account</h1>
          <div class="flex flex-wrap mb-8" style="width:120vh">
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      text-sm
                      font-medium
                      leading-none
                      tracking-wider
                      rounded-t
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      cursor-pointer
                      border-b-4 border-danger text-black
                    "
   
                  >
                  <span class="relative">
                  <check-icon :class="[step == 3 && userCreated ? 'flex' : 'hidden']" class="icon-check-mark"/>
                    Enter Information
                  </span>
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      font-medium
                       text-sm
                      leading-none
                      relative
                      tracking-wider
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                    "
                    :class="[
                        step == 3 && userCreated
                          ? 'border-b-4 border-danger text-black icon-wrap2'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >

                   Verify Email & Set Password
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      text-sm
                      font-medium
                      leading-none
                      tracking-wider
                      border-b-2 border-gray-200
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                    "
                     :class="[
                        step == 4 && userCreated
                          ? 'border-b-4 border-danger text-black'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >
                     Access Dashboard
                  </a>
          </div>
          <verify-email-code
            v-model:code="code"
            :user="user"
            :next="next"
            v-model:verified="emailVerified"
          />
        </div>
      </div>
      <!-- component -->
      <div class="" :user="user" v-if="step == 4 && userCreated">
        <div class="container flex flex-col flex-wrap px-5 py-4 w-9/12 mx-20 mt-52">
        <h1 class="text-primary font-bold text-2xl mb-2">Create an account</h1>
          <!-- <div class="flex flex-wrap mx-auto" style="width:120vh">
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      text-sm
                      relative
                      font-medium
                      leading-none
                      tracking-wider
                      rounded-t
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      cursor-pointer
                      border-b-4 border-danger text-black
                    "
                  >
                    <span class="relative">
                    <check-icon :class="[step == 2 ? 'flex' : 'hidden']" class="icon-check-mark"/>
                      Enter Information
                    </span>
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      font-medium
                      text-sm
                      leading-none
                      tracking-wider
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                      border-b-4 border-danger
                      text-black
                    "
                  >
                    <span class="relative">
                    <check-icon :class="[step == 2 ? 'flex' : 'hidden']" class="icon-check-mark2"/>
                       Verify Email & Set Password
                  </span>
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      font-medium
                      leading-none
                      tracking-wider
                      border-b-2 border-gray-200
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                    "
                    :class="[
                        step == 2
                          ? 'border-b-4 border-danger text-black'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >
                     Access Dashboard
                  </a>
          </div> -->
             <div class="flex flex-wrap mb-8" style="width:120vh">
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      text-sm
                      font-medium
                      leading-none
                      tracking-wider
                      rounded-t
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      cursor-pointer
                      border-b-4 border-danger text-black
                    "
   
                  >
                  <span class="relative">
                  <check-icon :class="[step == 4 && userCreated ? 'flex' : 'hidden']" class="icon-check-mark"/>
                    Enter Information
                  </span>
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      font-medium
                       text-sm
                      leading-none
                      relative
                      tracking-wider
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                    "
                    :class="[
                        step == 4 && userCreated
                          ? 'border-b-4 border-danger text-black icon-wrap2'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >

                   Verify Email & Set Password
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-1/2
                      py-3
                      text-sm
                      font-medium
                      leading-none
                      tracking-wider
                      border-b-2 border-gray-200
                      sm:px-6 sm:w-auto sm:justify-start
                      title-font
                      hover:text-gray-900
                    "
                     :class="[
                        step == 4 && userCreated
                          ? 'border-b-4 border-danger text-black'
                          : 'text-gray-400 border-b-2 border-gray-200',
                      ]"
                  >
                     Access Dashboard
                  </a>
          </div>
            <activate-account
              :userId="user.id"
              :code="code"
              :emailVerified="emailVerified"
            />
        </div>

      </div>
    </v-form>

    <span class="w-full flex justify-center items-center text-sm text-center mt-2" v-if=" step!= 4 && step !=3">
      Already have an account?
      <router-link class="ml-1 text-danger" to="/login"> Sign In </router-link>
    </span>

    <span class="text-center mt-1 text-xs" v-if="step == 2">
     <a href="javascript:void(0)" class="text-danger"> Terms of use</a> | <a href="javascript:void(0)" class="text-danger"> Privacy Policy</a> | <a href="javascript:void(0)" class="text-danger"> Help</a> | 2021 Cornie Health Ltd.
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
    this.lastName = data.lastName.value
    this.firstName = data.firstName.value
    this.phone = data.phone.value
    this.email = data.email.value
    this.dialCode = data.dialCode.value

  }

  get payload() {
    return {
      lname: this.lastName,
      fname: this.firstName,
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
    this.$emit('check-type', this.accountType)
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

  created(){
     
  }
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
   content: '';
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
.icon-wrap2::after {
    content: '';
    background: #fff;
    position: inherit;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    z-index: 1;
    color: #fff;
    border: 2px solid #fe4d3c;
    right: -35px;
    top: 29px;
 
}
.icon-wrap3::after {
   content: '';
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
