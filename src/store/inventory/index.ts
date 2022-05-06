// import { StoreOptions } from "vuex";
// import ObjectSet from "@/lib/objectset";
import { createInventoryCategory, createInventoryLocation, createInventoryLocationClasses, createInventoryValuation, deleteInventoryCategory, deleteInventoryLocation, getAllInventoryValuation, getInventoryCategoriesByUser, getInventoryCategory, getInventoryLocation, getLocationsByUser, updateInventoryCategory, updateInventoryLocation, updateInventoryValuation } from "./helper";

export default {
  namespaced: true,
  state: {
    categories: [],
    locations: [],
    valuation: ""
  },
  mutations: {
    setCategories(state: any, category: any) {
      state.categories = category ? category : []
    },
    setLocations(state: any, location: any) {
      state.locations = location ? location : []
    },
    setValuation(state: any, valuation: any) {
      state.valuation = valuation ? valuation : ""
    }
  },
  actions: {
    //Inventory Category
    async createCategory(ctx: any, data: any) {
      await createInventoryCategory(data).then(() => {
        // ctx.dispatch()
        return Promise.resolve()
      }).catch((e) => {
        return Promise.reject(e)
      })

    },

    async updateCategory(ctx: any, payload: any) {
      const { id, data } = payload
      await updateInventoryCategory(id, data).then(() => {
        // ctx.dispatch()
        return Promise.resolve()
      }).catch((e) => {
        return Promise.reject(e)
      })
    },

    async getCategory(ctx: any, id: string) {
      const category = await getInventoryCategory(id)
      // ctx.commit('setCategories', category)
      return Promise.resolve(category)
    },


    async deleteCategory(ctx: any, id: string) {
      await deleteInventoryCategory(id).then(() => {
        // ctx.dispatch()
        return Promise.resolve()
      }).catch((e) => {
        return Promise.reject(e)
      })
    },

    async getAllCategories(ctx: any, id: string) {
      await getInventoryCategoriesByUser(id).then((c) => {
        ctx.commit("setCategories", c)
      }).catch((e) => {
        console.log("error", e)

      })
    },


    //Inventory location
    async createLocationClasses(ctx: any, data: any) {
      await createInventoryLocationClasses(data).then(() => {
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async createLocation(ctx: any, data: any) {
      await createInventoryLocation(data).then(() => {
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async getAllLocations(ctx: any, id: string) {
      await getLocationsByUser(id).then((l) => {
        ctx.commit("setLocations", l)
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },


    async updateLocation(ctx: any, payload: any) {
      const { id, data } = payload
      await updateInventoryLocation(id, data).then(() => {
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async getLocation(ctx: any, id: string) {
      await getInventoryLocation(id).then(() => {
        // ctx.commit()
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async deleteLocation(ctx: any, id: string) {
      await deleteInventoryLocation(id).then(() => {
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async createValuation(ctx: any, data: any) {
      await createInventoryValuation(data).then((l) => {
        ctx.commit("setValuation", l)
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async getAllValuation(ctx: any) {
      await getAllInventoryValuation().then((l) => {
        ctx.commit("setValuation", l)
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },

    async updateValuation(ctx: any, data: any) {
      await updateInventoryValuation(data).then((l) => {
        ctx.commit("setValuation", l)
        return Promise.resolve()
      }).catch(e => {
        return Promise.reject(e)
      })
    },
  }
}