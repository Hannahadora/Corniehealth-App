<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/12">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
        <cornie-card-title class="">
        <icon-btn @click="show = false" >
          <arrow-left stroke="#ffffff"/>
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Beneficial Owners
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

  <cornie-card-text class="flex-grow scrollable">
      <div class="w-full my-4">
        <cornie-input
          :label="'Name'"
          v-model="owner.name"
          style="width: 100%"
          placeholder="--Enter--"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input
          :label="'Percentage'"
          v-model="owner.percentage"
          style="width: 100%"
            placeholder="Enter in %"
        />
      </div>
  </cornie-card-text>
       <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="onSave"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { IBeneficialOwner } from "../index.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";


@Options({
  components: {
    ArrowLeft,
    CornieInput,
     ...CornieCard,
    CornieDialog,
    IconBtn
  },
})
export default class benficialOwnerRefree extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  owner = {} as IBeneficialOwner;

  onSave() {
    if (!this.owner.name) return false;
    this.$emit("ownerAdded", this.owner);
    this.closeModal();
    this.owner = { name: "", percentage: 0 } as IBeneficialOwner;
  }

  closeModal() {
    this.$emit("close");
  }
}
</script>
