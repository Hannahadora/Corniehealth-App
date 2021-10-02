<template>
    <div class="container-fluid">
        <div class="w-full">
            <p class="flex justify-between items-center border-b-2 cursor-pointer" @click="toggleDetailsDisplay"><span class="uppercase mb-1 text-sm font-bold">Hospital Info</span> <span><ChevronDown /> </span></p>
            <div class="w-full" :class="{ 'hide-details': !showDetails, 'show-details -mb-28': showDetails }">
                <!-- <slot name="details" /> -->
                <div class="w-full mb-4">
                    <slot name="form" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ChevronDown from "@/components/icons/chevrondown-red.vue"
import CornieSelect from "@/components/cornieselect.vue"
import SplitInput from "./split-input.vue"

@Options({
    components: {
        ChevronDown,
        CornieSelect,
        SplitInput,
    }
})

export default class HospitalInfo extends Vue {
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
        height: 570px;
        transition: all .4s ease-in-out;
        overflow: hidden;
    }
</style>
