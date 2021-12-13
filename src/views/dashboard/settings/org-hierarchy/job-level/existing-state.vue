<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-full text-white mt-2 py-2 px-5 focus:outline-none hover:opacity-90"
      >
        <span class="flex items-center w-full h-full justify-between">
          <add-icon class="fill-current text-white mr-3" />
          New Job Level
        </span>
      </button>
    </span>
    <composite-table :headers="headers" name="JobLevels" :items="jobLevels">
      <template v-slot:action>
        <table-options>
          <table-option>
            <edit-icon class="mr-2" />
            Edit
          </table-option>
          <table-option>
            <delete-icon class="mr-2" />
            Delete
          </table-option>
        </table-options>
      </template>
    </composite-table>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddIcon from "@/components/icons/add.vue";
import CompositeTable from "@/components/composite-table.vue";
import TableOptions from "@/components/table-options.vue";
import TableOption from "@/components/table-option.vue";
import EditIcon from "@/components/icons/edit.vue";
import DeleteIcon from "@/components/icons/delete.vue";

@Options({
  name: "JobLevelExistingState",
  components: {
    AddIcon,
    CompositeTable,
    TableOptions,
    TableOption,
    EditIcon,
    DeleteIcon,
  },
})
export default class ExistingState extends Vue {
  headers = [
    {
      title: "Category",
      value: "category",
      show: true,
    },
    {
      title: "Level ID",
      value: "levelId",
      show: true,
    },
    {
      title: "Description/Tag",
      value: "tag",
      show: true,
    },
  ];
  jobLevels = [
    {
      category: "Managemet",
      levelId: "1",
      tag: "Upper",
      action: "1",
    },
    {
      category: "Managemet",
      levelId: "1",
      tag: "Upper",
      action: "1",
    },
  ];
}
</script>
