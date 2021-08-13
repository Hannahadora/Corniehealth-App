<template>
    <div class="container-fluid h-screen topest">
        <div class="w-full mb-8">
            <div class="w-full border-b-2 curved flex py-2">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Account Security</h2>
                </div>
            </div>
        </div>

        <div class="w-full my-5">
            <div class="w-full curved py-2">
                <div class="container-fluid w-full py-2 flex justify-between items-center">
                    <div class="w-9/12">
                        <h2 class="mb-2 font-semibold text-lg">Password</h2>
                        <p><span>The same password strength are enforced for all users across the app.</span> <a class="text-blue-500 uppercase">View Policy</a></p>
                    </div>
                    <div class="w-3/12 flex justify-end">
                        <Button :loading="false" class="focus:outline-none" @click="togglePasswordSection">
                            <span  class="text-gray-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                                Update Password 
                            </span>
                        </Button>
                    </div>
                </div>

                <div class="w-full mt-3 password-section" :class="{ 'update-password border-b-2 pb-6': willUpdatePassword }">
                    <div class="container-fluid w-full flex items-center justify-between">
                        <div class="border-b-2 w-11/12"></div>
                        <div class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer" style="height:24px;width:24px">×</div>
                    </div>

                    <div class="container-fluid">
                        <div class="w-full my-3">
                            <div class="w-6/12">
                                <CornieInput label="Current Password"  placeholder="--Enter--" />
                            </div>
                        </div>
                        <div class="w-full flex">
                            <div class="w-6/12 my-3">
                                <CornieInput label="New Password"  placeholder="--Enter--" />
                                <div class="w-full flex justify-between" style="width: 90%">
                                    <p class="underbar bg-green-500 w-2/12 border"></p>
                                    <p class="underbar bg-green-500 w-2/12 border"></p>
                                    <p class="underbar bg-green-500 w-2/12 border"></p>
                                    <p class="underbar bg-green-500 w-2/12 border"></p>
                                    <p class="underbar bg-green-500 w-2/12 border"></p>
                                </div>
                            </div>
                            <div class="w-6/12 my-3">
                                <CornieInput label="Confirm Password"  placeholder="--Enter--" />
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
            </div>
        </div>

        <div class="w-full my-5">
            <div class="w-full curved flex py-2">
                <div class="container-fluid w-full flex justify-between items-center py-2">
                    <div class="w-9/12">
                        <h2 class=" font-semibold text-lg mb-2">Two Factor Authentication</h2>
                        <p class="flex">Two factor authentication enforced for all users within your domain. <span class="ml-3">
                            <Tooltip :text="'This is a test'">
                                <Icon :type="2" />
                            </Tooltip>
                        </span></p>
                    </div>
                    <div class="w-3/12 flex justify-end">
                        <Button :loading="false" class="focus:outline-none" @click="toggle2faSection">
                            <span  class="text-gray-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-12 rounded-full">
                                Configure
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            <div class="w-full mt-3 password-section" :class="{ 'update-2fa border-b-2 pb-6': willUpdate2fa }">
                <TwoFA />
            </div>
        </div>

        <div class="w-full my-5">
            <div class="w-full curved flex py-2">
                <div class="container-fluid w-full flex justify-between items-center py-2">
                    <div class="w-9/12">
                        <h2 class="mb-2 font-semibold text-lg">Security Questions</h2>
                        <p class="flex">Security questions not enforced for all users within your domain. <span class="ml-3"><Icon :type="2" /></span></p>
                    </div>
                    <div class="w-3/12 flex justify-end">
                        <Button :loading="false" class="focus:outline-none" @click="toggleQuestionsSection">
                            <span  class="text-gray-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-12 rounded-full">
                                Configure
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            <div class="w-full mt-3 password-section" :class="{ 'update-questions border-b-2 pb-6': willUpdateQuestions }">
                <SecurityQuestions />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Icon from '@/views/dashboard/settings/rolesprivileges/components/icon.vue'
import CornieInput from '@/components/cornieinput.vue'
import TwoFA from './components/two-fa.vue'
import SecurityQuestions from './components/security-questions.vue'
import Tooltip from '@/components/tooltip.vue'

@Options({
    components: {
        Icon,
        CornieInput,
        TwoFA,
        SecurityQuestions,
        Tooltip
    }
})

export default  class UserSecurity extends Vue {
    willUpdatePassword = false;
    willUpdate2fa = false;
    willUpdateQuestions = true;

    togglePasswordSection() {
        this.willUpdatePassword = !this.willUpdatePassword;
    }

    toggle2faSection() {
        this.willUpdate2fa = !this.willUpdate2fa;
    }

    toggleQuestionsSection() {
        this.willUpdateQuestions = !this.willUpdateQuestions;
    }
}
</script>

<style scoped>
    .topest {
        overflow-x: scroll;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .topest::-webkit-scrollbar {
    display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .topest {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    }
    .password-section {
        height: 0;
        overflow: hidden;
        transition: all .5s ease-in-out;
    }

    .update-password {
        height: 280px;
        overflow-y: hidden;
        transition: all .5s ease-in-out;
    }

    .update-2fa {
        height: 303px;
        overflow-y: hidden;
        transition: all .5s ease-in-out;
    }

    .update-questions {
        height: 455px;
        overflow-y: hidden;
        transition: all .5s ease-in-out;
    }
</style>
