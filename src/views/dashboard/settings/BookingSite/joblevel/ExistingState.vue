<template>
  <div class="w-full pb-7">
    <div style="height: 400px">
      <accordion-component
        class="shadow rounded-lg border-none text-primary mt-5"
        title="Calender"
        :opened="true"
      >
        <div>
          <v-form>
            <div class="mt-3 w-full flex">
              <div
                class="
                  text-xs text-gray-25
                  py-10
                  px-10
                  inline-block
                  align-middle
                "
              >
                Online Booking Requirements:
              </div>

              <div class="pt-6 flex" style="margin-left: 6px">
                <!-- <div class="pr-1">
                  <input
                    type="text"
                    placeholder="30"
                    class="
                      pr-2
                      text-center
                      placeholder-black
                      font-bold font-black
                      outline-none
                      border border-blue-lighter
                      rounded-xs
                      h-12
                      w-12
                    "
                  />
                  </div> -->
                <div class="pt-6 flex" style="width: 70px; margin-top: -20px">
                  <cornie-select placeholder="30" />
                </div>

                <div class="pt-6 flex" style="width: 70px; margin-top: -20px">
                  <cornie-select placeholder="Days" :items="severities" />
                </div>
              </div>

              <div
                class="
                  text-xs text-gray-25
                  py-10
                  px-9
                  inline-block
                  align-middle
                "
              >
                Ahead
              </div>
            </div>

            <div class="mt-3 w-full flex">
              <div
                class="
                  text-xs text-gray-25
                  py-6
                  px-10
                  inline-block
                  align-middle
                "
              >
                Show Availability:
              </div>

              <div class="pl-20 pt-1 flex">
                <div class="pt-6 flex" style="width: 70px; margin-top: -20px">
                  <cornie-select placeholder="30" />
                </div>

                <div class="pt-6 flex" style="width: 70px; margin-top: -20px">
                  <cornie-select placeholder="Days" :items="severities" />
                </div>

                <!-- <div class="pr-1">
                  <input
                    type="text"
                    placeholder="30"
                    class="
                      pr-2
                      text-center
                      placeholder-black
                      font-bold font-black
                      outline-none
                      border border-blue-lighter
                      rounded-xs
                      h-12
                      w-12
                    "
                  />
                   </div>
                  <input
                    type="text"
                    placeholder="Days"
                    class="
                      text-center
                      placeholder-black
                      font-bold font-black
                      outline-none
                      border border-blue-lighter
                      rounded-xs
                      h-12
                      w-12
                    "
                  /> -->
              </div>

              <div
                class="text-xs text-gray-25 py-5 px-7 inline-block align-middle"
              >
                Ahead
              </div>
            </div>

            <div class="mt-5 w-full flex">
              <div class="text-sm text-gray-25 px-10 inline-block align-middle">
                Booking Notification:
              </div>

              <div class="text-sm text-red-600 px-9">Send Notifications To</div>
            </div>

            <div class="w-full flex">
              <div>
                <p class="text-xs font-bold text-gray-25 px-10 py-3">
                  Practice Email:
                </p>

                <div class="flex ml-10">
                  <div class="mr-2">
                    <cornie-radio
                      class="icon-check-mark3 bg-white rounded-full"
                      label="yes"
                      modelValue="true"
                    />
                  </div>

                  <cornie-radio
                    class="icon-check-mark3 bg-white rounded-full"
                    label="no"
                    modelValue="true"
                  />
                  <!-- <div class="flex mr-2">
                  <custom-checkbox label="Yes"/>
                  </div>
                  <div class="flex mr-2">
                  <custom-checkbox label="No" />
                  </div> -->
                </div>
              </div>

              <div class="px-12">
                <p class="text-xs font-bold text-gray-25 px-10 py-3">
                  All Added Participants:
                </p>

                <div class="flex ml-10">
                  <div class="mr-2">
                    <cornie-radio
                      class="icon-check-mark3 bg-white rounded-full"
                      label="yes"
                      modelValue="true"
                    />
                  </div>

                  <cornie-radio
                    class="icon-check-mark3 bg-white rounded-full"
                    label="no"
                    modelValue="true"
                  />
                  <!-- <div class="flex mr-2">
                  <custom-checkbox label="Yes"/>
                  </div>
                  <div class="flex mr-2">
                  <custom-checkbox label="No" />
                  </div> -->
                </div>
              </div>
            </div>
          </v-form>
          <div class="mt-2 flex justify-end">
            <button
              class="
                border-primary border-2
                rounded-full
                text-black
                ml-2
                py-2
                px-6
                mx-4
                focus:outline-none
                outline
                hover:bg-primary hover:text-white
              "
            >
              Cancel
            </button>
            <button
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
            </button>
          </div>
        </div>
      </accordion-component>
    </div>
    <div class="mt-5">
      <accordion-component
        class="shadow rounded-lg border-none text-primary mt-5"
        title="Preferences"
        :opened="true"
      >
        <div class="mt-5 flex ml-10">
          <div>
            <div>
              <p class="text-xs font-bold text-gray-25">
                Appointment time hold limit:
              </p>
            </div>
            <div class="flex">
              <cornie-input class="w-1/2 mr-5" readonly style="width: 18em">
                <template #prepend-inner>
                  <calendar-icon
                    class="cursor-pointer"
                    @click="toggleDropdown"
                  />
                  <input type="time" class="w-full p-2 outline-none" />
                </template>
                <template #append-inner>
                  <slot name="time" />
                </template>
              </cornie-input>
            </div>
          </div>

          <div class="ml-10">
            <p class="text-xs font-bold text-gray-25">
              Show cancelled appointment in calenders
            </p>

            <div class="flex my-3">
              <div class="mr-2">
                <cornie-radio
                  class="
                    icon-check-mark3
                    rounded-full
                    color-danger
                    text-danger-25
                  "
                  label="yes"
                  modelValue="true"
                />
              </div>

              <cornie-radio
                class="icon-check-mark3 bg-white rounded-full"
                label="no"
                modelValue="true"
              />
              <!-- <custom-checkbox label="Yes" />
            <custom-checkbox label="No" /> -->
            </div>
          </div>
        </div>

        <div class="mt-3 flex ml-10">
          <div>
            <div>
              <p class="text-xs font-bold text-gray-25">
                Waitlist threshhold(% of Set Capacity)
              </p>
            </div>
            <div class="flex">
              <cornie-input class="w-full pr-1" readonly placeholder="25">
              </cornie-input>
              <cornie-input
                class=""
                readonly
                placeholder="%"
                style="width: 15%"
              >
              </cornie-input>
            </div>
          </div>

          <div style="margin-left: -9em">
            <p class="text-xs font-bold text-gray-25">
              All Added Participants:
            </p>

            <div class="flex my-3">
              <div class="mr-2">
                <cornie-radio
                  class="icon-check-mark3 bg-white rounded-full"
                  label="yes"
                  modelValue="true"
                />
              </div>

              <cornie-radio
                class="icon-check-mark3 bg-white rounded-full"
                label="no"
                modelValue="true"
              />
              <!--            
            <custom-checkbox label="Yes" />
            <custom-checkbox label="No" /> -->
            </div>
          </div>
        </div>
      </accordion-component>
    </div>
    <add-level v-model="editingLevel" :level="levelForEdit" />
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
    <div class="grid grid-cols-2 field gap-3 mt-4 w-full">
      <domain-input
            label="Domain Name"
            placeholder="--Enter--"
            :rules="requiredRule"
             :modelValue="orgValue"
            
          />
    </div>
    <div class="grid grid-cols-3 field gap-3 mt-4 2-full">
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
import AddLevel from "./add-level.vue";
import { namespace } from "vuex-class";

import AccordionComponent from "@/components/dialog-accordion.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";

import CornieSelect from "@/components/cornieselect.vue";
import CalendarIcon from "@/components/icons/acalendar.vue";


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

    AccordionComponent,
    CustomCheckbox,
    CornieSelect,
    CalendarIcon,
    DomainInput,
    CopyformIcon
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  levels!: LevelCollection[];

  levelForEdit = {} as LevelCollection;
  editingLevel = false;

  @level.Action
  removeLevel!: (id: string) => Promise<void>;

  // severities = ["Days", "Weeks", "Years", "Decades"];
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
