<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary -mt-1">
            {{ newaction }} Exchange Rate
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div>
          <cornie-select
            placeholder="--Select--"
            class="w-full"
            label="Currency"
            :items="allCurrency"
            v-model="currency"
          />
          <!-- <label for="Currency" class="font-bold text-base uppercase mb-4">
              Currency
            </label>
            <orgSelect name="select" id="Currency" v-model="Currency">
              <option v-for="(Currency, i) in Currencies" :key="i" :value="Currency.code">
                {{ Currency.code }}
              </option>
            </orgSelect> -->
        </div>
        <div class="w-full">
          <cornie-input
            class="w-full"
            placeholder="--Enter--"
            id="exchangeRate"
            label="  Exchange rate"
            v-model="exchangeRate"
          />
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
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-3 rounded-xl"
          >
            Save
          </cornie-btn>
          <!-- <span>
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
          </span> -->
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
import { findLastKey } from "lodash";
import { namespace } from "vuex-class";
import ICurrency from "@/types/ICurrency";

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

  @Watch("id")
  idChanged() {
    this.setCurrency();
  }

  currency = "";
  exchangeRate = "";
  Currencies = [];
  loading = false;

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateCurrency();
    else await this.createCurrency();
    this.loading = false;
  }
  async setCurrency() {
    const currency = await this.getCurrencyById(this.id);
    if (!currency) return;
    this.currency = currency.currency;
    this.exchangeRate = currency.exchangeRate;
  }

  get payload() {
    return {
      code: this.currency,
      exchangeRate: this.exchangeRate,
    };
  }

  get newaction() {
    return this.id ? "Update" : "New";
  }

  done() {
    this.$emit("currency-added");
    this.show = false;
  }
  get allCurrency() {
    if (!this.Currencies || this.Currencies.length === 0) return [];
    return this.Currencies.map((i: any) => {
      return {
        code: i.code,
        display: i.code,
      };
    });
  }

  async createCurrency() {
    try {
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
    const response = await Promise.all([worldCurrencies]);
    this.Currencies = response[0].data;
  }
  created() {
    this.fetchDropDown();
  }
}
</script>
