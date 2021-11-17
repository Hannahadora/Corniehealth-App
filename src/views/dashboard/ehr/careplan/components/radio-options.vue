<template>
    <div class="container-fluid">
        <div class="w-full">
            <div class="w-full">
                <label for="" class="block capitalize mb-1 text-black text-sm font-semibold">{{ label }}</label>
                <button class="select-btn flex justify-between w-11/12" @click="toggleModal" style="padding: 0.6rem">
                    <span>{{ localValue ? localValue.name : 'Select' }}</span>
                    <span><add-icon /></span>
                </button>
            </div>
            <overlay :show="showModal">
                <modal :visible="showModal">
                <div class="w-full p-2" style="min-width: 450px">
                    <div class="w-full">
                        <p
                            class="
                            flex
                            justify-between
                            w-full
                            justify-center
                            font-bold
                            mb-2
                            text-xl text-primary
                            py-2
                            "
                        >
                            <span>{{ label }}</span>
                            <span class="cursor-pointer" @click="() => showModal = false"><close-icon /></span>
                        </p>
                    </div>

                    <div class="w-full" style="border-bottom: 1px dashed #C5C4D4">
                        <div class="w-full mb-3 pl-2">
                            <label class="flex capitalize mb-1 text-black text-lg font-semibold">Reference</label>
                            <div class="w-full flex flex-wrap py-2">
                                <div class="mx-3">
                                    <label class="inline-flex items-center"  @click="selectItem('location')">
                                        <input v-model="referenceType" type="radio" class="form-radio h-4 w-4" :value="'Condition'" >
                                        <span class="ml-2 text-sm">Condition</span>
                                    </label>
                                </div>
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input v-model="referenceType" type="radio" class="form-radio h-4 w-4" :value="'Procedure'" >
                                        <span class="ml-2 text-sm">Procedure</span>
                                    </label>
                                </div>
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input v-model="referenceType" type="radio" class="form-radio h-4 w-4" :value="'Observation'" >
                                        <span class="ml-2 text-sm">Observation</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full my-2">
                        <search-input v-model="query" :autocomplete="'off'" />
                    </div>

                    <div class="w-full" style="overflow-y:scroll;max-height:250px">
                        <div class="w-full" v-if="items?.length > 0">
                            <div class="w-full flex items-center my-2 cursor-pointer p-2" @click="selectItem(item)" 
                                v-for="(item, index) in items" 
                                :key="index"
                                
                                >
                                <div class="w-1/12">
                                    <loc-icon />
                                </div>
                                <div class="w-11/12">
                                    <p class="flex flex-col items-start justify-start">
                                        <span style="color: #14171F;">{{ item.name }}</span>
                                        <span class="subtext">{{ item.job }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4" v-else>
                            <p class="flex flex-col items-start justify-start">
                                <span class="subtext italic">No records found</span>
                            </p>
                        </div>
                        <!-- <div class="w-full" v-if="type === 'Practitioner'">
                            <actors-practitioners @selected="itemSelected" />
                        </div>
                        <div class="w-full" v-if="type === 'Appointment'">
                            <appointment-list @selected="itemSelected" />
                        </div> -->
                    </div>

                    <div class="w-full flex justify-end my-6">
                        <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                            <span class="font-semibold text-primary-500" @click="toggleModal">Cancel</span>
                        </corniebtn>

                        <CornieBtn @click="apply" class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer">
                            <span class="text-white font-semibold">Add</span>
                        </CornieBtn>
                    </div>
                </div>
            </modal>
            </overlay>
        </div>
    </div>
</template>

<script lang="ts">
import ILocation from "@/types/ILocation";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import LocIcon from "@/views/dashboard/ehr/hospitalization/components/loc-icon.vue"
import Modal from "@/components/modal.vue"
import SearchInput from "@/components/search-input.vue"
import CloseIcon from "@/components/icons/CloseIcon.vue"
import Overlay from "@/views/dashboard/settings/rolesprivileges/components/overlay.vue"
import AddIcon from "@/views/dashboard/ehr/hospitalization/components/add-icon.vue"
import { Prop, Watch } from "vue-property-decorator";
import IPractitioner from "@/types/IPractitioner";
import CornieSelect from "@/components/cornieselect.vue"
import ActorsPractitioners from "./actor-practitioners.vue"
import AppointmentList from "./appointments-list.vue"
import { ICondition } from "@/types/ICondition";

const location = namespace('location')
const user = namespace('user');
const condition = namespace('condition');

interface IReferenceItem {
    id: string,
    name: string,
    address: string,
}

@Options({
    components: {
        LocIcon,
        Modal,
        SearchInput,
        CloseIcon,
        Overlay,
        AddIcon,
        CornieSelect,
        ActorsPractitioners,
        AppointmentList,
    }
})

export default class SelectReference extends Vue {
    @location.State
    locations!: any;
    @location.Action
    fetchLocations!: () => Promise<void>

    @user.Getter
    authPractitioner!: IPractitioner;

    @condition.State
    conditions!: ICondition[];

    @condition.Action
    fetchPatientConditions!: (patientId: string) => Promise<void>;

    @Prop()
    value!: string;

    @Prop()
    label!: string;

    @Prop({ type: String, default: '' })
    selectedType!: string;

    @Prop({ type: Array, default: [ ]})
    options!: string[];

    localValue: any = { }
    referenceType = "Condition"
    showModal = false;
    query = ""
    type = "Practitioner"

    get items() {
        // if (this.conditions[this.$route.params.i.toString()]?.length <= 0) return [ ];
        return this.conditions?.map(condition => {
            return {
                id: condition.id,
                date: condition.createdAt ? new Date(condition?.createdAt).toLocaleDateString() : '',
                catgory: condition.category,
                name: `${condition?.practitioner?.firstName} ${condition?.practitioner?.lastName}`,
                job: condition?.practitioner?.jobDesignation
            }
        })
    }

    itemSelected(data: any) {
        this.$emit('selected', data)
        this.localValue = data;
        this.showModal = false;
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }

    selectItem(data: any) {
        this.localValue = data;
    }

    apply() {
        this.$emit('inpu', this.localValue);
        this.showModal = false;
    }

    @Watch('value') 
    updateValue() {
        if (this.value) {
            this.localValue = this.value ? this.value : "";
        }
    }


    async created() {
        this.type = this.selectedType
        this.localValue = this.value ? this.value : "";
        await this.fetchLocations();
        await this.fetchPatientConditions(this.$route.params.id.toString());
        console.log(this.conditions, "Conditions");
        
    }
}
</script>


<style scoped>
    * {
        font-family: Inter;
    }

    .subtext {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 140% */


        /* Greys/Blue Yonder */

        color: #667499;
    }

    .item {
        background: #F0F4FE;
        border-radius: 124px;
    }

    .select-btn {
        background: #FFFFFF;
        /* Greys/Etherium */

        border: 1px solid #C2C7D6;
        box-sizing: border-box;
        border-radius: 4px;
    }
</style>