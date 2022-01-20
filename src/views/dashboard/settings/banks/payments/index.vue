<template>
  <div class="bg-white rounded p-5 mt-5">
    <div class="">
      <h3 class="text-primary font-bold border-b-2 border-gray-200 pb-4">
        You can activate the Virtual NUBAN Account to manage your payments.
      </h3>
      <ul class="nav nav-tabs nav-tabs-bottom widget_categories mt-8">
        <li class="nav-item cursor-pointer">
          <a
            class="nav-link"
            @click="select(1)"
            :class="{ active: selected === 1 }"
            :aria-selected="selected === 1"
            >Virtual NUBAN Accounts</a
          >
        </li>
        <!-- <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Direct Debit</a></li> -->
      </ul>

      <div class="tab-content">
        <div
          class="tab-pane"
          v-if="selected == 1"
          :class="{ active: selected === 1 }"
          id="NUBAN"
        >
          <p class="mt-5 text-sm">
            The virtual account helps you process payroll and supplier payments
            on Cloudenly independent of your regular bank accounts. You need to
            transfer funds to your virtual account to start making payments. You
            will need to maintain enough balance
            <a href="#" class="text-blue-600"> IN YOUR VIRTUAL ACCOUNT</a> to
            cover your outgoing payments.
          </p>
          <p class="mt-4 text-sm">
            Your virtual account can only be used on Cloudenly. This service is
            offered in partnership with Paystack.
          </p>
          <div
            class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
          >
            <img src="@/assets/img/nobank.svg" class="mb-2" />
            <h4 class="text-black text-center">No Virtual NUBAN  </h4>
          </div>
          <div class="w-full space-x-2 mt-5 hidden">
            <span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0945 2.56095L9.40704 1.7172C9.36798 1.69767 9.32492 1.6875 9.28125 1.6875C9.23758 1.6875 9.19452 1.69767 9.15546 1.7172L7.46796 2.56095C7.42125 2.58431 7.38196 2.62021 7.3545 2.66464C7.32705 2.70907 7.3125 2.76026 7.3125 2.81249V3.65624C7.3125 3.73083 7.34213 3.80237 7.39488 3.85511C7.44762 3.90786 7.51916 3.93749 7.59375 3.93749V4.49999C7.51916 4.49999 7.44762 4.52962 7.39488 4.58237C7.34213 4.63511 7.3125 4.70665 7.3125 4.78124V5.62499C7.3125 5.69958 7.34213 5.77112 7.39488 5.82386C7.44762 5.87661 7.51916 5.90624 7.59375 5.90624H10.9688C11.0433 5.90624 11.1149 5.87661 11.1676 5.82386C11.2204 5.77112 11.25 5.69958 11.25 5.62499V4.78124C11.25 4.70665 11.2204 4.63511 11.1676 4.58237C11.1149 4.52962 11.0433 4.49999 10.9688 4.49999V3.93749C11.0433 3.93749 11.1149 3.90786 11.1676 3.85511C11.2204 3.80237 11.25 3.73083 11.25 3.65624V2.81249C11.25 2.76026 11.2355 2.70907 11.208 2.66464C11.1805 2.62021 11.1413 2.58431 11.0945 2.56095ZM7.875 2.9863L9.28125 2.28318L10.6875 2.9863V3.37499H7.875V2.9863ZM9 4.49999V3.93749H9.5625V4.49999H9ZM8.15625 3.93749H8.4375V4.49999H8.15625V3.93749ZM10.6875 5.34374H7.875V5.06249H10.6875V5.34374ZM10.4062 4.49999H10.125V3.93749H10.4062V4.49999Z"
                  fill="#FE4D3C"
                />
                <path
                  d="M8.15625 7.3125C8.15625 7.38709 8.18588 7.45863 8.23863 7.51137C8.29137 7.56412 8.36291 7.59375 8.4375 7.59375H10.125C10.1729 7.59375 10.2201 7.58149 10.2619 7.55814C10.3038 7.53479 10.339 7.50113 10.3642 7.46035C10.3894 7.41957 10.4038 7.37302 10.4059 7.32513C10.4081 7.27723 10.398 7.22959 10.3765 7.18671L10.0953 6.6242C10.0616 6.55809 10.0031 6.50798 9.9326 6.48479C9.86211 6.4616 9.7853 6.46721 9.71893 6.5004C9.65255 6.5336 9.60199 6.59168 9.57825 6.66199C9.55451 6.7323 9.55952 6.80915 9.5922 6.87578L9.66993 7.03124H8.4375C8.36291 7.03124 8.29137 7.06088 8.23863 7.11362C8.18588 7.16637 8.15625 7.2379 8.15625 7.3125Z"
                  fill="#FE4D3C"
                />
                <path
                  d="M10.125 7.875H8.43749C8.38955 7.875 8.3424 7.88726 8.30053 7.91061C8.25866 7.93395 8.22345 7.96761 8.19825 8.0084C8.17305 8.04918 8.15869 8.09573 8.15653 8.14362C8.15438 8.19151 8.16451 8.23916 8.18595 8.28204L8.4672 8.84454C8.48354 8.87786 8.50632 8.90763 8.53422 8.93211C8.56212 8.95659 8.59459 8.97531 8.62976 8.98718C8.66493 8.99905 8.7021 9.00385 8.73913 9.00129C8.77616 8.99873 8.81232 8.98886 8.84551 8.97226C8.87871 8.95566 8.9083 8.93265 8.93256 8.90456C8.95683 8.87647 8.97529 8.84385 8.98689 8.80859C8.99849 8.77333 9.00299 8.73612 9.00014 8.69912C8.99729 8.66211 8.98714 8.62603 8.97028 8.59296L8.89255 8.4375H10.125C10.1996 8.4375 10.2711 8.40787 10.3239 8.35512C10.3766 8.30238 10.4062 8.23084 10.4062 8.15625C10.4062 8.08166 10.3766 8.01012 10.3239 7.95738C10.2711 7.90463 10.1996 7.875 10.125 7.875Z"
                  fill="#FE4D3C"
                />
                <path
                  d="M16.0312 0.5625H5.0625C4.6151 0.562993 4.18616 0.740941 3.8698 1.0573C3.55344 1.37366 3.37549 1.8026 3.375 2.25V12.9375H1.96875C1.59592 12.9379 1.23848 13.0862 0.974844 13.3498C0.711211 13.6135 0.562919 13.9709 0.5625 14.3438V15.1875C0.5625 15.2621 0.592132 15.3336 0.644876 15.3864C0.697621 15.4391 0.769158 15.4688 0.84375 15.4688H2.8125V16.0312C2.81292 16.4041 2.96121 16.7615 3.22484 17.0252C3.48848 17.2888 3.84592 17.4371 4.21875 17.4375H13.7812C14.1541 17.4371 14.5115 17.2888 14.7752 17.0252C15.0388 16.7615 15.1871 16.4041 15.1875 16.0312V3.375H17.1562C17.2308 3.375 17.3024 3.34537 17.3551 3.29262C17.4079 3.23988 17.4375 3.16834 17.4375 3.09375V1.96875C17.4371 1.59592 17.2888 1.23848 17.0252 0.974844C16.7615 0.711211 16.4041 0.562919 16.0312 0.5625ZM1.125 14.3438C1.12526 14.1201 1.21424 13.9056 1.37242 13.7474C1.53059 13.5892 1.74505 13.5003 1.96875 13.5H10.4069C10.2236 13.7431 10.1247 14.0393 10.125 14.3438V14.9062H1.125V14.3438ZM8.4375 12.9375V12.375H11.25V12.9375H8.4375ZM5.0625 11.25H7.875V11.8125H5.0625V11.25ZM8.4375 11.25H11.25V11.8125H8.4375V11.25ZM13.5 11.25V11.8125H11.8125V11.25H13.5ZM11.8125 12.9375V12.375H13.5V12.9375H11.8125ZM13.5 13.5V14.0625H12.9094C12.8677 13.8585 12.781 13.6663 12.6557 13.5H13.5ZM12.9375 14.625H13.5V15.1875H12.9375V14.625ZM13.5 10.6875H5.0625V10.125H13.5V10.6875ZM5.0625 12.375H7.875V12.9375H5.0625V12.375ZM4.21875 16.875C3.99505 16.8747 3.78059 16.7858 3.62242 16.6276C3.46424 16.4694 3.37526 16.2549 3.375 16.0312V15.4688H10.4062C10.4808 15.4688 10.5524 15.4391 10.6051 15.3864C10.6579 15.3336 10.6875 15.2621 10.6875 15.1875V14.3438C10.6875 14.12 10.7764 13.9054 10.9346 13.7471C11.0929 13.5889 11.3075 13.5 11.5312 13.5C11.755 13.5 11.9696 13.5889 12.1279 13.7471C12.2861 13.9054 12.375 14.12 12.375 14.3438V16.0312C12.3747 16.3357 12.4736 16.6319 12.6569 16.875H4.21875ZM12.9375 16.0312V15.75H13.5V16.8266C13.3356 16.7683 13.1933 16.6605 13.0926 16.5181C12.9919 16.3757 12.9377 16.2057 12.9375 16.0312ZM14.625 16.0312C14.6248 16.2057 14.5706 16.3757 14.4699 16.5181C14.3692 16.6605 14.2269 16.7683 14.0625 16.8266V10.0547C14.0624 9.92419 14.0105 9.79909 13.9182 9.70681C13.8259 9.61454 13.7008 9.56264 13.5703 9.5625H4.99219C4.86169 9.56264 4.73659 9.61454 4.64431 9.70681C4.55204 9.79909 4.50014 9.92419 4.5 10.0547V12.9375H3.9375V2.25C3.93783 1.95173 4.05647 1.66578 4.26737 1.45487C4.47828 1.24397 4.76423 1.12533 5.0625 1.125H14.907C14.7237 1.36806 14.6247 1.6643 14.625 1.96875V16.0312ZM16.875 2.8125H15.1875V1.96875C15.1875 1.74497 15.2764 1.53036 15.4346 1.37213C15.5929 1.21389 15.8075 1.125 16.0312 1.125C16.255 1.125 16.4696 1.21389 16.6279 1.37213C16.7861 1.53036 16.875 1.74497 16.875 1.96875V2.8125Z"
                  fill="#FE4D3C"
                />
              </svg>
            </span>
            <span
              class="text-danger font-semibold text-sm cursor-pointer"
              @click="showModal"
            >
              Virtual NUBAN Accounts Setup
            </span>
          </div>
          <div class="hidden">
            <span class="flex justify-end w-full mb-8">
              <button
                class="flex space-x-3 bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 focus:outline-none hover:opacity-90"
                @click="showModal"
              >
                <span class="text-white mr-4">+</span> Create New
              </button>
            </span>
            <cornie-table :columns="rawHeaders" v-model="items">
              <template #actions="{ item }">
                <div
                  class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                  @click="
                    $router.push(
                      '/dashboard/settings/practise-management/transaction-history'
                    )
                  "
                >
                  <newview-icon class="text-yellow-500 fill-current" />
                  <span class="ml-3 text-xs">View History</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                >
                  <close-icon />
                  <span class="ml-3 text-xs">Deactivate </span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                  @click="deleteItem(item.id)"
                >
                  <delete-icon />
                  <span class="ml-3 text-xs">Delete Account</span>
                </div>
              </template>
            </cornie-table>
          </div>
        </div>
        <!-- <div class="tab-pane" v-if="selected == 2"  :class="{'active' :  selected === 2  }" id="Direct Debit">
          <p class="mt-5 text-sm">
            The direct debit payment service is a secure payment option provided
            by Paystack and the Nigeria Inter-Bank Settlement Service (NIBSS)
            through her automated payment service (NAPS).
          </p>
          <p class="mt-4 text-sm">
            It facilitates third-party payments from your regular profiled bank
            accounts to third-party beneficiaries (for Example, salary payments
            to employees, supplier payments, etc.)
          </p>
          <p class="mt-4 text-sm">
            To activate your account on Paystack, you must profile on NAPS. Once
            you set up, you can securely initiate and conclude third-party
            payments directly from Cloudenly.
          </p>
          <div
            class="p-2 mt-5 rounded text-sm bg-gray-100 cursor-pointer text-danger text-center font-semibold"
          >
            Set-up Process
          </div>
          <div class="grid grid-cols-3 gap-4 w-full">
            <div class="mt-7 shadow-md">
              <div class="flex space-x-4 justify-center bg-gray-100 p-3">
                <span>
                  <authorize-icon class="mt-3" />
                </span>
                <div>
                  <span class="text-danger text-sm font-semibold">STEP 1</span>
                  <p class="text-xs">Authorisation Templates</p>
                </div>
              </div>
              <div class="p-5 mt-5 justify-center">
                <p class="text-xs mb-5 leading-5">
                  Download the following documents templates, adapt, execute and
                  submit to the relevant parties
                </p>
                <p class="text-xs mb-5 leading-5">
                  1. Indemnity Letter- addressed to the CEO of your Bank.
                </p>
                <p class="text-xs mb-5 leading-5">
                  2. NAPS Profile Request - addressed to your account officer.
                </p>
                <p class="text-xs mb-5 leading-5">
                  3. Authorisation Letter- addressed to the CEO of Paystack.
                </p>
                <div class="flex space-x-4">
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.434 5.83431L8.79971 8.46863V0H7.19971V8.46863L4.5654 5.83431L3.43403 6.96568L7.99971 11.5314L12.5654 6.96568L11.434 5.83431ZM16 14.4001V11.2001H14.4V14.4001H1.6V11.2001H0V14.4001C0 15.2837 0.716344 16.0001 1.6 16.0001H14.4C15.2837 16.0001 16 15.2837 16 14.4001Z"
                        fill="#F15846"
                      />
                    </svg>
                  </span>
                  <span class="text-danger text-xs font-semibold">
                    Download templates
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-7 shadow-md">
              <div class="flex space-x-4 justify-center bg-gray-100 p-3">
                <span>
                  <transact-icon class="mt-3" />
                </span>
                <div>
                  <span class="text-danger font-semibold text-sm">STEP 2</span>
                  <p class="text-xs">Test transaction</p>
                </div>
              </div>
              <div class="p-5 mt-5 justify-center">
                <p class="text-xs mb-5 leading-5">
                  You will be notified by Paystack, once your account is set up.
                  You will be required to activate your account by completing a
                  test transaction of N100 below.
                </p>
                <div class="flex space-x-2">
                  <span>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.66699 0C14.617 0 18.667 4.05 18.667 9C18.667 13.95 14.617 18 9.66699 18C4.71699 18 0.666992 13.95 0.666992 9C0.666992 4.05 4.71699 0 9.66699 0ZM9.66699 1.8C7.95699 1.8 6.42699 2.34 5.25699 3.33L15.337 13.41C16.237 12.15 16.867 10.62 16.867 9C16.867 5.04 13.627 1.8 9.66699 1.8ZM14.077 14.67L3.99699 4.59C3.00699 5.76 2.46699 7.29 2.46699 9C2.46699 12.96 5.70699 16.2 9.66699 16.2C11.377 16.2 12.907 15.66 14.077 14.67Z"
                        fill="#F15846"
                      />
                    </svg>
                  </span>
                  <span class="text-danger text-xs font-semibold">
                    Activate Account
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-7 shadow-md">
              <div class="flex space-x-4 justify-center bg-gray-100 p-3">
                <span>
                  <authorize-icon class="mt-3" />
                </span>
                <div>
                  <span class="text-danger font-semibold text-sm">STEP 3</span>
                  <p class="text-xs">Start making payments</p>
                </div>
              </div>
              <div class="p-5 mt-5 justify-center">
                <p class="text-xs mb-5 leading-5">
                  You are all set! You can now start making payments directly
                  from Cloudenly - Process your payroll and supplier payments
                  while enforcing strict control.
                </p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <nuban-modal v-model="showNubanModal" :displayNubanTable="true" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import InfoIcon from "@/components/icons/info.vue";
import Select from "@/components/newautocomplete.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import { Prop, Watch, PropSync } from "vue-property-decorator";
import NubanModal from "./nubanmodal.vue";
import search from "@/plugins/search";
import CloseIcon from "@/components/icons/danger.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import AuthorizeIcon from "@/components/icons/authorize.vue";
import TransactIcon from "@/components/icons/transact.vue";
import PayIcon from "@/components/icons/pay.vue";
import ITask from "@/types/ITask";

const task = namespace("task");

@Options({
  components: {
    InfoIcon,
    Select,
    CornieRadio,
    CornieCheckbox,
    CornieInput,
    AuthorizeIcon,
    CornieSelect,
    AccordionComponent,
    NubanModal,
    TransactIcon,
    CloseIcon,
    CornieTable,
    PayIcon,
    CardText,
    NewviewIcon,
    DeleteIcon,
  },
})
export default class Payments extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  showNubanModal = false;
  selected = 1;
  query = "";



  select(i: number) {
    this.selected = i;
  }
  showModal() {
    this.showNubanModal = true;
  }
  

  
  created() {
    
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
:focus-visible {
  outline: none;
}
::placeholder {
  color: #000;
}
.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 9px;
  border-radius: 4px;
  width: 150px;
  bottom: 100%;
  opacity: 0;
  transition: opacity 1s;
  position: absolute;
  z-index: 1;
  background-color: #080056;
}
</style>
