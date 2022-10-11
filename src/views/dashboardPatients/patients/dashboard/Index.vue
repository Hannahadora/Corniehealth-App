<template>
  <div class="w-full mb-5 bg-white">
    <div class="flex flex-col md:flex-row md:p-5 p-2 w-full">
      <div class="w-full flex flex-col space-y-5">
        <div
          class="flex flex-col md:flex-row-reverse md:space-x-6 md:justify-between w-full bg-blue-200"
        >
          <div class="md:block hidden">
            <img
              class="w-full h-full"
              src="@/assets/img/patient-dashboard-1.png"
            />
          </div>
          <div class="md:pr-10 md:py-7 p-4 w-full">
            <p class="font-bold text-xl pb-5 text-primary">
              Welcome {{ fullName }}
            </p>
            <p class="text-primary md:truncate md:mr-10">
              Securely access and manage your health data anytime, anywhere
            </p>
            <p>Kindly complete your profile setings.</p>
          </div>
        </div>
        <div
          class="flex flex-col space-y-7 space-x-0 md:space-y-0 md:flex-row py-5 w-full md:space-x-7"
        >
          <div class="w-full shadow-md rounded-lg p-5">
            <p class="font-bold text-primary">My Info</p>
            <div class="flex flex-col space-y-3">
              <div class="flex w-full pt-5">
                <div class="flex-1 text-gray-400">Name</div>
                <div class="flex-none">{{ fullName }}</div>
              </div>
              <div class="flex w-full">
                <div class="flex-1 text-gray-400">Gender</div>
                <div class="flex-none">{{ gender }}</div>
              </div>
              <div class="flex w-full">
                <div class="flex-1 text-gray-400">MRN</div>
                <div class="flex-none">{{ corniePatient?.mrn }}</div>
              </div>
              <div class="flex w-full justify-start">
                <div class="flex-1 text-gray-400">Date of Birth</div>
                <div class="flex-none text-left">
                  {{ corniePatient?.dateOfBirth }}
                </div>
              </div>
              <div class="flex w-full justify-start">
                <div class="flex-1 text-gray-400">Blood Type</div>
                <div class="flex-none text-left">
                  {{ corniePatient?.bloodGroup }}
                </div>
              </div>
              <div class="flex w-full justify-start">
                <div class="flex-1 text-gray-400">Genotype</div>
                <div class="flex-none text-left">
                  {{ corniePatient?.genotype }}
                </div>
              </div>
              <div class="flex w-full justify-start">
                <div class="flex-1 text-gray-400">Phone number</div>
                <div class="flex-none text-left">
                  {{ phone?.dialCode }} {{ phone?.number }}
                </div>
              </div>
              <div class="flex w-full justify-start">
                <div class="flex-1 text-gray-400">Email</div>
                <div class="flex-none text-left">
                  {{ cornieUser?.email }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full shadow-md rounded-lg p-5 pb-1">
            <p class="font-bold text-primary">Payment Info</p>
            <div
              class="flex flex-col capitalize"
              v-if="paymentDetails.length > 0"
              v-for="(p, i) in paymentDetails"
              :key="i"
            >
              <div v-if="p.type == 'card'">
                <div class="flex w-full pt-5">
                  <div class="flex-1">Bank</div>
                  <div class="flex-none">{{ p.card.bank }}</div>
                </div>
                <div class="flex w-full pt-5">
                  <div class="flex-1">Card Type</div>
                  <div class="flex-none">{{ p.card.cardType }}</div>
                </div>
                <div class="flex w-full pt-5 border-dashed border-b-2 pb-4">
                  <div class="flex-1">Card Number</div>
                  <div class="flex-none">
                    {{ "**** **** **" + p.card.lastFourDigits }}
                  </div>
                </div>
              </div>
              <div v-if="p.type == 'insurance'">
                <div class="flex w-full pt-5">
                  <div class="flex-1">Plan</div>
                  <div class="flex-none">
                    <span class="bg-green-100 text-green-300">{{
                      p?.insurance?.plan
                    }}</span>
                  </div>
                </div>
                <div class="flex w-full pt-5">
                  <div class="flex-1">Policy #</div>
                  <div class="flex-none">
                    {{ p?.insurance?.policyNo }}
                  </div>
                </div>
                <div class="flex w-full pt-5 border-dashed border-b-2 pb-4">
                  <div class="flex-1">Expires</div>
                  <div class="flex-none">
                    {{ p?.insurance?.policyExpiry }}
                  </div>
                </div>
              </div>
              <div v-if="p.type == 'wallet'">
                <div class="flex w-full pt-5">
                  <div class="flex-1">Wallet Name</div>
                  <div class="flex-none">
                    {{ p?.wallet?.walletName }}
                  </div>
                </div>
                <div class="flex w-full pt-5">
                  <div class="flex-1">Wallet ID</div>
                  <div class="flex-none">
                    <span>{{ p?.wallet?.walletId }}</span>
                    <a class=""
                      ><span class="text-red-500 ml-2 text-sm">Fund</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-danger rounded-xl text-white text-lg text-center font-bold px-5 py-5 mt-10 mb-1 cursor-pointer"
            >
              Update Payment Info
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-5 shadow-md p-3">
          <div class="text-primary text-lg font-bold">Provider Info</div>
          <div class="flex flex-col md:flex-row md:justify-between">
            <div class="text-gray-400">Primary Physican</div>
            <div>
              <span>{{ primaryDoctor }}</span>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-7 gap-5 grid-cols-1">
          <appointment-card
            @showAppointment="handleAppointment"
            :appointments="dashBoardDetails.upcomingAppointments"
            :viewAllLink="viewAllAppointment"
          />
          <medication-card :medications="dashBoardDetails.activeMedications" />
          <PatientDiagnosticsCard
            :diagnostics="dashBoardDetails?.activeDiagnostics"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import AppointmentCard from "@/components/appointmentCard.vue";
  import MedicationCard from "@/components/medicationCard.vue";
  import PatientDiagnosticsCard from "@/components/patient-diagnostics-card.vue";
  import { cornieClient } from "@/plugins/http";
  import { CornieUser } from "@/types/user";
  import { Options, Vue } from "vue-class-component";

  import { namespace } from "vuex-class";

  const account = namespace("user");

  @Options({
    name: "DashboardPatientHome",
    components: {
      AppointmentCard,
      MedicationCard,
      PatientDiagnosticsCard,
    },
  })
  export default class DashboardPatientHome extends Vue {
    @account.State
    cornieData!: any;

    @account.Getter
    cornieUser!: CornieUser;

    @account.Getter
    corniePatient!: any;

    allPatientAccount = [] as any[];

    dashBoardDetails = {} as any;

    phone: any = {};

    get fullName() {
      return this.cornieUser?.firstName + " " + this.cornieUser?.lastName;
    }

    get viewAllAppointment() {
      return `/dashboard/patient/appointments/`;
    }
    get paymentDetails() {
      let data = [];
      const cardAccount = this.allPatientAccount.find((x) => x?.type == "card");
      const insurance = this.allPatientAccount.find(
        (x) => x?.type == "insurance"
      );
      const wallet = this.allPatientAccount.find((x) => x?.type == "wallet");
      data.push(cardAccount, insurance, wallet);
      const result = data.filter((x) => x !== undefined).slice(-2);
      return result;
    }

    get userId() {
      return this.cornieUser?.id;
    }

    get gender() {
      return this.corniePatient?.gender;
    }

    get primaryDoctor() {
      return this.corniePatient?.primaryDoctor;
    }

    handleAppointment() {}
    async dash() {
      const pending = cornieClient().get(`/api/v1/patient-portal/dashboard`);
      const response = await Promise.all([pending]);
      this.dashBoardDetails = response[0].data;
      console.log("dasboard", response[0].data);
    }
    async fetchPaymentAccounts() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/payment`
      );
      this.allPatientAccount = response.data;
    }
    async fetchUserContact() {
      const details = cornieClient().get(
        `/api/v1/patient/getContact/${this.userId}`
      );
      const response = await Promise.all([details]);
      this.phone = response[0].data?.phone;
    }
    async mounted() {
      await this.dash();
      await this.fetchPaymentAccounts();
      await this.fetchUserContact();
    }
  }
</script>

<style scoped>
  .greet {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 45px;
    color: #14171f;
  }

  .s1-slider {
    width: fit-content;
    font-family: "Inter";
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #14171f;
    background: #f0f1f5;
    display: flex;
    flex-direction: row;
  }
</style>
