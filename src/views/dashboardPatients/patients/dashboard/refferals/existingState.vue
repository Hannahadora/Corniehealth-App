<template>
    <div class="w-full pb-7">
        <div class="mb-8">
            <span class="text-lg font-bold w-full">Invite Family and friends to join Cornie Health and earn rewards</span>
        </div>
        <div class="flex justify-between mb-8 w-full">
            <div>
                <span class="font-bold text-gray-400">Available Credits</span>
                <h2 class="text-2xl text-purple-600 font-bold">N1,500</h2>
            </div>
            <div>
                <cornie-btn
                @click="showRefferalModal= true"
                class="text-white bg-danger px-6 rounded-xl"
                >
                Invite
                </cornie-btn>
            </div>

        </div>
        <div class="hidden grid-cols-2 gap-4 w-full md:grid">
            <div class="bg-gray-50 rounded-lg px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <pending-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Pending Credits</span>
                            <h2 class="text-2xl text-purple-600 font-bold">0</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This represents rewards expected from your referrals who have created accounts with your link, but have not done any transaction yet.</p>
                    </div>

            </div>
            <div class="bg-gray-50 rounded-lg px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <success-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Successful Referrals</span>
                            <h2 class="text-2xl text-purple-600 font-bold">6</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This is the total number of your referrals who have created accounts with your link and done a transaction.</p>
                    </div>

            </div>
        </div>
        <div class="w-full block md:hidden">
            <div class="bg-gray-50 rounded-lg mb-3 px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <pending-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Pending Credits</span>
                            <h2 class="text-2xl text-purple-600 font-bold">0</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This represents rewards expected from your referrals who have created accounts with your link, but have not done any transaction yet.</p>
                    </div>

            </div>
            <div class="bg-gray-50 rounded-lg mb-3 px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <success-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Successful Referrals</span>
                            <h2 class="text-2xl text-purple-600 font-bold">6</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This is the total number of your referrals who have created accounts with your link and done a transaction.</p>
                    </div>

            </div>
        </div>
   
      <div class="block md:hidden">
       
      </div>
    </div>
    <!-- <refferal-mobile-modal v-model="showRefferalModal" class="block md:hidden"/> -->
    <refferal-modal v-model="showRefferalModal" />
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { cornieClient } from "@/plugins/http";
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  import SuccessIcon from "./icons/successful.vue";
  import PendingIcon from "./icons/pending.vue";
  import RefferalModal from "./refferalModal.vue";
  import RefferalMobileModal from "./refferalModalMobile.vue";
  
  @Options({
    components: {
        SuccessIcon,
        PendingIcon,
        RefferalModal,
        RefferalMobileModal
     
    },
  })
  export default class RefferalInviteExistingState extends Vue {
    showRefferalModal = false;
  
  
    async created() {
    
    }
  }
  </script>
  