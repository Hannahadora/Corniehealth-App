<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-semibold
          text-xl text-primary
          py-4
          px-4
          p-4
       
        "
      >
       Appointment
      </span>
      <span class="w-full">
          <appointment-empty-state
                v-if="empty"
          />
          <appointment-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IGroup from "@/types/IGroup";
import { Options, Vue } from "vue-class-component";
import AppointmentEmptyState from "./emptyState.vue";
import AppointmentExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const group = namespace("group");

@Options({
  name: "GroupIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
  },
})
export default class GroupIndex extends Vue {
  addGroup = false;
  GroupToUpdate = {} as IGroup;

  get empty() {
    return this.groups.length < 1;
  }

 @group.State
  groups!: IGroup[];

  @group.Action
  fetchGroups!: () => Promise<void>;


created() {
  this.fetchGroups()
    if (this.groups.length < 1) this.fetchGroups();
  }
}
</script>
