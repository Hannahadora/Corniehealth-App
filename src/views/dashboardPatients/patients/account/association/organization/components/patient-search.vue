<template>
  <search-input :results="results" v-model="query" @selected="selected" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchInput from "@/components/search-input.vue";
import { cornieClient } from "@/plugins/http";
import { IPatient } from "@/types/IPatient";
import { PropSync, Watch } from "vue-property-decorator";

@Options({
  name: "PatientSearch",
  components: {
    SearchInput,
  },
})
export default class PatientSearch extends Vue {
  @PropSync("modelValue")
  modelValueSync!: IPatient;

  results = [] as { value: IPatient; display: string }[];
  query = "";

  setResults(results: IPatient[]) {
    this.results = results.map((result) => ({
      value: result,
      display: `${result.firstname} ${result.lastname}`,
    }));
  }
  @Watch("query")
  async findPatients() {
    if (!this.query) return;
    try {
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/association/search-patient",
        { patientName: this.query }
      );
      this.setResults(data);
    } catch (error) {
      window.notify({ msg: "An error occured", status: "error" });
    }
  }

  selected(item: any) {
    this.modelValueSync = item.value;
  }
}
</script>
