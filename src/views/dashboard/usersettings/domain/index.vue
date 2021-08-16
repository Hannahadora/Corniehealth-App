<template>
    <div class="container-fluid h-screen">
        <div class="w-full" v-if="false">
            <div class="w-full mb-8">
                <div class="w-full border-b-2 curved flex py-2">
                    <div class="container-fluid flex font-semibold text-xl py-2">
                        <h2>Domains</h2>
                    </div>
                </div>
            </div>

            <div class="w-full my-12 flex justify-end">
                <Button :loading="false" class="focus:outline-none">
                    <router-link :to="{ name: 'Add a New Domain' }" style="background: #FE4D3C" class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Add New Domain 
                    </router-link>
                </Button>
            </div>

            <div class="w-full my-5 mt-8">
                <div class="container-fluid">
                    <div class="w-full">
                        <p class="question p-1">
                            <span class="mr-6">REDDINGTON HOSPITAL</span>
                            <span>Default</span>
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="answer flex justify-between p-2">
                            <span>jack445@reddington.com</span>
                            <span class="flex">
                                <span><a class="cursor-pointer uppercase mx-3 link-color">Make default</a></span>
                                <span class="mx-3 link-color">Edit</span>
                                <span><i class="pi pi-trash link-color"></i></span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="w-full">
            <div class="container-fluid">
                <EmptyState />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from '@/components/globals/corniebtn.vue'
import { namespace } from 'vuex-class';
import EmptyState from './empty-state.vue'

const userSettingsStore = namespace('usersettings');

@Options({
    components: {
        Button,
        EmptyState,
    }
})
export default class UserDomain extends Vue {
    @userSettingsStore.Action
    getDomains!: () => Promise<void>;

    @userSettingsStore.State
    domains!: any;

    async created() {
        await this.getDomains();
        console.log(this.domains, "domains");
        
    }
}
</script>

<style scoped>

    .question {
        background: #F5F4FA;
        border-radius: 4px;
    }

    .answer {
        background: #FFFFFF;
        /* Whites/Cotton_Ball */

        border: 1px solid #F5F4FA;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .link-color {
        color: #FE4D3C;
    }
</style>
