/* eslint-disable unused-imports/no-unused-vars */
import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import { StoreOptions } from "vuex";
import IPageInfo from "@/types/IPageInfo";
import {
  createService,
  getServices,
  deleteService,
  updateService,
  createProduct,
  getProducts,
  deleteProduct,
} from "./helper";

interface CatalogueStore {
  services: ICatalogueService[];
  products: ICatalogueProduct[];
  pageInfo : IPageInfo;
}

export default {
  namespaced: true,
  state: {
    services: [],
    products: [],
    pageInfo: {},
  },

  mutations: {
    addNewService(state, service) {
      if (service) {
        state.services.unshift(service);
      }
    },

    setPageInfo(state, pageInfo){
      state.pageInfo = pageInfo;
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
    deleteProduct(state, id: string) {
      state.products = state.products.filter(product => product.id != id);
    },
  },

  actions: {
    async getServices(ctx,payload? : {page:number, limit:number}) {
      const { page, limit } = payload ?? {}
      const { data, pageInfo } = await getServices(page ?? 1, limit ?? 10);
      ctx.commit("setServices", data);
      ctx.commit("setPageInfo", pageInfo);
    },

    getServicesById(ctx, id: string) {
      return ctx.state.services.find(
        service => service.id == id
      );
    },
    getProductsById(ctx, id: string) {
      return ctx.state.products.find(
        product => product.id == id
      );
    },
    async getProducts(ctx,payload? : {page:number, limit:number}) {
      const { page, limit } = payload ?? {}
      const { data, pageInfo } = await getProducts(page ?? 1, limit ?? 10);
      ctx.commit("setProducts", data);
      ctx.commit("setPageInfo", pageInfo);
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
    async deleteProduct(ctx, id: string) {
      const deleted = await deleteProduct(id);
      if (!deleted) return false;
      ctx.commit("deleteProduct", id);
      return true;
    },
  },
} as StoreOptions<CatalogueStore>;
