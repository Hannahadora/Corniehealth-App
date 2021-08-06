<template>
    <div class="w-full px-4">
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
            <icon-input
                class="border border-gray-600 rounded-full focus:outline-none"
                type="search"
                v-model="search"
                >
                <template v-slot:prepend>
                    <search-icon />
                </template>
            </icon-input>
            <!-- <CornieInput class="rounded-full w-full" /> -->
        </div>

        <div class="w-full ">
            <div class="container">
                <p class="italic text-sm my-2" style="color:#6F6C93">
                    {{ `${ items.length ? items.length : '' } ${ items.length > 1 ? 'results' : items.length === 1 ? 'result' : '' }`}}
                </p>
            </div>
        </div>
        <div class="w-full flex py-3" id="rolesLine">
            <div class="container px-2" v-for="(role, index) in items" :key="index">
                <ImportRoleCard :role="role" />
            </div>
        </div>

        <div class="w-full border-b-dashed mb-6 mt-3"></div>


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
// import CornieInput from '@/components/cornieinput.vue'
import ImportRoleCard from './import-role-card.vue'
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { namespace } from 'vuex-class';

const roles = namespace('roles');

@Options({
  components: {
    // CornieInput,
    ImportRoleCard,
    IconInput,
    SearchIcon,
  },
})

export default class RolesAndPrivileges extends Vue {
    search = '';

    @roles.State
    roles!: any[];

    @roles.Action
    getRoles!: () => Promise<boolean>

    craeted() {
        if (!this.roles) this.getRoles();
    }

    get items() {
        if (!this.search) return this.roles;
        return this.roles.filter((i: any) => i.name.includes(this.search));
    }
}
</script>
<style>
    .border-b-dashed {
        border-bottom: 1px dashed #C5C4D4;
    }

    #rolesLine {
        overflow-x: scroll;
    }

    #rolesLine::-webkit-scrollbar {
        height: 5px;
    }
</style>
