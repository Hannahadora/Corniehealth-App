<template>
  <div class="w-full pb-7">
    <span
        class="
          flex
          mt-5
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
          booking-font
        "
      >
        Booking Site Control
      </span>
  </div>
 <div class="grid grid-cols-3 gap-2 mt-4 w-1/2">
      <cornie-radio
        :name="name"
        v-model="type"
        label="Yes"
        value="yes"
      />
      <cornie-radio :name="name" v-model="type" value="no" label="No" />
    </div>
    <div class="grid grid-cols-3 field gap-3 mt-4 w-full">
          <cornie-input
            class="w-full mb-6"
            label=" URL:"
            placeholder="http:practiceform"
            v-model="functionName"
            :rules="required"
          />
          <cornie-input
            class="w-11 mb-5 input-color"
            placeholder="--Enter--"
            v-model="functionName"
            :rules="required"
          />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
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
    CornieRadio,
    CornieInput,
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
    console.log("Editing ", id);
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

<style scoped>
.booking-font{
  font-size: 20px;
}

.field{
  align-items: end;
}

.input-color{
  background-color: red !important;
}
</style>
