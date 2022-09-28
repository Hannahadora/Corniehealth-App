<template>
    <div class="w-full pb-7">
        <div class="mb-8">
            <span class="text-lg font-bold w-full">Invite Family and friends to join Cornie Health and earn rewards</span>
        </div>
        <div class="hidden grid-cols-3 gap-4 w-full md:grid">
            <div class="bg-gray-50 rounded-lg px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <earned-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Earned Credits</span>
                            <h2 class="text-2xl text-purple-600 font-bold">NGN {{ userrefferals.availableCredits }}</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">Total earned credits from successful referrals</p>
                    </div>

            </div>
            <div class="bg-gray-50 rounded-lg px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <pending-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Pending Credits</span>
                            <h2 class="text-2xl text-purple-600 font-bold">{{ userrefferals.pendingCredits }}</h2>
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
                            <h2 class="text-2xl text-purple-600 font-bold">{{ userrefferals.successfulReferrals }}</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This is the total number of your referrals who have created accounts with your link and done a transaction.</p>
                    </div>

            </div>
        </div>
        <span class="flex justify-end w-full mb-5">
            <cornie-btn @click="showRefferalModal= true" class="text-white bg-danger px-6 rounded-xl">
                Invite
            </cornie-btn>
        </span>
      <cornie-table
        :columns="rawHeaders"
        v-model="items"
        :check="false"
        :fixeHeight="true"
        :menu="false"
        :listmenu="true"
        :menushow="true"
        class="hidden md:block"
      >
      <template #status="{item}">
            <span
              :class="{
                'bg-green-200 text-green-600': item.status == 'successful',
                ' bg-yellow-500 text-yellow-400': item.status == 'pending',
                ' bg-red-500 text-red-400': item.status == 'unsuccessful',
              }"
              class="text-center rounded-md p-1 bg-opacity-20"
            >
              {{ item.status }}
            </span>
        </template>
        <template #resend="{ item }">
            <span class="cursor-pointer" v-if="item.status =='pending'" @click="resendInviteLink(item.id)">
                <resend-icon/>
            </span>

        </template>
      </cornie-table>

        <div class="w-full block md:hidden">
            <div class="bg-gray-50 rounded-lg mb-3 px-8 py-3">
                    <div class="flex space-x-3 items-center">
                        <pending-icon/>
                        <div class="">
                            <span class="text-gray-500 font-bold">Pending Credits</span>
                            <h2 class="text-2xl text-purple-600 font-bold">{{ userrefferals.pendingCredits }}</h2>
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
                            <h2 class="text-2xl text-purple-600 font-bold">{{ userrefferals.successfulReferrals }}</h2>
                        </div>
                    </div>
                    <div>
                        <span class="text-primary">.</span>
                        <p class="text-justify">This is the total number of your referrals who have created accounts with your link and done a transaction.</p>
                    </div>

            </div>
        </div>
    </div>
    <!-- <refferal-mobile-modal v-model="showRefferalModal" class="block md:hidden"/> -->
    <refferal-modal v-model="showRefferalModal" @inviteAdded="inviteAdded"/>
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { cornieClient } from "@/plugins/http";
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import search from "@/plugins/search";

  import  IUserrefferal  from "@/types/IUserrefferal";

  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import SuccessIcon from "./icons/successful.vue";
  import PendingIcon from "./icons/pending.vue";
  import EarnedIcon from "./icons/earned.vue";
  import RefferalModal from "./refferalModal.vue";
  import RefferalMobileModal from "./refferalModalMobile.vue";
  import ResendIcon from "./icons/resend.vue";


  const userreferal = namespace("userreferal");
  @Options({
    components: {
        SuccessIcon,
        PendingIcon,
        RefferalModal,
        RefferalMobileModal,
        EarnedIcon,
        CornieTable,
        ResendIcon
     
    },
  })
  export default class RefferalInviteExistingState extends Vue {
    showRefferalModal = false;
    query = "";
  
    @userreferal.State
    userrefferals!: IUserrefferal;
  
    @userreferal.Action
    fetchUserrefferral!: () => Promise<void>;
    
    @userreferal.State
    refferedaccounts!: IUserrefferal[];
  
    @userreferal.Action
    fetchRefferredAccounts!: () => Promise<void>;

    rawHeaders = [
      { title: "REFERRAL ID #", key: "id", show: true, noOrder:true },
      { title: "name", key: "name", show: true , noOrder:true},
      {
        title: "EMAIL",
        key: "email",
        show: true,
         noOrder:true
      },
      {
        title: "SUBscription DATE",
        key: "createdAt",
        show: true,
         noOrder:true
      },
      {
        title: "Transaction date",
        key: "transactionDate",
        show: true,
         noOrder:true
      },
       {
        title: "Status",
        key: "status",
        show: true,
         noOrder:true
      },
      {
        title: "",
        key: "resend",
        show: true,
         noOrder:true
      },
  
    ];


    get items() {
      const refferedaccounts = this.refferedaccounts.map((refferedaccount:any) => {
           (refferedaccount as any).createdAt = new Date(
          (refferedaccount as any).createdAt
        ).toLocaleDateString("en-US");
        return {
          ...refferedaccount,
        };
      });
      if (!this.query) return refferedaccounts;
      return search.searchObjectArray(refferedaccounts, this.query);
    }

    async inviteAdded(){
        await this.fetchRefferredAccounts();
      await this.fetchUserrefferral();
    }

    async resendInviteLink(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to resend this invitation link",
      title: "Resend Invitation Link",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().post(
          `/api/v1/general/referrals/reinvite/`,
          {
            referredAccountId: id
          }
        );
        if (response.success) {
          window.notify({ msg: "Invitation link sent Successfully", status: "success" });
          await this.fetchRefferredAccounts();
        }
      } catch (error) {
        window.notify({ msg: "Invitation link not sent", status: "error" });
      }
    }
  }

   
    async created() {
        await this.fetchRefferredAccounts();
        await this.fetchUserrefferral();
    }
  }
  </script>
  