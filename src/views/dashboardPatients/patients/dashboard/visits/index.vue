<template>
  <div class="h-screen">
    <div
      class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full"
    >
      <div class="w-full">
        <span
          class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Visits
        </span>
      </div>

    <div>
      <!-- <visit-empty-state  /> -->
       <visit-exisiting-state
        />
    </div>
    </div>

  </div>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { IPatientAssociation } from "@/types/IPatientAssociation";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import VisitEmptyState from "./emptyState.vue";
import VisitExisitingState from "./existingState.vue";

@Options({
  name: "visitIndex",
  components: {
    VisitEmptyState,
    VisitExisitingState,
  },
})
export default class visitIndex extends Vue {
  get isEmpty() {
    return !Boolean(this.associations.length);
  }

  associations: IPatientAssociation[] = [];

  async fetchAssociations() {
    try {
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/employer/associations"
      );
      this.associations = data;
    } catch (error) {
      window.notify({
        msg: "There was an error populating association data",
        status: "error",
      });
    }
  }

  created() {
    if (this.isEmpty) this.fetchAssociations();
  }
}
</script>
