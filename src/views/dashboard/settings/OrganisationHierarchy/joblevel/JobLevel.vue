<template>
  <main class="p-6">
    <empty-state
      heading="No job level recorded"
      subheading="Add new job level"
      class="mt-6"
      v-if="isEmpty"
    >
      <template #icon>
        <img src="@/assets/img/step.svg" class="inline-block mr-2" />
      </template>
      <template #actions>
        <button
          class="
            bg-danger
            rounded-full
            text-white
            py-2
            px-6
            mt-5
            focus:outline-none
            hover:opacity-90
          "
          @click="showCreateNewJobLevelDialog = true"
        >
          <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
          New Job Level
        </button>
      </template>
    </empty-state>
    <existing-state v-else />

    <cornie-dialog
      :visible="showCreateNewJobLevelDialog"
      right
      class="w-4/12 h-full"
    >
      <card class="h-full flex flex-col">
        <card-title class="bg-primary p-0">
          <icon-btn @click="showCreateNewJobLevelDialog = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
        </card-title>
        <card-text class="p-6 pb-0">
          <h1 class="text-primary text-xl font-extrabold mb-5">
            New Job Level
          </h1>
        </card-text>
        <card-text
          class="p-6 pt-0 flex-grow flex flex-col"
          style="overflow-y: auto"
        >
          <v-form class="flex-grow flex flex-col" @submit="null">
            <p class="text-danger mb-2">
              Which of these best describes the job level?
            </p>
            <div class="border-b-2 mb-6 pb-6">
              <cornie-radio
                class="ml-3 my-3"
                label="Top Management"
                value="NonSup"
                v-model="supervisoryType"
              />
              <cornie-radio
                class="ml-3 my-3"
                label="Middle Management"
                value="NonSup"
                v-model="supervisoryType"
              />
              <cornie-radio
                class="ml-3 my-3"
                label="Low Level Management"
                value="NonSup"
                v-model="supervisoryType"
              />
              <cornie-radio
                class="ml-3 my-3"
                label="Non Management"
                value="NonSup"
                v-model="supervisoryType"
              />
            </div>
            <h1 class="text-primary text-xl font-extrabold mb-5">
              Job Level Details
            </h1>
            <cornie-input
              class="w-full mb-6"
              label="Level id"
              placeholder="--Enter--"
              v-model="functionName"
            />
            <cornie-select
              class="w-full mb-6"
              label="descriptions/tags"
              placeholder="--Select--"
              v-model="hierarchy"
            />
            <span class="flex-grow" />
            <div class="flex justify-items-end">
              <span class="flex-grow"></span>
              <button
                @click="showCreateNewJobLevelDialog = false"
                class="
                  outline-primary
                  rounded-full
                  text-black
                  mr-2
                  py-2
                  px-6
                  focus:outline-none
                  outline
                  hover:bg-primary
                  hover:text-white
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
                @click="
                  isEmpty = false;
                  showCreateNewJobLevelDialog = false;
                "
              >
                Create a Job Level
              </button>
            </div>
          </v-form>
        </card-text>
      </card>
    </cornie-dialog>
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/CornieEmptyState.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/CornieRadio.vue";
import { string as yupString } from "yup";
import ExistingState from "./ExistingState.vue";

@Options({
  name: "Designations",
  components: {
    EmptyState,
    CornieDialog,
    Card,
    CardText,
    CardTitle,
    ArrowLeft,
    CornieInput,
    IconBtn,
    CornieSelect,
    CustomCheckbox,
    ExistingState,
    CornieRadio,
  },
})
export default class Functions extends Vue {
  showCreateNewJobLevelDialog = false;

  required = yupString().required();

  get isEmpty() {
    return true;
  }
}
</script>

<style>
</style>