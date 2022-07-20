<template>
  <div class="w-full p-2 bg-gray-100 text-xs text-center rounded-md">
    Your Account Owner/Root Admin has set up the Markup and Allowable Discount
    shown below. You may wish to revise them for your own location. To revise,
    click on the edit tab to modify.
  </div>

  <!-- <div class="w-full py-4 flex justify-end">
    <button
      class="bg-danger text-base font-bold rounded text-white py-2 px-24"
      @click="
        $router.push(`/dashboard/provider/settings/markup-settings/${markupId}`)
      "
    >
      Edit
    </button>
  </div> -->
  <cornie-table
    :columns="headers"
    v-model="items"
    :check="false"
      :listmenu="true"
      :menushow="false"
      :showActions="true"
      :editRow="true"
  >
  </cornie-table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieRadio from "@/components/cornieradio.vue";

@Options({
  name: "ExistingStateUser",
  components: {
    CornieTable,
    CornieRadio,
  },
})
export default class ExistingStateUser extends Vue {
  @Prop({ default: {} })
  headers!: any;

  @Prop({ default: "" })
  markupId!: string;

  @Prop({ default: {} })
  items!: any;

  locationAdminsCanSetForLocations = "";
}
</script>
