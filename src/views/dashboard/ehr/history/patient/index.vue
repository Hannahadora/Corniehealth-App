<template>
    <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
         <history-empty-state v-if="empty" />
        <history-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Ihistory from "@/types/Ihistory";
import IAllergy from "@/types/IAllergy";
import { Options, Vue } from "vue-class-component";
import HistoryEmptyState from "./emptyState.vue";
import HistoryExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const allergy = namespace("allergy");
const history = namespace("history");

@Options({
  name: "PatientIndex",
  components: {
    HistoryEmptyState,
    HistoryExistingState,
  },
})
export default class PatientIndex extends Vue {
  addHistory = false;
  show = false;

  get empty() {
    return this.allergys.length < 1;
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  @history.State
  historys!: Ihistory[];

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;

  historyAdded() {
    this.show = false;
    this.historys;
    this.fetchHistorys(this.activePatientId);
  }

  created() {
    if (this.activePatientId) this.fetchHistorys(this.activePatientId);
    this.fetchAllergys(this.activePatientId);
  }
}
</script>
