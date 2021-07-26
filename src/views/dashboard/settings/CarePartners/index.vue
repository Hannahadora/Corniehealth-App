<template>
  <main class="p-6">
    <div>
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
        Care Partners
      </span>
      <empty-state heading="You have no care partners on record" v-if="empty">
        <template #icon>
          <img src="@/assets/img/empty-care-partners.svg" />
        </template>
        <template #actions>
          <button
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              py-2
              px-3
              focus:outline-none
              hover:opacity-90
            "
            @click="$router.push('add-care-partners')"
          >
            Add a Care Partner
          </button>
        </template>
      </empty-state>
      <template v-else>
        <existing-state />
      </template>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/EmptyState.vue";
import { namespace } from "vuex-class"
import ICarePartner from "@/types/ICarePartner";
import ExistingState from "./ExistingState.vue"

const CarePartnersStore = namespace("CarePartnersStore")

@Options({
  components: {
    EmptyState,
    ExistingState
  },
})
export default class CarePartners extends Vue {

  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  get!: () => Promise<void>

  get empty() {
    return this.carePartners.length == 0;
  }

  mounted() {
    this.get()
  }
}
</script>