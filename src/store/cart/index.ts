import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";

interface CartState {
  cartItems: any[];
  prescriptionCartItems: any[]
}

export default {
  namespaced: true,
  state: {
    cartItems: [],
    prescriptionCartItems: [],
  },
  mutations: {
    addToPrescriptionCart(state, prescriptions: any) {

      const prescriptionsSet  = new ObjectSet(
        [...state.prescriptionCartItems, { ...prescriptions, quantity: 1 }],
        "productId"
      );
      state.prescriptionCartItems = [...prescriptionsSet];
    //   localStorage.setItem('PrescriptionCart', state.prescriptionCartItems as any)
    },
    updatePrescriptionCartItems(state, prescriptionCartItems: any[]) {
      const prescriptionCartItemSet = new ObjectSet(
        [...state.prescriptionCartItems, ...prescriptionCartItems],
        "productId"
      );
      state.prescriptionCartItems = [...prescriptionCartItemSet];
    },
    deleteCareteam(state, id: string) {
      const index = state.prescriptionCartItems.findIndex((item: any) => item.id == id);
      if (index < 0) return;
      const prescriptionCartItems = [...state.prescriptionCartItems];
      prescriptionCartItems.splice(index, 1);
      state.prescriptionCartItems = [...prescriptionCartItems];
    },
  },
  actions: {
  },
} as StoreOptions<CartState>;
