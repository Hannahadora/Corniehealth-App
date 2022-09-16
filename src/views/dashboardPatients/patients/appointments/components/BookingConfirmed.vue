<template>
    <cornie-dialog v-model="show" right class="xl:w-1/2 lg:w-10/12 w-full h-full">
      <cornie-card
        height="100%"
        class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
      >
        <cornie-card-title class="flex items-center">
          <icon-btn @click="$emit('close')">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <div class="w-full">
            <h2
              class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
            >
              Booking Confirmed
            </h2>
            <cancel-red-bg
              class="float-right cursor-pointer"
              @click="$emit('close')"
            />
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable mt-1">
            <p class="text-grey-blue mb-5">An appointment confirmation has been emailed to you</p>
          <div class="w-full">
            <table class="border w-full">
             
              <tr>
                <td>Date & Time</td>
                <td class="flex justify-between">
                  <span>{{ selectedDate }} | {{ selectedTime }}</span>
                </td>
              </tr>
              <tr>
                <td>Appointment With</td>
                <td>{{ practitionerName }}</td>
              </tr>
              <tr>
                <td>Specialty</td>
                <td>{{ practitioner.designation }}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{{ practitioner.address }}</td>
              </tr>
              <tr>
                <td>Contact Info</td>
                <td>
                  {{ practitionerContact }} |
                  {{ practitioner.email }}
                </td>
              </tr>
            </table>

            <div class="w-full mx-auto mt-12 flex items-center justify-end">
            <cornie-btn
              class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
              @click="$emit('close')"
            >
              Book Another Appointment
            </cornie-btn>
            <cornie-btn
              class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
              @click="$emit('close')"
              :loading="loading"
            >
              Pre-visit Checklist
            </cornie-btn>
          </div>
        </div>

        </cornie-card-text>
      </cornie-card>
  </cornie-dialog>
  </template>
  
  <script lang="ts">
  import { Options, Vue, setup } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { cornieClient } from "@/plugins/http";
  import search from "@/plugins/search";
  
  import CornieCard from "@/components/cornie-card";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  
  import AppointmentModal from "./AppointmentModal.vue";
  
  const user = namespace("user");
  
  type Sorter = (a: any, b: any) => number;
  function defaultFilter(item: any, query: string) {
    return search.searchObject(item, query);
  }
  
  @Options({
    name: "ReviewPaymentModal",
    components: {
      ...CornieCard,
      ArrowLeftIcon,
      CancelIcon,
      CornieDialog,
      CornieInput,
      CornieRadio,
      CornieBtn,
      CancelRedBg,
      CornieSelect,
      ArrowLeft,
      CornieCheckbox,
      ChevronRightIcon,
      ChevronLeftIcon,
      AppointmentModal,
    },
  })
  export default class ReviewPaymentModal extends Vue {
    search: any = {};
    loading: Boolean = false;
    show = false;
    locations = [];
    paymentAccounts: any = [];
  
    @Prop({ type: Object, default: {} })
    practitioner!: any;
  
    @Prop({ type: Object, default: {} })
    appointment!: any;
  
    get selectedDate() {
      return this.appointment.date;
    }
  
    get selectedTime() {
      return this.appointment.startTime;
    }
  
    get practitionerName() {
      return (
        this.practitioner.name ||
        this.practitioner.firstName + " " + this.practitioner.lastName
      );
    }
  
    get practitionerContact() {
      if (this.appointment) {
        return (
          this.practitioner?.phone?.dialCode +
          " " +
          this.practitioner?.phone?.number
        );
      } else return this.practitioner.phone;
    }
  
    get paymentAccountId() {
      return undefined
    }

  
    created() {}
  }
  </script>
  
  <style scoped>
  img {
    filter: brightness(8.5);
  }
  .activetab {
    border-bottom: 3px solid #fe4d3c;
  }
  .activetab span {
    color: #14171f !important;
  }
  .activetab img {
    filter: brightness(1);
  }
  
  .text-grey-eth {
    color: #c2c7d6;
  }
  
  tr {
    /* border-bottom: 1px solid rgb(95, 94, 94); */
    line-break: normal;
  }
  td {
    font-size: 16px;
    padding: 16px;
  }
  tr:nth-child(even) {
    background: #f0f4fe;
  }
  
  @media screen and (max-width: 768px) {
    tr {
      line-break: auto;
    }
    td {
      font-size: 14px;
    }
  }
  </style>
  