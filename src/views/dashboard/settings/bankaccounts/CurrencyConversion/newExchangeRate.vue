<template>
  <div class="rounded-md">
    <modal :visible="visible" class="mx-14 w-3/12 p-0">
      <div class="block p-3">
        <h3 class="font-bold text-xl text-primary mb-4"> Exchange Rate </h3>
         <form  @submit.prevent="submit">
          <div>
            <label for="Currency" class="font-bold text-base uppercase mb-4">
              Currency
            </label>
            <orgSelect name="select" id="Currency" v-model="Currency">
              <option v-for="(Currency, i) in Currencies" :key="i" :value="Currency.code">
                {{ Currency.code }}
              </option>
            </orgSelect>
          </div>
           <div>
            <label
              for="exchangeRate"
              class="font-bold text-base uppercase mb-4"
            >
             Exchange rate
            </label>
            <orgInput
              id="exchangeRate"
              v-model="exchangeRate"
            />
           </div>
           
           <div class="my-8 flex justify-end">
          <span>
            <button
              class="
                border border-blue-800
                mr-8
                rounded-3xl
                px-6
                py-2
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
              @click="show = false"
            >
              Cancel
            </button>
          </span>
          <span>
            <button
              type="submit"
              class="
                px-6
                py-2
                text-white
                appearance-none
                border-none
                bg-pink-600
                rounded-3xl
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
              Save
            </button>
          </span>
        </div>
          </form> 
      
        
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/modal.vue";
import OrgSelect from "@/components/orgSelect.vue";
import OrgInput from "@/components/orgInput.vue";

import { cornieClient } from "@/plugins/http";

export default {
  name: "NewExchangeRate",
  components: {
    Modal,
    OrgSelect,
    OrgInput,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      Currency:'',
      exchangeRate:'',
      Currencies : ''
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    payload() {
      return {
       code:this.Currency,
        exchangeRate:this.exchangeRate
      };
    },
  },
  
  
  //  fetching of the dropdown data
  async created() {
    try {
      await this.fetchDropDown();
    } catch (error) {
      console.log(error);
    }
  },
  
  methods: {
    //Add Organization Payment Account
    async submit() {
      try {
        console.log(this.payload);
        const response = await cornieClient().post(
          "/api/v1/currency",
          this.payload
        );
        if (response.success) {
          alert("Currency conversion added");
        }
      } catch (error) {
        console.error(error);
      }
    },

    // fetching select dropdown

    async fetchDropDown() {
      const worldCurrencies = cornieClient().get(
        "/api/v1/currency/getCurrencies/world"
      );
      const response = await Promise.all([worldCurrencies])
      this.Currencies = response[0].data;
    },
  },
};
</script>