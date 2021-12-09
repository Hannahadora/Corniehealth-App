<template>
    <div class="w-full bg-white  p-4 overflow-y-scroll topest" style="height: 100vh; overflow-y:scroll">
        <!-- <div class="container-fluid bg-gray-500" style="heigth: 100vh">
            <EmptyState />
        </div> -->
        <div class="container-fluid flex" v-if="true">
            <div class="" style="width: 25%">
                <div class="container">
                    <UserNav />
                </div>
            </div>
            <div class="border-l-2 px-2"  style="width: 75%">
                <router-view></router-view>
                    <div class="container-fluid my-8 flex justify-end items-center">
                        <corniebtn :loading="false">
                            <router-link :to="{ name: 'Patient Experience Management' }" class="cursor-pointer focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                                Cancel
                            </router-link>
                        </corniebtn>
                        <Button :loading="loading">
                            <a @click="saveShift"  style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                                Save 
                            </a>
                        </Button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserNav from './components/user-nav.vue'

@Options({
    components: {
        UserNav,
    }
})

export default class PSecurity extends Vue {
    
}
</script>
<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
