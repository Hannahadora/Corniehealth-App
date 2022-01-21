/* eslint-disable unused-imports/no-unused-vars */
import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import { StoreOptions } from "vuex";
import {
  createService,
  getServices,
  deleteService,
  updateService,
  createProduct,
  getProducts,
} from "./helper";

interface CatalogueStore {
  services: ICatalogueService[];
  products: ICatalogueProduct[];
}

export default {
  namespaced: true,
  state: {
    services: [],
    products: [],
  },

  mutations: {
    addNewService(state, service) {
      if (service) {
        state.services.unshift(service);
      }
    },

    setServices(state, services) {
      if (services?.length > 0) {
        state.services = [...services];
      }
    },

    setProducts(state, products) {
      if (products?.length > 0) {
        state.products = [...products];
      }
    },

    updateService(state, updatedService) {
      if (updatedService) {
        const index = state.services.findIndex(
          service => service.id === updatedService.id
        );
        if (index >= 0) state.services[index] = updatedService;
      }
    },
    deleteService(state, id: string) {
      state.services = state.services.filter(service => service.id != id);
    },
  },

  actions: {
    async getServices({ commit }) {
      const res = await getServices();
      commit("setServices", res);
    },
    async getServicesById(ctx, id: string) {
      if (ctx.state.services.length < 1) await ctx.dispatch("getServices");
      return ctx.state.services.find(service => service.id == id);
    },
    async getProducts({ commit }) {
      const res = await getProducts();
      commit("setProducts", res);
    },

    async createService({ commit }, data: ICatalogueService) {
      const res = await createService(data);
      if (!res?.id) return false;
      commit("addNewService", res);
      return true;
    },

    async createProduct({ commit }, data: ICatalogueProduct) {
      const res = await createProduct(data);
      if (!res?.id) return false;
      // commit("addNewProduct", res);
      return true;
    },

    async updateService({ commit }, data: ICatalogueService) {
      const res = await updateService(data);
      if (!res?.id) return false;
      commit("updateService", res);
      return true;
    },

    async deleteService(ctx, id: string) {
      const deleted = await deleteService(id);
      if (!deleted) return false;
      ctx.commit("deleteService", id);
      return true;
    },
  },
} as StoreOptions<CatalogueStore>;
