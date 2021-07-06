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
            <div class="bg-blue-50">
                 <div v-if="step === 1" class="rounded-lg w-3/4 h-2/2 relative mt-48 right-32 border-2 border-gray-300  flex bg-white shadow-lg">
                    <form class="m-8" @submit.prevent="submit">
                        <h2 class="font-bold text-gray-900 mb-16 text-4xl">Reset Password</h2>
                        <div class="mb-8 mt-5">
                        <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> DOMAIN </label>
                          <select class="appearance-none mt-2 border rounded w-full py-2 px-4 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected value="domain" disabled>--Select--</option>
                            <option>DOMAIN</option>
                            <option>DOMAIN</option>
                          </select>
                          <p class="text-blue-900 text-sm mt-2"><a href="#">Forgot Domain?</a></p>
                        </div>
                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> Email </label>
                          <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email">
                        </div>
                        <div class="flex items-center justify-between">
                          <button class="bg-pink-600 hover:bg-pink-800 text-white mb-12 font-bold py-2 px-48 rounded-full focus:outline-none focus:shadow-outline" type="button" @click="section(2)">
                              Submit
                            </button>
                        </div>
                    </form>
                 </div>
                 <div v-if="step === 2" class="rounded-lg w-3/4 h-/2 relative mt-32 right-32 border-2 border-gray-300  flex bg-white shadow-lg">
                    <form class="m-8" @submit.prevent="submit">
                        <h2 class="font-bold text-gray-900 mb-12 text-3xl">Reset Security Question</h2>
                        <div class="mb-5 mt-5">
                        <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> DOMAIN </label>
                          <select class="appearance-none mt-2 border rounded w-full py-2 px-4 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected value="domain" disabled>--Select--</option>
                            <option>DOMAIN</option>
                            <option>DOMAIN</option>
                          </select>
                          <p class="text-blue-900 text-sm mt-2"><a href="#">Forgot Domain?</a></p>
                        </div>
                        <div class="mb-5">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> EMAIL </label>
                          <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email">
                        </div>
                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> ENTER PERSONAL ACCOUND ID  </label>
                          <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Account ID">
                        </div>

                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> 2FA CODE  </label>
                           <div class="grid grid-cols-6 gap-2">
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                           </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <button class="bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-48 rounded-full focus:outline-none focus:shadow-outline" type="button" @click="section(3)">
                              Submit
                            </button>
                        </div>
                    </form>
                 </div>
                 <div v-if="step === 3" class="rounded-lg w-3/4 h-2/2 relative mt-32 right-32 border-2 justify-center align-center border-gray-300  flex bg-white shadow-lg">
                    <form class="m-12">
                         <img src="@/assets/img/mail.png" class="w-40 object-center"/>
                          <p class="text-dark-800 text-center text-md mt-2">A password reset link has been sent to your registered email. Kindly go to your email to complete this action.</p>
                        
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
  private step: number = 1

  userCreated = false
  emailVerified = false

  @Watch('user', { deep: true })
  userChanged (user: CreatedUser) {
    if (user.id) this.userCreated = true
  }
 
  public section(data: string): void {
     this.step = parseInt(data)
  }
}
</script>
