<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
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
       Groups
      </span>
      <span class="w-full">
          <group-empty-state
                v-if="empty"
          />
          <group-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IGroup from "@/types/IGroup";
import { Options, Vue } from "vue-class-component";
import GroupEmptyState from "./emptyState.vue";
import GroupExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const group = namespace("group");

@Options({
  name: "GroupIndex",
  components: {
    GroupEmptyState,
    GroupExistingState,
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
    if (this.groups.length < 1) this.fetchGroups();
  }
}
</script>
