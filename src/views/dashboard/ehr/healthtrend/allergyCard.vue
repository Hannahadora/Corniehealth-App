<template>
  <detail-card height="313px" title="Allergies">
  <div class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <!-- <avatar :src="photo" /> -->
          <div class="text-xs flex flex-col">
            <span class="font-semibold text-primary">
              Asthma
            </span>
            <span class="">
              <span class="text-gray-600"> <h5> Undergoing treatment for 5 years now </h5></span>
              <!-- <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span> -->
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            <chevron-right-icon/>
            <!-- Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            /> -->
          </span>
        </div>
      </div>

       <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <!-- <avatar :src="photo" /> -->
          <div class="text-xs flex flex-col">
            <span class="font-semibold text-primary">
              Paenut Allergy
            </span>
            <span class="">
              <span class="text-gray-600"> <h5> Undergoing treatment for 5 years now </h5></span>
              <!-- <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span> -->
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            <chevron-right-icon/>
            <!-- Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            /> -->
          </span>
        </div>
      </div>

       <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <!-- <avatar :src="photo" /> -->
          <div class="text-xs flex flex-col">
            <span class="font-semibold text-primary">
              Asthma
            </span>
            <span class="">
              <span class="text-gray-600"> <h5> Undergoing treatment for 5 years now </h5></span>
              <!-- <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span> -->
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            <chevron-right-icon/>
            <!-- Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            /> -->
          </span>
        </div>
      </div>

      <div class="w-full flex justify-end pb-2">
        <!-- <div class="w-full flex items-center">
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              Chlotiladone
            </span>
          </div>
        </div> -->
        <div class="text-xs text-danger font-semibold">
          <span class="">
            View all
          </span>
        </div>
      </div>
  </div>
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

@Options({
  name: "AllergyCard",
  components: {
    DetailCard
  },
})
export default class AllergyCard extends Vue {
}
</script>
