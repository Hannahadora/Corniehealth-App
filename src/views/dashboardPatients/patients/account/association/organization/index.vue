<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
      <span class="w-full">
        <org-empty-state v-if="isEmpty" />
        <org-exisiting-state
          :associations="associations"
          @refresh="fetchAssociations"
          v-else
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { IPatientAssociation } from "@/types/IPatientAssociation";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import OrgEmptyState from "./emptyState.vue";
import OrgExisitingState from "./exisitngState.vue";

@Options({
  name: "organizationIndex",
  components: {
    OrgEmptyState,
    OrgExisitingState,
  },
})
export default class orgainizationIndex extends Vue {
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
