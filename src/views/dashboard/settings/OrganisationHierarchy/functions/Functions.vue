<template>
  <main class="p-6">
    <div class="flex justify-items-end">
      <span class="flex-grow"></span>
    </div>
    <empty-state
      heading="No function recorded"
      v-if="isEmpty"
    >
      <template #icon>
        <img src="@/assets/img/functions.svg" class="inline-block mr-2" />
      </template>
      <template #actions>
        <div class="mt-2">
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
            @click="showNewFunctionDialog = true"
          >
            <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
            New Function
          </button>
          <button
            @click="$router.back()"
            class="
              border-primary
              border-2
              rounded-full
              text-black
              ml-2
              py-2
              px-6
              focus:outline-none
              outline
              hover:bg-primary
              hover:text-white
            "
          >
            View Org. Structure
          </button>

        </div>
      </template>
    </empty-state>
    <existing-state v-else />
    <cornie-dialog :visible="showNewFunctionDialog" right class="w-4/12 h-full">
      <card class="h-full flex flex-col">
        <card-title class="bg-primary">
          <icon-btn @click="showNewFunctionDialog = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
        </card-title>
        <card-text class="p-6 flex-grow flex flex-col">
          <v-form class="flex-grow flex flex-col" @submit="null">
            <h1 class="text-primary text-xl font-extrabold mb-5">
              New Function
            </h1>
            <cornie-input
              class="w-full mb-6"
              label="function name"
              placeholder="--Enter--"
              v-model="functionName"
            />
            <div class="mb-6">
              <cornie-select
                class="w-full"
                label="Hierarchy"
                placeholder="--Select--"
                v-model="hierarchy"
              />
            </div>
            <cornie-select
              class="w-full"
              label="supervisory function"
              placeholder="--Select--"
              v-model="supervisoryFunction"
            />
            <span class="flex-grow"></span>
            <custom-checkbox
              label="Automatically create a group for this function"
            />

            <div class="flex justify-items-end">
              <span class="flex-grow"></span>
              <button
                @click="showNewFunctionDialog = false"
                class="
                  border-primary
                  border-2
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
                  showNewFunctionDialog = false;
                "
              >
                Create Function
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
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { string as yupString } from "yup";
import ExistingState from "./ExistingState.vue";

@Options({
  name: "Functions",
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
  },
})
export default class Functions extends Vue {
  showNewFunctionDialog = false;

  required = yupString().required();

  isEmpty = true;
}
</script>

<style>
</style>