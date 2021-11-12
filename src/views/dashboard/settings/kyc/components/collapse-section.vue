<template>
    <div class="container-fluid mb-5">
        <div class="w-full">
            <p class="flex justify-between items-center border-b-2 cursor-pointer" @click="toggleDetailsDisplay">
                <span class="header py-2">{{ title }}</span>
                <span class="flex">
                    <span class="flex mx-3 add" @click="() => $emit('add')" v-if="showAdd">
                        <span class="mr-1 add"><add-icon class="add" /></span>
                        <span class="mx-2 add">Add</span>
                    </span>

                    <span class="flex mx-3 add" @click="() => $emit('select')" v-if="showAddExisting">
                        <span class="mr-2 add"><img class="add" src="../img/select-existing.svg" alt=""></span>
                        <span class="mx-2 add">{{ buttonText }}</span>
                    </span>
                    <ChevronDown :class="{ 'icon-down': showDetails, 'icon-normal': !showDetails }" /> 
                </span>
            </p>
            <div class="w-full show-details mt-5" :style="{ height: displayHeight + 'px', overflow: showDetails && overflow ? '' : 'hidden' }">
            <!-- <div class="w-full" :class="{ 'hide-details': !showDetails, 'show-details -mb-28': showDetails }"> -->
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
import { Prop } from 'vue-property-decorator';
import AddIcon from "@/components/icons/add-circled.vue"
import ExistingIcon from "@/components/icons/select-existing.vue"

@Options({
    components: {
        ChevronDown,
        CornieSelect,
        AddIcon,
        ExistingIcon,
    }
})

export default class CollapseSection extends Vue {
    showDetails = true;

    @Prop({ type: Number, default: 790})
    height!: number;

    @Prop({ title: String, default: ''})
    title!: string;

    @Prop({ title: Boolean, default: true})
    show!: boolean;

    @Prop({ title: Boolean, default: false})
    overflow!: boolean;

    @Prop({ title: Boolean, default: false})
    showAdd!: boolean;

    @Prop({ title: Boolean, default: false})
    showAddExisting!: boolean;

    @Prop({ title: String, default: 'Select existing'})
    buttonText!: string;

    get displayHeight() {
        if (this.showDetails) return this.height;
        return 0;
    }

    toggleDetailsDisplay(e: any) {
        if (!e.target.classList.contains('add')) {
            this.showDetails = !this.showDetails;
        }
    }

    created() {
        if (this.show === false) this.showDetails = false;
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
        /* height: 790px; */
        transition: all .4s ease-in-out;
        /* overflow: hidden; */
    }

    .icon-normal {
        transition: all .5s ease-in-out;
        transform: rotate(270deg);
    }

    .icon-down {
        transition: all .5s ease-in-out;
        transform: rotate(360deg);
    }

    .header {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #14171F;
    }
</style>
