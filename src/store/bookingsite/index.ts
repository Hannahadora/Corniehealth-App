import IBookingsite from "@/types/IBookingsite";
import { StoreOptions } from "vuex";
import { deleteBookingsite, fetchBookingsite } from "./helper";

interface IBookingsiteState {
  bookingsites: IBookingsite[];
}

export default {
  namespaced: true,
  state: {
    bookingsites: [],
  },
  mutations: {
    setBookingsite(state, bookingsites: any) {
      state.bookingsites = [bookingsites];
    },
    deleteBookingsite(state, id: string) {
      const index = state.bookingsites.findIndex(bookingsite => bookingsite.id == id);
      if (index < 0) return;
      const bookingsites = [...state.bookingsites];
      bookingsites.splice(index, 1);
      state.bookingsites = [...bookingsites];
    },
 
  },
  actions: {
    async fetchBookingsite(ctx) {
      const bookingsites = await fetchBookingsite();
      ctx.commit("setBookingsite", bookingsites);
    },
    getBookingsiteById(ctx, id: string) {
      return ctx.state.bookingsites.find(
        bookingsite => bookingsite.id == id
      );
    },
    async deleteBookingsite(ctx, id: string) {
      const deleted = await deleteBookingsite(id);
      if (!deleted) return false;
      ctx.commit("deleteBookingsite", id);
      return true;
    },
  
  },
} as StoreOptions<IBookingsiteState>;
