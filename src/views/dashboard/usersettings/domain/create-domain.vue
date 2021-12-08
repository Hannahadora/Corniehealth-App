<template>
    <div class="container-fluid">
        <div class="w-full mb-8">
            <div class="w-full border-b-2 curved flex py-2">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Add New Domain</h2>
                </div>
            </div>
        </div>

        <div class="w-full" style="min-height: calc(100vh - 400px)">
            <div class="container-fluid">
                <div class="w-full flex my-5">
                    <div class="w-5/12">
                        <CornieInput label="Organization or domain Name" v-model="domain"  placeholder="--Enter--" />
                    </div>
                    <div class="w-5/12 ml-3">
                        <CornieInput label="email address" v-model="email" placeholder="--Enter--" />
                    </div>
                </div>

                <div class="w-full my-8">
                    <div class="w-5/12">
                        <CornieInput label="Password" v-model="password" placeholder="--Enter--" />
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full mt-6 mb-2 flex justify-end border-t-2 pt-8">
            <Button :loading="false" class="focus:outline-none mr-3">
                <router-link :to="{ name: 'User Domains' }" class="text-gray-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                    Cancel
                </router-link>
            </Button>

            <Button :loading="false" class="focus:outline-none">
                <span  style="background: #FE4D3C" class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                    Save
                </span>
            </Button>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CornieInput from '@/components/cornieinput.vue'


@Options({
    components: {
        CornieInput,
    }
})
export default class CreateDomain extends Vue {
  email=""; 
  orgDomain="";
  password=""; 
}
</script>
