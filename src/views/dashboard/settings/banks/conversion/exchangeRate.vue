<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-5/6">
    <cornie-card height="100%" class="flex flex-col">
       <cornie-card-title  class="w-full"> 
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary -mt-1">{{newaction}} Exchange Rate</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
          
       </cornie-card-title>
        <cornie-card-text class="flex-grow scrollable">
          <div>
             <!-- <Multiselect
    v-model="value"
     mode="tags"
    placeholder="--Select Outlets--"
  :closeOnSelect="true"
  :searchable="true"
  :createTag="true"
  :options="allCurrency"
/>  -->
              <cornie-select
                label="Location"
                class="mb-4 w-full"
                v-model="location"
                :items="allLocation"
                placeholder="--Select Location--"
                />
              <cornie-select
                placeholder="--Select--"
                class="w-full"
                label="Base Currency"
                :items="allCurrencyNew"
                v-model="currency"
              />
              <cornie-select
                placeholder="--Select--"
                class="w-full"
                label="Currency"
                :items="allCurrencyNew"
                v-model="currency"
              />
          </div>
           <cornie-input disabled v-if="id" label="Exchange rate" v-model="exchangeRate" placeholder="Enter Exchange Rate" class="w-full mb-4" />
             <cornie-input v-else label="Exchange rate" v-model="exchangeRate" placeholder="Enter Exchange Rate" class="w-full mb-4" />
           <!-- <div class="">
               <span class="text-sm font-semibold mb-1">Exchange rate</span>       
                <div class="bg-blue-100 text-black p-3 rounded flex font-semibold mt-5 text-sm">
                  68
                </div>
           </div> -->
            <div class="bg-blue-100 text-black p-3 text-center rounded flex font-semibold justify-center mt-5 text-sm">
                1 CY ~= 68 NGN
            </div>
        </cornie-card-text>  
           <cornie-card>
        <cornie-card-text class="flex justify-end">
                <cornie-btn
                @click="show = false"
                class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn  :loading="loading"
                    @click="apply" class="text-white bg-danger px-3 rounded-xl">
              Save
              </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import Modal from "@/components/modal.vue";
import CornieInput from "@/components/cornieinput.vue";
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/autocomplete.vue";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import ICurrency from "@/types/ICurrency";
//import MultiSelect from "./multipleselect.vue";
//@ts-ignore
import Multiselect from '@vueform/multiselect'

const currency = namespace("currency");


@Options({
  name: "NewExchangeRate",
  components: {
    ...CornieCard,
    Textarea,
    CornieIconBtn,
    ArrowLeftIcon,
    Modal,
    CornieInput,
    CornieSelect,
    CornieDialog,
    CancelIcon,
    Multiselect
  },
})
export default class NewExchangeRate extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @currency.Action
  getCurrencyById!: (id: string) => ICurrency;

  @Prop({ type: Array, default: () => [] })
  available!: object;



@Watch('id')
  idChanged() {
    this.setCurrency();
  }

 currency= "";
      exchangeRate ="";
      Currencies = [];
loading=false;
 value = null;
 location='';
 orgLocation = [];
       options = [
          'Batman',
          'Robin',
          'Joker',
        ]
   get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }
  async setCurrency() {
    const currency = await this.getCurrencyById(this.id)
    if (!currency) return
     this.currency = currency.code;
    this.exchangeRate = currency.exchangeRate;
  }

  get payload() {
    return {
      code: this.currency,
      exchangeRate: this.exchangeRate,
    };
  }
  get allLocation() {
     if (!this.orgLocation || this.orgLocation.length === 0) return [ ];
     return this.orgLocation.map((i: any) => {
         return {
             code: i.id,
             display: i.name,
         }
     })
 }
 get newaction() {
    return this.id ? 'Update' : 'New'
  }

  done() {
    this.$emit("currency-added");
    this.show = false;
  }
  get allCurrency() {
     if (!this.Currencies || this.Currencies.length === 0) return [ ];
     return this.Currencies.map((i:any) => {
         return {
             value: i.code,
             label: i.code,
         }
     })
  }
    get allCurrencyNew() {
     if (!this.Currencies || this.Currencies.length === 0) return [ ];
     return this.Currencies.map((i:any) => {
         return {
             code: i.code,
             display: i.code,
         }
     })
  }

  async createCurrency() {
    try {
      console.log(this.payload);
      const response = await cornieClient().post(
        "/api/v1/currency",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Currency conversion added", status: "success" });
        this.done();
      }
    } catch (error) {
      console.error(error);
      window.notify({ msg: "Currency conversion not added", status: "error" });
    }
  }

  async updateCurrency() {
    const url = `/api/v1/currency/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Currency conversion  updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }


 async fetchDropDown() {
      const worldCurrencies = cornieClient().get(
        "/api/v1/currency/getCurrencies/world"
      );
      const response = await Promise.all([worldCurrencies])
      this.Currencies = response[0].data;
    }
      async fetchLocation() {
    const AllLocation = cornieClient().get("/api/v1/location/myOrg/getMyOrgLocations");
    const response = await Promise.all([AllLocation]);
    this.orgLocation = response[0].data;
  }
  created() {
    this.fetchDropDown();
    this.fetchLocation();
     
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect {
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: var(--ms-border-width,1px) solid var(--ms-border-color,#d1d5db);
    border-radius: var(--ms-radius,4px);
    background: var(--ms-bg,#fff);
    font-size: var(--ms-font-size,1rem);
    min-height: calc(var(--ms-border-width, 1px)*2 + var(--ms-font-size, 1rem)*var(--ms-line-height, 1.375) + var(--ms-py, .5rem)*2);
}
.multiselect-tags {
    flex-grow: 1;
    position: absolute;
    top: 50px;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    margin: var(--ms-tag-my,.25rem) 0 0;
    padding-left: var(--ms-py,.5rem);
    align-items: center;
}
  .multiselect-tag.is-user {
    padding: 5px 12px;
    border-radius: 22px;
    background: #080056;
    margin: 3px 3px 8px;
    position: relative;
    left: -10px;
}
/* .multiselect-clear-icon {
    -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
    mask-image: url("/components/icons/chevrondownprimary.vue");
    background-color: #080056;
    display: inline-block;
    transition: .3s;
} */
.multiselect-placeholder {
    font-size: 0.8em;
    font-weight: 400;
    font-style: italic;
    color: #667499;
}
.multiselect-caret {
    transform: rotate(0deg);
    transition: transform .3s;
   -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
    mask-image: url("../../../../../assets/img/Chevron.png");
    background-color: #080056;
    margin: 0 var(--ms-px,.875rem) 0 0;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    flex-grow: 0;
    pointer-events: none;
}
  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }
.multiselect-tag-remove {
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    background: #fff;
    border-radius: 50%;
    color: #080056;
    justify-content: center;
    padding: 0.77px;
    margin: var(--ms-tag-remove-my,0) var(--ms-tag-remove-mx,.5rem);
}

</style>