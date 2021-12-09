<template>
  <div class="w-full pb-7">
   
      <accordion-component
        class="shadow rounded-sm border-none text-primary mt-5"
        title="Calendar"
        :opened="true"
      >
        <div>
          <v-form>
            <div class="w-full mt-8">
              <div class="flex space-x-10 w-full">
                <span class="text-sm text-black mt-3">Online Booking Requirements:</span>
                <div class="flex space-x-2">
                  <cornie-select placeholder="10" class="w-20" :items="['1','10']" />
                  <cornie-select placeholder="Days" class="w-20" :items="['1','10']" />
                </div>
                  <span class="text-sm text-black mt-3">Ahead</span>
              </div>
              <div class="flex space-x-10 w-full">
                <span class="text-sm text-black mt-3 pr-20">Show availability:</span>
                <div class="flex space-x-2">
                  <cornie-select placeholder="10" class="w-20" :items="['1','10']" />
                  <cornie-select placeholder="Days" class="w-20" :items="['1','10']" />
                </div>
                  <span class="text-sm text-black mt-3">Ahead</span>
              </div>

            </div>
            <div class="w-full mt-8">
              <div class="flex space-x-10">
                <span class="text-sm text-black">Booking Notification:</span>
                <span class="text-sm text-danger font-semibold">Send Notifications To</span>
              </div>
              <div class="flex space-x-10 w-full mt-5">
                <div>
                    <span class="text-sm font-semibold mb-5 text-black">Practice Email:</span>
                    <div class="flex space-x-4 w-full mt-3">
                      <cornie-radio label="Yes" checked name="notify"/>
                      <cornie-radio label="No"  name="notify"/>
                    </div>
                </div>
                <div>
                    <span class="text-sm font-semibold mb-5 text-black">All added Participants:</span>
                     <div class="flex space-x-4 w-full mt-3">
                      <cornie-radio label="Yes" checked name="notify"/>
                      <cornie-radio label="No"  name="notify"/>
                    </div>
                </div>
              </div>

            </div>
              <cornie-card>
        <cornie-card-text class="flex justify-end pb-12">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>  
          </v-form>

        </div>
      </accordion-component>
   
      <accordion-component
        class="shadow rounded-sm border-none text-primary mt-5"
        title="Preferences"
        :opened="true"
      >
        <div>
          <v-form>
            <div class="w-full">
              <div class="flex space-x-10 w-full mt-8">
                   <date-time-picker
                        label="Appointment time hold limit"
                        class="w-full"
                    />
                    <div class="w-full">
                      <span class="text-sm text-black font-semibold">Show cancelled appointment in calendar</span>
                        <div class="flex space-x-4 mt-4">
                            <cornie-radio lablel="Yes" checked name="calendar"/>
                            <cornie-radio lablel="No" name="calendar"/>
                        </div>
                    </div>
              </div>
              <div class="flex space-x-10 w-full mt-8">
                   <cornie-input class="w-20" label="Waitlist threshhold (% of Set Capacity)" placeholder="25" value="25" />
                    <div>
                      <span class="text-sm text-black font-semibold">Show waitlist in calendar</span>
                        <div class="flex space-x-4 mt-4">
                            <cornie-radio lablel="Yes" checked name="calendar"/>
                            <cornie-radio lablel="No" name="calendar"/>
                        </div>
                    </div>
              </div>
            </div>
            <cornie-card>
        <cornie-card-text class="flex justify-end pb-12">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card> 
          </v-form>
         

        </div>
      </accordion-component>
   
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
  name: "CalenderPrefrence",
  components: {
    CornieTable,
    DeleteIcon,
    EditIcon,

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
