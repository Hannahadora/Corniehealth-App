<template>
  <detail-card height="313px" title="Recent Diagnostic Report">
     <div class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              Chlotiladones
            </span>
            <span class="">
              <span class="text-gray-600"> <h3> 3 Pills Daily </h3></span>
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
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              Chlotiladone
            </span>
            <span class="">
              <span class="text-gray-600"> <h3> 3 Pills Daily </h3></span>
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
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              Chlotiladone
            </span>
            <span class="">
              <span class="text-gray-600 text-uppercase"> <h3> MLT John Oyedele </h3></span>
              <span class="text-gray-600"> <h3> 3 Pills Dailys </h3></span>
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

import Avatar from "@/components/avatar.vue";
import BillIcon from "@/components/icons/ehrbill.vue";



@Options({
  name: "DiagnosticCard",
  components: {
    DetailCard,
    Avatar,
    BillIcon,
  },
})
export default class DiagnosticCard extends Vue {
    photo = require("@/assets/img/avatar.png");

}
</script>
