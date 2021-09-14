<template>
    <div class="container-fluid flex flex-col justify-center px-4">
        <div class="w-full">
            <cornie-select :label="'Status'" :items="['active', 'inactive']" style="width:100%"/>
        </div>
        <div class="w-full">
            <cornie-select :label="'Category'" :items="['active', 'inactive']" style="width:100%"/>
        </div>
        <div class="w-full mx-auto">
            <cornie-input :label="'Name'" style="width:100%" />
        </div>

        <div class="w-full">
            <div class="container-fluid py-5">
                <p class="font-bold">
                    <label for="" class="flex uppercase mb-1 text-xs font-bold">Subject <span class="ml-2"><info-icon /></span></label>
                </p>

                <div class="w-full flex mt-3">
                    <div class="mr-6">
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio h-5 w-5" :value="'patient'" v-model="newTeam.subject" name="break" >
                            <span class="ml-2">Patient</span>
                        </label>
                    </div>
                    <div class="mr-6">
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio h-5 w-5" :value="'patient'" v-model="newTeam.subject" name="break" >
                            <span class="ml-2">Group</span>
                        </label>
                    </div>
                </div>                                
            </div>
        </div>

        <div class="w-full">
            <div class="w-12/12 py-4">
                <div class="w-12/12">
                    <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                        <template #date>
                            <span class="pl-1">{{ new Date(newTeam.endDate ?? Date.now()).toLocaleDateString()}}</span>
                        </template>
                        <template #time>
                            <span>{{ newTeam.endTime }}</span>
                        </template>
                        <template #input>
                            <v-date-picker name="eeee" v-model="newTeam.endDate" style="z-index:9000;width:100%"></v-date-picker>
                            <label
                                class="block uppercase my-1 text-xs font-bold"
                                >
                                Time
                            </label>
                            <input v-model="newTeam.endTime" type="time" class="w-full border rounded-md p-2">
                        </template>
                    </date-time-picker>
                </div>
            </div>
            <div class="w-12/12 pt-3 pb-4">
                <div class="w-12/12">
                    <date-time-picker :label="'End date & Time'" :width="'w-full'">
                        <template #date>
                            <span>{{ new Date(newTeam.endDate ?? Date.now()).toLocaleDateString()}}</span>
                        </template>
                        <template #time>
                            <span>{{ newTeam.endTime }}</span>
                        </template>
                        <template #input>
                            <v-date-picker name="eeee" v-model="newTeam.endDate" style="z-index:9000;width:100%"></v-date-picker>
                            <label
                                class="block uppercase my-1 text-xs font-bold"
                                >
                                Time
                            </label>
                            <input v-model="newTeam.endTime" type="time" class="w-full border rounded-md p-2">
                        </template>
                    </date-time-picker>
                </div>
            </div>

            <div class="w-full my-3">
                <ParticipantsDetails>
                    <template #details>
                        <div class="w-full py-2">
                            <cornie-select :label="'Role'" :items="['active', 'inactive']" style="width:100% !important"/>
                        </div>

                        <div class="w-full flex items-center">
                            <div class="w-4/12">
                                <cornie-select :label="'Member'" :items="['active', 'inactive']"/>
                            </div>
                            <div class="w-8/12">
                                <search-dropdown :results="['fjkbkre', 'tegbkjbk.']" @selected="memberSelected" />
                            </div>
                        </div>

                        <div class="w-full">
                            <cornie-input :label="'On Behlaf Of'" style="width:100%" />
                        </div>

                        <div class="w-full py-3">
                            <cornie-select :label="'Reason Code'" :items="['active', 'inactive']" style="width:100% !important"/>
                        </div>
                    </template>
                </ParticipantsDetails>
            </div>

            <div class="w-full my-5">
                <telecom>
                    <template #details>
                        <div class="w-full py-2">
                            <p class="font-bold">
                                <label for="" class="flex uppercase mb-1 text-xs font-bold">System <span class="ml-2"></span></label>
                            </p>
                            <div class="w-full flex justify-around">
                                <span class="flex flex-col items-center">
                                    <span class="icon-box selected-bg"><Phone /></span>
                                    <span>Phone</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><Fax /></span>
                                    <span>Fax</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><Envelop /></span>
                                    <span>Email</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><Pager /></span>
                                    <span>Pager</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><uri /></span>
                                    <span>Uri</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><Sms /></span>
                                    <span>Sms</span>
                                </span>
                                <span class="flex flex-col items-center">
                                    <span class="icon-box"><three-dot /></span>
                                    <span>More</span>
                                </span>
                            </div>
                        </div>

                        <div class="w-full py-3">
                            <cornie-input :label="'Value'" style="width: 100%" />
                        </div>

                        <div class="w-full">
                            <cornie-input :label="'On Behlaf Of'" style="width:100%" />
                        </div>

                        <div class="w-full py-3">
                            <cornie-select :label="'Reason Code'" :items="['active', 'inactive']" style="width:100% !important"/>
                        </div>

                        <div class="w-full">
                            <div class="container-fluid pb-5">
                                <p class="font-bold">
                                    <label for="" class="flex uppercase mb-1 text-xs font-bold">Use <span class="ml-2"><info-icon /></span></label>
                                </p>

                                <div class="w-full flex mt-3">
                                    <div class="mr-6">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-5 w-5" :value="'home'" v-model="newTeam.subject" name="break" >
                                            <span class="ml-2">Home</span>
                                        </label>
                                    </div>
                                    <div class="mr-6">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-5 w-5" :value="'work'" v-model="newTeam.subject" name="break" >
                                            <span class="ml-2">Work</span>
                                        </label>
                                    </div>
                                    <div class="mr-6">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-5 w-5" :value="'temp'" v-model="newTeam.subject" name="break" >
                                            <span class="ml-2">Temp</span>
                                        </label>
                                    </div>
                                    <div class="mr-6">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-5 w-5" :value="'old'" v-model="newTeam.subject" name="break" >
                                            <span class="ml-2">Old</span>
                                        </label>
                                    </div>
                                    <div class="mr-6">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-5 w-5" :value="'mobile'" v-model="newTeam.use" name="break" >
                                            <span class="ml-2">Mobile</span>
                                        </label>
                                    </div>
                                </div>                                
                            </div>
                        </div>

                        <div class="w-12/12 pt-3 pb-4">
                            <div class="w-12/12">
                                <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(newTeam.endDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ newTeam.endTime }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" v-model="newTeam.endDate" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input v-model="newTeam.endTime" type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>

                        <div class="w-12/12 pt-3 pb-4">
                            <div class="w-12/12">
                                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(newTeam.endDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ newTeam.endTime }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" v-model="newTeam.endDate" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input v-model="newTeam.endTime" type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>

                        <div class="w-full">
                            <p class="font-bold">
                                <label for="" class="flex uppercase mb-1 text-xs font-bold">Note <span class="ml-2"></span></label>
                            </p>
                            <textarea name="" id="" rows="5" class="w-full text-area"></textarea>
                        </div>

                    </template>
                </telecom>
            </div>
            
            <div class="w-full pb-8 flex flex justify-end">
                <corniebtn class="bg-gray-300 p-2 rounded-full px-8 mx-4">
                    <span class="font-semibold text-gray-500">Cancel</span>
                </corniebtn>

                <corniebtn class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Save</span>
                </corniebtn>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CornieSelect from '@/components/cornieselect.vue'
import CornieInput from '@/components/cornieinput.vue'
import InfoIcon from "@/components/icons/info.vue"
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import ParticipantsDetails from "./participants.vue"
import SearchDropdown from "./search-dropdown.vue"
import Phone from './icons/phone.vue'
import Fax from './icons/fax.vue'
import Uri from './icons/uri.vue'
import Pager from './icons/pager.vue'
import Envelop from './icons/envelop.vue'
import Sms from './icons/sms.vue'
import Telecom from './telecom.vue'
import ThreeDot from '@/components/icons/threedot.vue'

@Options({
    name: 'NeaTeamForm',
    components: {
        CornieSelect,
        CornieInput,
        InfoIcon,
        DateTimePicker,
        ParticipantsDetails,
        SearchDropdown,
        Phone,
        Pager,
        Fax,
        Envelop,
        Sms,
        Uri,
        ThreeDot,
        Telecom,
    }
})
export default class NewTeam extends Vue {
    newTeam: any = { }

    memberSelected() {
        
    }
}
</script>

<style scoped>
    .icon-box {
        height: 40px;
        width: 40px;
        border: 1px solid;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .selected-bg {
        background: #FE4D3C;
    }

    .text-area {
        /* Whites/Plain */

        background: #FFFFFF;
        /* Greys/Etherium */

        border: 1px solid #C2C7D6;
        box-sizing: border-box;
        border-radius: 4px;
    }
</style>
