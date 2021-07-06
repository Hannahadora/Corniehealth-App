<template>
<div class="w-full h-full flex items-center justify-center">
    <div>
        <div class="grid grid-cols-2 sm:grid-cols-none lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2
         gap-0">
            <div class="hidden sm:hidden lg:block xl:block md:block">
                <div class="absolute mt-36 ml-12">
                    <a href="" class="nav-image xl:mr-5 lg:block xl:block sm:hidden cornie-logo hidden">
                        <img src="@/assets/img/logo.svg" alt="CornieHealth's logo">
                    </a>
                </div>
                    <figure class="bg-primary">
                        <img src="@/assets/img/unsplash.png" />
                    </figure>
            </div>
            <!-- ... -->
            <div class="bg-blue-50 w-96 lg:w-full xl:w-full md:w-full p-48 xl:p-0 lg:p-0  md:p-0">
                 <div v-if="step === 1" class="rounded-lg  w-80 lg:w-3/4 xl:w-3/4 md:w-3/4 lg:h-2/2 xl:h-2/2 md:h-2/2 relative mt-12 lg:mt-48 xl:mt-48 md:mt-48  right-44 lg:right-32 xl:right-32 md:right-32 border-2 border-gray-300  flex bg-white shadow-lg">
                    <div class="absolute mt-36 ml-12 lg:hidden sm:block">
                        <a href="" class="nav-image xl:mr-5 sm:mx-auto cornie-logo relative bottom-56 lg:bottom-0 xl:bottom-0 md:bottom-0">
                            <img src="@/assets/img/logo.svg" alt="CornieHealth's logo">
                        </a>
                    </div>
                    <form class="m-8" @submit.prevent="submit">
                        <h2 class="font-bold text-gray-900 mb-16 text-4xl">Reset Password</h2>
                        <div class="mb-8 mt-5">
                        <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> DOMAIN </label>
                          <select class="appearance-none mt-2 border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected value="domain" disabled>--Select--</option>
                            <option>DOMAIN</option>
                            <option>DOMAIN</option>
                          </select>
                          <p class="text-blue-900 text-sm mt-2"><a href="#">Forgot Domain?</a></p>
                        </div>
                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> Email </label>
                          <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email">
                        </div>
                        <div class="flex items-center justify-between">
                          <button class="bg-pink-600 hover:bg-pink-800 text-white mb-12 font-bold py-2 px-28 lg:px-48 xl:px-48 md:px-48 rounded-full focus:outline-none focus:shadow-outline" type="button" @click="section(2)">
                              Submit
                            </button>
                        </div>
                    </form>
                 </div>
                 <div v-if="step === 2" class="rounded-lg  w-80 lg:w-3/4 xl:w-3/4 md:w-3/4 lg:h-2/2 xl:h-2/2 md:h-2/2 relative mt-12 lg:mt-48 xl:mt-48 md:mt-48  right-44 lg:right-32 xl:right-32 md:right-32 border-2 border-gray-300  flex bg-white shadow-lg">
                    <div class="absolute mt-36 ml-12 lg:hidden sm:block">
                        <a href="" class="nav-image xl:mr-5 sm:mx-auto cornie-logo relative bottom-56 lg:bottom-0 xl:bottom-0 md:bottom-0">
                            <img src="@/assets/img/logo.svg" alt="CornieHealth's logo">
                        </a>
                    </div>
                    <form class="m-8" @submit.prevent="submit">
                        <h2 class="font-bold text-gray-900 mb-12 text-3xl">Reset Security Question</h2>
                        <div class="mb-5 mt-5">
                        <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> DOMAIN </label>
                          <select class="appearance-none mt-2 border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected value="domain" disabled>--Select--</option>
                            <option>DOMAIN</option>
                            <option>DOMAIN</option>
                          </select>
                          <p class="text-blue-900 text-sm mt-2"><a href="#">Forgot Domain?</a></p>
                        </div>
                        <div class="mb-5">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> EMAIL </label>
                          <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter email">
                        </div>
                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> ENTER PERSONAL ACCOUND ID  </label>
                          <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Account ID">
                        </div>

                        <div class="mb-8">
                          <label class="block uppercase tracking-wide text-dark-700 text-xs font-bold mb-2" for="grid-state"> 2FA CODE  </label>
                           <div class="grid grid-cols-6 gap-2">
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                              <div>
                                <input class="appearance-none border rounded w-64 lg:w-full xl:w-full md:w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="...">
                              </div>
                           </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <button class="bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-28 lg:px-48 xl:px-48 md:px-48 rounded-full focus:outline-none focus:shadow-outline" type="button" @click="section(3)">
                              Submit
                            </button>
                        </div>
                    </form>
                 </div>
                 <div v-if="step === 3" class="rounded-lg  w-80 lg:w-3/4 xl:w-3/4 md:w-3/4 lg:h-2/2 xl:h-2/2 md:h-2/2 relative mt-12 lg:mt-48 xl:mt-48 md:mt-48  right-44 lg:right-32 xl:right-32 md:right-32 border-2 border-gray-300  flex bg-white shadow-lg">
                    <div class="absolute mt-36 ml-12 lg:hidden sm:block">
                        <a href="" class="nav-image xl:mr-5 sm:mx-auto cornie-logo relative bottom-56 lg:bottom-0 xl:bottom-0 md:bottom-0">
                            <img src="@/assets/img/logo.svg" alt="CornieHealth's logo">
                        </a>
                    </div>
                    <form class="m-12">
                         <img src="@/assets/img/mail.png" class="w-40 mx-auto mt-5"/>
                          <p class="text-gray-900 text-center text-md mt-8">A password reset link has been sent to your registered email. Kindly go to your email to complete this action.</p>
                        
                    </form>
                 </div>
            </div>
            
        </div>
    </div>
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

type CreatedUser = { id: string; email: string }

@Options({
  components: {
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
