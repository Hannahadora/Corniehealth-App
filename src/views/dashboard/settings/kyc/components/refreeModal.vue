<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/12">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
        <cornie-card-title class="">
        <icon-btn @click="show = false" >
          <arrow-left stroke="#ffffff"/>
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Nominate Referees
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
            v-model="referee.name"
            style="width: 100%"
              placeholder="--Enter--"
          />
        </div>
        <div class="w-full my-4">
          <cornie-input
            :label="'Email Address'"
            v-model="referee.email"
            style="width: 100%"
            placeholder="--Enter--"
          />
        </div>
        <div class="w-full my-4">
          <cornie-phone
            :label="'Phone Number'"
            v-model="referee.number"
            v-model:code="referee.dialCode"
            placeholder="--Enter--"
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
import CorniePhone from "@/components/phone-input.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";
import IPhone from "@/types/IPhone";
@Options({
  components: {
    ...CornieCard,
    ArrowLeft,
    CorniePhone,
    CornieInput,
    CornieDialog,
    IconBtn
  },
})
export default class NominateRefree extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;
@Prop({ type: String, default: "" })
  id!: string;
  referee: any = {dialCode:"+234",number:"" };
  onSave() {
    if (!this.referee?.name) return false;
    this.$emit("refadded", {
      name: this.referee.name,
      email: this.referee.email,
      phone: {dialCode: this.referee.dialCode,number:this.referee.number},
      notified: false,
    });
    this.closeModal();
    this.referee = { name: "", email: "", phone: {dialCode:"+234",number:""} } as any;
  }
  closeModal() {
    this.$emit("close");
    this.show = false
  }
}
</script>