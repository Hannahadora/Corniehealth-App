<template>
  <div class="pb-40">
    <div>
      <empty-state v-if="noSubscription" @openModal="openModal" />
      <existing-state v-else @openModal="openModal" />
    </div>
  </div>

  <medication-subscription-modal
    v-model="subscriptionModal"
    @close="subscriptionModal = false"
  />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import EmptyState from "./emptyState.vue";
import ExistingState from "./existingState.vue";
import MedicationSubscriptionModal from "./MedicationSubscriptionModal.vue";
import { cornieClient } from "@/plugins/http";

@Options({
  name: "subscriptionPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    EmptyState,
    ExistingState,
    MedicationSubscriptionModal,
  },
})
export default class subscriptionPage extends Vue {
  currentTab = 0;
  subscriptions: any = [];
  subscriptionModal: Boolean = false;

  get noSubscription() {
    return this.subscriptions.length === 0;
  }

  openModal() {
    this.subscriptionModal = true;
  }
  async fetchSubscriptions() {
    try {
      const { data } = await cornieClient().get(
        '/api/v1/patient-portal/medication-subscription/get-all'
      );
      this.subscriptions = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchSubscriptions();
  }
}
</script>

<style></style>
