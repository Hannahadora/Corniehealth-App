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
                            <div class="w-12/12" v-for="(person, index) in actors" :key="index" @click="selectActor(person)">
                                <label for="" class="flex items-center mb-3">
                                    <input type="checkbox" name="" id="" :checked="selectedPractitioners.findIndex(i => i.id === person.id) >= 0">
                                    <span class="mx-3 flex flex-col">
                                        <span>{{ person.firstName }} {{ person.lastName }}</span>
                                        <span class="text-xs text-gray-500">{{ person.jobDesignation }}</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="w-full flex justify-end my-8">
            <cornie-btn
            class="border-primary border-2 px-4 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            type="submit"
            class="text-white bg-danger px-4 rounded-xl"
            @click="applyFilter"
          >
            Apply
          </cornie-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDown from '@/components/icons/chevrondownprimary.vue'
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import CornieCard from "@/components/cornie-card";
import CornieBtn from "@/components/CornieBtn.vue";


const practitionersStore = namespace('practitioner');


@Options({
    components: {
        ChevronDown,
        IconInput,
        SearchIcon,
        CornieCard,
        CornieBtn
    }
})
export default class AdvancedFilter extends Vue {
    @practitionersStore.State
    practitioners!: IPractitioner[]

    @practitionersStore.Action
    fetchPractitioners!: () => Promise<void>;

    search = ''
    filterOptions: any = [
        {
            name: 'Filter by practitioner',
            items: this.actors,
            show: false,
        }
    ]
    selectedPractitioners: IPractitioner[] = [];

    get actors(): IPractitioner[] {
        return this.practitioners?.map(practitioner => {
            return {
                ...practitioner
            }
        })
    }

    selectActor(actor: IPractitioner) {
        console.log(this.selectedPractitioners);
        
        if (this.selectedPractitioners.findIndex(practitioner => practitioner.id === actor.id) < 0) {
            this.selectedPractitioners.push(actor);
        } else {
            this.selectedPractitioners = this.selectedPractitioners.filter(practitioner => practitioner.id !== actor.id)
        }
    }

    applyFilter() {
        this.$emit('applyfilter', {
            byPractitioners: this.selectedPractitioners.map(practitioner => practitioner.id)
        })
    }

    async created() {
        if (this.practitioners?.length === 0) await this.fetchPractitioners();
        console.log(this.practitioners, ":LOADED PRAC");
        
    }
}
</script>

<style scoped>
    .scroll-box {
        max-height: 396px;
        overflow-y: auto;
    }
</style>