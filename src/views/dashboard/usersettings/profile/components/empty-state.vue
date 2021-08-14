<template>
    <div class="w-full bg-white  p-4 bg-red">
        <div class="container-fluid">
            <div class="w-full border-b-2 curved flex py-2">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Pracitioner Profile</h2>
                </div>
            </div>
        </div>
        <div class="container-fluid flex items-center justify-center" style="height: calc(100vh - 300px">
            <div class="w-full flex flex-col justify-center items-center h-96">
            <img src="@/assets/img/practitioners.svg" />
            <h3 class="text-center mt-5">You are yet to set up your profile</h3>
            <button
            class="
                bg-danger
                rounded-full
                text-white
                mt-5
                py-2
                px-3
                focus:outline-none
                hover:opacity-90
            "
            @click="$router.push({ name: 'Setup'})"
            >
            Set Up Profile
            </button>
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
export default class EmptySetup extends Vue {

}
</script>
<style>
    
</style>
