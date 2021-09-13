<template>
<div class="h-4/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white" v-if="!createaccount">
    <div class="w-full h-44 block p-12">
      <div>
              <h2 class="font-bold text-2xl mb-5">Join Corniehealth</h2>
              <p class="text-black mb-10">Create a corniehealth account</p>
              <cornie-btn @click="createaccount = true" class="font-semibold rounded-full bg-danger mt-3 w-full text-white p-2" type="button">
               Sign up with  Email
              </cornie-btn>
              <span class="w-full text-center block my-1">or</span>
              <cornie-btn class="font-semibold rounded-full mb-5 border-primary border-2 hover:bg-primary hover:text-white mt-2 w-full text-primary p-2">
                <span class="inline-flex justify-center mt-1"><quantum-icon class="mr-2 pt-1"/></span>Quantum
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
<div class="h-5/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white -mt-12" v-else>
  <div class="w-80 lg:w-full xl:w-full md:w-full h-full block p-4 pb-40 relative right-32 lg:right-0 xl:right-0  md:right-0 border-2 border-gray-300 rounded-lg">
    <h2 class="font-bold text-2xl p-6">Join Corniehealth</h2>
    <v-form class="w-full p-6" @submit="submit">
      <div>
        <check-icon class="icon-check-mark bg-white rounded-full" v-if="width == 50 || width == 75 || width == 100"/>
      </div>
      <div>
        <check-icon class="icon-check-mark2 bg-white rounded-full" v-if="width == 75 || width == 100"/>
      </div>
      <div>
        <check-icon class="icon-check-mark3 bg-white rounded-full" v-if="width == 100"/>
      </div>
      <div class="grid grid-cols-4 gap-4 col-span-full ">
      <p class="text-xs text-gray-500 mb-2 font-bold" :class="{'text-gray-900' : width == 25}">Account Type</p>
      <p class="text-xs text-gray-500  mb-2 font-bold" :class="{'text-gray-900' : width == 50}">Personal Info</p>
      <p class="text-xs text-gray-500 mb-2 font-bold" :class="{'text-gray-900' : width == 75}">Email Verification</p>
       <p class="text-xs text-gray-500  mb-2 font-bold" :class="{'text-gray-900' : width == 100}">Password</p>
      </div>
      
      <div class="" v-if="step == 1">
          <!-- component -->
          <div class="relative pt-1">
            <div class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer">
              <div  :style="{width: `${width}%`}" aria-valuenow="25" aria-valuemin="0"  aria-valuemax="100" class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger">
                  <div class="icon-wrap"></div>
              </div>
            </div>
          </div>
          <div class="cursor-pointer dropdown">
          <p class="flex mt-2 mb-5">Choose your account type <info-icon class="ml-2 mt-1"/> 
            <Tooltip class="text-white text-sm dropdown-menu" 
            text="Account type is dependent of the type of services you want to receive/render. 
                Patient account (Individual or Group), Provider account (Hospital, Laboratory, Pharmacy, Opticians, Dental or EMT) and Payer account
                ">
            </Tooltip>
          </p>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-32">
            <div class="cursor-pointer">
              <div class="bg-gray-100 rounded-md p-10 h-32 w-32 cursor-pointer" @mouseleave="isVisible = false" @keydown.enter="isVisible = !isVisible" :class="{'bg-danger-100 , dropdown': checked == true}" @click="checkValue">
                <chevron-down-icon class="text-white -mt-7 mb-3 stroke-current ml-14" v-if="checked"/>
                <ul  class="bg-white rounded w-40 h-24 absolute text-gray-700 p-2 -mt-2 border-2" v-show="isVisible">
                    <li class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                      <span class="flex item-center"> <cornie-radio class="col-span-2" name="patient" id="Individual" style="z-index:1"/> Individual </span>
                    </li>
                    <li class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex item-center"> <cornie-radio class="col-span-2" name="patient" id="group" /> Group </div>
                    </li>
                  </ul>
                <input type="radio" class="hidden" id="patient" value="patient" v-model="accountType"/>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="justify-center ml-2" :class="{'hidden': checked == true}" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14.0003 14.0003C17.6837 14.0003 20.667 11.017 20.667 7.33366C20.667 3.65033 17.6837 0.666992 14.0003 0.666992C10.317 0.666992 7.33366 3.65033 7.33366 7.33366C7.33366 11.017 10.317 14.0003 14.0003 14.0003ZM14.0003 17.3337C9.55032 17.3337 0.666992 19.567 0.666992 24.0003V27.3337H27.3337V24.0003C27.3337 19.567 18.4503 17.3337 14.0003 17.3337Z" fill="#1F1514"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg"  class="justify-center ml-2" v-if="checked" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14.0003 14.0003C17.6837 14.0003 20.667 11.017 20.667 7.33366C20.667 3.65033 17.6837 0.666992 14.0003 0.666992C10.317 0.666992 7.33366 3.65033 7.33366 7.33366C7.33366 11.017 10.317 14.0003 14.0003 14.0003ZM14.0003 17.3337C9.55032 17.3337 0.666992 19.567 0.666992 24.0003V27.3337H27.3337V24.0003C27.3337 19.567 18.4503 17.3337 14.0003 17.3337Z" fill="white"/>
                  </svg>
                  <p class="font-semibold text-center" :class="{'text-white': checked == true}">Patient</p>
                </div>
              </div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-gray-100 rounded-md p-10 h-32 w-32 cursor-pointer"   @mouseleave="isVisible2 = false" @keydown.enter="isVisible2 = !isVisible2" :class="{'bg-danger-100': checked2 == true}" @click="checkValue2">
                <chevron-down-icon class="text-white -mt-7 mb-3 stroke-current ml-14" v-if="checked2"/>
                  <ul  class="dropdown-menu  bg-white rounded w-50 h-80 absolute text-gray-700 p-2 -mt-2 border-2" v-show="isVisible2">
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                      <span class="flex item-center"> <cornie-radio name="provider" id="hospital"  class="col-span-2 mb-3" style="z-index:1"/><p> Hospital</p> </span>
                    </li>
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex"> <cornie-radio id="lab" name="provider"  class="col-span-2 mb-3"/> <p>Laboratory</p></div>
                    </li>
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex"> <cornie-radio id="pharmacy" name="provider" class="col-span-2 mb-3"/> <p>Community Pharmacy</p> </div>
                    </li>
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex"> <cornie-radio id="optician" name="provider"  class="col-span-2 mb-3"/> <p>Opticians</p> </div>
                    </li>
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex"> <cornie-radio id="dental" name="provider" class="col-span-2 mb-3"/> <p>Dental</p> </div>
                    </li>
                    <li class="list-none items-center flex text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2">
                        <div class="flex"> <cornie-radio id="emt" name="provider" class="col-span-2 mb-3"/> <p> EMT </p></div>
                    </li>
                  </ul>
                  <input type="radio" class="hidden" id="provider" value="provider" v-model="accountType"/>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="justify-center ml-2"  :class="{'hidden': checked2 == true}" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M27.1667 0H3.83333C2 0 0.516667 1.5 0.516667 3.33333L0.5 26.6667C0.5 28.5 2 30 3.83333 30H27.1667C29 30 30.5 28.5 30.5 26.6667V3.33333C30.5 1.5 29 0 27.1667 0ZM25.5 18.3333H18.8333V25H12.1667V18.3333H5.5V11.6667H12.1667V5H18.8333V11.6667H25.5V18.3333Z" fill="#1F1514"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="justify-center ml-2"  v-if="checked2" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M27.1667 0H3.83333C2 0 0.516667 1.5 0.516667 3.33333L0.5 26.6667C0.5 28.5 2 30 3.83333 30H27.1667C29 30 30.5 28.5 30.5 26.6667V3.33333C30.5 1.5 29 0 27.1667 0ZM25.5 18.3333H18.8333V25H12.1667V18.3333H5.5V11.6667H12.1667V5H18.8333V11.6667H25.5V18.3333Z" fill="white" style="&#10;"/>
                    </svg>
                    <p class="font-semibold text-center" :class="{'text-white': checked2 == true}">Provider</p>
                  </div>
              </div>
            </div>
            <div class="bg-gray-100 rounded-md p-10 h-32 w-32 cursor-pointer" :class="{'bg-danger-100': checked3 == true}" @click="checkValue3">
              <input type="radio" class="hidden" id="payer" value="payer" v-model="accountType"/>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="justify-center ml-2" :class="{'hidden': checked3 == true}" width="34" height="30" viewBox="0 0 34 30" fill="none">
                <path d="M16.9997 6.66667V0H0.333008V30H33.6663V6.66667H16.9997ZM6.99967 26.6667H3.66634V23.3333H6.99967V26.6667ZM6.99967 20H3.66634V16.6667H6.99967V20ZM6.99967 13.3333H3.66634V10H6.99967V13.3333ZM6.99967 6.66667H3.66634V3.33333H6.99967V6.66667ZM13.6663 26.6667H10.333V23.3333H13.6663V26.6667ZM13.6663 20H10.333V16.6667H13.6663V20ZM13.6663 13.3333H10.333V10H13.6663V13.3333ZM13.6663 6.66667H10.333V3.33333H13.6663V6.66667ZM30.333 26.6667H16.9997V23.3333H20.333V20H16.9997V16.6667H20.333V13.3333H16.9997V10H30.333V26.6667ZM26.9997 13.3333H23.6663V16.6667H26.9997V13.3333ZM26.9997 20H23.6663V23.3333H26.9997V20Z" fill="#1F1514"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="justify-center ml-2" v-if="checked3" width="34" height="30" viewBox="0 0 34 30" fill="none">
                <path d="M16.9997 6.66667V0H0.333008V30H33.6663V6.66667H16.9997ZM6.99967 26.6667H3.66634V23.3333H6.99967V26.6667ZM6.99967 20H3.66634V16.6667H6.99967V20ZM6.99967 13.3333H3.66634V10H6.99967V13.3333ZM6.99967 6.66667H3.66634V3.33333H6.99967V6.66667ZM13.6663 26.6667H10.333V23.3333H13.6663V26.6667ZM13.6663 20H10.333V16.6667H13.6663V20ZM13.6663 13.3333H10.333V10H13.6663V13.3333ZM13.6663 6.66667H10.333V3.33333H13.6663V6.66667ZM30.333 26.6667H16.9997V23.3333H20.333V20H16.9997V16.6667H20.333V13.3333H16.9997V10H30.333V26.6667ZM26.9997 13.3333H23.6663V16.6667H26.9997V13.3333ZM26.9997 20H23.6663V23.3333H26.9997V20Z" fill="white"/>
                </svg>
                <p class="font-semibold text-center" :class="{'text-white': checked3 == true}">Payer</p>
              </div>
            </div>   
          </div>
          <cornie-btn
            class="font-semibold rounded-full bg-gray-500 mt-3 w-full text-white p-2 "
            :class="{'bg-danger-100': checked == true || checked2 == true || checked3 == true}"
            @click="next">
            Next
          </cornie-btn>
      </div>
      <div class="" v-if="step == 2">
          <!-- component -->
          <div class="relative pt-1">
            <div class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer" @click="back">
              <div :style="{width: `${width}%`}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" class="cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger">
                    <div class="icon-wrap2"></div>
              </div>
            </div>
          </div>
          <p class="mt-2 mb-5">You will be the root administrator for this account</p>
           <cornie-input :rules="requiredString" v-model="fullName" required class="w-full mb-3" placeholder="First, Middle, Surname" label="Full Name"/>
            <cornie-input v-model="email" :rules="emailRule" class="w-full mb-3" placeholder="Enter Email Address" label="Email Address"/>
            <phone-input v-model:code="dialCode" v-model="phone" :rules="phoneRule" class="w-full mb-4" label="Phone number"/>
            <label for="promos" class="flex mb-1 items-center">
              <input id="promos" type="checkbox" />
              <span class="ml-1 text-xs">
                Receive relevant offers and promotions from Cornie Health
              </span>
            </label>
            <label for="terms" class="mt-1 mb-2 flex items-center">
              <input required id="terms" type="checkbox" />
              <span class="ml-1 text-xs">
                By continuing to sign up, I agree to Cornie Healths Terms of Service
              </span>
            </label>
          <cornie-btn
            class="font-semibold rounded-full bg-gray-500 mt-3 w-full text-white p-2" type="submit" :loading="loading">
            Continue
          </cornie-btn>
      </div>
      <div class="" :user="user" v-if="step == 3 && userCreated">
          <!-- component -->
        <div class="relative pt-1">
            <div class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer" @click="back">
              <div :style="{width: `${width}%`}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" class="cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger">
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
       <!-- <cornie-btn
              class="font-semibold rounded-full bg-gray-500 mt-3 w-full text-white p-2"
              @click="next">
              Next
        </cornie-btn>-->
      </div>
          <!-- component -->
      <div class="" :user="user" v-if="step == 4 && userCreated" >
        <div class="relative pt-1">
            <div class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer" @click="back">
              <div :style="{width: `${width}%`}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" class="cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger">
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
  </div>
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
    Tooltip
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

  requiredString = string().required().trim();
  phoneRule = string().matches(phoneRegex, "A valid phone number is required");
  emailRule = string().email("A valid email is required").required();

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
  width_percent= 25;
  width= 25;

  @user.Mutation
  setCornieData!: (data: any) => void;

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
      id: payload.userId,
      email: payload.email,
    };
  }
  checkValue(){
    this.isVisible = true;
    this.checked = true;
    this.checked2 = false;
    this.checked3 = false;
    this.accountType = 'Patient';
  }
  checkValue2(){
    this.isVisible2 = true;
    this.checked2 = true;
    this.checked = false;
    this.checked3 = false;
    this.accountType = 'Provider';
  }
  checkValue3(){
    this.checked2 = false;
    this.checked = false;
    this.checked3 = true;
    this.accountType = 'Payer';
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
        window.notify({ msg: data.data.errors.message, status: "error" });
          this.back();
      }
    } catch (error) {
      if (error instanceof ErrorResponse && error.response.status == 422) {
        window.notify({ msg: error.message, status: "error" });
        this.back();
      } else if (
        error instanceof ErrorResponse &&
        error.response.status == 400
      ) {
        window.notify({ msg: error.response.errors!.summary, status: "error" });
        this.back()
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
.bg-gray-500{
  background-color: #8785AD;
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
    background-color: #F6F8F9;
}
.icon-wrap {
   content:counter(step);
  counter-increment: step;
    background: #fff;
    border-radius: 50%;
        top: -0.3em;

    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 40em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
 .icon-check-mark{
         top: 8.8em;
    z-index: 1;
   left: 9em;
    right: 0;
    position: absolute;
}
.icon-check-mark2{
       top: 8.8em;
    z-index: 1;
   left: 17em;
    right: 0;
    position: absolute;
}
.icon-check-mark3{
      top: 8.8em;
    z-index: 1;
   left: 25.5em;
    right: 0;
    position: absolute;
}
.bg-danger-100{
    background-color: #FE4D3C;
}
input[type=radio]:checked{
    background-color: #FE4D3C;
}
</style>
