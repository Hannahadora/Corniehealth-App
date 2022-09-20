<template>
    <cornie-dialog v-model="show" center class="md:w-6/12 md:h-auto w-full h-screen">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full hidden md:block">
          <!-- <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn> -->
          <div class="w-full border-l-2 border-gray-100">
            <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
    
          </div>
        </cornie-card-title>
        <cornie-card-title class="w-full block md:hidden">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
           <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Invite</h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
           <div class="md:grid md:grid-cols-2 md:gap-4 w-full py-4 px-8">
                <div>
                    <h2 class="text-primary font-bold text-3xl mb-7">
                        Invite Friends to Join Cornie Health
                    </h2>
                    <p class="text-justify  mb-5">
                        Refer a friend or family member to us and they will each get N250. You will also get N250 for each friend that makes their first transaction on Cornie Health.
                    </p>
                    <div class="mb-5">
                        <cornie-input
                        :label="'Email'"
                        :placeholder="'--Enter Email Address(s)--'"
                        v-model="email"
                        :rules="emailRule"
                        />
                        <span class="text-xs text-danger font-semibold italic cursor-pointer" @click="addEmail">Add Email</span>
                    </div>
                    <div class=" pb-5 mb-5 px-2">
                      <div class="grid grid-cols-2 gap-4" >
                       <div class="w-full justify-between flex" v-for="(item, index) in allemail" :key="index">
                        <span class="float-left">{{ item }}</span>
                        <delete-icon class="float-right fill-current text-danger cursor-pointer" @click="removeEmail(index)"/>
                       </div>

                      </div>

                    </div>
                    <div class="mb-5">
                        <cornie-btn
                            class="text-white bg-danger px-6 rounded-xl"
                            :loading="loading"
                            @click="submit"
                            >
                            Invite
                            </cornie-btn>
                    </div>
                    <div class="mb-5">
                        <span class="text-sm font-bold">Share with more friends and earn more money!</span>
                    </div>
                    <div class="flex w-full space-x-3">
                            <a :href="`https://www.facebook.com/sharer.php?u=https://corniehealth-frontend.s3-website.eu-west-2.amazonaws.com/signup&ref=${userrefferals.referralToken}`" target="_blank"><fb-icon class="text-2xl"/></a>
                          <a :href="`https://twitter.com/intent/tweet?url=https://corniehealth-frontend.s3-website.eu-west-2.amazonaws.com/signup&ref=${userrefferals.referralToken}`" target="_blank"><tw-icon/></a> 
                         <!-- <a :href="`https://plus.google.com/share?url=https://corniehealth-frontend.s3-website.eu-west-2.amazonaws.com/signup&ref=${userrefferals.referralToken}`" target="_blank"><gb-icon/></a>  -->
                       <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=https://corniehealth-frontend.s3-website.eu-west-2.amazonaws.com/signup&ref=${userrefferals.referralToken}`" target="_blank"> <lk-icon/></a>
                        <link-icon class="cursor-pointer" @click="copyMe(`https://corniehealth-frontend.s3-website.eu-west-2.amazonaws.com/signup&ref=${userrefferals.referralToken}`)"/>

                    </div>
                </div>
                <div>
                    <img src="@/assets/img/invite.svg" class="w-full"/>
                </div>
           </div>
          </v-form>
        </cornie-card-text>
        <cornie-card class="block md:hidden">
          <cornie-card-text class="flex justify-end overflow-auto">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
            Close
            </cornie-btn>
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
  
    </cornie-dialog>
   
  </template>
  
  <script lang="ts">
  import { Options, Vue, setup } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { cornieClient } from "@/plugins/http";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  import CornieCard from "@/components/cornie-card";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/autocomplete.vue";
  import ChevronDown from "@/components/icons/chevrondown.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import AddIcon from "@/components/icons/add-orange.vue";
  import DeleteIcon from "@/components/icons/delete.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";


  import FbIcon from './icons/fb.vue';
  import TwIcon from './icons/tw.vue';
  import GbIcon from './icons/gb.vue';
  import LkIcon from './icons/lk.vue';
  import LinkIcon from './icons/link.vue';

  import DateTimePicker from "@/components/date-time-picker.vue";
  import  IUserrefferal  from "@/types/IUserrefferal";

  const userreferal = namespace("userreferal");
  
  
  @Options({
    name: "RefferalInviteModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      DeleteIcon,
      CornieDialog,
      CornieInput,
      CornieSelect,
      CornieBtn,
      ChevronDown,
      DateTimePicker,
      AddIcon,
      CancelIcon,
      FbIcon,
      TwIcon,
      GbIcon,
      LkIcon,
      LinkIcon
    },
  })
  export default class RefferalInviteModal extends Vue {
   @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;

    @userreferal.State
    userrefferals!: IUserrefferal;
  
    @userreferal.Action
    fetchUserrefferral!: () => Promise<void>;
  

    loading = false;

    date = "";
    time = "";
    email = "";
    allemail = [] as any;

    emailRule = string().email("A valid email is required").required();

    get payload(){
       return this.allemail
    }
  
     async submit() {
      this.loading = true;
      await this.createInvite();
      this.loading = false;
    }

    addEmail(){
      this.allemail.push(this.email);
      this.email ="";
    }

    async removeEmail(index: number) {
    this.allemail.splice(index, 1);
   }

   copyMe(link:string){
    navigator.clipboard.writeText(link);
    window.notify({ msg: "Link copied successfully!", status: "success" });
   }

  async createInvite(){
    try {
      const response = await cornieClient().post(
        '/api/v1/general/referrals/invite',
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "User invited successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "User not invited", status: "error" });
    }
  }

  done(){
    this.show= false;
    this.$emit('inviteAdded')

    this.allemail = [];
    this.email = "";
  }
  
  
    async created() {
      await this.fetchUserrefferral();
    }
  }
  </script>
  
  <style>
  .border-r-0 {
      border-right-width: 0px !important;
  }
  .border-l-0 {
      border-left-width: 0px !important;
  }
  </style>
  