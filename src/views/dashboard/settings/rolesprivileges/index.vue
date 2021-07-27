<template>
  <div class="container mx-auto">
    <div class="w-full border-b-2 flex py-2">
      <div class="w-10/12 flex font-semibold text-xl py-2">
        <h2>Roles and Privileges</h2>
      </div>
      <div class="w-2/12 flex items-center justify-end">
        <span><i class="pi pi-exclamation-circle p-2"></i> info</span>
      </div>
    </div>

    <UserDetails />
    <div class="w-8/12 mx-auto border-b-2 my-12"></div>

    <div class="w-full flex mb-12">
      <div class="w-8/12">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquam fuga nemo animi et magnam ad unde doloremque dolores veritatis.</p>
      </div>
      <div class="w-4/12 flex justify-end">
        <Button :loading="false">
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
            New Role
          </button>
        </Button>
      </div>
    </div>

    <div class="w-full border-2 flex py-2 h-40">
      
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserDetails from './components/user-details.vue'
import Button from '@/components/globals/corniebtn.vue'

@Options({
  components: {
    UserDetails,
    Button
  },
})
export default class RolesAndPrivileges extends Vue {
 
}
</script>
<style>

</style>
