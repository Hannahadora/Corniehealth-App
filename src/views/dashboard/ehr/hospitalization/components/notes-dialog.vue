<template>
    <div class="container-fluid p-3">
        <div class="w-full">
            <div class="w-full mb-2 flex items-center">
                <p class="header">Add Notes</p>
            </div>

            <div class="w-full">
                <text-area style="width: 100%; height:200px" />
            </div>
        </div>

        <div class="w-full mt-4">
            <div class=" flex justify-end">
                <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 ml-4">
                    <span class="text-white font-semibold">Add</span>
                </CornieBtn>
            </div>
        </div>

        <div class="w-full notes mt-5">
            <div class="w-full flex my-4">
                <div class="" style="width:5%">
                    <doc-icon />
                </div>
                <div class="">
                    <p class="flex items-center">
                        <span class="text-xs">8-Sep-2021 8:00PM</span>
                        <span class="flex items-center mx-1 text-lg"><dot-icon /></span>
                        <span class="text-xs">Dr. EBUBE OGE</span>
                    </p>
                    <p class="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis egestas at sociis sodales nunc metus, commodo, viverra sit. Bibendum sagittis neque blandit varius.
                    </p>
                </div>
            </div>
            <div class="w-full flex my-4">
                <div class="" style="width:5%">
                    <doc-icon />
                </div>
                <div class="">
                    <p class="flex items-center">
                        <span class="text-xs">8-Sep-2021 8:00PM</span>
                        <span class="flex items-center mx-1 text-lg"><dot-icon /></span>
                        <span class="text-xs">Dr. EBUBE OGE</span>
                    </p>
                    <p class="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis egestas at sociis sodales nunc metus, commodo, viverra sit. Bibendum sagittis neque blandit varius.
                    </p>
                </div>
            </div>
            <div class="w-full flex my-4">
                <div class="" style="width:5%">
                    <doc-icon />
                </div>
                <div class="">
                    <p class="flex items-center">
                        <span class="text-xs">8-Sep-2021 8:00PM</span>
                        <span class="flex items-center mx-1 text-lg"><dot-icon /></span>
                        <span class="text-xs">Dr. EBUBE OGE</span>
                    </p>
                    <p class="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis egestas at sociis sodales nunc metus, commodo, viverra sit. Bibendum sagittis neque blandit varius.
                    </p>
                </div>
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
import DocIcon from "@/components/icons/doc.vue"
import DotIcon from "./dot-icon.vue"

@Options({
    components: {
        CornieBtn,
        AutoComplete,
        CornieInput,
        CornieSelect,
        DateTimePicker,
        CollapseSection,
        TextArea,
        DocIcon,
        DotIcon,
    }
})
export default class NewNote extends Vue {

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

<style scoped>
.header {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 34px;
    color: #080056;
}

.notes {
    font-family: Inter;
    font-style: normal;
    font-size: 12px;
    line-height: 19px;
    /* identical to box height, or 160% */

    letter-spacing: 0.02em;

    /* Greys/Blue Yonder */

    color: #667499;
}
</style>
