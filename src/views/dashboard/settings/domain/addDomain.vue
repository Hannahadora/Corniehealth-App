<template>
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
      Create New Domain
    </span>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input label="Organization Name" />
        <domain-input label="Domain Name" />
        <cornie-select
          label="IAM Role"
        />
      </div>
    </form>
  </div>
   <span class="flex justify-end w-full border-t-2 mb-10">
    <button
        class="
          outline-primary
          rounded-full
          text-black
          mt-5
          mr-3
          py-2
          pr-8
          pl-8
          px-3
          focus:outline-none
          hover:bg-primary
          hover:text-white

        "
      >
        Cancel
      </button>

      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          
           pr-10
          pl-10
          focus:outline-none
          hover:opacity-90
        "
      >
        Save
      </button>
      
    </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DomainInput from "@/components/domain-input.vue";

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
  },
})
export default class AddLocation extends Vue {}
</script>
