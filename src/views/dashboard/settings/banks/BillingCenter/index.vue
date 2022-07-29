<template>
  <div class="w-full mt-8">

    <div class="pb-5">
        <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5" style="">
                <span class="font-bold text-lg w-22">Clinical</span>
                <cornie-radio :label="'Enable'" name="enable" v-model="clinical" :value="true"/>
                <cornie-radio :label="'Disable'" name="enable" v-model="clinical" :value="false"/>
        </div>
    
         <div class="w-full bg-white shadow-md  rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Diagnostics</span>
                <cornie-radio :label="'Enable'" name="diag" v-model="diagnostics" :value="true"/>
                <cornie-radio :label="'Disable'" name="diag" v-model="diagnostics" :value="false"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Pharmacy</span>
                <cornie-radio :label="'Enable'" name="pharmacy" v-model="pharmacy" :value="true"/>
                <cornie-radio :label="'Disable'" name="pharmacy" v-model="pharmacy" :value="false"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">In-Patient</span>
                <cornie-radio :label="'Enable'" name="inpatient" v-model="inPatient" :value="true"/>
                <cornie-radio :label="'Disable'" name="inpatient" v-model="inPatient" :value="false"/>
        </div>
    </div>


    <div class="my-12 flex justify-end h-full">
            <cornie-btn
                :loading="loading"
                @click="submit"
                class="text-white bg-danger px-3 font-semibold py-1 rounded-xl"
            >
            {{ id ? 'Update Changes' : 'Save Changes'}}
          </cornie-btn>

    </div>
    
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import IBillingCenters from "@/types/IBillingCenters";

import cornieRadio from "@/components/cornieradio.vue";

const billingcenter = namespace("billingcenter");

@Options({
  name: "BillingCenter",
  components: {
   cornieRadio
  },
})
export default class BillingCenter extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: {} })
    selectedItem!: any;
    

    loading = false;
    clinical = false;
    diagnostics = false;
    pharmacy = false;
    inPatient = false;


    @billingcenter.Action
    getBillingCenterById!: (id: string) => IBillingCenters[];


    @Watch("selectedItem")
    idChanged() {
      this.setAccount();
    }

    async setAccount() {
      const billingcenter =  this.getBillingCenterById(this.id);
      if (!billingcenter) return;
      this.clinical = this.selectedItem.clinical;
      this.diagnostics = this.selectedItem.diagnostics;
      this.pharmacy = this.selectedItem.pharmacy;
      this.inPatient = this.selectedItem.inPatient;
    }


    get payload() {
      return {
        clinical: this.clinical,
        diagnostics: this.diagnostics,
        pharmacy: this.pharmacy,
        inPatient: this.inPatient,
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
          "/api/v1/billing-centres/setting",
          this.payload
        );
        if (response.success) {
          window.notify({
            msg: "Billing Collections Saved",
            status: "success",
          });
          this.done();
        } else {
          window.notify({ msg: "Billing Collections not Saved", status: "error" });
        }
      } catch (error: any) {
        window.notify({ msg: error.response.data.message, status: "error" });
      }
    }
    async updateBillingcenter() {
      const id = this.id;
      const url = `/api/v1/billing-centres/setting/${id}`;
      try {
        const response = await cornieClient().put(url, this.payload);
        if (response.success) {
          window.notify({
            msg: "Billing Collections Updated",
            status: "success",
          });
          this.done();
        }
      } catch (error: any) {
        window.notify({ msg: "Billing Collections not Updated", status: "error" });
        this.loading = false;
      }
    }

    done() {
      this.$emit("billingcenterAdded");
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
