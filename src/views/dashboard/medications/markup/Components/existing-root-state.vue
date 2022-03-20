<template>
  <span
    class="flex flex-col w-full justify-center border-b border-grays font-bold mb-5 text-xl text-primary p-4 pb-2"
  >
    Markup & Discount
  </span>

  <div class="w-full py-4 flex justify-end">
    <button
      class="bg-danger text-base font-bold rounded text-white py-2 px-24"
      @click="
        $router.push(`/dashboard/provider/settings/markup-settings/${markupId}`)
      "
    >
      Edit
    </button>
  </div>
  <cornie-table
    :columns="headers"
    v-model="items"
    :check="false"
    :showActions="false"
  >
  </cornie-table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieRadio from "@/components/cornieradio.vue";

@Options({
  name: "ExistingRootState",
  components: {
    CornieTable,
    CornieRadio,
  },
})
export default class ExistingRootState extends Vue {
  @Prop({ default: {} })
  headers!: any;

  @Prop({ default: {} })
  items!: any;

  @Prop({ default: "" })
  markupId!: string;
}
</script>
