<template>
    <div class="container-fluid py-5 px-4 bg-white">
        <div class="w-full p-2 main-box">
            <div class="text-gray-400">All fields are required</div>

            <basic-info>
                <template #form>
                    <div class="w-full flex items-center mb-3 mt-5">
                        <div class="w-6/12">
                            <cornie-select :label="'Status'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Type'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center mt-3">
                        <div class="w-6/12 -mt-4">
                            <cornie-select :label="'Class'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Service Type'"  :items="['Service 1', 'Service 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full mb-8 -mt-3 ">
                        <div class="w-6/12">
                            <p class="text-base font-semibold">Class History</p>
                            <p>
                                <span class="mr-2">Inpatient</span> 
                                <span class="text-gray-400">(29/04/2021, 09:00 - 29/04/2021, 09:30)</span>
                            </p>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <cornie-select :label="'Priority'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Episode of care'"  :items="['Episode 1', 'Episode 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12 -mt-4">
                            <cornie-select :label="'Appointment'"  :items="['Appointment 1', 'Appointment 2' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Based on'"  :items="['Service 1', 'Service 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                    </div>

                </template>
            </basic-info>

            <service-provider style="margin: 2rem 0">
                <template #form>
                    <div class="w-full flex items-center mb-3 mt-5">
                        <div class="w-6/12 -mt-4">
                            <cornie-input :label="'Provider\'s name'" />
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Reference Location'"  :items="['Location 1', 'Location 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        
                        <div class="w-6/12">
                            <p class="text-xs font-semibold uppercase">Status</p>
                            <div class="w-full flex flex-wrap py-4">
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio h-4 w-4" :value="'Planned'" >
                                        <span class="ml-2 text-sm">Planned</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio h-4 w-4" :value="'Active'" >
                                        <span class="ml-2 text-sm">Active</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio h-4 w-4" :value="'Reserved'" >
                                        <span class="ml-2 text-sm">Reserved</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio h-4 w-4" :value="'Completed'" >
                                        <span class="ml-2 text-sm">Completed</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="w-6/12 -mt-1">
                            <cornie-select :label="'Physical Type'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                    </div>
                </template>
            </service-provider>

            <hospital-info style="margin: 2rem 0">
                <template #form>
                    <div class="w-full flex items-center mb-3 mt-9">
                        
                        <div class="w-6/12 -mt-4">
                            <cornie-select :label="'Origin'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Admit Source'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center mb-3 mt-3">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Re-admission'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Diet Preference'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center mb-3 mt-3">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Special Courtsey'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Special Arrangement'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center mb-3 mt-3">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Destination'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Discharge Disposition'"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>
                </template>
            </hospital-info>

            <div class="spacer my-12"></div>
            <!-- <div class="w-full mt-12"> -->
            <div class="w-full mt-12">

            <div class=" flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Save</span>
                </CornieBtn>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import BasicInfo from "./basic-info.vue"
import ServiceProvider from "./service-provider.vue"
import HospitalInfo from "./hospital-info.vue"

@Options({
    components: {
        CornieSelect,
        CornieInput,
        DateTimePicker,
        BasicInfo,
        ServiceProvider,
        HospitalInfo,
    }
})
export default class NewEpisode extends Vue {
    
}
</script>

<style scoped>
/* .main-box {
    min-height: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow: hidden;
} */
</style>