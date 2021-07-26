<template>
  <div class="w-full border py-2 flex mt-12">
    <div class="w-2/12 flex font-semibold text-xl p-2">
    <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full">
    </div>
    <div class="w-7/12 flex items-center">
    <span><i class="pi pi-exclamation-circle p-2"></i> info</span>
    </div>
    <div class="w-3/12 flex items-center">
    <span><i class="pi pi-exclamation-circle p-2"></i> info</span>
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
 
}
</script>
<style>

</style>
