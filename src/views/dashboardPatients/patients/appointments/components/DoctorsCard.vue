<template>
  <div>
    <div class="info-container xl:p-6 p-4 xl:mb-0 mb-8">
      <div class="w-full xl:pb-0 pb-8">
        <div class="flex items-center">
          <img
            class="mr-4 w-16 h-16 rounded-full"
            :src="practitioner.photo"
            alt=""
          />
          <div class="">
            <div class="mr-4 sub-titles-1">
              {{ practitioner.name }}
            </div>
            <div class="mt-1 text-base">
              {{ practitioner.designation }}
            </div>
            <!-- <img
              :src="`/images/ratings/${practitioner.rating}star.svg`"
              alt=""
            /> -->
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-3">
          <div class="flex items-start">
            <img
              class="mr-2"
              src="@/assets/img/book-appointment/icon-doctor-white.png"
              alt=""
            />
            <div>
              <p class="mr-2">{{ practitioner.specialty }}</p>
            </div>
          </div>

          <div class="flex items-start">
            <img
              class="mr-2"
              src="@/assets/img/book-appointment/icon-doctor-white.png"
              alt=""
            />
            <div>
              <p class="mr-2">Visit Type - {{ practitioner.visitType }}</p>
            </div>
          </div>

          <div class="flex items-start">
            <img
              class="mr-2"
              src="@/assets/img/book-appointment/icon-lang-white.png"
              alt=""
            />
            <div>
              <p class="mr-2">{{ practitioner.language }}</p>
            </div>
          </div>

          <div class="flex items-start">
            <img
              class="mr-2"
              src="@/assets/img/book-appointment/icon-fee-white.png"
              alt=""
            />
            <div>
              <p class="mr-2">
                Consultation Fee - {{ practitioner.consultationRate }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex xl:flex-row flex-col items-center xl:justify-between justify-center xl:mt-6 mt-8"
        >
          <cornie-btn
            class="xl:mr-6 xl:mb-0 mb-6 xl:w-1/2 w-full border-2 border-primary text-primary py-1 px-6 rounded-xl text-xs"
            @click="showDoctorsprofile = true"
          >
            View profile
          </cornie-btn>
          <cornie-btn
            class="xl:w-1/2 w-full bg-red-500 text-white rounded-xl py-1 px-6 text-xs"
            @click="showAppointmentModal = true"
          >
            Book Appointment
          </cornie-btn>
        </div>
      </div>
    </div>
    <doctors-profile-modal
      :practitioner="practitioner"
      :locations="practitioner.locations"
      v-model="showDoctorsprofile"
      @close="showDoctorsprofile = false"
    />

    <appointment-modal
      :id="practitioner.id"
      :practitioner="practitioner"
      :practitionerLocations="practitioner.locations"
      v-model="showAppointmentModal"
      @close="showAppointmentModal = false"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieBtn from "@/components/CornieBtn.vue";
import DoctorsProfileModal from "./DoctorsProfileModal.vue";
import AppointmentModal from "./AppointmentModal.vue";

@Options({
  name: "ReviewsInfo",
  components: { CornieBtn, DoctorsProfileModal, AppointmentModal },
})
export default class DoctorsCard extends Vue {
  @Prop({ type: Object, default: {} })
  practitioner!: any;
  showDoctorsprofile = false;
  showAppointmentModal = false;
}
</script>

<style scoped>
.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}
</style>
