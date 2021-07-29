<template>
    <div class="w-full">
        <div class="container my-4">
            <h1 class="font-bold text-2xl">
                Import privileges from existing roles
            </h1>
        </div>

        <div class="container border-b-dashed pb-5">
            <p>
                You can copy access control settings from other roles. This helps reduce the repetitive work and saves time.
            </p>
        </div>

        <div class="container my-4">
            <h2 class="font-bold text-lg">
                Select Role to Import from:
            </h2>
        </div>
        <div class="container my-4">
            <CornieInput class="rounded-full w-full" />
        </div>

        <div class="w-full ">
            <div class="container">
                <p class="italic text-sm my-2" style="color:#6F6C93">
                    2 results
                </p>
            </div>
        </div>
        <div class="w-full ">
            <ImportRoleCard />
        </div>

        <div class="w-full border-b-dashed my-6"></div>


        <div class="container mt-4">
            <h2 class="font-bold text-lg">
                Privileges
            </h2>
        </div>
        <div class="container my-4">
            <p class="italic text-base flex justify-center" style="color:#6F6C93">
                Select a role to see privileges which you can import.
            </p>
        </div>

    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from '@/components/cornieinput.vue'
import ImportRoleCard from './import-role-card.vue'

@Options({
  components: {
    CornieInput,
    ImportRoleCard,
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
