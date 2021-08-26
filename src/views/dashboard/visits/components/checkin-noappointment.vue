<template>
    <div class="w-full p-4 overflow-y-scroll h-scrren">
        <div class="container-fluid">

            <div class="w-full flex items-center">
                <div class="w-6/12">
                    <div class="w-11/12">
                        <label class="block uppercase mb-1 text-xs font-bold">
                            Time
                            <input type="time" name="" class="p-3 border rounded-md w-full" id="" v-model="data.time">
                        </label>
                    </div>
                </div>
                <div class="w-6/12 flex">
                    <div class="container flex justify-end">
                        <div class="w-12/12">
                            <DatePicker color="red" class="w-full" :label="'Date'" style="width: 100%" v-model="data.date" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full my-4" style="border-bottom: 1px dashed #C2C7D6;">
                <CornieSelect :items="[1, 2, 3]" :label="'Type'" v-model="data.room" style="width: 100%" />
            </div>

            <div class="w-full my-5">
                <label class="block uppercase mb-1 text-xs font-bold">
                    <span class="flex justify-between">
                        <span class="uppercase font-semibold">Physician</span>
                        <span class="uppercase  text-danger">assign to physician</span>
                    </span>
                    <input type="text" name="" class="p-3 border rounded-md w-full mt-1" id="" v-model="data.time">
                </label>
            </div>

            <div class="w-full my-4" style="border-bottom: 1px dashed #C2C7D6;">
                <CornieSelect :items="[1, 2, 3]" :label="'Room'" v-model="data.room" style="width: 100%" />
            </div>

            <div class="w-full mb-4 mt-8">
                <TextArea :label="'Notes'" v-model="data.notes" style="width: 100%" />
            </div>

            <div class="w-full">
                <div class="container-fluid">
                    <p class="font-semibold font-normall text-sm">All patients for visit</p>
                </div>
                <div class="container-fluid my-5 border-b-2 pb-2">
                    <div class="w-full flex items-center">
                        <div class="w-1/12 rounded-full">
                            <img src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image">
                        </div>
                        <div class="w-11/12 ml-2">
                            <div class="w-full">
                                <p class="font-semibold text-sm mb-0">Damorola David</p>
                            </div>
                            <div class="w-full flex justify-between">
                                <span>
                                    <span class="cursor-pointer text-success font-light text-xs">Visitors</span>
                                    <span class="mx-1 font-light text-gray-500">|</span>
                                    <span class="cursor-pointer text-gray-400 font-light text-xs">Queue No: 232222</span>
                                    <span class="mx-1 font-light text-gray-500">|</span>
                                    <span class="cursor-pointer text-gray-400 font-light text-xs">10:08 AM</span>
                                </span>
                                <span class="cursor-pointer text-danger font-light text-xs cursor-pointer font-semibold">Queue</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid my-5 pb-2">
                    <div class="w-full flex items-center">
                        <div class="w-1/12 rounded-full">
                            <img src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image">
                        </div>
                        <div class="w-11/12 ml-2">
                            <div class="w-full">
                                <p class="font-semibold text-sm mb-0">Damorola David</p>
                            </div>
                            <div class="w-full flex justify-between">
                                <span>
                                    <span class="cursor-pointer text-success font-light text-xs">Visitors</span>
                                    <span class="mx-1 font-light text-gray-500">|</span>
                                    <span class="cursor-pointer text-gray-400 font-light text-xs">Queue No: 232222</span>
                                    <span class="mx-1 font-light text-gray-500">|</span>
                                    <span class="cursor-pointer text-gray-400 font-light text-xs">10:08 AM</span>
                                </span>
                                <span class="cursor-pointer text-danger font-light text-xs cursor-pointer font-semibold">Queue</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        
        <div class="w-full mb-3 mt-8">
            <div class="container-fluid flex justify-end items-center">
                <corniebtn :loading="false">
                    <router-link to="" class="cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                        Cancel
                    </router-link>
                </corniebtn>
                <Button :loading="loading">
                    <a style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save 
                    </a>
                </Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from 'vuex-class';
import CustomDropdown from '@/components/cornieselect.vue'
import Button from '@/components/globals/corniebtn.vue'
import DeleteIcon from '@/components/icons/delete.vue'
import ChevronDown from '@/components/icons/chevrondownprimary.vue'
import DatePicker from '@/components/datepicker.vue'
import ToggleCheck from '@/components/ToogleCheck.vue'
import CornieSelect from '@/components/cornieselect.vue'
import TextArea from '@/components/textarea.vue'

const healthcare = namespace('healthcare');
const shifts = namespace('shifts');

@Options({
  components: {
      Accordion,
      CornieInput,
      CustomDropdown,
      Button,
      DeleteIcon,
      ChevronDown,
      DatePicker,
      ToggleCheck,
      CornieSelect,
      TextArea,
  },
})
export default class CheckIn extends Vue {
 showDetails = true;
 showBreaks = false;
 showPlanning = false;
 loading = false;

    data: any = { }

 activeStates: any = [
     { display: 'Yes', value: 'yes' },
     { display: 'No', value: 'no' },
 ]

 waitList: any = [
     { display: 'Yes', value: 'yes' },
     { display: 'No', value: 'no' },
 ]

 slotOccurence: any = [
     { display: 'Do not repeat', code: 'do not repeat' },
     { display: 'Every day', code: 'every day' },
     { display: 'Every week', code: 'every week' },
     { display: 'Every month', code: 'every month' },
     { display: 'Every forever', code: 'every forever' },
     { display: 'Custom', code: 'Custom' },
 ]

 ends: any = [
     { display: 'Never', code: 'never' },
     { display: 'On', code: '' },
     { display: 'After', code: '' },
 ]

 days: any = [ 
     { display: 'Monday', code: true },
     { display: 'Tuesday', code: false },
     { display: 'Wednesday', code: false },
     { display: 'Thursday', code: false },
     { display: 'Friday', code: false },
     { display: 'Saturday', code: false },
     { display: 'Sunday', code: false }
 ]


}
</script>
<style>
    .dashed-bottom {
        border-bottom: 1px dashed #667499;
    }

    .h-scrren {
        height: 100vh;
        overflow: scroll;
        padding-bottom: 40px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .h-scrren::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .h-scrren {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
