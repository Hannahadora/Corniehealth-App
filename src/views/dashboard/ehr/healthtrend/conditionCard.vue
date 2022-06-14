<template>
  <detail-card
    height="337px"
    title="Current Conditions"
    :count="items?.length"
    more="View all"
    @add="$router.push('condition')"
  >
   <template #empty>
      <div class="flex flex-col items-center justify-center my-auto" v-if="conditions.length === 0">
      <img class="mb-3" src="@/assets/img/no-condition-trend.svg" alt="" />
      <p class="text-sm text-center" style="color: #667499">No Conditions</p>
    </div>
    </template>
    
    <div
      class="w-full flex items-start justify-between gap-1 text-sm py-4 border-b border-gray-200"
      v-for="(item, i) in items.slice(0,2)"
      :key="i"
    >
      <div class="flex flex-col w-10/12">
        <span class="text-sm font-semibold text-primary">{{ item.name }}</span>
        <span class="text-sm font-semibold text-primary">{{ item.description }}</span>
        <span class="text-sm text-gray-400">{{ item.severity }}</span>
        <span class="text-sm text-gray-400">{{ item.date }}</span>
      </div>
      <div class="">
        <img src="@/assets/img/trend-checked.svg" alt="">
      </div>
    </div>
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
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
  
  @Prop({ type: Array, default: () => [] })
  conditions!: ICondition[];

  severityMapper = (code: string) => "";
  codeMapper = (code: string) => "";

  get patientId() {
    return this.$route.params.id as string;
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
    const items = this.conditions?.map((condition: any) => ({
      name: this.codeMapper(condition.name),
      severity: this.severityMapper(condition.severity),
      //  onset: this.displayTimeable(condition.onSet, "onsetString"),
      description: condition.description,
      // abatement: this.printAbatement(condition),
      date: new Date(condition.createdAt).toLocaleDateString()
    }));

    return items;
  }

  printAbatement(condition: ICondition) {
    // const latest = this.latestAbatement(condition);
    // if (!latest) return;
    // return this.displayTimeable(latest, "string");
  }

  // latestAbatement({ abatements }: ICondition) {
  //   const allAbatements = abatements || [];
  //   const sorted = allAbatements.sort((a: any, b: any) => {
  //     if ((a.createdAt = b.createdAt)) return 0;
  //     return a.createdAt > b.createdAt ? 1 : -1;
  //   });
  //   return sorted.pop();
  // }

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
  }
}
</script>
