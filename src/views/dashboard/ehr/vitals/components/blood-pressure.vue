<template>
    <div class="container-fluid">
        <div class="w-full">
            <p class="flex justify-between items-center border-b-2 cursor-pointer" @click="toggleDetailsDisplay"><span class="uppercase mb-1 text-sm font-bold">Blood Pressure</span> <span><add-icon /> </span></p>
            <div class="w-full" :class="{ 'hide-details': !showDetails, 'show-details -mb-28': showDetails }">
                <!-- <slot name="details" /> -->
                <div class="w-full mb-4">
                    <div class="w-full my-2">
                        <split-input :label="'blood pressure (systolic)'" >
                            <template #list>
                                <slot name="systolic-list" />
                            </template>
                            <template #input>
                                <slot name="systolic-input" />
                            </template>
                        </split-input>
                    </div>

                    <div class="w-full -mt-3">
                        <split-input :label="'blood pressure (diastolic)'" >
                            <template #list>
                                <slot name="diastolic-list" />
                            </template>
                            <template #input>
                                <slot name="diastolic-input" />
                            </template>
                        </split-input>
                    </div>

                    <div class="w-full">
                        <slot name="record" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddIcon from "@/components/icons/add.vue"
import CornieSelect from "@/components/cornieselect.vue"
import SplitInput from "./split-input.vue"

@Options({
    components: {
        AddIcon,
        CornieSelect,
        SplitInput,
    }
})

export default class Participants extends Vue {
    showDetails = false;

    toggleDetailsDisplay() {
        this.showDetails = !this.showDetails;
    }
}
</script>

<style scoped>
    .hide-details {
        height: 0;
        transition: all .4s ease-in-out;
        overflow: hidden;
    }

    .show-details {
        height: 330px;
        transition: all .4s ease-in-out;
        overflow: hidden;
    }
</style>
