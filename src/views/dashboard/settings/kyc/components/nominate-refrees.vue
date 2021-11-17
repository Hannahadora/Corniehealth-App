<template>
    <div class="container-fluid p-5 bg-white" style="width:500px">
        <div class="w-full">
            <div class="w-full flex items-center pt-6">
                <span class="border-r-2 pr-3 mr-3 cursor-pointer" @click="closeModal"><arrow-left /></span>
                <!-- <span class="mx-2"> | </span> -->
                <span style="font-size: 24px;color: #211F45" class="font-semibold">Nominate Referees</span>
            </div>

            <div class="w-full my-8">
                <cornie-input :label="'Name'" style="width: 100%"/>
            </div>

            <div class="w-full my-8">
                <cornie-input :label="'Email Address'" style="width: 100%"/>
            </div>

            <div class="w-full my-8">
                <cornie-phone :label="'Phone Number'" />
            </div>

            <div class="w-full pb-10 pt-14 flex justify-between">
                <cornie-button @click="closeModal" class="rounded-full px-12 py-2 font-semibold cursor-pointer" style="border: 1px solid #080056; color: #080056">
                    Cancel
                </cornie-button>

                <cornie-button class="rounded-full px-12 py-2 font-semibold text-white cursor-pointer" style="background: #FE4D3C">
                    Save
                </cornie-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import ArrowLeft from '@/components/icons/arrowleft.vue'
import CornieInput from "@/components/cornieinput.vue"
import CorniePhone from "@/components/phone-input.vue"

@Options({
    components: {
        ArrowLeft,
        CorniePhone,
        CornieInput,
    }
})
export default class NominateRefree extends Vue {
    closeModal() {
        this.$emit('close')
    }
}
</script>
