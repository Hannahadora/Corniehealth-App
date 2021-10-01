<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <card height="100%" class="h-full flex flex-col bg-white overflow-y-auto">
      <card-title class="p-0">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
      </card-title>
      <card-text class="p-6 pt-0 pb-0">
        <h1 class="text-primary text-xl font-extrabold mb-5">New Job Level</h1>
      </card-text>
      <card-text
        class="p-6 pt-0 flex-grow flex flex-col"
        style="overflow-y: auto"
      >
        <v-form class="flex-grow flex flex-col" @submit="null">
          <p class="text-danger mb-2">
            Which of these best describes the job level?
          </p>
          <div class="border-b-2 mb-6 pb-6 grid grid-cols-2 gap-y-1">
            <cornie-radio
              class="ml-3 my-3"
              name="type"
              label="Top Management"
              value="top-management"
              v-model="supervisoryType"
            />
            <cornie-radio
              class="ml-3 my-3"
              label="Middle Management"
              value="middle-management"
              name="type"
              v-model="supervisoryType"
            />
            <cornie-radio
              class="ml-3 my-3"
              label="Low Level Management"
              value="low-level-management"
              name="type"
              v-model="supervisoryType"
            />
            <cornie-radio
              class="ml-3 my-3"
              label="Non Management"
              value="non-management"
              name="type"
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
            v-model="levelId"
          />
          <cornie-select
            class="w-full mb-6"
            label="descriptions/tags"
            placeholder="--Select--"
            v-model="tags"
          />
          <span class="flex-grow" />
          <div class="flex justify-end">
            <span class="flex-grow"></span>
            <button
              @click="show = false"
              class="
                border-primary
                rounded-full
                text-black
                mr-2
                py-2
                px-6
                border
                focus:outline-none
                outline
                hover:bg-primary
                hover:text-white
              "
            >
              Cancel
            </button>
            <button
              type="submit"
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
              Create a Job Level
            </button>
          </div>
        </v-form>
      </card-text>
    </card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "AddLevel",
  components: {
    CornieDialog,
    Card,
    CardText,
    CardTitle,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieRadio,
  },
})
export default class AddLevel extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: string;

  levelId = "";
  tags = [];
  supervisoryType = "";
}
</script>
