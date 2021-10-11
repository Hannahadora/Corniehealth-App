<template>
    <div class="container-fluid">
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="relative inline-block text-left" :class="{ 'w-11/12': !fullWidth, 'w-12/12': fullWidth, 'w-full': fullWidth, }">
                <label
                    v-if="label"
                    class="block uppercase mb-1 text-xs font-bold"
                    :for="`${id}-inputfield`"
                    >
                    {{ label }}
                </label>
            <div class="w-full">
                <button @click="() => show = !show" type="button" class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none " id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <slot name="selected" />
                <!-- Heroicon name: solid/chevron-down -->
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                </button>
            </div>

           
            <div class="w-full" v-if="show">
                <slot />
            </div>
        </div>

        
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DateIcon from '@/components/icons/calendar.vue'

@Options({
    components: {
        DateIcon
    }
})
export default class ApplyTo extends Vue {
    show = false;
    @Prop({ type: String, default: '' })
    label!: string;

    @Prop({ type: String, default: '' })
    id!: string;

    @Prop({ type: Boolean, default: false })
    fullWidth!: boolean;

    showSelectArea() {
        this.show = !this.show;
    }
}
</script>

<style scoped>

</style>