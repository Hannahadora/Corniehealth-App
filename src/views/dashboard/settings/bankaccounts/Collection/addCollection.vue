<template>
  <div class="w-full mx-5">
    <span
      class="
        flex
        border-b-2
        w-full
        font-semibold
        text-xl text-primary
        py-2
        mx-auto
      "
      >Add Collection Account
    </span>
    <form class="w-full mt-5" @submit.prevent="submit">
      <div class="grid grid-cols-3">
        <d-select
          v-model="paymentCategories"
          label="Categories"
          :items="collectionscategory"
        >
        </d-select>
        <d-select v-model="location" label="Location" :items="locations">
        </d-select>
      </div>
      <div class="grid grid-cols-3">
        <d-select v-model="bank" label="Bank" :items="AllBanks" />
        <d-input v-model="accountNumber" label="Account Number" />
        <d-input v-model="accountName" label="Account Name" disabled />
      </div>
      <span class="flex full-width mb-2 justify-end">
        <button
          class="
            rounded-full
            font-semibold
            p-2
            text-primary
            border border-primary
            w-1/4
            mr-3
          "
        >
          Cancel
        </button>
        <button
          class="
            w-1/4
            rounded-full
            font-semibold
            p-2
            text-white
            border
            bg-danger
          "
          type="submit"
        >
          Save
        </button>
      </span>
    </form>
  </div>
</template>

<script>
import DInput from "@/components/cornieinput.vue";
import DSelect from "@/components/cornieselect.vue";
import { cornieClient } from "@/plugins/http";

export default {
  name: "NewCollection",
  components: {
    DInput,
    DSelect,
  },
  data() {
    return {
      accountName: "",
      accountNumber: "",
      paymentCategories: "",
      AllBanks: [],
      bank: "",
      collectionsCategory: [],
    };
  },
  computed: {
    payload() {
      return {
        paymentCategories: this.paymentCategories,
        accountNumber: this.accountNumber,
        accountName: this.accountName,
        bank: this.bank,
      };
    },
  },

  async created() {
    try {
      await this.fetchDropDown();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async submit() {
      try {
        console.log(this.payload);
        const response = await cornieClient().post(
          "/api/v1/collection",
          this.payload
        );
        if (response.success) {
          alert("Account Added Successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDropDown() {
      const collectionsCategory = cornieClient().get(
        "/api/v1/getcollectionsCategories/all"
      );
      const AllBanks = cornieClient().get("/api/v1/payments/getAllBanks/all");

      const response = await Promise.all([collectionsCategory, AllBanks]);
      this.collectionsCategory = response[0].data;
      this.AllBanks = response[1].data;
    },
  },
};
</script>
