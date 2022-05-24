<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <return-empty-state v-if="empty" />
        <return-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import ReturnEmptyState from "./emptyState.vue";
import ReturnExistingState from "./existingState.vue";
import IMaterialReturn from "@/types/IMaterialReturn";

const materialreturn = namespace("materialreturn");
const user = namespace("user");

@Options({
  name: "ReturnIndex",
  components: {
    ReturnEmptyState,
    ReturnExistingState,
  },
})
export default class ReturnIndex extends Vue {
  get empty() {
    return this.materialreturns.length < 1;
  }

  @user.Getter
  authCurrentLocation!: string;

  @materialreturn.State
  materialreturns!: IMaterialReturn[];

  @materialreturn.Action
  fetchMaterialReturnOutgoing!: (locationId: string) => Promise<void>;

  async created() {
    await this.fetchMaterialReturnOutgoing(this.authCurrentLocation);
  }
}
</script>
