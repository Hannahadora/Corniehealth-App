import { IndexableObject } from "@/lib/http";
import IPayment from "@/types/IPayment";
import { StoreOptions } from "vuex";
import { fetchPayments } from "./helper";

interface PaymentState {
  payments: IPayment[];
}

export default {
  namespaced: true,
  state: {
    payments: [] as IPayment[],
  },
  getters: {},
  mutations: {
    setPayments(state, payments) {
      state.payments = [...payments];
    },
    updatePayments(state, payments: IPayment[]) {
      console.log("updating payments");
      const storedPayments = [...state.payments];
      payments.forEach((payment) => {
        const index = storedPayments.findIndex((d) => d.id == payment.id);
        if (index >= 0) storedPayments[index] = payment;
        else storedPayments.push(payment);
      });
      console.log(storedPayments);
      state.payments = [...storedPayments];
    },
  },
  actions: {
    async fetchPayments() {
      const payments = await fetchPayments();
      this.commit("payment/setPayments", payments);
    },
  },
} as StoreOptions<PaymentState>;
