<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <add-domain v-if="addDomain" />
        <template v-else>
          <domain-empty-state
            v-if="empty"
            @add-domain="addDomain = true"
          />
          <domain-existing-state
            v-else
            @add-domain="addDomain = true"
            @update-domain="updateDomain"
          />
        </template>
          <send-invite
            v-if="sendInvite"
          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IDomain from "@/types/IDomain";
import { Options, Vue } from "vue-class-component";
import DomaninEmptyState from "./emptyState.vue";
import DomainExistingState from "./existingState.vue";
import SendInvite from "./sendInvite.vue";
import AddDomain from "./addDomain.vue";

@Options({
  name: "DomainIndex",
  components: {
    DomaninEmptyState,
    DomainExistingState,
    AddDomain,
    SendInvite
  },
})
export default class DomainIndex extends Vue {
  addDomain = false;
  sendInvite = false;
  DomainToUpdate = {} as IDomain;
  get empty() {
    return false;
  }

//   get pageTitle() {
//     if (!this.addDomain) return "Domains";
//     //if (this.domainToUpdate.id) return "Update addDomain";
//     return "Domains";
//   }
  updateDomain(loc: IDomain) {
    console.log(loc);
  }
}
</script>
