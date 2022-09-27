<template>
  <clinical-dialog
    v-model="show"
    title="Add a Practice"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-5">
      <!-- <search-input @selected="selected" :results="results" v-model="query" /> -->
      <auto-complete
        class="w-full"
        v-model="organisationId"
        :items="results"
        placeholder="Enter"
        @query="queryChanged"
      />

      <div>
        <cornie-select
          v-model="selectedHealthRecord"
          :label="'Select Health Record to apply'"
          :items="healthRecords"
        />
      </div>
      <div>
        <cornie-checkbox
          v-model="createNew"
          value="true"
          label="Create a new Health Record for this practice"
        />
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-1 px-6 py-2 bg-white">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :disabled="!organisationId"
          :loading="loading"
          @click="add"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Add
        </cornie-btn>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import AutoComplete from "@/components/autocomplete.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import SearchInput from "@/components/search-input.vue";
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { debounce, DebouncedFunc } from "lodash";
  import { Options, Vue } from "vue-class-component";
  import { PropSync, Watch } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      SearchInput,
      CornieCheckbox,
      CornieSelect,
      AutoComplete,
    },
  })
  export default class addPractice extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    query = "";
    createNew = false;
    selectedHealthRecord = "";
    allHealthRecords = [];
    organisationId = "";
    recordId = "";
    loading = false;

    get healthRecords() {
      const items =
        this.allHealthRecords.length > 0
          ? this.allHealthRecords.map((r: any) => ({
              display: r?.organization?.name,
              code: r.id,
            }))
          : [];
      return items;
    }

    searchResults = [];

    debouncedSearch!: DebouncedFunc<(q: string) => Promise<any[]>>;

    selected(item: any) {
      // this.$emit("selected", item);
      console.log("picked selected", item);
      this.organisationId = item?.id;
    }
    get results() {
      return this.searchResults.map((r: any) => ({
        code: r.id,
        display: r.name,
      }));
    }
    async fetchPractice(practice: string) {
      const response = await cornieClient().get(
        `/api/v1/utils/practice/search?query=${practice}`
      );
      console.log("search practice", response.data);
      this.searchResults = response.data;
    }

    async fetchHealthRecords() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/health-record`
      );
      console.log("dataaa", response.data);
      this.allHealthRecords = response.data;
    }
    @Watch("query")
    async queryChanged(query: string) {
      if (!query) this.debouncedSearch.cancel();
      this.debouncedSearch(query);
    }

    async search(query: string) {
      if (!query) return [] as any[];
      try {
        this.fetchPractice(query);
      } catch (error) {
        window.notify({ msg: "Couldn't reach the server", status: "error" });
      }
    }

    async add() {
      if (!this.organisationId) return;
      this.loading = true;
      try {
        const response = await cornieClient().post(
          `/api/v1/patient-portal/provider-permission/add-practice`,
          {
            recordId: this.selectedHealthRecord || undefined,
            organizationId: this.organisationId,
          }
        );
        console.log("Added practice", response.data);
        window.notify({ msg: "successful", status: "success" });
        this.loading = false;
        this.show = false;
      } catch (error) {
        this.loading = false;
        console.log("error adding practice", error);
        window.notify({ msg: "Error adding practice", status: "error" });
      }
    }

    async mounted() {
      await this.fetchHealthRecords();
      this.debouncedSearch = debounce(this.search, 700);
    }
  }
</script>
