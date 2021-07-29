<template>
  <div class="w-full border py-2 flex mt-12">
    <div class="w-2/12 flex font-semibold text-xl p-2">
      <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full">
    </div>
    <div class="w-7/12 flex flex-col justify-center">
      <div class="w-full flex items-center mb-4">
        <div class="w-7/12 flex flex-col">
          <span class="uppercase font-bold card_header">Name</span>
          <span class="card_text">User Name</span>
        </div>
        <div class="w-5/12 flex flex-col">
          <span class="uppercase font-bold card_header">Role</span>
          <span class="card_text">Root Administrator</span>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <span class="uppercase font-bold card_header">Domain</span>
        <span class="card_text">https://corniehealth.blahblah.com</span>
      </div>
    </div>
    

    <div class="w-3/12 flex items-center">
      <div class="w-full">
        <span @click="toggleModal" class="cursor-pointer">
          <span>A </span>
          <span class="card_text"><a >Transfer Admin Rights</a></span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
  components: {
    
  },
})
export default class RolesAndPrivileges extends Vue {
  toggleModal() {
    this.$emit('toggle-rights-modal')
  }
}
</script>
<style>
  .titlee {
    font-size: 20px;
  }
</style>
