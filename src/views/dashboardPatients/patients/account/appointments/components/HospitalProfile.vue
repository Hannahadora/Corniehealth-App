<template>
  <div>
    <div class="info-container p-6 mb-12">
      <div class="flex items-start mb-8">
        <img
          class="mr-4 hospital-icon"
          src="@/assets/book-appointment/unsplash_gkZ-k3xf25w.png"
          alt=""
        />
        <div class="w-3/5">
          <div class="mb-2 flex items-center">
            <span class="font-bold text-lg mr-2">{{
              hospital && hospital.name
            }}</span>
            <img src="@/assets/book-appointment/ratings.png" alt="" />
          </div>
          <div class="mb-2">
            {{ hospital && hospital.website }} |
            {{ hospital && hospital.phone }}
          </div>
          <div class="">{{ hospital && hospital.address }}</div>
        </div>
        <div class="w-1/5">
          <div class="lg:mb-2 mb-4 flex items-start">
            <img
              class="mr-3"
              src="@/assets/book-appointment/icon-date-white.png"
              alt=""
            />
            <span class="">Active Since{{ hospital && hospital.activeSince }}</span>
          </div>
          <div class="lg:mb-2 mb-4 flex items-center">
            <img
              class="mr-3"
              src="@/assets/book-appointment/icon-sethos-grey.png"
              alt=""
            />
            <span class="">{{ hospital && hospital.practitionerCount }}</span>
          </div>
          <div class="lg:mb-2 mb-4 flex items-center">
            <img
              class="mr-3"
              src="@/assets/book-appointment/icon-patients-grey.png"
              alt=""
            />
            <span class="">{{ hospital && hospital.patientCount }}</span>
          </div>
        </div>
      </div>

      <div class="mb-8 flex items-start col-span-2">
        <img
          class="mr-3"
          src="@/assets/book-appointment/icon-doctor-grey.png"
          alt=""
        />
        <div class="">
          Specialties ({{ specialties && specialties.length }}):
          <span
            v-for="(specialty, index) in specialties && specialties.slice(0, 4)"
            :key="index"
            >{{ specialty && specialty.name
            }}<b> ({{ specialty && specialty.practitioners.length }})</b> |
          </span>
          {{
            specialties && specialties.length > 5
              ? `+ ${specialties && specialties.length - 4}`
              : ""
          }}
        </div>
      </div>

      <div v-if="!hospital.id" class="mt-10">
        <c-button
          type="button"
          secondary
          small
          @click="
            $router.push({
              path: `/patients/appointment/hospital/${hospital.id}/info`,
            })
          "
          >View Profile</c-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

@Options({
	name: 'HospitalsProfile',
  components: {},
})
export default class HospitalsProfile extends Vue {
  @Prop({ type: Object })
  hospital!: any;

  get specialties() {
    return this.hospital && this.hospital.specialties;
  }
}
</script>

<style scoped>
.hospital-icon {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}
</style>
