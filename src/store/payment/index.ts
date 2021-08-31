import ObjectSet from "@/lib/objectset";
import IPayment from "@/types/IPayment";
import { StoreOptions } from "vuex";
import { deletePayment, fetchPayments } from "./helper";

interface PaymentState {
  payments: IPayment[];
}

export default {
  namespaced: true,
  state: {
    payments: [],
  },
  mutations: {
    setPayments(state, payments: IPayment[]) {
      state.payments = [...payments];
    },
    updatePayments(state, payments: IPayment[]) {
      const paymentSet = new ObjectSet([...state.payments, ...payments], "id");
      state.payments = [...paymentSet];
    },
    deletePayment(state, id: string) {
      const index = state.payments.findIndex((payment) => payment.id == id);
      if (index < 0) return;
      const payments = [...state.payments];
      payments.splice(index, 1);
      state.payments = [...payments];
    },
  },
  actions: {
    async fetchPayments(ctx) {
      const payments = await fetchPayments();
      ctx.commit("setPayments", payments);
    },
    getPaymentById(ctx, id: string) {
      return ctx.state.payments.find((payment) => payment.id == id);
    },
    async deletePayment(ctx, id: string) {
      const deleted = await deletePayment(id);
      if (!deleted) return false;
      ctx.commit("deletePayment", id);
      return true;
    },
  },
} as StoreOptions<PaymentState>;
