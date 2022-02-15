<template>
  <div
    class="flex justify-center  mb-32 p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2">
        Practitioner Profile
      </span>
      <span class="w-full h-screen bg-white mb-32 shadow-md">

      <div  class="w-full flex p-3 shadow-card rounded-lg align-center justify-between">
        <div class="flex w-3/5 items-center pr-12">
          <avatar class="h-20 w-20 mr-7" :src="image" />

          <span class="flex flex-col mr-10">
            <span class="text-blue-yonder text-xs font-bold uppercase block">Name</span>
            <span class="text-sm capitalize text-blue-yonder-2 mb-5">{{ authPractitioner?.firstName }} {{ authPractitioner?.lastName }}</span>
            <span class="text-blue-yonder text-xs font-bold uppercase block mt-2">
              Email
            </span>
            <span class="text-sm text-blue-yonder-2">{{ authPractitioner?.email }}</span>
          </span>
          <span class="flex flex-col">
            <span class="text-blue-yonder text-xs font-bold uppercase block">specialty</span>
            <span class="text-sm text-blue-yonder-2 mb-5">{{authPractitioner?.department || "Nill" }}</span>
            <span class="text-blue-yonder text-xs font-bold uppercase block mt-2">
             date created
            </span>
            <span class="text-sm text-blue-yonder-2">{{ new Date(authPractitioner?.createdAt).toLocaleDateString('en-us') || "Nill" }}</span>
          </span>
        </div>
        <div class="flex justify-between items-center">
          <button class="border-2 border-primary text-sm ml-6 font-bold rounded-lg text-primary py-2 px-10 my-auto focus:outline-none hover:opacity-90">
            View 
          </button>
          <button  @click="$router.push({ name: 'Edit profile' })" class="bg-primary text-sm ml-6 font-bold rounded-lg text-white py-2 px-10 my-auto focus:outline-none hover:opacity-90">
            Edit 
          </button>
        </div>
      
      </div>
     
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Watch } from "vue-property-decorator";
import { Vue, Options, setup } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import IPractitioner from "@/types/IPractitioner";
import { useHandleImage } from "@/composables/useHandleImage";
import Avatar from "@/components/avatar.vue";



const roles = namespace("roles");
const dropdown = namespace("dropdown");
const userStore = namespace("user");
const userSettingsStore = namespace("usersettings");

@Options({
  name: "Practioner Profile",
  components: {
    Avatar,
    ChevronRightIcon,
    ChevronLeftIcon,

  },
})
export default class PractitonerProfile extends Vue {


  @roles.Action
  getRoles!: () => Promise<any>;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @userStore.State
  user!: User;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userSettingsStore.Action
  setUserUp!: (body: IPractitioner) => Promise<boolean>;

  @userSettingsStore.Mutation
  setUserProfile!: (practitioner: IPractitioner) => void;

  img = setup(() => useHandleImage());

  get image() {
    return this.authPractitioner?.image || this.img.placeholder;
  }
  async created(){
    await this.authPractitioner
     await this.setUserProfile([this.setUserProfile] as any);
  }
}
</script>

<style>
</style>
