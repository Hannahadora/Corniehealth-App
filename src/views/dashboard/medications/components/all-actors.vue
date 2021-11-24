<template>
    <div class="container-fluid">
        <div class="w-full px-2">
            <div>
                <p class="text-base text-gray-500 my-3">
                    All actors available from 09:00-14:00 for appointment bookings.
                </p>
                <div class="w-full">
                    <div class="w-full" style="border-bottom: 1px dashed #C2C7D6;">
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
                    <div class="container flex flex-col">
                    <div class="w-full flex items-center my-2" v-for="(person, index) in persons" :key="index">
                        <div class="w-2/12">
                        <img v-if="person.image" :src="person.image" class="rounded-full border" alt="Image">
                        <img v-else src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                        </div>
                        <div class="w-10/12 ml-2">
                        <span class=" flex justify-between">
                            <span class="text-base text-gray-500">{{ person.firstName }} {{ person.lastName }}</span>
                            <span class="text-danger font-semibold"><a  class="text-warning">Book Appointment</a></span>
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
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop } from "vue-property-decorator";
import search from "@/plugins/search";

@Options({
    components: {
        IconInput,
        SearchIcon,
    }
})

export default class AllActors extends Vue {
    search = '';

    @Prop()
    schedule!: any;

    get persons() {
        if (!this.schedule || !this.schedule.practitioners || this.schedule.practitioners.length === 0) return [ ];
        if (!this.search) return this.schedule.practitioners;
        return this.schedule.practitioners.filter((i: any) => (i.firstName && i.firstName.toLowerCase().includes(this.search)) || (i.lastName && i.lastName.toLowerCase().includes(this.search)))
    }
}
</script>


