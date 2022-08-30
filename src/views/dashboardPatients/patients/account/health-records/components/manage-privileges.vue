<template>
  <div  class="w-full">
    <div>
      <accordion-component
        class="text-primary"
        title="Manage Privileges"
        :opened="true"
      >
        <div class="flex flex-col">
          <div
            class="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0"
          >
            <icon-input
              autocomplete="off"
              type="search"
              v-model="query"
              placeholder="Search"
              class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
            <div>
              <cornie-select
                v-model="selectedHealthRecord"
                :label="'Select Health Record to apply'"
                :items="healthRecords"
              />
            </div>
          </div>
          <div></div>
        </div>
      </accordion-component>
    </div>
  </div>
</template>
<script lang="ts">
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import IconInput from "@/components/IconInput.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    name: "Manage Privileges",
    components: {
      ClinicalDialog,
      AccordionComponent,
      IconInput,
      SearchIcon,
      CornieRadio,
      CornieSelect,
    },
  })
  export default class managePrivileges extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    query = "";
    selectedHealthRecord = "";
    allHealthRecords = [];

    async fetchHealthRecords() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/health-record`
      );
      this.allHealthRecords = response.data;
    }

    get healthRecords() {
      const items =
        this.allHealthRecords.length > 0
          ? this.allHealthRecords.map((r: any) => ({
              code: r?.practiceName,
              value: r.id,
            }))
          : [];
      return items;
    }
  }
</script>
