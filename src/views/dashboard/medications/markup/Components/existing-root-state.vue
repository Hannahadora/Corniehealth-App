<template>
  <span
    class="flex flex-col w-full justify-center border-b border-grays font-bold mb-5 text-xl text-primary p-4 pb-2"
  >
    Markup & Discount
  </span>

  <div class="w-full py-4 flex justify-end">
    <button
      class="bg-danger text-base font-semibold rounded-lg text-white py-2 px-16"
      @click="handleEditing"
    >
      Edit
    </button>
  </div>
  <cornie-table
    :columns="headers"
    v-model="items"
    :check="false"
    :menushow="true"
    :showActions="false"
  >
    <template #location="{ item }">
      <div class="flex space-x-4">
        <p>{{ item.location }}</p>
        <p class="text-blue-600 text-xxs" v-if="item.default === true">Default</p>
        <p class="text-red-400 text-xxs" v-if="item.modifiable === true">Modified</p>
      </div>

  </template>
  </cornie-table>

  <setup-markup
    v-model="dialog"
    :locationId="locationId"
    :editing="editing"
    :markupId="markupId"
    @markup-saved="$emit('markup-saved')"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SetupMarkup from "../setup-markup.vue";
import  IMarkup  from "@/types/IMarkup";
import { namespace } from "vuex-class";
import search from "@/plugins/search";


const markup = namespace("markup");

@Options({
  name: "ExistingRootState",
  components: {
    CornieTable,
    CornieRadio,
    SetupMarkup,
  },
})
export default class ExistingRootState extends Vue {
  @Prop({ default: {} })
  headers!: any;

  @Prop({ default: {} })
  items!: any;

  @Prop({ default: "" })
  markupId!: string;

  @Prop({ default: "" })
  locationId!: string;

  @markup.State
  markups!: IMarkup[];

  dialog = false as boolean;

  editing = false as boolean;

  query = "";

  handleEditing() {
    this.editing = true;
    this.dialog = true;
  }

  //  get items() {
  //   const markups = this.markups.map((markup) => {
  //     return {
  //       ...markup,
  //       action: markup.id,

  //     };
  //   });
  //   if (!this.query) return markups;
  //   return search.searchObjectArray(markups, this.query);
  // }
}
</script>
