<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-5">
      <cornie-btn
        class="bg-danger py-2 text-white m-5"
        @click="editingLevel = true"
      >
        <plus-icon class="mr-2 fill-current text-white" />
        New Job Level
      </cornie-btn>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="editLevel(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <delete-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    <add-level v-model="editingLevel" :level="levelForEdit" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { Prop } from "vue-property-decorator";
import { LevelCollection, Tag } from "@/types/ILevel";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddLevel from "./add-level.vue";
import { namespace } from "vuex-class";

const level = namespace("OrgLevels");

@Options({
  name: "JobLevelExistingState",
  components: {
    CornieTable,
    DeleteIcon,
    EditIcon,
    AddLevel,
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  levels!: LevelCollection[];

  levelForEdit = {} as LevelCollection;
  editingLevel = false;

  @level.Action
  removeLevel!: (id: string) => Promise<void>;

  rawHeaders = [
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Level ID",
      key: "levelId",
      show: true,
    },
    {
      title: "Description/Tag",
      key: "tags",
      show: true,
    },
  ];

  get items() {
    return this.levels.map((level: any) => ({
      category: level.category?.name,
      levelId: level.name,
      tags: this.printTags(level.tags),
      id: level.id,
    }));
  }

  printTags(tags: Tag[]) {
    const tagNames = tags.map((tag) => tag.name);
    return tagNames.join(", ");
  }

  editLevel(id: string) {
    ;
    const level = this.levels.find((level) => level.id == id);
    if (!level) return;
    this.levelForEdit = level;
    this.editingLevel = true;
  }

  remove(id: string) {
    this.removeLevel(id);
  }
}
</script>
