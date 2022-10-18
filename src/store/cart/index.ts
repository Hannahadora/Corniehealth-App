import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";
import localstore from "@/plugins/localstore";

interface CartState {
  cartItems: any[];
  prescriptionCartItems: any[];
  prescriptionUpload: any
}

export default {
  namespaced: true,
  state: {
    cartItems: [],
    prescriptionCartItems: [],
    prescriptionUpload: {
      file: "",
      email: "",
      prescriberName: "",
      fileInfo: "",
    }
  },
  mutations: {
    setPrescriptionCart(state, data) {
      state.prescriptionCartItems = data
    },
    setPrescriptionUpload(state, data) {
      state.prescriptionUpload = data
    },
    addToPrescriptionCart(state, prescriptions: any) {

      const prescriptionsSet = new ObjectSet(
        [...state.prescriptionCartItems, { ...prescriptions, quantity: 1 }],
        "productId"
      );
      state.prescriptionCartItems = [...prescriptionsSet];
      localstore.put("prescriptionCart", state.prescriptionCartItems)
    },
    updatePrescriptionUpload(state, file: any) {
      state.prescriptionUpload = file;
      localstore.put("prescriptionUpload", state.prescriptionUpload)  
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
    fetchPrescriptionCart(ctx) {
      const pCart = localstore.get("prescriptionCart") && localstore.get("prescriptionCart");
      ctx.commit("setPrescriptionCart", pCart);
    },
    fetchPrescriptionUpload(ctx) {
      const file = localstore.get("prescriptionUpload") && localstore.get("prescriptionUpload");
      ctx.commit("setPrescriptionUpload", file);
    },
  },
} as StoreOptions<CartState>;
