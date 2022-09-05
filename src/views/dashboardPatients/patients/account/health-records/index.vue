<template>
  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full h-full overflow-auto"
  >
    <div class="w-full">
      <empty-state
        v-if="allHealthRecords.length == 0"
        @addPractice="addPractice"
        @bookAppointments="bookAppointment"
      />
      <existing-state :healthRecords="allHealthRecords" v-else />
      <add-invite @continueProcess="continueProcess" v-model="showAddInvite" />
      <add-practice v-model="showAddModal" />
      <invite-practice v-model="showInviteModal" />
    </div>
  </div>
</template>
<script lang="ts">
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import AddInvite from "./components/add-invite.vue";
  import AddPractice from "./components/add-invite/add-practice.vue";
  import InvitePractice from "./components/add-invite/invite-practice.vue";
  import EmptyState from "./components/empty-state.vue";
  import existingState from "./components/existing-state.vue";

  @Options({
    components: {
      EmptyState,
      existingState,
      AddInvite,
      AddPractice,
      InvitePractice,
    },
  })
  export default class HealthRecord extends Vue {
    allHealthRecords = [];
    async fetchHealthRecords() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/health-record`
      );
      console.log("dataaa", response.data);
      this.allHealthRecords = response.data;
    }
    showAddInvite = false;
    showAddModal = false;
    showInviteModal = false;
    addPractice() {
      console.log("hello");
      this.showAddInvite = true;
    }
    bookAppointment() {}
    continueProcess(data: any) {
      const { actionType } = data;
      if (actionType == "Add") return (this.showAddModal = true);
      if (actionType == "Invite") return (this.showInviteModal = true);
    }
    async mounted() {
      await this.fetchHealthRecords();
    }
  }
</script>
