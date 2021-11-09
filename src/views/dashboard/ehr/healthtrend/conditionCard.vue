<template>
  <detail-card
    height="313px"
    title="Current Conditions"
    :count="1"
    more=""
    @add="$router.push('condition')"
  >
    <div
      class="
        w-full
        grid grid-cols-3
        gap-1
        text-sm
        pb-2
        border-b border-gray-200
      "
      v-for="(item, i) in items"
      :key="i"
    >
      <div class="flex flex-col">
        <span class="font-semibold text-primary">{{ item.name }}</span>
        <span class="text-gray-400">{{ item.severity }}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold text-primary">Onset</span>
        <span class="text-gray-400">
          {{ item.onset.key }}: {{ item.onset.text }}
        </span>
      </div>
      <div class="flex flex-col">
        <span class="font-semibold text-primary">Abatement</span>
        <span class="text-gray-400" v-if="abatement">
          {{ item.abatement.key }}: {{ item.abatement.text }}
        </span>
        <span class="text-gray-400" v-else> N/A </span>
      </div>
    </div>
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

import Avatar from "@/components/avatar.vue";
import { ICondition, Timeable } from "@/types/ICondition";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import Period from "@/types/IPeriod";

const condition = namespace("condition");

@Options({
  name: "conditionCard",
  components: {
    DetailCard,
    Avatar,
  },
})
export default class conditionCard extends Vue {
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  severityMapper = (code: string) => "";
  codeMapper = (code: string) => "";

  get patientId() {
    return this.$route.params.id as string;
  }

  get patientConditions() {
    return this.conditions[this.patientId] || [];
  }

  get count() {
    return this.conditions.length;
  }

  async loadMappers() {
    this.severityMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-severity"
    );
    this.codeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-code"
    );
  }

  get items() {
    const items = this.patientConditions.map((condition) => ({
      name: this.codeMapper(condition.code),
      severity: this.severityMapper(condition.severity),
      onset: this.displayTimeable(condition.onSet, "onsetString"),
      abatement: this.printAbatement(condition),
    }));

    return items;
  }

  printAbatement(condition: ICondition) {
    const latest = this.latestAbatement(condition);
    if (!latest) return;
    return this.displayTimeable(latest, "string");
  }

  latestAbatement({ abatements }: ICondition) {
    const allAbatements = abatements || [];
    const sorted = allAbatements.sort((a: any, b: any) => {
      if ((a.createdAt = b.createdAt)) return 0;
      return a.createdAt > b.createdAt ? 1 : -1;
    });
    return sorted.pop();
  }

  displayTimeable(item: Timeable, stringKey: string) {
    const value = { ...item };
    value.string = stringKey ? item[stringKey] : item.string;
    if (!value) return;
    if (value.dateTime) {
      return {
        key: "Date/Time",
        text: new Date(value.dateTime).toLocaleDateString(),
        subtext: this.printTime(value.dateTime),
      };
    } else if (value.age) {
      return {
        key: "Age",
        text: value.age,
      };
    } else if (value.period) {
      return {
        key: "Period",
        text: this.printPeriod(value.period),
      };
    } else if (value.string) {
      return {
        key: "String",
        text: value.string,
      };
    } else if (value.range) {
      return {
        key: "Range",
        text: `${value.range.min} ${value.range.unit} to ${value.range.max} ${value.range.unit}`,
      };
    }
  }

  printPeriod(period: Period) {
    const start = new Date(period.start).toLocaleDateString();
    let end = "";
    if (period.end) end = new Date(period.end).toLocaleDateString();
    return `${start} - ${end}`;
  }

  printTime(timeString: string) {
    const date = new Date(timeString);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  async created() {
    this.loadMappers();
    this.fetchPatientConditions(this.patientId);
  }
}
</script>
