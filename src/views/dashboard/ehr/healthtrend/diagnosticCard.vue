<template>
  <detail-card
    height="337px"
    title="Diagnostics"
    :count="diagnostics?.length"
    more="View all"
    @add="$router.push('diagnostics')"
  >
    <div
      class="flex flex-col items-center justify-center my-auto"
      v-if="diagnostics?.length === 0"
    >
      <img class="mb-3" src="@/assets/img/no-diagnostics-trend.svg" alt="" />
      <p class="text-sm text-center" style="color: #667499">
        No Diagnostics Report
      </p>
    </div>
    <div v-else class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold"> Chlotiladones </span>
            <span class="">
              <span class="text-gray-600"> <h3>3 Pills Daily</h3></span>
              <!-- <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span> -->
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            <chevron-right-icon />
            <!-- Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            /> -->
          </span>
        </div>
      </div>
    </div>
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import IDiagnostic from "@/types/IDiagnostic";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const diagnostic = namespace("diagnostic");

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

  diagnostics: IDiagnostic[] = [];

  get patientId() {
    return this.$route.params.id as string;
  }

  async fetchPatientDiagnostics() {
    const url = `/api/v1/diagnostic/report/patient/${this.patientId}`;
    try {
      const response = await cornieClient().get(url);
      if (response.success) {
        this.diagnostics = response.data;
      }
    } catch (error) {
      window.notify({
        msg: "Error fetching Diagnostic report",
        status: "error",
      });
    }
  }

  get count() {
    return this.diagnostics && this.diagnostics?.length;
  }

  get items() {
    const items =
      this.diagnostics && this.diagnostics?.map((diagnostic: any) => ({}));

    return items;
  }

  async created() {
    await this.fetchPatientDiagnostics();
  }
}
</script>
