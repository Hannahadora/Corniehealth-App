<template>
    <div class="container-fluid p-3">
        <div class="text-gray-400">Fields with <span class="text-danger">*</span> are required</div>
            <div class="w-full" style="overflow-y:scroll; height: 650px">
                <div class="w-full mb-2 flex items-center">
                    <div class="w-6/12 ">
                        <cornie-input :label="'Origin'" :placeholder="'Select'" />
                    </div>
                    <div class="w-6/12 mt-4">
                        <auto-complete :label="'Ward'" :items="[ 'Ward 1', 'Ward 2' ]" />
                    </div>
                </div>

                <div class="w-full my-2 flex items-center">
                    <div class="w-6/12">
                        <auto-complete :label="'Room'" :items="[ 'Room 1', 'Room 2' ]" />
                    </div>
                    <div class="w-6/12">
                        <auto-complete :label="'Bed'" :items="[ 'Bed 1', 'Bed 2' ]" />
                    </div>
                </div>

                <div class="w-full my-2 flex items-center">
                    <div class="w-6/12">
                        <auto-complete :label="'Admit Source'" :items="[ 'Source 1', 'Source 2' ]" />
                    </div>
                    <div class="w-6/12">
                        <auto-complete :label="'Re-admission'" :items="[ 'Source 1', 'Source 2' ]" />
                    </div>
                </div>

                <div class="w-full my-2 flex items-center">
                    <div class="w-6/12">
                        <auto-complete :label="'Reference Special Courtesy'" :items="[ 'Option 1', 'Option 2' ]" />
                    </div>
                    <div class="w-6/12">
                        <auto-complete :label="'Reference Special Courtesy'" :items="[ 'Option 1', 'Option 2' ]" />
                    </div>
                </div>

                <div class="w-full my-2 flex items-center">
                    <div class="w-6/12">
                        <auto-complete :label="'Special Arrangement'" :items="[ 'Option 1', 'Option 2' ]" />
                    </div>
                    <div class="w-6/12 -mt-4">
                        <cornie-input :label="'Destination'" />
                    </div>
                </div>

                <div class="w-full my-2 flex items-center">
                    <div class="w-6/12">
                        <auto-complete :label="'Discharge Disposition'" :items="[ 'Option 1', 'Option 2' ]" />
                    </div>
                    <div class="w-6/12">
                    </div>
                </div>
            </div>

        <div class="w-full">
            <div class=" flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Admit</span>
                </CornieBtn>
            </div>
        </div>
        
    </div>    
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue"
import AutoComplete from "@/components/autocomplete.vue"
import CornieInput from "@/components/cornieinput.vue"
import CornieSelect from "@/components/cornieselect.vue"
import { Item } from "@/types/IUpdateModel";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import CollapseSection from "@/views/dashboard/ehr/procedures/components/collapse-section.vue"
import helper from "../helper/helper"
import TextArea from "@/components/textarea.vue"

@Options({
    components: {
        CornieBtn,
        AutoComplete,
        CornieInput,
        CornieSelect,
        DateTimePicker,
        CollapseSection,
        TextArea,
    }
})
export default class AdmitPatient extends Vue {

    get codes() {
        return helper.carePlanCodes;
    }

    get reeasonReferences() {
        return helper.carePlanReasonReferences;
    }

    get detailStatus() {
        return helper.carePlanDetailStatus;
    }
}
</script>
