<template>
  <div class="w-full mt-8">
    <div class="pb-5">
        <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5" style="">
                <span class="font-bold text-lg w-22">Clinical</span>
                <cornie-radio :label="'Post Bill'" name="enable" v-model="self_funded.clinical" value="post-bill"/>
                <cornie-radio :label="'Post Claim'" name="enable" v-model="self_funded.clinical" value="post-claim"/>
                <cornie-radio :label="'Collect Payment'"  :disabled="true"/>
                <cornie-radio :label="'Share Payment Link'"  :disabled="true"/>
        </div>
    
         <div class="w-full bg-white shadow-md  rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Diagnostics</span>
                <cornie-radio :label="'Post Bill'" name="diag" v-model="self_funded.diagnostics" value="post-bill"/>
                <cornie-radio :label="'Post Claim'" name="diag" v-model="self_funded.diagnostics" value="post-claim"/>
                <cornie-radio :label="'Collect Payment'"  :disabled="true"/>
                <cornie-radio :label="'Share Payment Link'" :disabled="true"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Pharmacy</span>
                <cornie-radio :label="'Post Bill'" name="pharmacy" v-model="self_funded.pharmacy" value="post-bill"/>
                <cornie-radio :label="'Post Claim'" name="pharmacy" v-model="self_funded.pharmacy" value="post-claim"/>
                <cornie-radio :label="'Collect Payment'" :disabled="true"/>
                <cornie-radio :label="'Share Payment Link'"  :disabled="true"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">In-Patient</span>
                <cornie-radio :label="'Post Bill'" name="patient" v-model="self_funded.inPatient" value="post-bill"/>
                <cornie-radio :label="'Post Claim'" name="patient" v-model="self_funded.inPatient" value="post-claim"/>
                <cornie-radio :label="'Collect Payment'"  :disabled="true"/>
                <cornie-radio :label="'Share Payment Link'"  :disabled="true"/>
        </div>
        <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">RCM</span>
                <cornie-radio :label="'Post Bill'" name="rcm" v-model="self_funded.RCM" value="post-bill"/>
                <cornie-radio :label="'Post Claim'" name="rcm" v-model="self_funded.RCM" value="post-claim"/>
                <cornie-radio :label="'Collect Payment'" :disabled="true"/>
                <cornie-radio :label="'Share Payment Link'"  :disabled="true"/>
        </div>
    </div>


    <div class="my-12 flex justify-end h-full">
             <cornie-btn
                :loading="loading"
                @click="submit"
                class="text-white bg-danger px-3 py-1 font-semibold rounded-xl"
            >
            {{ id ? 'Update Changes' : 'Save Changes'}}
          </cornie-btn>

    </div>
    
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync, Watch } from "vue-property-decorator";

import ICollectionCenters from "@/types/ICollectionCenters";

import cornieRadio from "@/components/cornieradio.vue";

const collectioncenter = namespace("collectioncenter");
@Options({
  name: "SelfFunded",
  components: {
   cornieRadio
  },
})
export default class SelfFunded extends Vue {

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: {} })
    selectedItem!: any;

    loading = false;

    privateclinical = {
        clinical: "",
        diagnostics: "",
        pharmacy: "",
        inPatient: "",
        RCM: ""
    }
    HMO = {
        clinical: "",
        diagnostics: "",
        pharmacy: "",
        inPatient: "",
        RCM: ""
    }
    self_funded = {
        clinical: "",
        diagnostics: "",
        pharmacy: "",
        inPatient: "",
        RCM: ""
    };

   
    @collectioncenter.Action
    getCollecitoncenterById!: (id: string) => ICollectionCenters[];


    @Watch("selectedItem")
    idChanged() {
      this.setAccount();
    }
     @Watch("id")
    ididChanged() {
      this.setAccount();
    }

    async setAccount() {
      const billingcenter =  this.getCollecitoncenterById(this.id);
      if (!billingcenter) return;
      this.self_funded.clinical = this.selectedItem.self_funded.clinical;
      this.self_funded.pharmacy = this.selectedItem.self_funded.pharmacy;
      this.self_funded.RCM = this.selectedItem.self_funded.RCM;
      this.self_funded.diagnostics = this.selectedItem.self_funded.diagnostics;
      this.self_funded.inPatient = this.selectedItem.self_funded.inPatient;

    this.privateclinical = this.selectedItem.private;
      this.HMO = this.selectedItem.HMO;


    }


    get payload() {
      return {
        private: this.privateclinical,
        HMO:this.HMO,
        self_funded: this.self_funded,
      };
    }

    async submit(){
        this.loading = true;
        if (this.id) await this.updateBillingcenter();
        else await this.createBillingcenter();
        this.loading = false;
    }
    async createBillingcenter() {
      try {
        const response = await cornieClient().post(
          "/api/v1/collection-centres/setting",
          this.payload
        );
        if (response.success) {
          window.notify({
            msg: "Billing Collections Saved",
            status: "success",
          });
          this.done();
        } else {
          window.notify({ msg: "Collections centers not Saved", status: "error" });
        }
      } catch (error: any) {
        window.notify({ msg: "Collections centers not Saved", status: "error" });
      }
    }
    async updateBillingcenter() {
      const id = this.id;
      const url = `/api/v1/collection-centres/setting/${id}`;
      try {
        const response = await cornieClient().put(url, this.payload);
        if (response.success) {
          window.notify({
            msg: "Collections centers Updated",
            status: "success",
          });
          this.done();
        }
      } catch (error: any) {
        window.notify({ msg: "Collections centers not Updated", status: "error" });
        this.loading = false;
      }
    }

    done() {
      this.$emit("collectioncenterAdded");
    }
  
  async created() {
    await this.setAccount();
  }
}
</script>
<style scoped>
.w-22{
    width: 10%;
}
</style>
