<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full">
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
            View Profile
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="$emit('close')"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-4">
        <div class="w-full">
          <div class="">
            <back-btn />
            <div class="info-container px-6 pt-6 pb-7">
              <div class="flex items-center">
                <img
                  class="mr-4 w-20 h-20 rounded-full"
                  :src="practitioner.photo"
                  alt=""
                />
                <div
                  class="w-11/12 flex xl:flex-row flex-col xl:items-center items-start justify-between"
                >
                  <div class="xl:flex block items-center">
                    <h3 class="mr-4">
                      {{ practitioner && practitioner.name }}
                    </h3>
                    <!-- <img
							:src="`/images/ratings/${practitioner.rating}star.svg`"
							alt=""
						/> -->
                  </div>

                  <div class="xl:mt-0 mt-8 flex items-center justify-end">
                    <button
                      class="bg-red-500 px-6 py-3 text-white rounded-xl"
                      type="button"
                      @click="openAppointmentModal"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-8 xl:grid block grid-cols-4 gap-x-8 gap-y-8">
                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-doctor-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Specialization</span>
                    <p class="text-grey-blue mr-2">
                      {{
                        practitioner &&
                        practitioner.specialization &&
                        practitioner.specialization.length
                      }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-date-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Clinical Experience</span>
                    <p class="text-grey-blue mr-2">
                      {{
                        practitioner && practitioner.clinicalExperienceInMonths
                      }}
                      Years
                    </p>
                  </div>
                </div>

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-fee-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Consultation Fee</span>
                    <p>
                      <span class="text-grey-blue mr-2"><u></u></span> ₦
                      {{ practitioner && practitioner.consultationFeePerHour }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-date-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold capitalize mb-2">Active Since</span>
                    <p
                      v-if="practitioner && practitioner.activeSince"
                      class="text-grey-blue mr-2"
                    >
                      {{ formatDate(practitioner.activeSince) }}
                    </p>
                  </div>
                </div>

                <!-- <div class="flex items-start xl:mb-0 mb-6">
						<img
							class="mr-2"
							src="@/assets/img/book-appointment/icon (3).png"
							alt=""
						/>
						<div>
							<span class="font-bold mb-2"
							>Patient Reviews</span
							>
							<p class="text-grey-blue">
								<span class="ml-4 text-razzmataz-pry">View</span>
							</p>
						</div>
					</div> -->

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-phone-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Phone Number</span>
                    <p class="text-grey-blue mr-2">
                      {{ practitioner && practitioner.phone }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-mail-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Email</span>
                    <p class="text-grey-blue capitalize mr-2">
                      {{ practitioner && practitioner.email }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start xl:mb-0 mb-6">
                  <!-- <img
                    class="mr-2"
                    src="@/assets/img/book-appointment/icon-location-white.png"
                    alt=""
                  /> -->
                  <div>
                    <span class="font-bold mb-2">Address</span>
                    <p class="text-grey-blue capitalize mr-2">
                      {{ practitioner && practitioner.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-sm font-semibold text-center text-red-500 mt-9 mb-5">
              View address in map
            </p>

            <div class="info-container p-6">
              <ul class="flex items-center border-b mb-8">
                <li
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :class="{ 'active-tab': activeTab === tab }"
                  class="py-2 px-4 text-grey-blue cursor-pointer"
                  @click="handleActiveTab(tab)"
                >
                  {{ tab }}
                </li>
              </ul>

              <div v-if="activeTab === 'Basic'">
                <basic-info :practitioner="practitioner"></basic-info>
              </div>
              <!-- <div v-if="activeTab === 'Reviews'">
					<reviews :practitioner="practitioner"></reviews>
				</div> -->
              <!-- <div v-if="activeTab === 'Insurance'">
					<insurance :practioner="practitioner" />
				</div> -->
            </div>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>

    <appointment-modal
      :id="practitioner.id"
      :practitioner="practitioner"
      :practitionerLocations="locations"
      v-model="showAppointmentModal"
      @close="showAppointmentModal = false"
    />
  </cornie-dialog>
</template>

<script lang="ts">
  import search from "@/plugins/search";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";

  import AppointmentModal from "./AppointmentModal.vue";
  import BasicInfo from "./BasicInfo.vue";
  import Insurance from "./Insurance.vue";
  import Reviews from "./Reviews.vue";

  // const user = namespace("user");

  type Sorter = (a: any, b: any) => number;
  function defaultFilter(item: any, query: string) {
    return search.searchObject(item, query);
  }

  @Options({
    name: "DoctorsProfile",
    components: {
      ...CornieCard,
      CancelIcon,
      CornieDialog,
      CancelRedBg,
      ArrowLeft,
      CornieBtn,
      BasicInfo,
      Reviews,
      Insurance,
      AppointmentModal,
    },
  })
  export default class DoctorsProfile extends Vue {
    activeTab: string = "Basic";
    tabs: Array<any> = ["Basic"];
    show = false;
    loading = false;
    showAppointmentModal = false;

    @Prop({ type: Object, default: {} })
    practitioner!: any;

    @Prop({ type: Array, default: [] })
    locations!: any[];

    handleActiveTab(tab: any) {
      this.activeTab = tab;
    }

    formatDate(date: any) {
      return new Date(date).toLocaleString("en-US");
    }

    created() {}

    openAppointmentModal() {
      this.showAppointmentModal = true;
    }
  }
</script>

<style scoped>
  img {
    filter: brightness(8.5);
  }

  .text-grey-blue {
    color: #667499;
  }
  .info-container {
    background: #ffffff;
    border: 0.2px solid #c2c7d6;
    box-sizing: border-box;
    box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
    border-radius: 16px;
  }
  .active-tab {
    border-bottom: 4px solid #fe4d3c;
    font-weight: 600;
    color: #14171f;
  }

  .text-grey-eth {
    color: #c2c7d6;
  }
</style>
