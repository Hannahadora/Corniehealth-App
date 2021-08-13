<template>
    <div class="w-full bg-white  p-4 bg-red">
        <div class="container-fluid">
            <div class="w-full border-b-2 curved flex py-2">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Set Up Profile</h2>
                </div>
            </div>
        </div>
        <div class="container-fluid flex items-center justify-center" style="height: calc(100vh - 300px">
            <div class="w-3/12 flex justify-center flex-col items-center">
                <p class="my-3">You are yet to set up your profile</p>
                <Button :loading="false">
                    <router-link to="" style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        New Shift
                    </router-link>
                </Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from '@/components/globals/corniebtn.vue'

@Options({
  components: {
      Button,
  },
})
export default class Shift extends Vue {

}
</script>
<style>
    
</style>
