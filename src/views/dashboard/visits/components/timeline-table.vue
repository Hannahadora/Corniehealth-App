<template>
    <div class="conatainer-fluid">
        <div class="w-full flex items-center">
            <p class="mb-4 mr-4">View Timeline</p>
            <CornieSelect v-model="data.type" :items="[1, 2, 3]" style="width: 150px" />
        </div>
        <div class="w-full px-2 flex">
            <div class="w-9/12">
                <div class="w-full flex">
                    <div class="w-1/12 py-2 border-t-2 mx-1">
                        <span class="text-gray-500 text-xs">8:00 AM</span>
                    </div>
                    <div class="w-11/12 py-2 flex border-t-2 items-center" style="background: #F3FCF8;">
                        <div class="w-full flex items-center">
                            <div class="w-9/12 px-5">
                                <AllActors :items="data.practitioners" />
                            </div>
                        <div class="w-3/12 text-right flex justify-end">
                            <span class="flex items-center">
                                <span class="uppercase text-xs font-semibold text-success">Check In</span>
                                <span class="ml-3 mr-2"><Elipsis /></span>
                            </span>
                        </div>
                        </div>
                    </div>
                    
                </div>

                <div class="w-full flex">
                    <div class="w-1/12 py-2 border-t-2 border-b-2 mx-1">
                        <span class="text-gray-500 text-xs">8:00 AM</span>
                    </div>
                    <div class="w-11/12 py-2 flex border-t-2 border-b-2 items-center" style="background: #F3FCF8;">
                        <div class="w-full flex items-center">
                            <div class="w-9/12 px-5">
                                <AllActors :items="data.practitioners" />
                            </div>
                        <div class="w-3/12 text-right flex justify-end">
                            <span class="flex items-center">
                                <span class="uppercase text-xs font-semibold text-success">Check In</span>
                                <span class="ml-3 mr-2"><Elipsis /></span>
                            </span>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="w-3/12 ">
                <div class="w-full ml-3 mb-1">
                    <span class="flex items-center w-full border rounded-md py-2">
                        <span><CalendarIcon /></span>
                        <span class="flex items-center justify-between w-full px-1">
                            <span class="">{{ data.date ? data.date.toLocaleDateString() : '' }}</span>
                            <span>{{ data.time }}</span>
                        </span>
                    </span>
                </div>
                <div class="w-full ml-3 border p-2">
                    <v-date-picker color="red" v-model="data.date" style="border: none"></v-date-picker>
                    <div class="w-12/12">
                        <label class="block uppercase mb-1 text-xs font-bold">
                            Time
                            <input type="time" name="" class="p-3 border rounded-md w-full" id="" v-model="data.time">
                        </label>
                    </div>
                    <div class="w-full flex justify-end">
                        <a class="font-semibold text-primary text-sm">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CornieSelect from '@/components/cornieselect.vue'
import Elipsis from '@/components/icons/threedot.vue'
import AllActors from '../../schedules/components/actors.vue';
import DatetimePicker from './datetime-picker.vue'
import CalendarIcon from '@/components/icons/red-calendar.vue'


export default defineComponent({
    components: {
        CornieSelect,
        Elipsis,
        AllActors,
        DatetimePicker,
        CalendarIcon,
    },

    setup () {
        const data: any = reactive({
            practitioners: [
                { firstName: 'Firstname', lastName: 'Lastname'},
                { firstName: 'Firstname', lastName: 'Lastname'},
                { firstName: 'Firstname', lastName: 'Lastname'},
                { firstName: 'Firstname', lastName: 'Lastname'},
            ]
         })
        return {
            data,
        }
    }
})
</script>

<style scoped>

</style>