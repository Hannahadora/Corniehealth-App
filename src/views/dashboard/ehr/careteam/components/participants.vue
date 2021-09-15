<template>
    <div class="container-fluid">
        <div class="w-full">
            <p class="flex justify-between items-center border-b-2 pb-2 cursor-pointer" @click="toggleDetailsDisplay"><span class="uppercase mb-1 text-xs font-bold">Participants</span> <span><add-icon /> </span></p>
            <div class="w-full" :class="{ 'hide-details': !showDetails, 'show-details py-3': showDetails }">
                <slot name="details" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddIcon from "@/components/icons/add.vue"
import CornieSelect from "@/components/cornieselect.vue"

@Options({
    components: {
        AddIcon,
        CornieSelect,
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
        height: 400px;
        transition: all .4s ease-in-out;
        overflow: hidden;
    }
</style>
