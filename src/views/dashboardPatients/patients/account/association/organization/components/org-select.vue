<template>
  <div class="">
    <span
      class="mb-2 w-full rounded-full"
      @click="showDatalist = !showDatalist"
    >
      <icon-input
        autocomplete="off"
        class="border border-gray-400 py-2 rounded focus:outline-blue-400"
        type="search"
        placeholder="Search"
        v-model="query"
      >
        <template v-slot:prepend>
          <search-icon />
        </template>
      </icon-input>
    </span>
    <div
      :class="[!showDatalist ? 'hidden' : 'o']"
      class="absolute shadow h-auto overflow-x-hidden bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
      style="width: 96%"
    >
      <div
        class="flex space-x-4 items-center justify-between w-full p-2"
        v-for="organization in datalist"
        :key="organization.id"
        @click="orgSelected(organization)"
      >
        <div class="flex items-center space-x-3">
          <avatar :src="localSrc" />
          <div>
            <span class="text-black text-lg mb-0">
              {{ organization.organizationName }}
            </span>
            <p class="text-sm text-gray-500">{{ organization.Id }}</p>
          </div>
        </div>
        <div>
          <cornie-radio
            name="patient"
            :modelValue="isSelected(organization)"
            @click="orgSelected(organization)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import CornieRadio from "@/components/cornieradio.vue";
import IconInput from "@/components/IconInput.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieSelect from "@/components/autocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import { IPatientOrganization } from "../types";
import { cornieClient } from "@/plugins/http";
import { watch } from "@vue/runtime-core";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { debounce, DebouncedFunc } from "lodash-es";

async function findOrganizations(query: string) {
  try {
    const { data } = await cornieClient().get(
      "/api/v1/patient-portal/employer/search",
      { query }
    );
    return data ?? [];
  } catch (error) {
    window.notify({ msg: "Unable to search", status: "error" });
  }

  return [];
}
@Options({
  components: {
    CornieRadio,
    IconInput,
    CornieBtn,
    CornieSelect,
    SearchIcon,
  },
})
export default class OrgSelect extends Vue {
  showDatalist = false;
  localSrc = require("../../../../../../../assets/img/placeholder.png");
  query = "";

  @Prop({ type: Object, default: {} })
  modelValue!: IPatientOrganization;

  @PropSync("modelValue")
  selected!: IPatientOrganization;

  datalist = [] as IPatientOrganization[];

  debouncedFindOrganization = (async (v: string) => []) as DebouncedFunc<
    (query: string) => Promise<any>
  >;

  @Watch("query")
  async findOrganizations() {
    if (!this.query) return;
    this.datalist = await this.debouncedFindOrganization(this.query);
  }

  isSelected({ id }: IPatientOrganization) {
    return this.selected.id == id;
  }
  orgSelected(org: IPatientOrganization) {
    this.selected = org;
    this.$nextTick(() => (this.showDatalist = false));
  }

  created() {
    this.debouncedFindOrganization = debounce(findOrganizations, 500);
  }
}
</script>
