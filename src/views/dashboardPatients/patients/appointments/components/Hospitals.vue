<template>
  <div>
    <div v-for="hospital in hospitals" :key="hospital.id">
      <hospital-profile :hospital="hospital" />
    </div>
    <div v-if="hospitals.length === 0" class="mt-24">
      <div class="text-center flex flex-col items-center justify-center">
        <img class="mb-8" src="@/assets/img/doctor-bro.svg" alt="" />
        <p class="text-2xl font-bold">
          Select a specialty and location to continue
        </p>
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

import HospitalProfile from "./HospitalProfile.vue"
@Options({
  components: {HospitalProfile},
})
export default class HospitalsPage extends Vue {
  search: any = "";
  loading: boolean = false;

  @Prop({ type: Array })
  hospitals!: any[];

  async created() {}
}
</script>

<style scoped>
.hospital-icon {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
