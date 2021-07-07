<template>
   <div class="h-screen flex justify-center">
    <new-exchange-rate v-if="newExchangeRate"/>
    <template v-else>
    <empty-state  v-if='true'   @newExchangeRate="addAccount= true"  />  
     <current-state v-else @newExchangeRate="newExchangeRate= true"/> 
    </template>
</div>
</template> 

<script>
import emptyState  from "./emptyState.vue";
import currentState from "./currentState.vue";
import NewExchangeRate from "./newExchangeRate.vue"


export default {
  name: "CurrencyConversion",
  components: {
     emptyState, 
     currentState,
     NewExchangeRate
  },
  data(){
    return{
      newExchangeRate: false,
    }
  },
  
  }

</script>
