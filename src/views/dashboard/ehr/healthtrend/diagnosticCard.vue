<template>
  <detail-card
    height="337px"
    title="Diagnostics"
    :count="diagnostics?.length"
    more="View all"
    @add="$router.push('diagnostics')"
  >
    <template #empty>
      <div
        class="p-2 flex flex-col items-center justify-center my-auto"
        v-if="diagnostics?.length < 1"
      >
        <img class="mb-3" src="@/assets/img/no-diagnostics-trend.svg" alt="" />
        <p class="text-sm text-center" style="color: #667499">
          No Diagnostics Report
        </p>
      </div>
    </template>
    <div
      class="w-full grid grid-cols-1 gap-y-4"
      v-for="(input, index) in items.slice(0, 2)"
      :key="index"
    >
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">{{ input.category }}</span>
            <span class="font-semibold">{{ input.performer }}</span>
            <span class="">
              <span class="text-gray-600">
                <h3>{{ input.date }}</h3></span
              >
              <span class="text-gray-600">
                {{ input.status }}
              </span>
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
import { Prop, PropSync, Watch } from "vue-property-decorator";
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
  @Prop({ type: Array, default: () => [] })
  diagnostics!: any[];

  photo = require("@/assets/img/avatar.png");

  get patientId() {
    return this.$route.params.id as string;
  }

  get count() {
    return this.diagnostics && this.diagnostics?.length;
  }

  get items() {
    const items =
      this.diagnostics &&
      this.diagnostics?.map((diagnostic: any) => ({
        category: diagnostic.category,
        date: diagnostic.data,
        status: diagnostic.status,
        performer: diagnostic.performer,
      }));

    return items;
  }

  async created() {}
}
</script>
