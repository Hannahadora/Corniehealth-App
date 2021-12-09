<template>
  <div
    class="flex justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Requests
      </span>
      <span class="w-full h-screen">
        <requests-empty-state v-if="empty" />
        <requests-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IRequest from "@/types/IRequest";
import { Options, Vue } from "vue-class-component";
import RequestsEmptyState from "./emptyState.vue";
import RequestsExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const request = namespace("request");

@Options({
  name: "RequestIndex",
  components: {
    RequestsEmptyState,
    RequestsExistingState,
  },
})
export default class RequestIndex extends Vue {
  addRequest = false;
  RequestToUpdate = {} as IRequest;

  get empty() {
    return this.requests.length < 1;
  }

  @request.State
  requests!: IRequest[];

  @request.Action
  fetchRequests!: () => Promise<void>;

  created() {
    this.fetchRequests();
    if (this.requests.length < 1) this.fetchRequests();
  }
}
</script>
