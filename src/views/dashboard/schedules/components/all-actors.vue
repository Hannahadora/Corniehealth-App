<template>
    <div class="container-fluid">
        <div class="w-full px-2">
            <div>
                <div class="w-full">
                    <span class="flex items-center w-full">
                        <icon-input
                        :width="'w-full'"
                        class="border border-gray-600 rounded-full focus:outline-none"
                        type="search"
                        v-model="search"
                        >
                        <template v-slot:prepend>
                            <search-icon />
                        </template>
                        </icon-input>
                    </span>
                </div>
                <p class="text-base text-gray-500 my-3">
                    All actors available from 09:00-14:00 for appointment bookings.
                </p>
                <div class="w-full">
                    <div class="container flex flex-col">
                    <div class="w-full flex items-center my-2">
                        <div class="w-2/12">
                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                        </div>
                        <div class="w-10/12 ml-2">
                        <span class=" flex justify-between">
                            <span class="text-base text-gray-500">W. E Somebod</span>
                            <span class="text-danger font-semibold"><a >Book Appointment</a></span>
                        </span>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-2">
                        <div class="w-2/12">
                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                        </div>
                        <div class="w-10/12 ml-2">
                        <span class=" flex justify-between">
                            <span class="text-base text-gray-500">W. E Somebod</span>
                            <span class="text-danger font-semibold"><a >Book Appointment</a></span>
                        </span>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="w-full flex justify-end mt-6">
                    <corniebtn class="bg-danger p-2 px-8 rounded-full text-white">
                        <span>Close</span>
                    </corniebtn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";


export default class AllActors extends Vue {
    search = '';
}
</script>


