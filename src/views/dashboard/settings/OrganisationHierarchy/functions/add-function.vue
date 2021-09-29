<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
      </cornie-card-title>
      <cornie-card-text class="p-4 flex-grow flex flex-col">
        <v-form class="flex-grow flex flex-col" @submit="null">
          <h1 class="text-primary text-xl font-extrabold mb-5">New Function</h1>
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
              :items="hierarchies"
            />
          </div>
          <cornie-select
            class="w-full"
            label="supervisory function"
            placeholder="--Select--"
            v-model="supervisoryFunction"
          />
          <custom-checkbox
            label="Automatically create a group for this function"
          />
          <span class="flex-grow"></span>
          <div class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="
                border-primary border-2
                rounded-full
                text-black
                mr-2
                py-1
                px-2
                focus:outline-none
                outline
                hover:bg-primary
                hover:text-white
              "
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              type="submit"
              class="
                bg-danger
                rounded-full
                text-white
                py-1
                px-6
                focus:outline-none
                hover:opacity-90
              "
            >
              Save
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>
    </card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";

@Options({
  name: "AddFunction",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
  },
})
export default class AddFunction extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  hierarchies = ["Upper Management", "Middle Management", "Admin"];
  functionName = "";
  hierarchy = "";
  supervisoryFunction = "";
}
</script>
