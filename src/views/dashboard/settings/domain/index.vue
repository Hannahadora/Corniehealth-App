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
       Domains
      </span>
      <span class="w-full">
          <domain-empty-state
                v-if="empty"
          />
          <domain-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IDomain from "@/types/IDomain";
import { Options, Vue } from "vue-class-component";
import DomainEmptyState from "./emptyState.vue";
import DomainExistingState from "./existingState.vue";
import SendInvite from "./sendInvite.vue";
import AddDomain from "./addDomain.vue";
import { namespace } from "vuex-class";

const domain = namespace("domain");

@Options({
  name: "DomainIndex",
  components: {
    DomainEmptyState,
    DomainExistingState,
    AddDomain,
    SendInvite
  },
})
export default class DomainIndex extends Vue {
  addDomain = false;
  DomainToUpdate = {} as IDomain;

  get empty() {
    return this.domains.length < 1;
  }

 @domain.State
  domains!: IDomain[];

  @domain.Action
  fetchDomains!: () => Promise<void>;


created() {
  this.fetchDomains()
    if (this.domains.length < 1) this.fetchDomains();
  }
}
</script>
