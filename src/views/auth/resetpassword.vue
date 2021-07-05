<template>
<div class="w-full h-full flex items-center justify-center">
    <div>
        <div class="grid grid-cols-2 gap-0">
            <div>
            <div class="absolute mt-36 ml-12">
                <a href="" class="nav-image xl:mr-5 cornie-logo">
                    <img src="@/assets/img/logo.svg" alt="CornieHealth's logo">
                </a>
            </div>
                <figure class="bg-primary">
                    <img src="@/assets/img/unsplash.png" />
                </figure>
            </div>
            <!-- ... -->
            <div class="bg-white">
                 <div class="rounded-lg w-3/4 h-1/2 relative mt-48 right-32 border-gray border-1  flex items-center justify-center bg-white shadow-lg">
                    <form class="m-8" @submit.prevent="submit">
                        <h2 class="font-bold text-gray-900 text-4xl">Create Account</h2>
                        <input
                        placeholder="first name"
                        class="w-full rounded mb-2 border-gray border-1 p-2"
                        name="firstName"
                        type="text"
                        required
                        v-model="firstName"
                        />
                        <input
                        placeholder="last name"
                        class="w-full rounded mb-2 border-gray border-1 p-2"
                        type="text"
                        required
                        v-model="lastName"
                        />
                        <button
                        type="submit"
                        class="mt-3 rounded text-white font-bold bg-primary pa-3 h-10"
                        >
                        Submit
                        </button>
                    </form>
                 </div>
            </div>
            
        </div>
    </div>
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CreateAccount from './createaccount.vue'
import VerifyEmailCode from './verifyemailcode.vue'
import ActivateAccount from './activateaccount.vue'
import { Watch } from 'vue-property-decorator'

type CreatedUser = { id: string; email: string }

@Options({
  components: {
    VerifyEmailCode,
    CreateAccount,
    ActivateAccount
  }
})
export default class SignUp extends Vue {
  user = {} as CreatedUser
  code = ''

  userCreated = false
  emailVerified = false

  @Watch('user', { deep: true })
  userChanged (user: CreatedUser) {
    if (user.id) this.userCreated = true
  }
}
</script>
