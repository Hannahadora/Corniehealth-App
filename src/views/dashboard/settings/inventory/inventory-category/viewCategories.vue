<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" width="40%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <div class="flex flex-col">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              Inventory Category(s)
            </h2>
            <p class="text-xxs text-white">Edit or Remove Inventory Category(s) </p>
          </div>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
        </div>
      </cornie-card-title>

      <cornie-card-text>
        <div class="flex flex-col space-y-4">
          <div class="flex">
            <div class="flex-1">
              <div class="flex flex-col">

              </div>
            </div>
            <div class="flex-none"></div>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string } from "yup";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";

@Options({
  name: "Inventory Modal",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
  }
})

export default class InventoryModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  name = ''
  description = ''
  location = ''
  required = string().required();
  loading = false

  async submit() {
    this.loading = true;
    // if (this.id) await this.updateRequest();
    // else await this.createRequest();
    // this.loading = false;
    console.log('submit')
    this.loading = false
  }
}
</script>