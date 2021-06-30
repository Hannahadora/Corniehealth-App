<template>
   <router-view />
  <div class="h-full flex justify-center">
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
      >
        Bank & Accounts
      </span>
      <span class="flex w-full font-semibold py-2 mx-auto mt-4">
        <span
          class="
            flex
            px-3
            py-2
            border-b-4
            cursor-pointer
            hover:bg-gray-300 hover:bg-opacity-20
          "
          @click="active = i"
          v-for="(tab, i) in tabs"
          :key="i"
          :class="isActive(i) ? ['border-danger'] : []"
        >
          {{ tab }}
        </span>
        <span class="flex px-3 pb-2 border-b-4 flex-grow" />
      </span>
      <div>
        <payment  v-if="active == 0" />
      </div>
    </div>
  </div>
</template>
<script>
import Payment from "./Payment/payment.vue";

export default {
  name: "BanksAndAccounts",
  components: {
    Payment
  },
  data() {
    return {
      tabs: ["Payments", "Collections", "Currency Conversions"],
      active: 0,
    };
  },
  methods: {
    isActive(key) {
      return key == this.active;
    },
  },
};
</script>
<style>
table thead th {
  background: #0a4269 !important;

  color: white !important;
}
table thead th:first-child {
  border-top-left-radius: 0.4rem 0.4rem !important;
}
table thead th:last-child {
  border-top-right-radius: 0.4rem 0.4rem !important;
}
table thead tr th {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

table tbody td {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
table tbody tr {
  border: 1px solid #b8c3de;
}
table tbody tr:nth-child(even) {
  background-color: white !important;
}
</style>
