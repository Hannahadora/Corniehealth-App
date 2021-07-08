<template>
   <div class="h-screen flex justify-center">
    <current-state  v-if="!empty"  :currencies  ="currencies "
     @newExchangeRate="newExchangeRate= true"/> 
    <empty-state  v-else   @newExchangeRate="addAccount= true"  />  
</div>
</template> 

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import emptyState  from "./emptyState.vue";
import currentState from "./currentState.vue";
import ICurrency from "@/types/ICurrency";

import { cornieClient } from "@/plugins/http";


@Options({
   components: {
     emptyState, 
     currentState,
     
  },
})

export default class CurrencyConversion extends Vue {
      showNewExchangeRateModal = false;
      currencies = [] as  ICurrency[];

 addAccount = false

  get empty() {
    return this.currencies.length < 1;
  }

  async fetchCurrencies() {
    try {
      const response = await cornieClient().get(
        "/api/v1/currency/myOrg/conversions"
      );
      if (response.success){
          this.currencies = [...response.data];
      } 
      else console.log(response.message);
    } catch (error) {
      console.log("failed to fetch payments");
    }
  }

  mounted() {
    this.  fetchCurrencies();
  }
};

  
  
  

</script>
