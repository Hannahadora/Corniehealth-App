<template>
  <div>
    <div
      class="flex justify-center pb-76 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
    >
      <div class="w-full p-2 pb-96">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Request
        </span>
        <span class="w-full">
          <div class="w-full flex flex-col justify-center items-center h-96">
            <img src="@/assets/img/empty-requests.svg" />
            <h3 class="text-center mt-5">
              You’ve made no requests!<br />
              Make a new service reques by clicking on “New Request” above
            </h3>
            <button
              class="bg-danger rounded-full text-white mt-5 py-2 px-3 pl-12 pr-12 focus:outline-none hover:opacity-90"
              @click="$router.push('/dashboard/provider/experience/add-request')"
            >
              New Requests
            </button>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
  },
})
export default class PracticeEmptyState extends Vue {}
</script>
