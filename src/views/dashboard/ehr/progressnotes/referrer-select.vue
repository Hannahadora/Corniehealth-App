<template>
  <!-- <p>fgfgfgf</p><p>{{otherrequests}}</p> -->
  <auto-complete :items="items">
    <template #item="{ item }">
      <div class="flex justify-between my-1 items-center text-xs">
        <span class="flex flex-col">
          XXX-XXX-XXX
          <span class="flex items-center">
            <avatar :src="item.practitionerImage" class="mr-1" />
            {{ item.code }}
          </span>
        </span>
        <span class="flex flex-col">
          <span class="font-semibold text-sm mb-1 text-black">
            {{ item.priority }}
          </span>
          <!-- <span class="text-gray-500">{{ item.time }}</span> -->
        </span>
      </div>
    </template>
  </auto-complete>
</template>
<script lang="ts">
import { namespace } from "vuex-class";

import { Options, Vue } from "vue-class-component";
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
import { Prop, PropSync } from "vue-property-decorator";
import IEncounter from "@/types/IEncounter";
import { cornieClient } from "@/plugins/http";
import { printPractitioner } from "@/plugins/utils";

const otherrequest = namespace("otherrequest");

@Options({
  name: "EncounterSelect",
  components: {
    AutoComplete,
    Avatar,
  },
})
export default class ReferrerSelect extends Vue {
  placeholder = require("@/assets/img/avatar.png");

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  encounter!: string;

  encounters: IEncounter[] = [];

  referrers: any = [];

  @otherrequest.State
  otherrequests!: any[];

  @Prop({ type: String, default: "" })
  patientId!: string;

  //   @otherrequest.Action
  //   fetchOtherrequests!: () => Promise<void>;

  @otherrequest.Action
  fetchOtherrequestsById!: (patientId: string) => Promise<void>;

  //   get patientId() {
  //     return this.$route.params.id;
  //   }

  //   get itemss() {
  //     return this.encounters.map((encounter) => ({
  //       ...encounter,
  //       code: encounter.id,
  //       display: this.printEncounter(encounter),
  //       practitioner: printPractitioner(encounter.practitioner),
  //       practitionerImage: encounter?.practitioner?.image,
  //       time: this.printEncounterTime(encounter),
  //     }));
  //   }

  get items() {
    // return this.otherrequests
    //   return [
    //       {
    //     priority: "encounter.requestInfo?.priority",
    //     code: "encounter.requestInfo?.category",
    //       }
    //   ]
    return this.otherrequests.map((request) => ({
      ...request,
      priority: request.id,
      code: request.id,
      //   display: this.printEncounter(encounter),
      //   practitioner: printPractitioner(encounter.practitioner),
      //   practitionerImage: encounter?.practitioner?.image,
      //   time: this.printEncounterTime(encounter),
    }));
  }

  printEncounterTime(encounter: IEncounter) {
    const date = new Date(encounter.startDate);
    const startDate = date.toLocaleDateString("en-NG");
    const startTime = date.toLocaleTimeString("en-NG");
    return `${startDate}, ${startTime}`;
  }

  printEncounter(encounter: IEncounter) {
    const time = this.printEncounterTime(encounter);
    return `${encounter.type} ${time}`;
  }
  async fetchEncounters() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/encounter/patient/${this.patientId}`
      );
      this.encounters = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching encounters for patient",
        status: "error",
      });
    }
  }

  async fetchReferrer() {
    try {
      const { data } = await cornieClient().get(
        `/other-requests/findByPatientSubject/all/${this.patientId}`
      );
      this.referrers = data || [];
      ;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching referrers for patient",
        status: "error",
      });
    }
  }

  async created() {
    this.fetchEncounters();
    this.fetchReferrer();
    // if (!this.otherrequests || this.otherrequests.length === 0) await this.fetchOtherrequests();
    if (!this.otherrequests || this.otherrequests.length === 0)
      await this.fetchOtherrequestsById(this.patientId);
  }
}
</script>
