<template>
    <div class="container-fluid">
        <div class="container-fluid w-full flex items-center justify-between">
            <div class="border-b-2 w-11/12"></div>
            <div class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer" style="height:24px;width:24px" @click="closeSection">×</div>
        </div>

        <div class="container-fluid">
            <div class="w-full flex py-4 border-dashed-b-2 mb-4">
                <ToggleCheck :uncheckedText="`Disabled`" :checkedText="'Enabled'" style="margin-left: 1rem" />
            </div>

            <div class="w-full flex border-dashed-b-2 pb-4">
                <div class="w-8/12 my-3">
                    <p class="m-0">Enter the one time password sent to you email: <span class="text-blue-500">random@email.com</span></p>
                    <CornieInput label="" placeholder="Enter OTP" /> <br>
                    <a class="cursor-pointer text-red-500 uppercase font-semibold py-2">Send Code</a>
                </div>
                <div class="w-4/12 my-3 mt-5">
                    <CornieInput label="Confirm Password"  placeholder="" />
                </div>
            </div>

            <div class="w-full mt-6 mb-2 flex justify-end">
                <Button :loading="false" class="focus:outline-none">
                    <span  style="background: #FE4D3C" class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save
                    </span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToggleCheck from '@/components/ToogleCheck.vue'
import CornieInput from '@/components/CornieInput.vue'

@Options({
    components: {
        ToggleCheck,
        CornieInput,
    }
})
export default class TwoFA extends Vue {
    closeSection() {
        this.$emit('closesection', '2fa');
    }
}
</script>

<style scoped>
    .border-dashed-b-2 {
        border-bottom: 1px dashed #C5C4D4;
    }
</style>
