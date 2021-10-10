import IEncounter from "@/types/IEncounter";
import IEpisode from "@/types/IEpisode";
import IVital from "@/types/IVital";
import { StoreOptions } from "vuex";
import { getVitals, createVital, createEncounter, getEncounters, updateVitalStatus, createEpisode, getEpisodes, updateEncounterStatus, updateEpisodeStatus } from "./helper";

interface VitalsStore {
  vitals: IVital[],
  encounters: IEncounter[],
  episodes: IEpisode[],
}

export default {
  namespaced: true,
  state: {
    vitals: [],
    encounters: [],
    episodes: [],
  },
  mutations: {

    setVitals(state, vitals) {
      if (vitals && vitals.length > 0) state.vitals = [ ...vitals ];
    },

    setEncounters(state, encounters) {
      if (encounters && encounters.length > 0) state.encounters = [ ...encounters ];
    },

    setEpisodes(state, episodes) {
      if (episodes && episodes.length > 0) state.episodes = [ ...episodes ];
    },

    addVital(state, vital) {
      if (vital?.id) state.vitals.unshift(vital);
    },

    updateVitalStatus(state, payload) {
      if (payload.vitalId) {
        const index = state.vitals.findIndex(vital => vital.id === payload.vitalId);
        if (index >= 0) state.vitals[index].status = payload.status
      }
    },

    updateEpisodeStatus(state, payload) {
      if (payload.vitalId) {
        const index = state.episodes.findIndex(episode => episode.id === payload.episodeId);
        if (index >= 0) state.episodes[index].status = payload.status
      }
    },

    addnewEncounter(state, payload) {
      if (payload) {
        state.encounters.unshift(payload);
      }
    },
  },

  actions: {
    async getVitals(ctx, patientId: string) {
      const vitals = await getVitals(patientId);
      ctx.commit("setVitals", vitals);
    },

    async getEncounters(ctx, patientId: string) {
      const encounters = await getEncounters(patientId);
      ctx.commit("setEncounters", encounters);
    },

    async getEpisodes(ctx, patientId: string) {
      const episodes = await getEpisodes(patientId);
      console.log(episodes, "ALL EPISODES");
      ctx.commit("setEpisodes", episodes);
    },

    async createVital(ctx, vital: IVital) {
      const res = await createVital(vital);
      if (!res) return { };
      // ctx.commit("addVital", res);
      return res;
    },

    async createEncounter(ctx, encounter: IEncounter) {
      const res = await createEncounter(encounter);
      console.log(res, "ENcounter");
      
      if (!res) return { };
      ctx.commit("addnewEncounter", res);
      return res;
    },

    async createEpisode(ctx, episode: IEpisode) {
      const res = await createEpisode(episode);
      
      if (!res) return false;
      // ctx.commit("addSchedule", sch);
      return true;
    },

    async updateVitalStatus(ctx, body: any) {
      const res = await updateVitalStatus(body.data, body.vitalId);
      if (!res) return { };
      ctx.commit("updateVitalStatus", { status: body.data?.status, vitalId: body.vitalId});
      return res;
    },

    async updateStatusOfEncounter(ctx, body: any) {
      console.log(body, "BODY");
      
      const res = await updateEncounterStatus(body.data, body.patientId);
      if (!res) return { };
      ctx.commit("updateVitalStatus", { status: body.data?.status, vitalId: body.vitalId});
      return res;
    },

    async updateEpisodeStatus(ctx, body: any) {
      console.log(body, "BODY");
      
      const res = await updateEpisodeStatus(body.data, body.episodeId);
      if (!res) return { };
      ctx.commit("updateEpisodeStatus", { status: body.data?.status, episodeId: body.episodeId});
      return res;
    }
  },
} as StoreOptions<VitalsStore>
