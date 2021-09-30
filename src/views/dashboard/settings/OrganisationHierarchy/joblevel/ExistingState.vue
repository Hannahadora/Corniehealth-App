<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-5">
      <cornie-btn class="bg-danger py-2 text-white m-5">
        <plus-icon class="mr-2 fill-current text-white" />
        New Job Level
      </cornie-btn>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
    </cornie-table>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import { namespace } from "vuex-class";

@Options({
  components: {
    CornieTable,
  },
})
export default class CarePartnersExistingState extends Vue {
  items = [];
  rawHeaders = [
    {
      title: "Function Name",
      value: "functionName",
      show: true,
    },
    {
      title: "Hierarchy",
      value: "hierarchy",
      show: true,
    },
    {
      title: "Supervisory Function",
      value: "supervisoryFunction",
      show: true,
    },
  ];
}
</script>
