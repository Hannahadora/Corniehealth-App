<template>
    <div class="container-fluid">
        <div class="w-full px-2">
            <div class="container-fluid" v-for="(option, index) in filterOptions" :key="index">
                <div class="w-full">
                    <p class="text-base text-gray-800 my-3 font-semibold flex justify-between">
                        <span>Filter by Practitioners</span>
                        <span @click="() => option.show = !option.show"><ChevronDown /></span>
                    </p>
                </div>

                <div class="w-full border p-2" v-if="option.show">
                    <div class="container-fluid">
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
                        <div class="w-full mt-2 px-2 scroll-box">
                            <div class="w-12/12" v-for="(person, index) in option.items" :key="index">
                                <label for="" class="flex items-center mb-3">
                                    <input type="checkbox" name="" id="">
                                    <span class="mx-3 flex flex-col">
                                        <span>{{ person.name }}</span>
                                        <span class="text-xs text-gray-500">{{ person.specialty }}</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDown from '@/components/icons/chevrondownprimary.vue'
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";

@Options({
    components: {
        ChevronDown,
        IconInput,
        SearchIcon,
    }
})
export default class AdvancedFilter extends Vue {
    filterOptions: any = [
        {
            name: 'Filter by practitioner',
            items: [
                { name: 'Person Name', specialty: 'Doctor'},
                { name: 'Person Name', specialty: 'Doctor'},
                { name: 'Person Name', specialty: 'Doctor'},
                { name: 'Person Name', specialty: 'Doctor'}
            ],
            show: false,
        }
    ]
}
</script>

<style scoped>
    .scroll-box {
        max-height: 396px;
        overflow-y: auto;
    }
</style>