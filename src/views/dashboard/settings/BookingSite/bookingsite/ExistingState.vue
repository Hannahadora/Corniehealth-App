<template>
  <div class="w-full pb-7 h-full">
    <div class="bg-white p-3 shadow-md">
        <span
            class="
              flex
              mt-5
              border-b-2
              w-full
              font-bold
            text-primary
              py-2
              mx-auto
              text-sm
            "
          >
            Booking Site Control
          </span>
          <div class="mt-10 p-5">
            <span class="text-xs text-black font-semibold">Enable Booking Site:</span>
            <div class="flex space-x-3 mt-4 w-1/2">
              <cornie-radio
                name="bookingsite"
                v-model="type"
                label="Yes"
                value="yes"
                checked
              />
              <cornie-radio name="bookingsite2" v-model="type" value="No" label="No" />
            </div>
          </div>
            <div class="grid grid-cols-2 field gap-3 w-full p-5">
              <domain-input
                    label="URL:"
                    placeholder="--Enter--"
                    :rules="requiredRule"
                    :modelValue="orgValue"   
                />
                <div class="flex space-x-4 w-full">
                  <span class="flex space-x-1 text-sm font-semibold text-primary"><copyform-icon/> <span>Copy</span></span>
                  <span class="flex space-x-1 text-sm font-semibold text-primary"><share-icon class="fill-current text-primary"/> <span>Share</span> </span>
                </div>
            </div>
            <div class="grid grid-cols-3 field gap-3 mt-4 2-full">
              </div>
      </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DomainInput from "@/components/newdomaininput.vue";
import { Prop } from "vue-property-decorator";
import { LevelCollection, Tag } from "@/types/ILevel";
import DeleteIcon from "@/components/icons/delete.vue";
import CopyformIcon from '@/components/icons/formcopy.vue';
import EditIcon from "@/components/icons/edit.vue";
import ShareIcon from "@/components/icons/newshare.vue";
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
    DomainInput,
    ShareIcon,
    CopyformIcon
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  levels!: LevelCollection[];

  levelForEdit = {} as LevelCollection;
  editingLevel = false;
  type = "";

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
