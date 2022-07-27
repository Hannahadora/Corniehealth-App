<template>
  <div class="w-full mt-8">

    <div class="pb-5">
        <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5" style="">
                <span class="font-bold text-lg w-22">Clinical</span>
                <cornie-radio :label="'Enable'" name="enable"/>
                <cornie-radio :label="'Disable'" name="enable"/>
        </div>
    
         <div class="w-full bg-white shadow-md  rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Diagnostics</span>
                <cornie-radio :label="'Enable'" name="diag"/>
                <cornie-radio :label="'Disable'" name="diag"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">Pharmacy</span>
                <cornie-radio :label="'Enable'" name="pharmacy"/>
                <cornie-radio :label="'Disable'" name="pharmacy"/>
        </div>
         <div class="w-full bg-white shadow-md rounded-lg flex justify-between mb-10 py-3 px-5">
                <span class="font-bold text-lg w-22">In-Patient</span>
                <cornie-radio :label="'Enable'" name="inpatient"/>
                <cornie-radio :label="'Disable'" name="inpatient"/>
        </div>
    </div>


    <div class="my-12 flex justify-end h-full">
            <cornie-btn
                :loading="loading"
                @click="submit"
                class="text-white bg-danger px-4 py-1 rounded-xl"
            >
            Save Changes
          </cornie-btn>

    </div>
    
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import cornieRadio from "@/components/cornieradio.vue";

import { namespace } from "vuex-class";

@Options({
  name: "BillingCenter",
  components: {
   cornieRadio
  },
})
export default class BillingCenter extends Vue {

    loading = false;

    submit(){

    }
  
  created() {}
}
</script>
<style scoped>
.w-22{
    width: 10%;
}
</style>
