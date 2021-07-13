<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
        Healthcare Services
      </span>
      <span class="w-full">
        <add-service v-if="addService" />
        <template v-else>
          <healthcare-empty-state
            v-if="empty"
            @add-service="addService = true"
          />
          <healthcare-existing-state
            v-else
            @add-service="addService = true"
          />
        </template>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import  HealthcareEmptyState from "./emptyState.vue";
import HealthcareExistingState from "./existingState.vue";
import  AddServices from "./addServices.vue";

@Options({
  name: "HealthcareIndex ",
  components: {
    HealthcareEmptyState,
    HealthcareExistingState,
    AddServices,
  },
})
export default class HealthcareIndex extends Vue {
  addService = false;
  
  get empty() {
    return true;
  }

 
}
</script>
