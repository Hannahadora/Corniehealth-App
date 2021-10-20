<template>
  <div class="w-full border px-4 py-2 flex mt-12">
    <div class="w-2/12 flex font-semibold text-xl p-2">
      <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full">
    </div>
    <div class="w-7/12 flex flex-col justify-center border-r-2">
      <div class="w-full flex items-center mb-4">
        <div class="w-7/12 flex flex-col">
          <span class="uppercase font-bold card_header">Name</span>
          <span class="card_text">{{ user.lname }} {{ user.lname }}</span>
        </div>
        <div class="w-5/12 flex flex-col">
          <span class="uppercase font-bold card_header">Role</span>
          <span class="card_text">{{ user.role ? user.role.name : '' }}</span>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <span class="uppercase font-bold card_header">Domain</span>
        <span class="card_text">https://corniehealth.blahblah.com</span>
      </div>
    </div>
    

    <div class="w-3/12 flex items-center px-2">
      <div class="w-full flex justify-end">
        <span @click="toggleModal" class="cursor-pointer">
          <span> </span>
          <span class="card_text flex items-center"><a class="mr-2"><Icon :type="1"/></a> <span>Transfer Admin Rights</span></span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import User from '@/types/user'
import Icon from './icon.vue'

@Options({
  components: {
    Icon
  },
})
export default class RolesAndPrivileges extends Vue {
  @Prop()
  user!: User;

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
