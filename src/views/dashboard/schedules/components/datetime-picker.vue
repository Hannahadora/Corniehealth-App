<template>
    <div>
        <div class="container-fluid">
            <div class="w-11/12" :class="width">
                <label
                    v-if="label"
                    class="flex capitalize mb-1 text-black text-sm font-medium"
                    :for="`${id}-inputfield`"
                    >
                    {{ label }}
                </label>
                <p class="border rounded-md w-full py-2 px-1 flex justify-between" @click="showSelectArea">
                    <span class=" flex items-center"><span class="mx-1"><DateIcon class="pr-" /></span><slot name="date" /></span>
                    <span><slot name="time" /></span>
                </p>
                <div class="w-full" style="position: relative">
                    <div class="" v-if="show" style="position:absolute; width:100% ">
                        <slot name="input"></slot>
                        <!-- <div class="w-full mt-4 flex justify-end">
                            <corniebtn :loading="false">
                                <a @click="() => show = false" class="cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-2 px-4 rounded-full">
                                    Cancel
                                </a>
                            </corniebtn>
                            <Button 
                            class="text-white-500"
                            >
                                <a @click="() => show = false" style="background: #FE4D3C" class="text-white hover:bg-blue-700 cursor-pointer focus:outline-none  font-bold py-2 px-4 rounded-full">
                                    Save
                                </a>
                            </Button>
                        </div> -->
                    </div>
                </div>
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
export default class DateTimePicker extends Vue {
    date = new Date();
    show = false;

    @Prop({ type: String, default: '' })
    label!: string;

    @Prop({ type: String, default: '' })
    width!: string;

    @Prop({ type: String, default: '' })
    id!: string;

    showSelectArea() {
        this.show = !this.show;
    }
}
</script>

<style scoped>

</style>