<template>
  <auto-complete :items="items" v-model="encounter">
    <template #item="{ item }">
      <div class="flex justify-between my-1 items-center text-xs">
        <span class="flex flex-col">
          <span class="text-xs text-gray-300">XXX-XXX-XXX</span>
          <span class="flex items-center">
            <avatar :src="item.practitionerImage" class="mr-1" />
            {{ item.practitioner }}
          </span>
        </span>
        <span class="flex flex-col">
          <span class="font-semibold text-sm mb-1 text-black">
            {{ item.type }}
          </span>
          <span class="text-gray-500">{{ item.time }}</span>
        </span>
      </div>
    </template>
  </auto-complete>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
import { Prop, PropSync } from "vue-property-decorator";
import IEncounter from "@/types/IEncounter";
import { cornieClient } from "@/plugins/http";
import { printPractitioner } from "@/plugins/utils";

@Options({
  name: "EncounterSelect",
  components: {
    AutoComplete,
    Avatar,
  },
})
export default class EncounterSelect extends Vue {
  placeholder = require("@/assets/img/avatar.png");

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  encounter!: string;

  encounters: IEncounter[] = [];

  get patientId() {
    return this.$route.params.id;
  }

  get items() {
    return this.encounters.map((encounter) => ({
      ...encounter,
      code: encounter.id,
      display: this.printEncounter(encounter),
      practitioner: printPractitioner(encounter.practitioner),
      practitionerImage: encounter?.practitioner?.image,
      time: this.printEncounterTime(encounter),
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

  created() {
    this.fetchEncounters();
  }
}
</script>
