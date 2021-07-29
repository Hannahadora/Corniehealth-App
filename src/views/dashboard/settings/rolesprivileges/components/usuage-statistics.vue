<template>
    <div class="w-full">
        <div class="container my-4">
            <h1 class="font-bold text-2xl">
                Usage Statistics
            </h1>
        </div>

        <div class="container border-b-dashed pb-5">
            <p>
                Here you can see which users (practicioners) have been assigned this role, how much user space you have left for each module within this role.
            </p>
        </div>

        <div class="container my-4">
            <h2 class="font-bold text-lg">
                Users
            </h2>
        </div>

        <div class="w-full ">
            <UserCard />
        </div>
        <div class="w-full border-b-dashed my-6"></div>


        <div class="container my-4">
            <h2 class="font-bold text-lg">
                Access control
            </h2>
        </div>

        <div class="container">
            <Accordion>
                <template v-slot:title>
                    <p >Test</p>
                </template>

                <template v-slot:default>
                    <div class="w-full">
                        <div class="container p-3 my-2">
                            <p class="text-xs">
                                This module’s maximum user capacity is 1. This capacity is exhausted and you will not be able to assign any role that has this module as part of its access grants.
                            </p>
                            <span class="text-xs uppercase text-red-500 font-semibold">Learn more</span>
                        </div>
                    </div>
                    <div class="container py-2 px-2 flex items-center">
                        <div class="w-3/12">
                            <div class="container flex justify-center">
                                <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full" style="width: 44px; height: 44px">
                            </div>
                        </div>
                        <div class="w-9/12 flex flex-col">
                            <span class="text-sm font-semibold">Miriam Adekunle</span>
                            <span class="italic text-xs">Module accessed from: <span class="text-blue-500">“Surgeon” Role</span></span>
                        </div>
                    </div>
                </template>
            </Accordion>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserCard from './user-card.vue'
import Accordion from '@/components/accordion-component.vue'

@Options({
  components: {
    UserCard,
    Accordion,
  },
})
export default class RolesAndPrivileges extends Vue {
 

}
</script>
<style>
    .border-b-dashed {
        border-bottom: 1px dashed #C5C4D4;
    }
</style>
