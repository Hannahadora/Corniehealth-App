<template>
  <!-- <div class="w-full py-4 flex justify-end">
    <button
      class="bg-danger text-base font-semibold rounded-lg text-white py-2 px-16"
      @click="handleEditing"
    >
      Edit
    </button>
  </div> -->
  <div class="w-full  py-3 my-4 bg-gray-100 text-xs text-center rounded-md" v-if="markups.length == 1">
   Your Account Owner/Root Admin has set up the Markup and Allowable Discount shown below. You may wish to revise them for your own location. To revise, click on the edit tab to modify.
  </div>
  <div class="w-full py-4 flex justify-end">
    <cornie-table
      :columns="headers"
      v-model="items"
      :check="false"
      :listmenu="true"
      :menushow="false"
      :showActions="true"
      :editRow="true"
      @edit="editMarkup"
    >
      <template #location="{ item }">
        <div class="flex space-x-4">
          <p>{{ item.location }}</p>
          <p class="text-blue-600 text-xxs" v-if="item.default === true">Default</p>
          <p class="text-red-400 text-xxs" v-if="item.modifiable === true">Modified</p>
        </div>
    </template>
    </cornie-table>
  </div>

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
import EditIcon from "@/components/icons/edit.vue";
import search from "@/plugins/search";


const markup = namespace("markup");

@Options({
  name: "ExistingRootState",
  components: {
    CornieTable,
    CornieRadio,
    SetupMarkup,
    EditIcon
  },
})
export default class ExistingRootState extends Vue {
  @Prop({ default: {} })
  headers!: any;

  @Prop({ default: {} })
  items!: any;

  // @Prop({ default: "" })
  // markupId!: string;

  @Prop({ default: "" })
  locationId!: string;

  @markup.State
  markups!: IMarkup[];

  dialog = false as boolean;

  editing = false as boolean;

  query = "";

  markupId = "";

  editMarkup(id:string){
    this.markupId = id;
     this.editing = true;
    this.dialog = true;
  }

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
