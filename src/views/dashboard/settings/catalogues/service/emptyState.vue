<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
       <img src="@/assets/img/product.svg" />
      <h2 class="text-center mt-5 font-bold">
        Start by adding a product
      </h2>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
          @click="$router.push({ name: 'New Service' })"
        >
         Add Services
        </button>
      </span>
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
export default class ServiceEmptyState extends Vue {
 
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
