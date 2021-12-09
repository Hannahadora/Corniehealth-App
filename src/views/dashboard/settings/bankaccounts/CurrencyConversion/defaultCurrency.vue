<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary -mt-1">
            Default Currency
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
            v-model="defaultCurrency"
          />
          <!-- <label for="defaultCurrency" class="font-bold text-base uppercase mb-4">
              Currency
            </label>
            <orgSelect name="select" id="defaultCurrency" v-model="defaultCurrency">
              <option v-for="(defaultCurrency, i) in defaultCurrencies" :key="i" :value="defaultCurrency.code">
                {{ defaultCurrency.code }}
              </option>
            </orgSelect> -->
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
            @click="submit"
            class="text-white bg-danger px-3 rounded-xl"
          >
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
import CornieSelect from "@/components/autocomplete.vue";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import ICurrency from "@/types/ICurrency";
import { cornieClient } from "@/plugins/http";

const currency = namespace("currency");
@Options({
  name: "defaultCurrency",
  components: {
    ...CornieCard,
    Textarea,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieInput,
    CornieSelect,
    CornieDialog,
    CancelIcon,
  },
})
export default class defaultCurrency extends Vue {
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

  defaultCurrency = "";
  exchangeRate = "";
  defaultCurrencies = [];
  loading = false;

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async setCurrency() {
    const currency = await this.getCurrencyById(this.id);
    if (!currency) return;
    this.defaultCurrency = currency.currency;
    this.exchangeRate = currency.exchangeRate;
  }

  get payload() {
    return {
      code: this.defaultCurrency,
    };
  }

  get newaction() {
    return this.id ? "Update" : "New";
  }

  async submit() {
    try {
      console.log(this.payload);
      const response = await cornieClient().post(
        "/api/v1/currency/setDefault",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Currency conversion added", status: "success" });
        this.show = false;
      }
    } catch (error) {
      window.notify({ msg: "Currency conversion not added", status: "error" });
    }
  }

  // fetching select dropdown

  async fetchDropDown() {
    const worldCurrencies = cornieClient().get(
      "/api/v1/currency/getCurrencies/world"
    );
    const response = await Promise.all([worldCurrencies]);
    this.defaultCurrencies = response[0].data;
  }

  done() {
    this.$emit("currency-added");
    this.show = false;
  }
  get allCurrency() {
    if (!this.defaultCurrencies || this.defaultCurrencies.length === 0)
      return [];
    return this.defaultCurrencies.map((i: any) => {
      return {
        code: i.code,
        display: i.code,
      };
    });
  }

  created() {
    this.fetchDropDown();
  }
}
</script>
