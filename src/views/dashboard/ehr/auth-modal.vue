<template>
    <div class="w-full">
        <div class="container p-6 content-con">
        <p class="text-primary text-2xl font-semibold pb-3">You need to be authenticated to view health records.</p>
        <span style="color:#667499" class="text-secondary text-base">Type in your password	</span>

        <div class="w-full py-6">
            <label for="password" class="flex flex-col">
            <span class="block uppercase mb-1 text-xs font-bold">
            Password
            </span>
            <password-input
            id="password"
            v-model="password"
            class="border rounded"
            />               
        </label>
        </div>
        <div class="w-full flex flex justify-end">
            <corniebtn class="bg-white p-2 cancel-btn rounded-full px-8 mx-4 cursor-pointer" style="border: 1px solid #0A4269">
                <span class="font-semibold" @click="() => $router.go(-1)">Cancel</span>
            </corniebtn>

            <CornieBtn :loading="loading" class="bg-red-500 p-2 rounded-full px-8 mx-4 cursor-pointer">
                <span class="text-white font-semibold" @click="authenticateUser">Submit</span>
            </CornieBtn>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import ehrHelper from "./landing/helper/ehr-service"
import User from "@/types/user";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";

const userStore = namespace("user");

@Options({
    components: {
        CornieBtn,
        PasswordInput,
    }
})

export default class AuthModal extends Vue {
    @userStore.State
    user!: User;

    @userStore.Getter
    authPractitioner!: any;

    @userStore.Action
    updatePractitionerAuthStatus!: (authenticated: boolean) => Promise<void>;

    loading = false;
    password = "";
    time: any;

    showAuthModal = false;

     async authenticateUser() {
         console.log(this.authPractitioner, "AU");
         console.log(this.user, "USer");
         
        try {
            this.loading = true;
            const verified = await ehrHelper.authenticateUser({ userId: this.authPractitioner.id, password: this.password})
            this.password = "";
            this.loading = false;
            if (verified) {
                this.showAuthModal = false;
                this.updatePractitionerAuthStatus(true);
            }
        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    }

    logout() {
        this.updatePractitionerAuthStatus(false)
    }

    resetTimer() {
        clearTimeout(this.time);
        this.time = setTimeout(this.logout, 180000)
    }

    created() {
        // const timer = new IdleTimer(() => alert('idle for 1 minute'), 1000 * 60 * 1);
        // timer.activate();
    window.onload = this.resetTimer;
    // DOM Events
    document.onmousemove = this.resetTimer;
    document.onkeydown = this.resetTimer;
    }
}
</script>