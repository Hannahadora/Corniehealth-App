<template>
  <auto-complete
    v-bind="$attrs"
    v-model="practitioner"
    :filter="filter"
    :items="items"
  >
    <template #item="{ item }">
      <div class="w-full flex items-center my-1 justify-between">
        <div class="flex items-center">
          <avatar :src="item.image" />
          <div class="flex ml-1 flex-col">
            <span class="text-xs">{{ item.display }}</span>
          </div>
        </div>
        <span class="text-xs font-semibold text-gray-500">
          {{ item.department }}
        </span>
      </div>
    </template>
  </auto-complete>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { Prop, PropSync } from "vue-property-decorator";
import { printPractitioner } from "@/plugins/utils";

const practitioners = namespace("practitioner");

@Options({
  name: "PractitionerSelect",
  components: {
    Avatar,
    AutoComplete,
  },
})
export default class PractitionerSelect extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  practitioner!: string;

  @practitioners.State
  practitioners!: IPractitioner[];

  @practitioners.Action
  fetchPractitioners!: () => Promise<void>;

  filter(practitioner: IPractitioner, query: string) {
    const name =
      `${practitioner.firstName} ${practitioner.lastName}`.toLowerCase();
    const department = practitioner.department?.toLowerCase() || " ";
    const searchParam = query.toLowerCase();
    return department.includes(searchParam) || name.includes(searchParam);
  }

  get items() {
    return this.practitioners.map((practitioner) => ({
      ...practitioner,
      code: practitioner.id,
      display: printPractitioner(practitioner),
    }));
  }

  created() {
    if (!this.practitioners?.length) this.fetchPractitioners();
  }
}
</script>
