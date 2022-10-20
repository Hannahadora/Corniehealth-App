import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";
import localstore from "@/plugins/localstore";

interface CartState {
  cartItems: any[];
  prescriptionCartItems: any[];
  prescriptionUpload: any;
  selectedItem: any
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
    },
    selectedItem: <any>{}
  },
  mutations: {
    // Cart
    setCartItems(state, data) {
      state.cartItems = data
    },
    addToCart(state, item: any) {

      const itemSet = new ObjectSet(
        [...state.cartItems, { ...item, quantity: 1 }],
        "productId"
      );
      state.cartItems = [...itemSet];
      localstore.put("cartItems", state.cartItems)
    },
    updateCart(state, items: any[]) {
      const itemsSet = new ObjectSet(
        [...state.cartItems, ...items],
        "productId"
      );
      state.cartItems = [...itemsSet];
    },

    setSelecteditem(state, data) {
      state.selectedItem = data
    },

    deleteCartItem(state, id: string) {
      const index = state.cartItems.findIndex((item: any) => item.productId == id);
      if (index < 0) return;
      const items = [...state.cartItems];
      items.splice(index, 1);
      state.cartItems  = [...items];
      localstore.put("cartItems", state.cartItems)
    },

    // Prescription Cart
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
    deletePrescriptionCartItem(state, id: string) {
      const index = state.prescriptionCartItems.findIndex((item: any) => item.productId == id);
      if (index < 0) return;
      const prescriptionCartItems = [...state.prescriptionCartItems];
      prescriptionCartItems.splice(index, 1);
      state.prescriptionCartItems = [...prescriptionCartItems];
      localstore.put("prescriptionCart", state.prescriptionCartItems)
    },
  },
  actions: {
    // CART
    fetchCartItems(ctx) {
      const cartItems = localstore.get("cartItems") && localstore.get("cartItems");
      ctx.commit("setCartItems", cartItems);
    },

    fetchSelectedItem(ctx) {
      const item = localstore.get("item") && localstore.get("item");
      ctx.commit("setCartItems", item);
    },


    // Prescription Cart
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
