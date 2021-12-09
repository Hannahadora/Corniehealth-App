<template>
  <div class="w-full pb-7">
    <div style="height: 300px">
      <accordion-component
        class="shadow rounded-lg border-none text-primary mt-5"
        title="Remind me to..."
        :opened="true"
      >
        <div>
          <v-form>
            <div class="mt-3 w-full flex">
              <span class="mr-3">All-day</span><cornie-radio value="range" />
            </div>
            <div class="mt-3 w-full flex">
              <div class="pt-6 flex" style="margin-left: 6px">
                <div class="pt-6 flex w-1/2" style="margin-top: -20px">
                  <div>
                    <div class="w-full mb-3">
                      <date-time-picker
                        label="last occurence"
                        width="w-11/12"
                        class="required"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-6.5 pl-5 flex" style="">
                  <cornie-select placeholder="Days" :items="severities" />
                </div>
              </div>
            </div>
          </v-form>
          <div class="mt-2 flex justify-end">
            <delete-icon class="mr-2 fill-current text-danger" />
          </div>
        </div>
      </accordion-component>
    </div>
    <div class="mt-5">
      <accordion-component
        class="shadow rounded-lg border-none text-primary mt-5"
        title="Remind me to..."
        :opened="true"
      >
        <div>
          <v-form>
            <div class="mt-3 w-full flex">
              <span class="mr-3">All-day</span><cornie-radio value="range" />
            </div>
            <div class="mt-3 w-full flex">
              <div class="pt-6 flex" style="margin-left: 6px">
                <div class="pt-6 flex w-1/2" style="margin-top: -20px">
                  <div>
                    <div class="w-full mb-3">
                      <date-time-picker
                        label="last occurence *"
                        width="w-11/12"
                        class="required"
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-8 pl-5 flex" style="">
                  <cornie-select placeholder="Days" :items="severities" />
                </div>
              </div>
            </div>
          </v-form>
          <div class="mt-2 flex justify-end">
            <delete-icon class="mr-2 fill-current text-danger" />
            <!-- <button
              class="
                bg-danger
                rounded-full
                text-white
                py-2
                px-6
                focus:outline-none
                hover:opacity-90
              "
            >
              <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
              Save
            </button> -->
          </div>
        </div>
      </accordion-component>
    </div>
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

import AccordionComponent from "@/components/dialog-accordion.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";

import CornieSelect from "@/components/cornieselect.vue";
import CalendarIcon from "@/components/icons/acalendar.vue";
import DateTimePicker from "./datetime-picker.vue";
import PlusIcon from "@/components/icons/add.vue";

const level = namespace("OrgLevels");

@Options({
  name: "JobLevelExistingState",
  components: {
    CornieTable,
    DeleteIcon,
    EditIcon,
    AddLevel,

    AccordionComponent,
    CustomCheckbox,
    CornieInput,
    CornieRadio,
    CornieSelect,
    CalendarIcon,
    DateTimePicker,
    PlusIcon,
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  levels!: LevelCollection[];

  levelForEdit = {} as LevelCollection;
  editingLevel = false;

  @level.Action
  removeLevel!: (id: string) => Promise<void>;

  severities = ["Every Day", "Every Week", "Custom"];
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
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
